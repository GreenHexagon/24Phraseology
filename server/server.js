import express from "express";
import http from "node:http";
import cors from "cors";
import { WebSocket, WebSocketServer } from "ws";

const PORT = 3000;
const UPSTREAM_URL = "wss://24data.ptfs.app/wss";
const MAX_FLIGHT_PLANS = 200;

const cache = {
    acftData: { data: null, receivedAt: null },
    eventAcftData: { data: null, receivedAt: null },
    flightPlans: [],
    eventFlightPlans: [],
    controllers: { data: [], receivedAt: null },
    atis: {},
};

function pushCapped(list, item, max) {
    list.push(item);
    if (list.length > max) list.splice(0, list.length - max);
}

function handleEvent(evt) {
    const { t, d, s } = evt;
    const receivedAt = s ?? new Date().toISOString();

    switch (t) {
        case "ACFT_DATA":
            cache.acftData = { data: d, receivedAt };
            break;
        case "EVENT_ACFT_DATA":
            cache.eventAcftData = { data: d, receivedAt };
            break;
        case "FLIGHT_PLAN":
            pushCapped(cache.flightPlans, { ...d, receivedAt }, MAX_FLIGHT_PLANS);
            break;
        case "EVENT_FLIGHT_PLAN":
            pushCapped(cache.eventFlightPlans, { ...d, receivedAt }, MAX_FLIGHT_PLANS);
            break;
        case "CONTROLLERS":
            cache.controllers = { data: d, receivedAt };
            break;
        case "ATIS": {
            const key = d?.airport;
            cache.atis[key] = { ...d, receivedAt: new Date().toISOString() };
            break;
        }
        default:
            console.log("Unhandled event type:", t);
    }
}

const app = express();
app.use(cors({ origin: ["http://localhost:5173"] }));

app.get("/api/acft_data", (req, res) => res.json(cache.acftData));
app.get("/api/event_acft_data", (req, res) => res.json(cache.eventAcftData));
app.get("/api/flight_plans", (req, res) => res.json(cache.flightPlans));
app.get("/api/event_flight_plans", (req, res) => res.json(cache.eventFlightPlans));
app.get("/api/controllers", (req, res) => res.json(cache.controllers));
app.get("/api/atis", (req, res) => res.json(cache.atis));
app.get("/api/atis/:airport", (req, res) => {
    const entry = cache.atis[req.params.airport.toUpperCase()] ?? cache.atis[req.params.airport];
    if (!entry) return res.status(404).json({ error: "No ATIS for that airport" });
    res.json(entry);
});

app.get("/api/health", (req, res) => {
    res.json({
        upstream: upstream?.readyState === WebSocket.OPEN ? "connected" : "disconnected",
        lastAcftData: cache.acftData.receivedAt,
    });
});

const server = http.createServer(app);

let upstream = null;
let reconnectDelay = 1000;

function connectUpstream() {
    upstream = new WebSocket(UPSTREAM_URL);

    upstream.on("open", () => {
        console.log("Connected to 24data");
        reconnectDelay = 1000;
    });

    upstream.on("message", (data) => {
        const raw = data.toString();
        let evt;
        try {
            evt = JSON.parse(raw);
        } catch (err) {
            console.error("Bad JSON from upstream:", err.message);
            return;
        }
        handleEvent(evt);
    });

    upstream.on("close", () => {
        console.log(`Upstream closed. Reconnecting in ${reconnectDelay}ms`);
        setTimeout(connectUpstream, reconnectDelay);
        reconnectDelay = Math.min(reconnectDelay * 2, 30000);
    });

    upstream.on("error", (err) => {
        console.error("Upstream error:", err.message);
    });
}

connectUpstream();

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

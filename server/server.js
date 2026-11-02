import express from "express";
import http from 'node:http';
import cors from "cors";
import { WebSocket, WebSocketServer } from "ws";

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const wss = new WebSocket("wss://")

// app.get("/api/acftdata", async (rq, rs) => {
//     try {
//       const response = await fetch("https://24data.ptfs.app/acft-data");
//       const data = await response.json();
//       rs.json(data); 
//     }
//     catch (err) {
//       console.error("Error fetching aircraft data: ", err);
//     }
// });

wss.on('connection', (ws) => {
    console.log("connected")
    wss.on('message', (message) => {
        console.log(message);
        ws.send(message)
    });
});

app.listen(3000, () => {
    console.log("Server started");
});
import express from "express";
import cors from "cors";


const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
}
app.use(cors(corsOptions))


app.get("/api/acftdata", async (rq, rs) => {
    try {
      const response = await fetch("https://24data.ptfs.app/acft-data");
      const data = await response.json();
      rs.json(data); 
    }
    catch (err) {
      console.error("Error fetching aircraft data: ", err);
    }
});

app.listen(3000, () => {
    console.log("Server started")
} );
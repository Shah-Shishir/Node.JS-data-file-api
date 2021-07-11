import express from "express";
import morgan from "morgan";
import cors from "cors";
import dataObjectRoutes from "./api/routes/dataObjects.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use('/api/v1', dataObjectRoutes);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})
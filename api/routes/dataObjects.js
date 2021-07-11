import express from "express";

import { generateData, stopData, generateResults } from "../controllers/dataObjects.js";

const router = express.Router();

router.get('/generate-data', generateData);
router.get('/stop-data', stopData);
router.get('/generate-results', generateResults);

export default router;
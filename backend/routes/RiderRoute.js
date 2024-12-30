import express from 'express'
import { acceptOrder, getRiderInfo, newRider, updateRiderLocation } from '../controllers/riderController.js';

const riderRouter = express.Router()


riderRouter.post("/new", newRider)
riderRouter.post("/accept", acceptOrder)
riderRouter.post("/updatelocation", updateRiderLocation)
riderRouter.post("/getrider", getRiderInfo)
export default riderRouter;
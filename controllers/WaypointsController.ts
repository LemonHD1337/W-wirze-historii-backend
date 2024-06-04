import {Request, Response} from "express";
import Waypoints from "../models/Waypoints";


export default class WaypointsController {
    async create(req: Request, res: Response) {
        try {
            await Waypoints.create(req.body);
            res.send();
        } catch (error) {
            res.status(309).send({msg: error});
        }
    }

    async getAllByMap(req: Request, res: Response) {
        try {
            const mapId = Number(req.params.mapId)
            const data = await Waypoints.getAllByMap(mapId)
            res.send(data);
        } catch (error) {
            res.status(309).send({msg: error});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            await Waypoints.delete(id);
            res.send();
        } catch (error) {
            res.status(309).send({msg: error});
        }
    }
}



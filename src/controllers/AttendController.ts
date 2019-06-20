import { Request, Response } from 'express';
import { IAPIResponse } from '../interfaces/IAPIResponse';
import Attend from '../models/AttendModel';
import { AttendanceService } from '../services/AttendanceService';
import { Loggifyr, LogLevel } from '../Utils/Loggifyr';

export class AttendController {
    public static async getAllAttends(req: Request, res: Response): Promise<Response> {
        try {
            const attends = await Attend
                .query()
                .orderBy('created_at', 'ASC');
            if (!attends) {
                await Loggifyr.log(`Attempted to retrieve attends but none found`, LogLevel.WARN);
                return res.status(404).send(attends);
            }
            await Loggifyr.log(`Retrieved a list of ${attends.length} attendances`, LogLevel.INFO);
            res.send(attends);
        } catch ( e ) {
            await Loggifyr.log(`getAllAttends: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async createAttend(req: Request, res: Response): Promise<Response> {
        try {
            const attend = await Attend
                .query()
                .insert(req.body);
            if (!attend) {
                await Loggifyr.log(`Attempted to create attend but nothing returned`, LogLevel.WARN);
                return res.status(404).send(attend);
            }
            await Loggifyr.log(`Created attend with info ${attend}`, LogLevel.INFO);
            return res.send(attend);
        } catch ( e ) {
            await Loggifyr.log(`createAttend: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async getAttendsByUPC(req: Request, res: Response): Promise<Response> {
        const { limit, start } = req.query;
        const { barcode } = req.params;
        const response: IAPIResponse = await new AttendanceService().getAttendancesByUPC(barcode, limit, start);
        return res.status(response.code).send(response);
    }

    public static async getAttendsByDate(req: Request, res: Response): Promise<Response> {
        return res.sendStatus(501);
    }
}

import {Request, Response} from 'express';
import Event from '../models/EventModel';
import {Loggifyr, LogLevel} from '../Utils/Loggifyr';

export class EventController {
    public static async getRecentEvents(req: Request, res: Response): Promise<Response> {
        const limit = req.params.limit;
        try {
            const events = await Event
                .query()
                .limit(limit)
                .orderBy('created_at', 'DESC');
            return res.send(events);
        } catch (e) {
            await Loggifyr.log(`getRecentEvents: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }
}

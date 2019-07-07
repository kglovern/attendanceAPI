import { IAPIResponse } from '../interfaces/IAPIResponse';
import Attend from '../models/AttendModel';
import { Loggifyr, LogLevel } from './Loggifyr';

export class AttendanceService {
    // tslint:disable-next-line:max-line-length
    public static async getAttendancesByUPC(barcode: string, limit: number = 10, start: number = 0): Promise<IAPIResponse> {
        try {
            const attends = await Attend
                .query()
                .where('barcode', barcode)
                .offset(start)
                .orderBy('created_at')
                .limit(limit);

            if (!attends || attends.length === 0) {
                await Loggifyr.log(`No attendances found for barcode ${barcode}`, LogLevel.WARN);
                return {
                    code: 404,
                    data: {
                        attendances: attends,
                    },
                    status: 'fail',
                };
            }
            await Loggifyr.log(`Retrieved ${attends.length} attendances for ${barcode}`);
            return {
                code: 400,
                data: {
                    attendances: attends,
                    limit,
                    start,
                },
                status: 'success',
            };
        } catch (e) {
            await Loggifyr.log(`Fatal error retrieving attendances for ${barcode}`, LogLevel.ERROR);
            return {
                code: 500,
                error: {
                    message: e,
                    status: 'error',
                },
                status: 'error',
            };
        }
    }
}

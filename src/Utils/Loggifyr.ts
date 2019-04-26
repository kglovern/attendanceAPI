import Event from '../models/EventModel';


export enum LogLevel {
    DEBUG = 'Debug',
    INFO = 'Info',
    WARN = 'Warn',
    ERROR = 'Error',
}

export class Loggifyr {
    public static async log(message: string, level: LogLevel = LogLevel.INFO): Promise<Event> {
        if (level === LogLevel.DEBUG) {
            console.log(message);
        }
        return await Event
            .query()
            .insert({
                level,
                message,
            });
    }
}

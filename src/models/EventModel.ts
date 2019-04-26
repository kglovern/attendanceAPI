/* tslint:disable */
import {Model} from 'objection';

export default class Event extends Model {
    public static tableName: string = 'Event';
    public static modelPaths: string[] = [__dirname];
    // Attributes
    public readonly id!: number;
    public level!: string;
    public message!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

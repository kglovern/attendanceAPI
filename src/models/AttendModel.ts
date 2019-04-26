/* tslint:disable */
import {Model} from 'objection';

export default class Attend extends Model {
    public static tableName: string = 'Attend';
    public static modelPaths: string[] = [__dirname];
    // Attributes
    public readonly id!: number;
    public barcode!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

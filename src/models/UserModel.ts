import {Model} from 'objection';

export default class User extends Model {
    public static tableName: string = 'User';
    // Attributes
    public readonly id!: number;
    public username!: string;
    public password!: string;
}

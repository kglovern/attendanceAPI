import {Model} from 'objection';

export default class ClassOfferingStudent extends Model {
    // Attributes
    readonly id!: number;
    student_id!: number;
    classOffering_id!: number;

    static tableName: string = 'ClassOffering_Student';
    static modelPaths: string[] = [__dirname];

}

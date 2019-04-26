import {Model} from 'objection';
import {join} from 'path';
import ClassOffering from './ClassOfferingModel';

export default class Student extends Model {
    // Attributes
    readonly id!: number;
    firstName!: string;
    lastName!: string;
    userId!: string;
    studentNumber?: number;
    studentUPC!: string;

    // Eager relations
    classes?: ClassOffering[];

    static tableName: string = 'Student';
    static modelPaths: string[] = [__dirname];

    static relationMappings = {
        classes: {
            relation: Model.ManyToManyRelation,
            modelClass: join(__dirname, 'ClassOfferingModel'),
            join: {
                from: 'Student.id',
                through: {
                    from: 'ClassOffering_Student.student_id',
                    to: 'ClassOffering_Student.classOffering_id',
                },
                to: 'ClassOffering.id',
            },
        },
    };
}

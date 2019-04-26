import {Model} from 'objection';
import {join} from 'path';
import Student from './StudentModel';

export default class ClassOffering extends Model {
    // Attributes
    readonly id!: number;
    courseCode!: string;
    courseName!: string;
    enrollCap!: number;

    // Eager Relations
    students?: Student[];

    static tableName: string = 'ClassOffering';
    static modelPaths: string[] = [__dirname];

    static relationMappings = {
        students: {
            relation: Model.ManyToManyRelation,
            modelClass: join(__dirname, 'StudentModel'),
            join: {
                from: 'ClassOffering.id',
                through: {
                    from: 'ClassOffering_Student.classOffering_id',
                    to: 'ClassOffering_Student.student_id',
                },
                to: 'Student.id',
            },
        },
    };
}

import {Request, Response} from 'express';
import Student from '../models/StudentModel';
import {Loggifyr, LogLevel} from '../Utils/Loggifyr';

export class StudentController {
    public static async getAllStudents(req: Request, res: Response): Promise<Response> {
        try {
            const students = await Student
                .query()
                .orderBy('lastName');

            if (!students.length) {
                await Loggifyr.log(`getAllStudents: no entities found`, LogLevel.WARN);
                return res.status(404).send(students);
            }
            await Loggifyr.log(`getAllStudents: retrieved ${students.length} entities`);
            return res.send(students);
        } catch (e) {
            await Loggifyr.log(`getAllStudents: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async getStudentById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        try {
            const student = await Student
                .query()
                .where('id', id)
                .first();

            if (!student) {
                await Loggifyr.log(`getStudentById: no entity with id ${id}`, LogLevel.WARN);
                return res.status(404).send(student);
            }
            await Loggifyr.log(`getStudentById: retrieved entity with id ${id}`);
            return res.send(student);
        } catch (e) {
            await Loggifyr.log(`getStudentById: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async createStudent(req: Request, res: Response): Promise<Response> {
        try {
            const student = await Student
                .query()
                .insert(req.body);
            if (!student) {
                await Loggifyr.log(`createStudent: Empty entity on create`, LogLevel.WARN);
                return res.status(404).send(student);
            }
            await Loggifyr.log(`createStudent: created student ${student}`);
            return res.send(student);
        } catch (e) {
            await Loggifyr.log(`createStudent: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async updateStudent(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        try {
            const student = await Student
                .query()
                .patchAndFetchById(id, req.body);
            if (!student) {
                await Loggifyr.log(`updateStudent: No entity with id ${id}`, LogLevel.WARN);
                res.status(404).send(student);
            }
            await Loggifyr.log(`updateStudent: updated ${id}`);
            return res.send(student);
        } catch (e) {
            await Loggifyr.log(`updateStudent: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async deleteStudentByID(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        try {
            const student = await Student
                .query()
                .delete()
                .where('id', id);

            if (!student) {
                await Loggifyr.log(`deleteStudentByID: no entity with id ${id}`, LogLevel.WARN);
                return res.status(404).send(student);
            }
            await Loggifyr.log(`deleteStudentByID: deleted ${id}`);
            return res.send(student);
        } catch (e) {
            await Loggifyr.log(`deleteStudentByID: ${e}`, LogLevel.ERROR);
            res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async getClassesForStudent(req: Request, res: Response): Promise <Response> {
        const studentId = req.params.id;

        try {
            const classesForStudent = await Student
                .query()
                .where('id', studentId)
                .eager('classes')
                .first();

            if (!classesForStudent.classes.length) {
                await Loggifyr.log(`getClassesForStudent: no classes for student ${studentId}`, LogLevel.WARN);
                return res.sendStatus(404);
            }
            await Loggifyr.log(`getClassesForStudent: retrieved classes for ${studentId}`);
            return res.send(classesForStudent.classes);
        } catch (e) {
            await Loggifyr.log(`getClassesForStudent: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }
    public static async getStudentByUPC(req: Request, res: Response): Promise<Response> {
        const upc = req.params.upc;
        try {
            const student = await Student
                .query()
                .where('studentUPC', upc)
                .first();
            if (!student) {
                await Loggifyr.log(`getAttendsByStudentUPC: No student found with UPC ${upc}`, LogLevel.WARN);
                return res.status(404).send({});
            }
            await Loggifyr.log(`Retrieved student by UPC ${upc}`);
            return res.send(student);
        } catch (e) {
            await Loggifyr.log('getAttendsByStudentUPC: Failed to retrieve student', LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }
}

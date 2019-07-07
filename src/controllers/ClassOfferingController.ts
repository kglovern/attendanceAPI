import {Request, Response} from 'express';
import ClassOffering from '../models/ClassOfferingModel';
import ClassOfferingStudent from '../models/ClassOfferingStudentModel';
import {Loggifyr, LogLevel} from '../services/Loggifyr';

export class ClassOfferingController {

    public static async getAllClassOfferings(req: Request, res: Response): Promise<Response> {
        try {
            const classOfferings = await ClassOffering
                .query()
                .orderBy('courseCode');

            if (!classOfferings.length) {
                await Loggifyr.log(`No class offerings found on retrieve`, LogLevel.WARN);
                return res.status(404).send(classOfferings); // No entities found
            }
            await Loggifyr.log(`getAllClassOfferings: retrieved a list of entities`, LogLevel.INFO);
            return res.send(classOfferings);
        } catch (e) {
            // Error in this case since it's likely that failure here is on the server and not the client
            await Loggifyr.log(`getAllClassOfferings: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async getClassOfferingById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        try {
            const classOffering = await ClassOffering
                .query()
                .where('id', id)
                .first();
            // 404 in all cases of entity not found
            if (!classOffering) {
                await Loggifyr.log(`getClassOfferingById: Entity not found`, LogLevel.WARN);
                return res.sendStatus(404);
            }
            // Otherwise send the class offering entity
            await Loggifyr.log(`getClassOfferingById: ${classOffering}`, LogLevel.INFO);
            return res.send(classOffering);
        } catch (e) {
            // Also 404 in cases of failure - we could 500 this as well
            await Loggifyr.log(`getClassOfferingById: Fatal error`, LogLevel.ERROR);
            res.status(404).send({
                code: 404,
                message: e,
            });
        }
    }

    public static async deleteClassOffering(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        try {
            const deleted = await ClassOffering
                .query()
                .delete()
                .where('id', id);
            if (!deleted) {
                await Loggifyr.log(`deleteClassOffering: Entity not found`, LogLevel.WARN);
                return res.status(404).send(deleted);
            }
            await Loggifyr.log(`deleteClassOffering: deleted id ${id}`, LogLevel.INFO);
            return res.send(deleted);
        } catch (e) {
            await Loggifyr.log(`deleteClassOffering: fatal error`, LogLevel.ERROR);
            res.status(404).send({
                code: 404,
                message: e,
            });
        }
    }

    public static async createClassOffering(req: Request, res: Response): Promise<Response> {
        try {
            const classOffering = await ClassOffering
                .query()
                .insert(req.body);

            if (!classOffering) {
                await Loggifyr.log(`createClassOffering: Empty entity returned on create`, LogLevel.WARN);
                return res.status(404).send(classOffering);
            }
            await Loggifyr.log(`createClassOffering: Created offering ${classOffering}`, LogLevel.INFO);
            return res.send(classOffering);
        } catch (e) {
            await Loggifyr.log(`createClassOffering: Fatal error on create`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async updateClassOffering(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        try  {
            const classOffering = await ClassOffering
                .query()
                .patchAndFetchById(id, req.body)
                .where('id', id);
            if (!classOffering) {
                await Loggifyr.log(`updateClassOffering: Unable to find classOffering with id ${id}`, LogLevel.WARN);
                return res.sendStatus(404);
            }
            await Loggifyr.log(`updateClassOffering: Updated ID ${id}`, LogLevel.INFO);
            return res.send(classOffering);
        } catch (e) {
            await Loggifyr.log(`updateClassOffering: Fatal error updating ${id}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async registerStudentInClassOffering(req: Request, res: Response): Promise<Response> {
        const studentId = req.params.studentId;
        const classId = req.params.id;

        try {
            const existingRegistration = await ClassOfferingStudent
                .query()
                .where('student_id', studentId)
                .andWhere('classOffering_id', classId)
                .first();
            // If they aren't already registered, register and return an OK
            if (!existingRegistration) {
                const newRegistration = await ClassOfferingStudent
                    .query()
                    .insert({
                        classOffering_id: classId,
                        student_id: studentId,
                    });
                await Loggifyr.log(`Registered ${studentId} in ${classId}`, LogLevel.INFO);
                return res.send(newRegistration);
            }
            await Loggifyr.log(`${studentId} already registered in ${classId}`, LogLevel.WARN);
            return res.status(409).send({
                code: 409,
                message: 'This student is already registered in the course',
            });
        } catch (e) {
            await Loggifyr.log(`registerStudentInClassOffering: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }

    public static async getStudentsRegisteredInClass(req: Request, res: Response): Promise<Response> {
        const classId = req.params.id;
        try {
            const classWithStudents = await ClassOffering
                .query()
                .where('id', classId)
                .eager('students')
                .first();
            if (!classWithStudents.students.length) {
                await Loggifyr.log(`getStudentsRegisteredInClass: no students found for ${classId}`, LogLevel.WARN);
                return res.sendStatus(404);
            }
            await Loggifyr.log(`getStudentsRegisteredInClass: retrieved students for ${classId}`);
            return res.send(classWithStudents.students);
        } catch (e) {
            await Loggifyr.log(`getStudentsRegisteredInClass: ${e}`, LogLevel.ERROR);
            return res.status(500).send({
                code: 500,
                message: e,
            });
        }
    }
}

import {Router} from 'express';
import { StudentController } from '../controllers/StudentController';

const router: Router = Router();

// Get a list of all students
router.get('/', StudentController.getAllStudents);

// Get data for a single student
router.get('/:id', StudentController.getStudentById);

// Update a single student
router.patch('/:id', StudentController.updateStudent);

// Create a new student
router.post('/', StudentController.createStudent);

// Delete a specific student
router.delete('/:id', StudentController.deleteStudentByID);

// Get a list of classes a student is registered in
router.get('/:id/classes', StudentController.getClassesForStudent);

// Get a single student info by their barcode
router.get('/UPC/:upc', StudentController.getStudentByUPC);

export const StudentRouter: Router = router;

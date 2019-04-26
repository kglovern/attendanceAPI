import { Request, Response, Router } from 'express';
import { ClassOfferingController } from '../controllers/ClassOfferingController';

const router: Router = Router();

// Get a list of all classes
router.get('/', ClassOfferingController.getAllClassOfferings);

// Get data for a single class
router.get('/:id', ClassOfferingController.getClassOfferingById);

// Create a new class
router.post('/', ClassOfferingController.createClassOffering);

// Update a class
router.patch('/:id', ClassOfferingController.updateClassOffering);

// Remove a class
router.delete('/:id', ClassOfferingController.deleteClassOffering);

// Register a student in a class
router.post('/:id/register/:studentId', ClassOfferingController.registerStudentInClassOffering);

// Get a list of all students registered in a class
router.get('/:id/students', ClassOfferingController.getStudentsRegisteredInClass);

export const ClassOfferingRouter: Router = router;

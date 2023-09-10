import JobController from '../controllers/JobController.js';
import ProjectController from '../controllers/ProjectController.js';
import PersonController from '../controllers/PersonController.js';

import express from 'express';

const exp = express;
const router = exp.Router();
//const JobController = require('../controllers/JobController');

router.post('/jobs', JobController.addJob);

router.get('/jobs/:id',JobController.getJob);

router.post('/projects',ProjectController.addProject);

router.get('/projects/:id', ProjectController.getProject);

router.get('/persons/:document', PersonController.getPerson);

router.get('/persons', PersonController.getAllPerson);

router.post('/persons', PersonController.addPerson);

router.put('/persons/:document', PersonController.updatePerson);

router.delete('/persons/:document', PersonController.deletePerson);



export default router;
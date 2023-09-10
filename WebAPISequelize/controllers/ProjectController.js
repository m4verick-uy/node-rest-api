import ProjectRepository from '../DataAccess/ProjectRepository.js';
//import express from 'express';
import DbContext from '../DataAccess/DbContext.js';
import { Sequelize } from 'sequelize';
import { databaseConfig, portForHTTP } from '../config.js';


    
//const router = express.Router();
const sequelize = new Sequelize(databaseConfig);
const dbContext = new DbContext(sequelize);
const projectRepo = new ProjectRepository(dbContext);

const ProjectController = {
    
    addProject: async (req, res) => {
        const { name, duration, startDate, jobId} = req.body;
        const newProject = { name, duration, startDate, jobId};
    
        try {
            await projectRepo.addProject(newProject);
            res.json(newProject);
        } catch (error) {
            console.error("Error creating project:", error);
            res.status(500).json({ error: "Error creating project", details: error.message });
        }
    },

    getProject: async(req,res) => {
        try{
            const projectId = req.params.id;
            const project = await projectRepo.getProject(projectId);
            console.log(project);
            res.json(project);
        }catch(error){
            console.error("Error getting project:", error);
            res.status(500).json({ error: "Error getting project", details: error.message });
        }
        
        
    }

    
};

export default ProjectController;
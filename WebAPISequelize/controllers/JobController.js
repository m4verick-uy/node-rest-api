import JobRepository from '../DataAccess/JobRepository.js';
//import express from 'express';
import DbContext from '../DataAccess/DbContext.js';
import { Sequelize } from 'sequelize';
import { databaseConfig, portForHTTP } from '../config.js';


    
//const router = express.Router();
const sequelize = new Sequelize(databaseConfig);
const dbContext = new DbContext(sequelize);
const jobRepo = new JobRepository(dbContext);

const JobController = {
    
    addJob: async (req, res) => {
        const { title, company, startDate, projects} = req.body;
        const newJob = { title, company, startDate, projects};
    
        try {
            await jobRepo.addJob(newJob);
            res.json(newJob);
        } catch (error) {
            console.error("Error creating job:", error);
            res.status(500).json({ error: "Error creating job", details: error.message });
        }
    },
    
    getJob: async (req, res) => {
        try{
            const jobId = req.params.id;
            const job = await jobRepo.findJob(jobId)
            res.json(job);
        }catch (error){
            console.error("Error getting job", error);
            res.status(500).json({error: "Error getting job", details: error.message});
        }
    }
};

export default JobController;
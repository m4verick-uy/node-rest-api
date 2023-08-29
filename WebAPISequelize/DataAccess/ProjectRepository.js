class ProjectRepository{
    constructor(dbContext){
        this.Project = dbContext.Project;
    }
    
    async addProject(project){
        return await this.Project.create({
            name: project.name,
            duration: project.duration,
            startdDate: project.startdDate,
            jobId: project.jobId
        });
    }
    
}
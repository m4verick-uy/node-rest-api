class ProjectRepository{
    constructor(dbContext){
        this.Project = dbContext.Project;
    }
    
    async addProject(project){
        return await this.Project.create({
            name: project.name,
            duration: project.duration,
            startDate: project.startDate,
            jobId: project.jobId
        });
    }
 
    async getProject(idProject){
        return await this.Project.findOne({
            where: {
                id: idProject
            }
        });
    }
}
export default ProjectRepository;
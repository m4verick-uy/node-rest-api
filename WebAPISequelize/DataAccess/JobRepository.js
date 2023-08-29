

class JobRepository{
    constructor(dbContext){
        this.Job = dbContext.Job;
        this.Project = dbContext.Project;
        this.Person = dbContext.Person;
    }
    async addJob(job){
        return await this.Job.create({
            title: job.title,
            company: job.company,
            startDate: job.startDate,
            Projects: job.projects
        });
    }

    async findJob(jobId) {
        return await this.Job.findOne({
            where: {
                id: jobId
            },
            include: [
                this.Project,
                this.Person
            ]// Incluir proyectos asociados al trabajo
        });
    }
}
export default JobRepository;
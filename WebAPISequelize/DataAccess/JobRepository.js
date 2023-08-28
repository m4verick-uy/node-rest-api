class JobRepository{
    constructor(dbContext){
        this.Job = dbContext.Job;
    }
    async addJob(job){
        return await this.Job.create({
            title: job.title,
            company: job.company,
            startDate: job.startDate,
        });
    }
}
export default JobRepository;
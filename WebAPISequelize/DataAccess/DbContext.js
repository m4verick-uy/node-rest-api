import {DataTypes, Sequelize} from 'sequelize';
import {databaseConfig} from '../config.js';
import Job from '../Domain/Job.js';


const sequelize = new Sequelize(databaseConfig);

class DbContext {
    constructor() {
        // Define the Person model
        this.Person = sequelize.define('Person', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            document: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.STRING,
            },
            rol: {
                type: DataTypes.STRING,
            },
            jobId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'jobs', // Nombre de la tabla de trabajos
                    key: 'id',  
                },
            }
        },
        {
            // Explicitly set the table name
            tableName: 'Person'
        });
        // Define Job Model
        this.Job = sequelize.define('Jobs', {
            title: {
                type: DataTypes.STRING,
            },
            company: {
                type: DataTypes.STRING,
            },
            startDate:{
                type: DataTypes.DATE,
            }
        },
        {
            tableName: 'Jobs'
        });
        this.initializeDatabase();
    }
    
    async initializeDatabase() {
        try {
            const [results] = await sequelize.query(
                `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${databaseConfig.database}'`
            );
            if (this.DbIsNotCreated(results)) {
                await sequelize.query(`CREATE DATABASE ${databaseConfig.database}`);
            }
            await sequelize.sync();
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }

    DbIsNotCreated(results) {
        return results.length === 0;
    }
}

export default DbContext;

import mysql from 'mysql2/promise';


const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_rest_api'
};

class PersonRepository {
    async getAllPersons() {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.execute('SELECT * FROM persons');
        console.log('resultado del select person',connection.execute('SELECT * FROM persons'));
        connection.end();
        return rows;
    }

    async createPerson(person) {
        const connection = await mysql.createConnection(config);
        const [result] = await connection.execute(
            'INSERT INTO persons (name, age, document, description, rol) VALUES (?, ?, ?, ?, ?)',
            [person.name, person.age, person.document, person.description, person.rol]
        );
        connection.end();
        return result.insertId;
    }

    async getPersonByDocument(document){
        const connection = await mysql.createConnection(config);
        const [result] = await connection.execute('SELECT * FROM persons WHERE document = ?', [document]);
        connection.end();
        return result;
    }

    // Implement other CRUD methods here...
}

export default PersonRepository;

// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'interviewStack',
    password: 'Dots#123?'
});

async function fetchAllSubjects() {
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `subjects`'
        );

        console.log("called fetchAllSubjects")
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        return results;
    } catch (err) {
        console.log(err);
    }
}

async function getQuestionsBySubject(slug) {
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM questions where subject_id = (select id from subjects where slug =  '${slug}')`
        );

        console.log("called getQuestionsBySubject")
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        return results;
    } catch (err) {
        console.log(err);
    }
}

async function getSubjectBySlug(slug) {
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            `select * from subjects where slug = '${slug}'`
        );

        console.log("called getSubjectBySlug")
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        return results[0];
    } catch (err) {
        console.log(err);
    }
}

export { fetchAllSubjects, getQuestionsBySubject, getSubjectBySlug }
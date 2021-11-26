
const args = process.argv.splice(2);

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres21',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `SELECT students.id, students.name AS student_name, cohorts.name AS cohort_name 
  FROM students 
  JOIN cohorts
  ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;`
const values = [`%${args[0]}%`, `${args[1]}`];

pool.query(queryString,values) 
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student_name} ${user.cohort_name}`);
    });
  })
  .catch(err => console.error('query error', err.stack)
);

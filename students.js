
const args = process.argv.splice(2);

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres21',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name AS student_name, cohorts.name AS cohort_name 
FROM students 
JOIN cohorts
ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${args[0]}%'
LIMIT ${args[1]};
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.id} ${user.student_name} ${user.cohort_name}`)
    });
  })
  .catch(err => console.error('query error', err.stack)
);

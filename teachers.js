const args = process.argv.splice(2);

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres21',
  host: 'localhost',
  database: 'bootcampx'
});


// JUL02: Jadyn Bosco

const values = [`${args[0]}`, `${args[1]}`];

const queryString = 
  `SELECT COUNT(assistance_requests.*)
  AS total_assistances, teachers.name AS name
  FROM teachers
  JOIN assistance_requests
  ON teachers.id = teacher_id
  JOIN students 
  ON students.id = student_id
  JOIN cohorts 
  ON cohort_id = students.id
  WHERE cohorts.name = $1 
  GROUP BY teachers.name 
  LIMIT $2;`

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.total_assistances} ${user.name}`);
    });
  })
  .catch(err => console.error('query error', err.stack)
  );

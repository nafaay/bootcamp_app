const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres21',
  host: 'localhost',
  database: 'bootcampx'
});


pool.query(`
SELECT students.id, students.name, cohort_id
FROM students 
LIMIT 5;
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`);
    })
  });
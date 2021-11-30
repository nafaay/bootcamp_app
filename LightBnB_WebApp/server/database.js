const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// --------- Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => result.rows[0]) //NULL if user does not exist
    .catch((err) => console.log(err.message));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE users.id = $1`, [id])
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));
}
exports.getUserWithId = getUserWithId;


const addUser = function (user) {
  return pool
    .query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`, [user.name, user.email, user.password])
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));
}
exports.addUser = addUser;


const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(`
  SELECT * FROM reservations
  JOIN properties ON properties.id = property_id
  WHERE guest_id = $1
  LIMIT $2`, [guest_id, limit])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
}
exports.getAllReservations = getAllReservations;









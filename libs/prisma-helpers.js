/**
 * Prisma Helper Functions
 * Utility functions to work with Prisma Client
 */

import { prisma } from './prisma.js';

/**
 * Execute a database transaction
 * @param {Function} callback - Function that receives prisma client and returns a promise
 * @returns {Promise} Result of the transaction
 */
export async function transaction(callback) {
  return await prisma.$transaction(callback);
}

/**
 * Execute raw SQL query
 * @param {TemplateStringsArray} query - SQL query template
 * @param {...any} values - Query parameters
 * @returns {Promise} Query result
 */
export async function rawQuery(query, ...values) {
  return await prisma.$queryRaw(query, ...values);
}

/**
 * Execute raw SQL command
 * @param {TemplateStringsArray} query - SQL command template
 * @param {...any} values - Command parameters
 * @returns {Promise} Command result
 */
export async function rawExecute(query, ...values) {
  return await prisma.$executeRaw(query, ...values);
}

/**
 * Find a single record by ID
 * @param {string} model - Model name (e.g., 'accounts', 'bookings')
 * @param {number} id - Record ID
 * @returns {Promise} Record or null
 */
export async function findById(model, id) {
  const modelName = model.toLowerCase();
  return await prisma[modelName].findUnique({
    where: { [`${modelName.slice(0, -1)}_id`]: id }
  });
}

/**
 * Find many records with optional filters
 * @param {string} model - Model name
 * @param {object} where - Where clause
 * @param {object} options - Additional options (include, select, orderBy, etc.)
 * @returns {Promise} Array of records
 */
export async function findMany(model, where = {}, options = {}) {
  const modelName = model.toLowerCase();
  return await prisma[modelName].findMany({
    where,
    ...options
  });
}

/**
 * Create a new record
 * @param {string} model - Model name
 * @param {object} data - Record data
 * @returns {Promise} Created record
 */
export async function create(model, data) {
  const modelName = model.toLowerCase();
  return await prisma[modelName].create({
    data
  });
}

/**
 * Update a record by ID
 * @param {string} model - Model name
 * @param {number} id - Record ID
 * @param {object} data - Update data
 * @returns {Promise} Updated record
 */
export async function updateById(model, id, data) {
  const modelName = model.toLowerCase();
  const idField = `${modelName.slice(0, -1)}_id`;
  return await prisma[modelName].update({
    where: { [idField]: id },
    data
  });
}

/**
 * Delete a record by ID
 * @param {string} model - Model name
 * @param {number} id - Record ID
 * @returns {Promise} Deleted record
 */
export async function deleteById(model, id) {
  const modelName = model.toLowerCase();
  const idField = `${modelName.slice(0, -1)}_id`;
  return await prisma[modelName].delete({
    where: { [idField]: id }
  });
}

/**
 * Count records with optional filters
 * @param {string} model - Model name
 * @param {object} where - Where clause
 * @returns {Promise<number>} Count of records
 */
export async function count(model, where = {}) {
  const modelName = model.toLowerCase();
  return await prisma[modelName].count({
    where
  });
}

/**
 * Check if a record exists
 * @param {string} model - Model name
 * @param {object} where - Where clause
 * @returns {Promise<boolean>} True if exists
 */
export async function exists(model, where) {
  const modelName = model.toLowerCase();
  const count = await prisma[modelName].count({ where });
  return count > 0;
}


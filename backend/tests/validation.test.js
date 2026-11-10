const test = require('node:test');
const assert = require('node:assert/strict');
const { isValidMovieId } = require('../utils/validation');

test('accepts valid MongoDB ObjectId values', () => {
  assert.equal(isValidMovieId('507f1f77bcf86cd799439011'), true);
});

test('rejects invalid MongoDB ObjectId values', () => {
  assert.equal(isValidMovieId('not-a-valid-id'), false);
  assert.equal(isValidMovieId(''), false);
  assert.equal(isValidMovieId(null), false);
});

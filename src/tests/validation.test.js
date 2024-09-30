const request = require('supertest');
const app = require('../app');

describe('Validation and Error Handling', () => {
  it('should return 400 for invalid driver data', async () => {
    const driverData = {
      name: '', // invalid name
    };
    const res = await request(app).post('/drivers').send(driverData);
    expect(res.status).toBe(400);
  });

  it('should return 400 for invalid trip data', async () => {
    const tripData = {
      driverId: '', // invalid driver ID
    };
    const res = await request(app).post('/trips').send(tripData);
    expect(res.status).toBe(400);
  });

  it('should return 404 for non-existent driver ID', async () => {
    const tripData = {
      driver

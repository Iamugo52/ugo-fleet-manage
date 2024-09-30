const request = require('supertest');
const app = require('../app');

describe('Vehicles Endpoint', () => {
  it('creates a new vehicle', async () => {
    const response = await request(app).post('/vehicles').send({
      licensePlate: 'ABC123',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
    });
    expect(response.status).toBe(201);
  });

  it('gets a vehicle by ID', async () => {
    const response = await request(app).get('/vehicles/1');
    expect(response.status).toBe(200);
  });


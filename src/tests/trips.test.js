const request = require('supertest');
const app = require('../app');

describe('Trips Endpoint', () => {
  it('should get all trips', async () => {
    const res = await request(app).get('/trips');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get trip by ID', async () => {
    const tripId = '123456';
    const res = await request(app).get(`/trips/${tripId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(tripId);
  });

  it('should create new trip', async () => {
    const tripData = {
      driverId: '123456',
      vehicleId: '789012',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
    };
    const res = await request(app).post('/trips').send(tripData);
    expect(res.status).toBe(201);
    expect(res.body.driverId).toBe(tripData.driverId);
  });

  it('should update trip', async () => {
    const tripId = '123456';
    const updatedData = {
      endDate: '2024-03-10',
    };
    const res = await request(app).put(`/trips/${tripId}`).send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.endDate).toBe(updatedData.endDate);
  });

  it('should delete trip', async () => {
    const tripId = '123456';
    const res = await request(app).delete(`/trips/${tripId}`);
    expect(res.status).toBe(204);
  });

  it('should return 404 for non-existent trip', async () => {
    const tripId = 'non-existent';
    const res = await request(app).get(`/trips/${tripId}`);
    expect(res.status).toBe(404);
  });
});


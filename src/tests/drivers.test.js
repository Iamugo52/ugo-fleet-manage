const request = require('supertest');
const app = require('../app');

describe('Drivers Endpoint', () => {
  it('should get all drivers', async () => {
    const res = await request(app).get('/drivers');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get driver by ID', async () => {
    const driverId = '123456';
    const res = await request(app).get(`/drivers/${driverId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(driverId);
  });

  it('should create new driver', async () => {
    const driverData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    };
    const res = await request(app).post('/drivers').send(driverData);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(driverData.name);
  });

  it('should update driver', async () => {
    const driverId = '123456';
    const updatedData = {
      name: 'Jane Doe',
    };
    const res = await request(app).put(`/drivers/${driverId}`).send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedData.name);
  });

  it('should delete driver', async () => {
    const driverId = '123456';
    const res = await request(app).delete(`/drivers/${driverId}`);
    expect(res.status).toBe(204);
  });

  it('should return 404 for non-existent driver', async () => {
    const driverId = 'non-existent';
    const res = await request(app).get(`/drivers/${driverId}`);
    expect(res.status).toBe(404);
  });
});



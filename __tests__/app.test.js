const request = require('supertest');
const app = require('../index.js'); // Import the app
const { weatherApi } = require('../apis.js');

jest.mock('../apis.js', () => ({
  weatherApi: jest.fn(),
}));

let server;

beforeAll(() => {
  server = app.listen(3001); // Start the server before tests
});

afterAll(done => {
  server.close(done); // Ensure server is properly closed
});

describe('Test the weather API routes', () => {
  it('should respond with "Hello World!" on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World!');
  });

  it('should fetch temperature for a valid city', async () => {
    weatherApi.mockResolvedValue({
      location: {
        name: 'London',
        country: 'United Kingdom',
        region: 'London',
        localtime: '2024-09-10 12:00',
      },
      current: {
        temp_c: 25,
        condition: {
          text: 'Sunny',
          icon: 'https://example.com/icon.png',
        },
      },
    });

    const res = await request(app).get('/temperature').query({ city: 'London', days: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('condition');
    expect(res.body.temperature).toBe(25);
    expect(res.body.condition).toBe('Sunny');
  });

  it('should return 404 if city is not found', async () => {
    weatherApi.mockResolvedValue(null); // Simulate city not found scenario

    const res = await request(app).get('/temperature').query({ city: 'InvalidCity', days: 1 });
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('City not found');
  });

  it('should return 500 if weatherApi fails', async () => {
    weatherApi.mockRejectedValueOnce(new Error('API Error'));

    const res = await request(app).get('/temperature').query({ city: 'London', days: 1 });
    expect(res.statusCode).toBe(500);
    expect(res.text).toBe('Error fetching temperature data');
  });
});

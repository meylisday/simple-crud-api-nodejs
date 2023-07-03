import http from 'http';
import { createServer } from '../app';
import dotenv from 'dotenv';
dotenv.config();

//MAKE SURE THAT SERVER IS NOT RUNNING AND THE PORT IS FREE

describe('API Tests', () => {
  let server: http.Server;
  const PORT = process.env.PORT;
  let serverAddress = `http://localhost:${PORT}`;

  beforeAll((done) => {
    server = http.createServer(createServer);
    server.listen(PORT, () => {});
    done();
  });

  afterAll((done) => {
    server.close(done);
  });

  let createdRecordId: string;

  test('GET api/users should return an empty array', async () => {
    const url = `${serverAddress}/api/users`;

    const response = await fetch(url);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  test('POST api/users should create a new record', async () => {
    const url = `${serverAddress}/api/users`;
    const data = {
      username: 'Daria',
      age: 26,
      hobbies: ['reading', 'coding'],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const createdRecord = await response.json();

    expect(response.status).toBe(201);
    expect(createdRecord.username).toBe(data.username);
    expect(createdRecord.age).toBe(data.age);
    expect(createdRecord.hobbies).toEqual(data.hobbies);

    createdRecordId = createdRecord.id;
  });

  test('GET api/users/{userId} should return the created record', async () => {
    const url = `${serverAddress}/api/users/${createdRecordId}`;

    const response = await fetch(url);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(createdRecordId);
  });
});

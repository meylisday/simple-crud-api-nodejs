import http from 'http';
import { createServer } from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(createServer);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
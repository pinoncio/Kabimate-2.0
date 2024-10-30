import dotenv from 'dotenv';
import Server from "./db/server";
// condif dotenv
dotenv.config();
const server = new Server();
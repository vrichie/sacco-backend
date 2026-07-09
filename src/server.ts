import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"

dotenv.config()

const app: Application = express();

const port = process.env.PORT || 5000; // The port your express server will be running on.


// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express! ye');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
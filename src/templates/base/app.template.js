export const appTemplate = (answer) => `
import express from "express";
${answer.dependencies.includes("cors") ? `import cors from "cors";` : ""}
${answer.dependencies.includes("cookie-parser") ? `import cookieParser from "cookie-parser";` : ""}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

${answer.dependencies.includes("cors") ? `
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
` : ""}

${answer.dependencies.includes("cookie-parser") ? `app.use(cookieParser());` : ""}

// routes here

export { app };
`;
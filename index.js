#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

try {
    const answer = await inquirer.prompt([
        {
            name: "projectName",
            message: "Enter the Project (Folder) Name:",
            validate: (input) => {
                if (!input) return "Please enter a valid project name";
                if (fs.existsSync(path.join(process.cwd(), input)))
                    return "Folder already exists";
                return true;
            },
        },
        {
            type: "confirm",
            name: "useMongo",
            message: "Do you want MongoDB?",
        },
        {
            type: "confirm",
            name: "ENV",
            message: "Do you want .env?",
        },
        {
            type: "checkbox",
            name: "dependencies",
            message: "Select dependencies to install:",
            choices: [
                "express",
                "nodemon",
                "cors",
                "bcryptjs",
                "dotenv",
                "jsonwebtoken",
                "cookie-parser",
                "cloudinary",
                "multer",
            ],
        },
        {
            type: "confirm",
            name: "npmi",
            message: "Do you want to install dependencies?",
        },
    ]);

    const projectPath = path.join(process.cwd(), answer.projectName);

    // Create root folder
    fs.mkdirSync(projectPath, { recursive: true });

    // Folder structure
    const folders = [
        "controllers",
        "routes",
        "db",
        "middlewares",
        "models",
        "utils",
        "public",
    ];

    folders.forEach((folder) => {
        fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
    });

    // Initialize npm
    execSync("npm init -y", { cwd: projectPath, stdio: "inherit" });

    // Fix package.json
    const pkgPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    pkg.type = "module";
    pkg.scripts = {
        start: "node index.js",
        dev: "nodemon index.js",
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    // ---------------- UTILS ----------------
    fs.writeFileSync(
        path.join(projectPath, "utils", "ApiError.js"),
        `
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
`
    );

    fs.writeFileSync(
        path.join(projectPath, "utils", "ApiResponse.js"),
        `class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
// basically statusCode ka knowledge hona chiya aap ke pass
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

export { ApiResponse };
`
    );

    fs.writeFileSync(
        path.join(projectPath, "utils", "asyncHandler.js"),
        `const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
}; 

export default asyncHandler;`
    );

    // ---------------- CORE FILES ----------------
    const indexContent = `
import { app } from "./app.js";
${answer.useMongo ? `import connectDB from "./db/connect.js";` : ""}
${answer.ENV ? `import dotenv from "dotenv"; \n dotenv.config();` : ""}

const startServer = async () => {
  try {
    ${answer.useMongo ? `await connectDB();` : ""}
    app.on('error', (error) => {
        console.log('app is facing error while connecting with db')
        throw error
    })
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port", process.env.PORT || 3000);
    });

  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();
`;

    fs.writeFileSync(path.join(projectPath, "index.js"), indexContent);

    fs.writeFileSync(
        path.join(projectPath, "app.js"),
        `import express from "express";
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

export { app };`
    );

    fs.writeFileSync(
        path.join(projectPath, "constants.js"),
        `export const DB_NAME = "your_db_name";`
    );

    // ---------------- MONGODB ----------------
    let deps = [...answer.dependencies];

    if (answer.useMongo) {
        deps.push("mongoose");

        fs.writeFileSync(
            path.join(projectPath, "db", "connect.js"),
            `import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;`
        );
    }

    // ---------------- ENV ----------------
    if (answer.ENV) {
        fs.writeFileSync(
            path.join(projectPath, ".env"),
            `PORT=3000
MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_token
ACCESS_TOKEN_EXPIRY=2d

REFRESH_TOKEN_SECRET=your_refresh_token
REFRESH_TOKEN_EXPIRY=20d

CORS_ORIGIN=*`
        );
    }

    // ---------------- GITIGNORE ----------------
    fs.writeFileSync(
        path.join(projectPath, ".gitignore"),
        `node_modules/
.env
dist/
coverage/
.DS_Store`
    );

    // ---------------- INSTALL DEPENDENCIES ----------------
    const devDeps = [];
    const normalDeps = [];

    deps.forEach((dep) => {
        if (dep === "nodemon") devDeps.push(dep);
        else normalDeps.push(dep);
    });

    if (answer.npmi) {
        if (normalDeps.length) {
            execSync(`npm i ${normalDeps.join(" ")}`, {
                cwd: projectPath,
                stdio: "inherit",
            });
        }

        if (devDeps.length) {
            execSync(`npm i -D ${devDeps.join(" ")}`, {
                cwd: projectPath,
                stdio: "inherit",
            });
        }
    }

    console.log(`\n${answer.projectName} project created successfully!\n`);
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
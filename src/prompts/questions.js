import fs from "fs";
import path from "path";
import chalk from "chalk";

export default [
  {
    name: "projectName",
    message: chalk.bold.yellow("Enter the Project (Folder) Name:"),
    validate: (input) => {
      if (!input) return chalk.red("Please enter a valid project name");
      if (fs.existsSync(path.join(process.cwd(), input)))
        return chalk.red("Folder already exists");
      return true;
    },
  },
  {
    type: "confirm",
    name: "useMongo",
    message: chalk.bold.yellow("Do you want MongoDB?"),
  },
  {
    type: "confirm",
    name: "ENV",
    message: chalk.bold.yellow("Do you want .env?"),
  },
  {
    type: "checkbox",
    name: "dependencies",
    message: chalk.bold.yellow("Select dependencies to install:"),
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
    message: chalk.bold.yellow("Do you want to install dependencies?"),
  },
];
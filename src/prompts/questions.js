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
    type: "select",
    name: "auth",
    message: chalk.bold.yellow("Add Authentication : "),
    choices: ["No Authentication", "JWT + bcryptjs", "JWT + argon2"],
  },

  {
    type: "confirm",
    name: "validation",
    message: chalk.bold.yellow("Add Validation (Zod)?"),
  },

  {
    type: "confirm",
    name: "fileUpload",
    message: chalk.bold.yellow("Add File Upload (Multer + Cloudinary)?"),
  },

  {
    type: "confirm",
    name: "devTools",
    message: chalk.bold.yellow("Add Dev Tools (Nodemon)?"),
  },
  {
    type: "confirm",
    name: "npmi",
    message: chalk.bold.yellow("Do you want to install dependencies?"),
  },
];
import path from "path";
import { createFolders } from "../services/folder.service.js";
import { initPackage } from "../services/package.service.js";
import { createFiles } from "../services/file.service.js";
import { installDeps } from "../services/dependency.service.js";
import chalk from "chalk";

export async function createProject(answer) {
  const projectPath = path.join(process.cwd(), answer.projectName);

  createFolders(projectPath);
  initPackage(projectPath);
  createFiles(projectPath, answer);

  if (answer.npmi) {
    console.log(chalk.blue("Installing dependencies...\n"));
    installDeps(projectPath, answer);
  }
  else {
    console.log(chalk.yellow("Skipping dependency installation."));
    answer.auth && console.log(chalk.yellow("Don't forget to install authentication dependencies: jsonwebtoken, bcrypt"));
    answer.validation && console.log(chalk.yellow("Don't forget to install validation dependency: zod"));
    answer.fileUpload && console.log(chalk.yellow("Don't forget to install file upload dependencies: multer, cloudinary"));
    answer.devTools && console.log(chalk.yellow("Don't forget to install dev tool dependency: nodemon"));
    answer.useMongo && console.log(chalk.yellow("Don't forget to install MongoDB dependency: mongoose"));
  }

}
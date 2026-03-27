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
    console.log(chalk.blue("Installing dependencies..."));
    installDeps(projectPath, answer);
  }
}
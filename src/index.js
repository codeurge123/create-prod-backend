import inquirer from "inquirer";
import questions from "./prompts/questions.js";
import { createProject } from "./core/createProject.js";
import chalk from "chalk";

export default async function runCLI() {
  console.log(chalk.bold.cyan("\n------------------Welcome to the CREATE-PROD-BACKEND CLI------------------\n"));

  try {
    const answer = await inquirer.prompt(questions);

    await createProject(answer);

    console.log(chalk.green(`\n${chalk.bold(answer.projectName)} project created successfully!\n`));
    console.log(chalk.yellow("Happy coding! :)"));
  } catch (error) {
    console.error(chalk.red(("Error:", error.message)));
    process.exit(1);
  }
}
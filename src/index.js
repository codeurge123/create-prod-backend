import inquirer from "inquirer";
import questions from "./prompts/questions.js";
import { createProject } from "./core/createProject.js";
import { execSync } from "child_process";
import chalk from "chalk";

export default async function runCLI() {
  console.log(chalk.bold.cyan("\n------------------Welcome to the CREATE-PROD-BACKEND CLI------------------\n"));

  try {
    const backendapp = await inquirer.prompt([
      {
        type: "select",
        name: "usebackend",
        message: chalk.bold.yellow("What do you want to create?"),
        choices: ["Express Backend", "Next.js App"],
      },
    ]);

    if (backendapp.usebackend === "Next.js App") {
      execSync("npx create-next-app@latest", { stdio: "inherit" });
      return;
    }
  
    const answer = await inquirer.prompt(questions);

    await createProject(answer);

    console.log(chalk.green(`\n${chalk.bold(answer.projectName)} project created successfully!\n`));
    if(answer.useDocker) console.log(chalk.yellow("You can change Docker file according to your need"));
    console.log(chalk.yellow("Happy coding! :)"));
  } catch (error) {
    console.error(chalk.red(("Error:", error.message)));
    process.exit(1);
  }
}
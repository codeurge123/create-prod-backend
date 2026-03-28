import chalk from "chalk";
import { execSync } from "child_process";

export function installDeps(projectPath, answer) {
    let deps = ["express","cors","dotenv","cookie-parser"];

    if(answer.auth) deps.push("jsonwebtoken", "bcrypt");
    if(answer.validation) deps.push("zod");
    if(answer.fileUpload) deps.push("multer", "cloudinary");
    if(answer.devTools) deps.push("nodemon");

    if (answer.useMongo) deps.push("mongoose");

    // deps = deps.map(dep => dep.replace(/['"]/g, "").trim());

    const dev = [];
    const normal = [];

    deps.forEach((dep) => {
        if (dep === "nodemon") dev.push(dep);
        else normal.push(dep);
    });

    console.log(chalk.cyanBright("Installing:"), normal, dev); // debug

    if (normal.length) {
        execSync(`npm i ${normal.join(" ")}`, {
            cwd: projectPath,
            stdio: "inherit",
        });
    }

    if (dev.length) {
        execSync(`npm i -D ${dev.join(" ")}`, {
            cwd: projectPath,
            stdio: "inherit",
        });
    }
}
import { execSync } from "child_process";

export function installDeps(projectPath, answer) {
    let deps = [...answer.dependencies];

    if (answer.useMongo) {
        deps.push("mongoose");
    }

    deps = deps.map(dep => dep.replace(/['"]/g, "").trim());

    const dev = [];
    const normal = [];

    deps.forEach((dep) => {
        if (dep === "nodemon") dev.push(dep);
        else normal.push(dep);
    });

    console.log("Installing:", normal, dev); // debug

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
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function initPackage(projectPath) {
    execSync("npm init -y", { 
        cwd: projectPath, 
        stdio: "inherit" 
    });

    const pkgPath = path.join(projectPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    pkg.type = "module";
    pkg.scripts = {
        start: "node src/index.js",
        dev: "nodemon src/index.js",
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}
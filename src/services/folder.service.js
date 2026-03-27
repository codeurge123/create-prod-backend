import fs from "fs";
import path from "path";

export function createFolders(projectPath) {
    fs.mkdirSync(projectPath, {
        recursive: true
    });

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
        fs.mkdirSync(path.join(projectPath, "src", folder), {
            recursive: true
        });
    });
}
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
        const folderPath =
            folder === "public"
                ? path.join(projectPath, folder, 'temp') 
                : path.join(projectPath, "src", folder); 

        fs.mkdirSync(folderPath, {
            recursive: true
        });
    });
}
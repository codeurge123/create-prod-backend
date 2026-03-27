import fs from "fs";
import path from "path";

import { indexTemplate } from "../templates/base/index.template.js";
import { appTemplate } from "../templates/base/app.template.js";
import { mongoTemplate } from "../templates/db/mongo.template.js";
import { envTemplate } from "../templates/config/env.template.js";
import { utilsTemplates } from "../templates/utils/utils.template.js";

export function createFiles(projectPath, answer) {
    // index.js
    fs.writeFileSync(
        path.join(projectPath,"src", "index.js"),
        indexTemplate(answer)
    );

    // app.js
    fs.writeFileSync(
        path.join(projectPath,"src", "app.js"),
        appTemplate(answer)
    );

    // utils
    Object.entries(utilsTemplates).forEach(([file, content]) => {
        fs.writeFileSync(path.join(projectPath, "src", "utils", file), content);
    });

    // constants
    fs.writeFileSync(
        path.join(projectPath, "src", "constants.js"),
        `export const DB_NAME = "your_db_name";`
    );

    // mongo
    if (answer.useMongo) {
        fs.writeFileSync(
            path.join(projectPath, "src", "db", "connect.js"),
            mongoTemplate()
        );
    }

    // .env
    if (answer.ENV) {
        fs.writeFileSync(path.join(projectPath, ".env"), envTemplate());
    }

    // gitignore
    fs.writeFileSync(
        path.join(projectPath, ".gitignore"),
        `node_modules/
.env
dist/
coverage/
.DS_Store`
    );
}
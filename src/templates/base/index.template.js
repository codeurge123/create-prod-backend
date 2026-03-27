export const indexTemplate = (answer) => `
import { app } from "./app.js";
${answer.useMongo ? `import connectDB from "./db/connect.js";` : ""}
${answer.ENV ? `import dotenv from "dotenv";\ndotenv.config();` : ""}

const startServer = async () => {
  try {
    ${answer.useMongo ? `await connectDB();` : ""}

    app.on("error", (error) => {
      console.error("App error:", error);
      throw error;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port", process.env.PORT || 3000);
    });

  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();
`;


import fs from "fs/promises";

export const logger = async (req, res, next) => {
  try {
    const timestamp = new Date().toISOString();

    const logMessage = `${timestamp} ${req.method} ${req.originalUrl}\n`;

    res.setHeader("X-Powered-By-Student", "TaskForge API - Developed by Bassirou", 
      );

    await fs.appendFile("./requests.log", logMessage);

    console.log(logMessage.trim());

    next();
  } catch (error) {
    next(error);
  }
};

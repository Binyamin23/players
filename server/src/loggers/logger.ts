import winston from "winston";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    const localTime = new Date(timestamp).toLocaleString();
    return JSON.stringify({
        timestamp: localTime,
        level: level,
        message: message
    });
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

export default logger;

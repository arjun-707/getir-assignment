"use strict";
const path = require("path");
const { STATUS_CODES } = require("http");
const root = path.resolve("./");
const dotenv = require("dotenv");

if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: "../production.env" });
  }
  if (process.env.NODE_ENV === "testing") {
    dotenv.config({ path: `${root}/testing.env` });
  } else {
    dotenv.config();
  }
} else {
  dotenv.config();
}

// define all your global constants
const GLOBAL_CONSTANTS = {
  PID: process.pid,
  PORT: process.env.PORT || 3000,
  SERVICE_NAME: process.env.SERVICE_NAME || "UNKNOWN",
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  DEBUG: process.env.DEBUG === "true" || false,
  __exit_app: process.exit,
  __root_path: (filePath) => `${root}${filePath}`,
  __print: (...log) => (process.env.DEBUG ? console.log(...log) : ""),
  __print_error: (...log) => console.error(...log),
  __debug: (...log) => (process.env.DEBUG ? console.debug(...log) : ""),
  __line: (_) => {
    const e = new Error();
    const frame = e.stack.split("\n")[2];
    const lineNumber = frame.split(":")[1];
    // print(__LINE.caller)
    // print('lineNumber', lineNumber)
    // return `\nLine No.: ${lineNumber}\nFile: ${__filename}\n`;
    if (_) return lineNumber;
    return `-- Line No.: ${lineNumber}`;
  },
  STATUS_CODES,
};
for (let key in GLOBAL_CONSTANTS) {
  delete global[key];
  global[key] = GLOBAL_CONSTANTS[key];
}
for (let key in GLOBAL_CONSTANTS)
  DEBUG && typeof GLOBAL_CONSTANTS[key] != "function"
    ? __print(`${key}: ${GLOBAL_CONSTANTS[key]}`)
    : null;

process.on("uncaughtException", (err) =>
  console.log("\nNode uncaughtException:: ", err)
);
process.on("SIGTERM", (err) => {
  __print("\nNode SIGTERM:: ", err);
  process.kill(PID);
});
// process.on('SIGINT', (err) => __print("\nNode SIGINT:: ", err);)
process.on("exit", (err) => __print("\nNode exit:: ", err));
process.on("unhandledRejection", (err) =>
  console.log("\nNode unhandledRejection:: ", err)
);

if (
  !NODE_ENV ||
  ["development", "production", "local", "testing", "uat"].indexOf(NODE_ENV) < 0
) {
  __print_error(`environment variable NODE_ENV is not found or invalid`);
  __exit_app();
}
if (!PORT || isNaN(PORT)) {
  __print_error(`invalid PORT`);
  __exit_app();
}

#!/usr/bin/env node
/* eslint-disable no-console */
const WebSocket = require("ws");
const chalk = require("chalk");

const { log } = console;

const portIndex = process.argv.findIndex((it) => it === "-p");

const port = portIndex !== -1 ? process.argv[portIndex + 1] : 8080;

const isObject = (data) =>
  typeof data === "object" && !Array.isArray(data) && data !== null;

const logParse = (data) => {
  return data.map((it) => {
    if (isObject(it) === true) {
      return it;
    }
    if (Array.isArray(it)) {
      return it;
    }
    return JSON.stringify(it);
  });
};

const chalkParse = (data) => {
  return data
    .map((it) => {
      return JSON.stringify(it);
    })
    .join(" ");
};

const wss = new WebSocket.Server({ port });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    const event = JSON.parse(message);
    const { type, data, prefix } = event;
    switch (type) {
      case "log":
        log(prefix, ...logParse(data));
        break;
      case "error":
        log(chalk.red(prefix, chalkParse(data)));
        break;
      case "warn":
        log(chalk.yellow(prefix, chalkParse(data)));
        break;
      case "debug":
        log(chalk.blue(prefix, chalkParse(data)));
        break;
      default:
        log(prefix, ...logParse(data));
    }
  });

  ws.send("ws connected");
});

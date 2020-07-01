/* eslint-disable no-console */
const WebSocket = require("ws");
const chalk = require("chalk");

const { log } = console;

const logParse = (data) => {
  return data.map((it) => JSON.stringify(it)).join(" ");
};

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    const event = JSON.parse(message);
    const { type, data, prefix } = event;
    switch (type) {
      case "log":
        log(prefix, logParse(data));
        break;
      case "error":
        log(prefix, chalk.red(logParse(data)));
        break;
      case "warn":
        log(prefix, chalk.yellow(logParse(data)));
        break;
      case "debug":
        log(prefix, chalk.blue(logParse(data)));
        break;
      default:
        log(prefix, logParse(data));
    }
  });

  ws.send("something");
});

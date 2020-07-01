import querystring from "querystring";
(function () {
  const scripts = document.getElementsByTagName("script");
  const index = scripts.length - 1;
  const myScript = scripts[index];
  const qs = myScript.src.replace(/^[^\?]+\??/, "");

  const { port, prefix } = querystring.parse(qs);
  console.log(prefix);

  const logSyncWebSocket = new WebSocket(
    `ws://${window.location.hostname}:${port || 8080}`
  );

  logSyncWebSocket.onopen = function (e) {
    console.log("webSocket connected");
  };

  console.defaultLog = console.log.bind(console);
  console.log = function () {
    logSyncWebSocket.send(
      JSON.stringify({ type: "log", data: Array.from(arguments), prefix })
    );
    console.defaultLog.apply(console, arguments);
  };

  console.defaultError = console.error.bind(console);
  console.error = function () {
    logSyncWebSocket.send(
      JSON.stringify({ type: "error", data: Array.from(arguments), prefix })
    );
    console.defaultError.apply(console, arguments);
  };

  console.defaultWarn = console.warn.bind(console);
  console.warn = function () {
    logSyncWebSocket.send(
      JSON.stringify({ type: "warn", data: Array.from(arguments), prefix })
    );
    console.defaultWarn.apply(console, arguments);
  };

  console.defaultDebug = console.debug.bind(console);
  console.debug = function () {
    logSyncWebSocket.send(
      JSON.stringify({ type: "debug", data: Array.from(arguments), prefix })
    );
    console.defaultDebug.apply(console, arguments);
  };
})();

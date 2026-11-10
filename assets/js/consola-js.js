
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll("[data-js-console]").forEach(function (consoleBox) {

    const editor = consoleBox.querySelector(".js-console-code");
    const output = consoleBox.querySelector(".js-console-output");
    const runButton = consoleBox.querySelector(".js-console-run");
    const clearButton = consoleBox.querySelector(".js-console-clear");

    let ready = false;

    function writeOutput(message, type = "") {
      const line = document.createElement("div");
      if (type) line.className = "output-" + type;
      line.textContent = message;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    }

    function formatValue(value) {
      if (typeof value === "string") return value;
      if (value instanceof Error) return value.toString();

      try {
        const result = JSON.stringify(value);
        return result === undefined ? String(value) : result;
      } catch {
        return String(value);
      }
    }

    // Entorno JavaScript aislado
    const frame = document.createElement("iframe");

    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("title", "Entorno de ejecución JavaScript");
    frame.style.display = "none";

    frame.srcdoc = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body>
      <script>
        function send(type, value) {
          parent.postMessage({
            jsConsole: true,
            type: type,
            value: value
          }, "*");
        }

        function format(value) {
          if (typeof value === "string") return value;

          try {
            const result = JSON.stringify(value);
            return result === undefined ? String(value) : result;
          } catch {
            return String(value);
          }
        }

        const outputConsole = {
          log: (...args) => send("log", args.map(format).join(" ")),
          info: (...args) => send("log", args.map(format).join(" ")),
          warn: (...args) => send("warn", args.map(format).join(" ")),
          error: (...args) => send("error", args.map(format).join(" ")),
          clear: () => send("clear", "")
        };

        window.addEventListener("message", async function(event) {
          if (event.source !== parent) return;
          if (!event.data || event.data.type !== "run") return;

          try {
            const AsyncFunction =
              Object.getPrototypeOf(async function() {}).constructor;

            const execute = new AsyncFunction(
              "console",
              '"use strict";\\n' + event.data.code
            );

            await execute(outputConsole);

            send("done", "Ejecución finalizada");
          } catch (error) {
            send("error", error.name + ": " + error.message);
          }
        });
      <\/script>
      </body>
      </html>
    `;

    document.body.appendChild(frame);

    frame.addEventListener("load", function () {
      ready = true;
      runButton.disabled = false;
    });

    // Recibir resultados
    function receiveMessage(event) {
      if (event.source !== frame.contentWindow) return;

      const data = event.data;

      if (!data || data.jsConsole !== true) return;

      if (data.type === "clear") {
        output.replaceChildren();
      }

      if (data.type === "log") {
        writeOutput(data.value);
      }

      if (data.type === "warn") {
        writeOutput("⚠ " + data.value, "warn");
      }

      if (data.type === "error") {
        writeOutput("✖ " + data.value, "error");
      }

      if (data.type === "done") {
        writeOutput("✓ " + data.value, "success");
      }
    }

    window.addEventListener("message", receiveMessage);

    // Ejecutar código
    runButton.addEventListener("click", function () {
      if (!ready) return;

      output.replaceChildren();
      writeOutput("> Ejecutando JavaScript...");

      frame.contentWindow.postMessage({
        type: "run",
        code: editor.value
      }, "*");
    });

    // Limpiar consola
    clearButton.addEventListener("click", function () {
      output.replaceChildren();
      writeOutput("Consola limpia.");
    });

  });

});

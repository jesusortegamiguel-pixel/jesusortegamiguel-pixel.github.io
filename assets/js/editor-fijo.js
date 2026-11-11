
document.addEventListener("DOMContentLoaded", function () {

    // Detectar el lenguaje según el nombre del archivo.
    function detectarLenguaje(nombre) {
        const archivo = nombre.toLowerCase();

        if (archivo === "containerfile" || archivo === "dockerfile") {
            return "dockerfile";
        }

        const extension = archivo.split(".").pop();

        const lenguajes = {
            js: "javascript",
            mjs: "javascript",
            cjs: "javascript",
            ts: "text/typescript",
            json: "application/json",
            html: "htmlmixed",
            htm: "htmlmixed",
            css: "css",
            py: "python",
            java: "text/x-java",
            c: "text/x-csrc",
            cpp: "text/x-c++src",
            h: "text/x-csrc",
            php: "application/x-httpd-php",
            yml: "yaml",
            yaml: "yaml",
            sql: "text/x-sql",
            sh: "shell",
            bash: "shell",
            md: "markdown",
            xml: "xml"
        };

        return lenguajes[extension] || "text/plain";
    }

    document.querySelectorAll("[data-fixed-editor]").forEach(function (container) {

        const textarea = container.querySelector(".fixed-code-source");
        const target = container.querySelector(".fixed-code-content");
        const copyButton = container.querySelector(".fixed-code-copy");
        const copyLabel = container.querySelector(".copy-label");
        const filename = container.querySelector(".fixed-code-filename");

        if (!textarea || !target || typeof CodeMirror === "undefined") return;

        const nombreArchivo = filename
            ? filename.textContent.trim()
            : "ejemplo.js";

        const lenguaje = detectarLenguaje(nombreArchivo);

        const editor = CodeMirror(target, {
            value: textarea.value,
            mode: lenguaje,
            theme: "material-darker",
            lineNumbers: true,
            readOnly: true,
            lineWrapping: true,
            indentUnit: 2,
            tabSize: 2,
            matchBrackets: true
        });

        editor.setSize("100%", "auto");

        // Copiar el código sin los números de línea.
        if (copyButton && copyLabel) {
            copyButton.addEventListener("click", async function () {
                try {
                    await navigator.clipboard.writeText(editor.getValue());
                    copyLabel.textContent = "¡Copiado!";
                } catch (error) {
                    const temporal = document.createElement("textarea");
                    temporal.value = editor.getValue();
                    document.body.appendChild(temporal);
                    temporal.select();

                    try {
                        document.execCommand("copy");
                        copyLabel.textContent = "¡Copiado!";
                    } catch (e) {
                        copyLabel.textContent = "Error al copiar";
                    }

                    temporal.remove();
                }

                setTimeout(function () {
                    copyLabel.textContent = "Copiar código";
                }, 2000);
            });
        }

    });
});

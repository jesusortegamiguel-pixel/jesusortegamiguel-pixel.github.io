
document.addEventListener("DOMContentLoaded", function () {
  const textareas = document.querySelectorAll(
    "[data-js-console] .js-console-code"
  );

  textareas.forEach(function (textarea) {
    if (textarea.dataset.editorInitialized === "true") return;

    const editor = CodeMirror.fromTextArea(textarea, {
      mode: "javascript",
      theme: "material-darker",
      lineNumbers: true,
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,
      lineWrapping: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      extraKeys: {
        "Ctrl-Enter": function (cm) {
          cm.save();
          const button = cm.getTextArea()
            .closest("[data-js-console]")
            .querySelector(".js-console-run");

          if (button && !button.disabled) button.click();
        }
      }
    });

    textarea.dataset.editorInitialized = "true";

    // Mantener actualizado el textarea original.
    editor.on("change", function () {
      editor.save();
    });

    // Guardar el código antes de ejecutar.
    const consoleElement = textarea.closest("[data-js-console]");
    const runButton = consoleElement.querySelector(".js-console-run");

    if (runButton) {
      runButton.addEventListener("click", function () {
        editor.save();
      }, true);
    }
  });
});

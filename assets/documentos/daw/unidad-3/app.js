const http = require("http");

const PORT = 3000;

// Creamos el servidor HTTP
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Configuramos las cabeceras de la respuesta
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    // Ruta principal
    if (req.url === "/") {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Servidor Node.js</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: #f0f4f8;
                        text-align: center;
                        padding: 50px;
                    }
                    .contenedor {
                        background: white;
                        padding: 30px;
                        border-radius: 12px;
                        max-width: 600px;
                        margin: auto;
                        box-shadow: 0 4px 12px #0002;
                    }
                    h1 { color: #16834a; }
                    a { color: #0878c9; }
                </style>
            </head>
            <body>
                <div class="contenedor">
                    <h1>¡Servidor funcionando!</h1>
                    <p>Esta página está siendo servida desde un contenedor Docker.</p>
                    <p>Aplicación ejecutada con Node.js ${process.version}.</p>
                    <hr>
                    <p>Prueba estas rutas:</p>
                    <p><a href="/saludo">/saludo</a></p>
                    <p><a href="/info">/info</a></p>
                    <p><a href="/api">/api</a></p>
                </div>
            </body>
            </html>
        `);
    }

    // Ruta de saludo
    else if (req.url === "/saludo") {
        res.writeHead(200);
        res.end("<h1>¡Hola!</h1><p>El contenedor está respondiendo correctamente.</p>");
    }

    // Ruta con información del servidor
    else if (req.url === "/info") {
        res.writeHead(200);
        res.end(`
            <h1>Información del servidor</h1>
            <p><strong>Versión de Node.js:</strong> ${process.version}</p>
            <p><strong>Sistema operativo:</strong> ${process.platform}</p>
            <p><strong>Arquitectura:</strong> ${process.arch}</p>
        `);
    }

    // Ruta que devuelve datos JSON
    else if (req.url === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8"
        });

        res.end(JSON.stringify({
            mensaje: "La API funciona correctamente",
            aplicacion: "Mi servidor Docker",
            estado: "OK",
            versionNode: process.version
        }, null, 2));
    }

    // Ruta no encontrada
    else {
        res.writeHead(404);
        res.end("<h1>Error 404</h1><p>La ruta solicitada no existe.</p>");
    }
});

// Iniciamos el servidor
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`Accede a http://localhost:${PORT}`);
});
import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

// ===========================
//   1. Guardar datos
// ===========================
app.post("/guardar", (req, res) => {
    const data = req.body;

    fs.writeFileSync("datos.json", JSON.stringify(data, null, 4));

    return res.json({
        status: "ok",
        mensaje: "Datos guardados",
        datos: data
    });
});

// ===========================
//   2. Ver datos en la web
// ===========================
app.get("/", (req, res) => {
    let datos = {};

    if (fs.existsSync("datos.json")) {
        const contenido = fs.readFileSync("datos.json", "utf8");
        datos = JSON.parse(contenido);
    }

    res.send(`
        <html>
            <head>
                <meta charset="utf-8">
                <title>Datos Guardados</title>
                <style>
                    body { background:#111; color:#0f0; font-family:monospace; padding:30px; }
                    pre { background:#000; padding:20px; border-radius:10px; border:1px solid #0f0; }
                </style>
            </head>
            <body>
                <h1>📦 Datos Recibidos</h1>
                <pre>${JSON.stringify(datos, null, 4)}</pre>
            </body>
        </html>
    `);
});

// Puerto de Replit
app.listen(3000, () => console.log("API lista en puerto 3000"));

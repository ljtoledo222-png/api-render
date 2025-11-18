import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

// ==========================
//   1. GUARDAR DATOS
// ==========================
app.post("/guardar", (req, res) => {
    const data = req.body;

    // Guardar datos en datos.json
    fs.writeFileSync("datos.json", JSON.stringify(data, null, 2));

    res.json({
        status: "ok",
        mensaje: "Datos guardados correctamente",
        datos: data
    });
});

// ==========================
//   2. MOSTRAR DATOS EN LA WEB
// ==========================
app.get("/", (req, res) => {
    let datos = {};

    try {
        if (fs.existsSync("datos.json")) {
            const contenido = fs.readFileSync("datos.json", "utf8");
            datos = JSON.parse(contenido);
        }
    } catch (e) {
        datos = { error: "No se pudo leer datos.json" };
    }

    res.send(`
        <html>
            <head>
                <meta charset="utf-8" />
                <title>Datos Recibidos</title>
                <style>
                    body { 
                        background: #111; 
                        color: #0f0; 
                        font-family: monospace; 
                        padding: 20px; 
                    }
                    pre { 
                        background: #000; 
                        padding: 20px; 
                        border-radius: 10px;
                        border: 1px solid #0f0;
                    }
                </style>
            </head>
            <body>
                <h1>📦 Datos recibidos</h1>
                <pre>${JSON.stringify(datos, null, 4)}</pre>
            </body>
        </html>
    `);
});

// Render usa PORT dinámico
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API lista en puerto " + port));

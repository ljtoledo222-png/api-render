import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

// Endpoint para guardar datos
app.post("/guardar", (req, res) => {
    const data = req.body;

    // Guardar datos en archivo
    fs.writeFileSync("datos.json", JSON.stringify(data, null, 2));

    res.json({
        status: "ok",
        mensaje: "Datos guardados correctamente",
        datos: data
    });
});

// Render usa la variable de entorno PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("API corriendo en el puerto " + port);
});

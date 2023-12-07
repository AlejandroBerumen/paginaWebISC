const express = require("express");
const multer = require('multer');
const cors = require('cors');
const fs = require('fs').promises;

const config = require("./config/config");
const authRouter = require("./routes/authRoutes");
const publicacionRouter = require("./routes/publicacionRoutes");
const proyectoRouter = require("./routes/proyectoRoutes");
const adminRouter = require("./routes/adminRoutes");
const solicitudRouter = require("./routes/solicitudRoutes");
const imagenGaleriaRouter = require("./routes/imagenGaleriaRoutes");
const documentoRouter = require("./routes/documentoRoutes");

const app = express();
const port = config.port;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// ------------------------middlewares-------------------------
app.use(cors())
app.use(express.json());
app.use(upload.any());
// ------------------------------------------------------------

// --------------------------routers---------------------------
authRouter(app);
adminRouter(app);
publicacionRouter(app);
proyectoRouter(app);
solicitudRouter(app);
imagenGaleriaRouter(app);
documentoRouter(app);
// ------------------------------------------------------------

app.listen(port, async ()=>{

    // rutas
    const paths = [
        config.filepath,
        config.imagerootpath,
        config.imagegallerypath,
        config.imagepublicationpath,
    ];

    for(const path of paths){
        try {
            await fs.access(path); // Verificando si la carpeta existe
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(path); // Si la carpeta no existe, la creamos
            }
        }
    }

    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});
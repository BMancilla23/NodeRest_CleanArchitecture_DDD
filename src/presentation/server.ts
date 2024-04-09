import express, { Router } from 'express';  // Importa el framework Express para manejar las solicitudes HTTP
import path from 'path';  // Importa el módulo 'path' para trabajar con rutas de archivos y directorios
import { AppRoutes } from './routes';

// Define una interfaz para las opciones del servidor
interface Options {
    port: number;  // Puerto en el que el servidor escuchará las solicitudes
    routes: Router;
    public_path?: string;  // Ruta opcional del directorio público (por defecto es 'public')
}

// Define una clase para el servidor
export class Server {
    private app = express();  // Crea una instancia de Express
    private readonly port: number;  // Puerto del servidor
    private readonly publicPath: string;  // Ruta del directorio público
    private readonly routes: Router;

    // Constructor que toma las opciones del servidor
    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;  // Obtiene el puerto y la ruta pública de las opciones
        this.port = port;  // Asigna el puerto
        this.publicPath = public_path;  // Asigna la ruta pública
        this.routes = routes;
    }

    // Método para iniciar el servidor
    async start() {

        // Middleware
        this.app.use(express.json()); // Raw
        this.app.use(express.urlencoded({extended: true})) // x-www-form-urlencoded

        //* Public Folder
        this.app.use(express.static(this.publicPath));  // Define el directorio público para servir archivos estáticos

        // Routes
        this.app.use(this.routes)

        // Manejador de ruta para cualquier solicitud, sirve el archivo index.html
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);  // Construye la ruta del archivo index.html
            res.sendFile(indexPath);  // Envía el archivo index.html como respuesta a la solicitud
        });

        // Inicia el servidor escuchando en el puerto especificado
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);  // Muestra un mensaje de registro cuando el servidor se inicia correctamente
        });
    }
}

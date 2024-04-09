import { envs } from "./config/envs";  // Importa el objeto envs que contiene las variables de entorno configuradas
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";  // Importa la clase Server del módulo presentation/server

// Función autoinvocada asíncrona que llama a la función main
(async () => {
    main();  // Llama a la función main para iniciar el servidor
})();

// Función principal que inicia el servidor
function main() {
    // Crea una instancia del servidor utilizando las variables de entorno configuradas
    const server = new Server({
        port: envs.PORT,  // Utiliza el puerto definido en las variables de entorno
        public_path: envs.PUBLIC_PATH,  // Utiliza la ruta del directorio público definida en las variables de entorno
        routes: AppRoutes.routes
    });

    server.start();  // Inicia el servidor
}

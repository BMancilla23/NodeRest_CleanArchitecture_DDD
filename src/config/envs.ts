import 'dotenv/config';  // Importa y carga las variables de entorno desde el archivo .env

import { get } from 'env-var';  // Importa la función get de la librería env-var para acceder a las variables de entorno

// Define un objeto envs que contiene las variables de entorno y sus valores por defecto
export const envs = {
    PORT: get('PORT').required().asPortNumber(),  // Obtiene la variable de entorno PORT como un número de puerto y la marca como requerida
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString()  // Obtiene la variable de entorno PUBLIC_PATH como una cadena y la establece como 'public' si no está definida
}

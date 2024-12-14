## 1-iniciar el paquete json

npm init -y

## 2-instalar express

npm i express

## 3-instalar cors

npm i cors
\*Habilitar CORS
const cors = require('cors');

\*Usar CORS
app.use(cors());

## 4-instalar nodemon

npm i -D nodemon

habilitar en package.json:
"dev":"nodemon server.js",
ejecutar: npm run dev

## 5-instalar postgress

npm i pg

## Otros ajustes

app.use(express.json());

## Variables de entorno

npm i dotenv
luego crear carpeta en la raiz .env
require("dotenv/config");

export const pool = new Pool({
user: process.env.PGUSER,
host: process.env.PGHOST,
database: process.env.PGDATABASE,
password: process.env.PGPASSWORD,
port: process.env.PGPORT,
allowExitOnIdle: true,
});

## para modular y separar las responsabilidades del controller

const api=express.Router();

## instalar pg-format

npm i pg-format

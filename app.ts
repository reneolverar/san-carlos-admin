import express, { Express } from "express"
import swagger from "./swagger"
import {
	negociosRoute,
	empleadosRoute,
	articulosRoute,
	transaccionesRoute,
	unidadesRoute,
	tiposRoute,
	tiendasRoute,
	marcasRoute,
} from "./routes"
import cors from "cors"
import path from "path"

// Create an Express app
const app: Express = express()

// Parse JSON bodies
app.use(express.json())

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// // Enable CORS
// const corsOptions = {
// 	origin: "http://localhost:5173", //(https://your-client-app.com)
// 	optionsSuccessStatus: 200,
// 	exposedHeaders: ['X-Total-Count']
// }
// app.use(cors(corsOptions))

// Use the routes
app.use("/api/negocios", negociosRoute)
app.use("/api/empleados", empleadosRoute)
app.use("/api/articulos", articulosRoute)
app.use("/api/transacciones", transaccionesRoute)
app.use("/api/unidades", unidadesRoute)
app.use("/api/tipos", tiposRoute)
app.use("/api/tiendas", tiendasRoute)
app.use("/api/marcas", marcasRoute)

// Use the Swagger documentation
swagger(app)

// Serve static files from the React frontend app in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

export default app

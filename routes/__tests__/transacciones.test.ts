import mongoose from "mongoose"
import "dotenv/config"
import {
	MONGO_DB,
	deleteTest,
	getAllTest,
	getByIdTest,
	patchTest,
	postTest,
} from "../../utils/testUtils"
import TransaccionModel from "../../models/transaccion"

// Variables
const Model = TransaccionModel
const routeName = "transacciones"
const testValue = {
	fecha: "2024-05-31T11:58:46.039Z",
	turno: "T1",
	empleadoId: "666317a2ea2622d927fdf063",
	recibioId: "666317a2ea2622d927fdf063",
	tiendaId: "666316ceea1ad72886adf0af",
	articuloId: "666318ab7c8f1d72f712b81a",
	cantidad: 1,
	precio: 1,
	negocioId: "665ce61aa4a1c677c067567d",
	factura: false,
	venta: false,
}
const newTestValue = {
	fecha: "2024-05-31T11:58:46.039Z",
	turno: "T2",
	empleadoId: "666317a2ea2622d927fdf063",
	recibioId: "666317a2ea2622d927fdf063",
	tiendaId: "666316ceea1ad72886adf0af",
	articuloId: "666318ab7c8f1d72f712b81a",
	cantidad: 2,
	precio: 2,
	negocioId: "665ce61aa4a1c677c0675680",
	factura: false,
	venta: false,
}
let testId = ""

beforeAll(async () => {
	await mongoose.connect(MONGO_DB)
	await Model.deleteMany({})
})

afterAll(async () => {
	await mongoose.disconnect()
})

describe(`Standard CRUD /api/${routeName}`, function () {
	test("GET route", async () => {
		await getAllTest(routeName)
	})

	test("POST route", async () => {
		testId = await postTest(routeName, testValue)
	})

	test("GET by ID route", async () => {
		await getByIdTest(routeName, testId, testValue)
	})

	test("PATCH route", async () => {
		await patchTest(routeName, testId, newTestValue)
	})

	test("DELETE route", async () => {
		await deleteTest(routeName, testId)
	})
})

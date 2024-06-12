import mongoose from "mongoose"
import "dotenv/config"
import request from "supertest"
import {
	MONGO_DB,
	deleteTest,
	getAllTest,
	getByIdTest,
	patchTest,
	postTest,
} from "../../utils/testUtils"
import ArticuloModel, { articuloExample } from "../../models/articulo"
import TransaccionModel, { transaccionExample } from "../../models/transaccion"
import app from "../../app"

// Variables
const Model = ArticuloModel
const routeName = "articulos"
const testValue = {
	tipoId: "6663170263d09d1f4e7c6bd4",
	marcaId: "6669f0159e99ffd114660bd2",
	nombre: `Test random nombre ${crypto.randomUUID()}`,
	presentacion: `Test random presentacion ${crypto.randomUUID()}`,
	unidadEntradaId: "66631809740fc0fc39f70a56",
	cantidadPorPieza: 1,
	unidadSalidaId: "66631809740fc0fc39f70a56",
	fechaInventarioInicial: "2024-05-31T11:58:46.039Z",
	inventarioInicial: 1,
}
const newTestValue = {
	tipoId: "6663170263d09d1f4e7c6bd4",
	marcaId: "6669f0159e99ffd114660bd2",
	nombre: `Test random nombre ${crypto.randomUUID()}`,
	presentacion: `Test random presentacion ${crypto.randomUUID()}`,
	unidadEntradaId: "66631809740fc0fc39f70a56",
	cantidadPorPieza: 1,
	unidadSalidaId: "66631809740fc0fc39f70a56",
	fechaInventarioInicial: "2024-05-31T11:58:46.039Z",
	inventarioInicial: 1,
}
let testId = ""

beforeAll(async () => {
	await mongoose.connect(MONGO_DB)
	await Model.deleteMany({ nombre: { $regex: /Test random/ } })
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

describe(`Model specific /api/${routeName}`, function () {
	test("Cascade delete", async () => {
		await cascadeDeleteTest()
	})
})

const cascadeDeleteTest = async () => {
	let response
	// InsertMany used to avoid the pre("save") middleware even if it is a single create
	const articulo = await ArticuloModel.insertMany(articuloExample)
	// InsertMany used to avoid the pre("save") middleware even if it is a single create
	const transaccion = await TransaccionModel.insertMany({
		...transaccionExample,
		articuloId: articulo[0]._id,
	})
	// Check if the transaccion was created correctly
	expect(transaccion[0]?.articuloId).toBe(articulo[0]._id)
	// Successful deletion test
	response = await request(app)
		.delete(`/api/articulos/${articulo[0]._id}`)
		.set("Accept", "application/json")
	// Not possible to delete articulos which have transacciones
	expect(response.status).toEqual(500)
}

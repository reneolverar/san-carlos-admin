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
import EmpleadoModel, { empleadoExample } from "../../models/empleado"
import TransaccionModel, { transaccionExample } from "../../models/transaccion"
import app from "../../app"

// Variables
const Model = EmpleadoModel
const routeName = "empleados"
const testValue = {
	nombre: `Test random name ${crypto.randomUUID()}`,
	negocioId: "665ce61aa4a1c677c067567c", // San Carlos example negocio
	posicion: "Test posicion",
	activo: true,
}
const newTestValue = {
	nombre: `Test random name ${crypto.randomUUID()}`,
	negocioId: "665ce61aa4a1c677c067567c", // San Carlos example negocio
	posicion: "Test posicion 2",
	activo: true,
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
	const empleado = await EmpleadoModel.insertMany(empleadoExample)
	// InsertMany used to avoid the pre("save") middleware even if it is a single create
	const transaccion = await TransaccionModel.insertMany({
		...transaccionExample,
		empleadoId: empleado[0]._id,
		recibioId: empleado[0]._id,
	})
	// Check if the transaccion was created correctly
	expect(transaccion[0]?.empleadoId).toBe(empleado[0]._id)
	expect(transaccion[0]?.recibioId).toBe(empleado[0]._id)
	// Successful deletion test
	response = await request(app)
		.delete(`/api/empleados/${empleado[0]._id}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(204)
	const updatedTransaccion = await TransaccionModel.findById(
		transaccion[0]._id
	)
	expect(updatedTransaccion?.empleadoId).toBeUndefined()
	expect(updatedTransaccion?.recibioId).toBeUndefined()
}

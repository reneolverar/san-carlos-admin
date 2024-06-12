import mongoose from "mongoose"
import "dotenv/config"
import request from "supertest"
import {
	MONGO_DB,
	deleteTest,
	getAllTest,
	getByIdTest,
	getByNameTest,
	patchTest,
	postTest,
} from "../../utils/testUtils"
import NegocioModel, { negocioExample } from "../../models/negocio"
import EmpleadoModel, { empleadoExample } from "../../models/empleado"
import app from "../../app"
import TransaccionModel, { transaccionExample } from "../../models/transaccion"

// Variables
const Model = NegocioModel
const routeName = "negocios"
const testValue = { nombre: `Test random name ${crypto.randomUUID()}` }
const newTestValue = { nombre: `Test random name ${crypto.randomUUID()}` }
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
		testId = await postTest(routeName, testValue, {
			testRejectRepeated: true,
		})
	})

	test("GET by name route", async () => {
		await getByNameTest(routeName, testValue)
	})

	test("GET by ID route", async () => {
		await getByIdTest(routeName, testId, testValue)
	})

	test("PATCH route", async () => {
		await patchTest(routeName, testId, newTestValue, {
			testRejectRepeated: true,
		})
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
	const negocio = await NegocioModel.create(negocioExample)
	// InsertMany used to avoid the pre("save") middleware even if it is a single create
	const empleado = await EmpleadoModel.insertMany({
		...empleadoExample,
		negocioId: negocio._id,
	})
	// InsertMany used to avoid the pre("save") middleware even if it is a single create
	const transaccion = await TransaccionModel.insertMany({
		...transaccionExample,
		negocioId: negocio._id,
	})
	// Check if the empleado was created correctly
	expect(empleado[0]?.negocioId).toBe(negocio._id)
	// Check if the transaccion was created correctly
	expect(transaccion[0]?.negocioId).toBe(negocio._id)
	// Successful deletion test
	response = await request(app)
		.delete(`/api/negocios/${negocio._id}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(204)
	const updatedEmpleado = await EmpleadoModel.findById(empleado[0]._id)
	expect(updatedEmpleado?.negocioId).toBeUndefined()
	const updatedTransaccion = await TransaccionModel.findById(transaccion[0]._id)
	expect(updatedTransaccion?.negocioId).toBeUndefined()
}

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
import MarcaModel, { marcaExample } from "../../models/marca"
import ArticuloModel, { articuloExample } from "../../models/articulo"
import app from "../../app"

// Variables
const Model = MarcaModel
const routeName = "marcas"
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
		testId = await postTest(routeName, testValue, { testRejectRepeated: true })
	})

	test("GET by name route", async () => {
		await getByNameTest(routeName, testValue)
	})

	test("GET by ID route", async () => {
		await getByIdTest(routeName, testId, testValue)
	})

	test("PATCH route", async () => {
		await patchTest(routeName, testId, newTestValue, { testRejectRepeated: true })
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
	const marca = await MarcaModel.create(marcaExample)
	// InsertMany used to avoid the pre("save") middleware even if it is a single create
	const articulo = await ArticuloModel.insertMany({
		...articuloExample,
		marcaId: marca._id,
	})
	// Check if the articulo was created correctly
	expect(articulo[0]?.marcaId).toBe(marca._id)
	// Successful deletion test
	response = await request(app)
		.delete(`/api/marcas/${marca._id}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(204)
	const updatedArticulo = await ArticuloModel.findById(articulo[0]._id)
	expect(updatedArticulo?.marcaId).toBeUndefined()
}
import request from "supertest"
import app from "../app"
import { ObjectId } from "mongodb"

export const MONGO_DB = process.env.ATLAS_URI || ""

const fakeId = new ObjectId()
const wrongId = "abcdef"
const fakeName = "Fake name"
const emptyString = "   "

export const getAllTest = async (route: string) => {
	// Successful get all test
	const response = await request(app)
		.get(`/api/${route}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(200)
	expect(response.type).toEqual("application/json")
	expect(response.body).toBeInstanceOf(Array)
}

export const getByIdTest = async (
	route: string,
	testId: string,
	testValue: any
) => {
	let response
	// Wrong Id test
	response = await request(app)
		.get(`/api/${route}/${wrongId}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(400)

	// Fake Id test
	response = await request(app)
		.get(`/api/${route}/${fakeId}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(404)

	// Successful get by Id test
	response = await request(app)
		.get(`/api/${route}/${testId}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(200)
	expect(response.type).toEqual("application/json")
	expect(response.body.nombre).toEqual(testValue.nombre)
}

export const getByNameTest = async (route: string, testValue: any) => {
	let response
	// Empty string test
	response = await request(app)
		.get(`/api/${route}/nombre/${emptyString}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(400)

	// Fake name test
	response = await request(app)
		.get(`/api/${route}/nombre/${fakeName}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(404)

	// Successful get by name test
	response = await request(app)
		.get(`/api/${route}/nombre/${testValue.nombre}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(200)
	expect(response.type).toEqual("application/json")
	expect(response.body.nombre).toEqual(testValue.nombre)
	return response.body.id
}

export const postTest = async (
	route: string,
	testValue: any,
	options?: any
) => {
	let response
	let newElementId
	// Wrong property test
	response = await request(app)
		.post(`/api/${route}`)
		.send({ fakeProperty: fakeName })
		.set("Accept", "application/json")
	expect(response.status).toEqual(400)

	// Successful post test
	response = await request(app)
		.post(`/api/${route}`)
		.send(testValue)
		.set("Accept", "application/json")
	expect(response.status).toEqual(201)
	expect(response.type).toEqual("application/json")
	expect(response.body.nombre).toEqual(testValue.nombre)
	newElementId = response.body.id

	// Repeated post rejection test
	if (options?.testRejectRepeated) {
		response = await request(app)
			.post(`/api/${route}`)
			.send(testValue)
			.set("Accept", "application/json")
		expect(response.status).toEqual(400)
	}

	return newElementId
}

export const patchTest = async (
	route: string,
	testId: string,
	newTestValue: any,
	options?: any
) => {
	let response
	// Wrong Id test
	response = await request(app)
		.patch(`/api/${route}/${wrongId}`)
		.send(newTestValue)
		.set("Accept", "application/json")
	expect(response.status).toEqual(400)

	// Fake Id test
	response = await request(app)
		.patch(`/api/${route}/${fakeId}`)
		.send(newTestValue)
		.set("Accept", "application/json")
	expect(response.status).toEqual(404)

	// Wrong property test
	response = await request(app)
		.patch(`/api/${route}/${testId}`)
		.send({ fakeProperty: fakeName })
		.set("Accept", "application/json")
	expect(response.status).toEqual(400)

	// Successful update test
	response = await request(app)
		.patch(`/api/${route}/${testId}`)
		.send(newTestValue)
		.set("Accept", "application/json")
	expect(response.status).toEqual(201)
	expect(response.type).toEqual("application/json")
	expect(response.body.nombre).toEqual(newTestValue.nombre)

	// Repeated post rejection test
	if (options?.testRejectRepeated) {
		response = await request(app)
			.post(`/api/${route}`)
			.send(newTestValue)
			.set("Accept", "application/json")
		expect(response.status).toEqual(400)
	}
}

export const deleteTest = async (route: string, testId: string) => {
	let response
	// Wrong Id test
	response = await request(app)
		.delete(`/api/${route}/${wrongId}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(400)

	// Fake Id test
	response = await request(app)
		.delete(`/api/${route}/${fakeId}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(404)

	// Successful deletion test
	response = await request(app)
		.delete(`/api/${route}/${testId}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(204)

	// Failed repeated deletion test
	response = await request(app)
		.delete(`/api/${route}/${testId}`)
		.set("Accept", "application/json")
	expect(response.status).toEqual(404)
}

import { body, param } from "express-validator"
import { Response } from "express"
import mongoose from "mongoose"

export const hasObjectIdParam = () =>
	param("id").isMongoId().withMessage("Invalid Id")

export const hasParam = (name: string) =>
	param(name).trim().notEmpty().escape().withMessage(`${name} is required`)

export const hasStringProperty = (name: string) =>
	body(name).trim().notEmpty().escape().withMessage(`${name} is required`)

export const hasStringProperties = (names: string[]) =>
	names.map((name) => hasStringProperty(name))

export const hasBooleanProperty = (name: string) =>
	body(name).isBoolean().withMessage(`${name} must be a boolean`)

export const hasBooleanProperties = (names: string[]) =>
	names.map((name) => hasBooleanProperty(name))

export const hasObjectIdProperty = (name: string) =>
	body(name).isMongoId().withMessage(`${name} is invalid ObjectId`)

export const hasObjectIdProperties = (names: string[]) =>
	names.map((name) => hasObjectIdProperty(name))

export const hasNumberProperty = (name: string) =>
	body(name).isNumeric().withMessage(`${name} must be a number`)

export const hasNumberProperties = (names: string[]) =>
	names.map((name) => hasNumberProperty(name))

export const isValidModel = (Model: mongoose.Model<any>) => {
	return body().custom(async (body) => {
		try {
			await Model.validate(body)
		} catch (err: any) {
			throw new Error(err.message)
		}
	})
}

import { validationResult } from "express-validator"
import { Request, Response } from "express"
import mongoose from "mongoose"

export const createGetRoute = (Model: mongoose.Model<any>) => {
	return async (request: Request, response: Response) => {
		try {
			let data = await Model.find({})
			data = transform_idToId(data)
			const totalCount = await Model.countDocuments()
			response.set("X-Total-Count", String(totalCount))
			response.send(data)
		} catch (error) {
			response.status(500).send({ error })
		}
	}
}

export const createGetByIdRoute = (Model: mongoose.Model<any>) => {
	return async (request: Request, response: Response) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() })
		}
		try {
			let data = await Model.findOne({
				_id: request.params.id,
			})
			if (!data) {
				return response.status(404).send("Object doesn´t exist")
			}
			data = transform_idToId(data)
			response.send(data)
		} catch (error) {
			response.status(500).send({ error })
		}
	}
}

export const createGetByNameRoute = (Model: mongoose.Model<any>) => {
	return async (request: Request, response: Response) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() })
		}
		try {
			let data = await Model.findOne({
				nombre: request.params.nombre,
			})
			if (!data) {
				return response.status(404).send("Object doesn´t exist")
			}
			data = transform_idToId(data)
			response.send(data)
		} catch (error) {
			response.status(500).send({ error })
		}
	}
}

export const createPostRoute = (Model: mongoose.Model<any>) => {
	return async (request: Request, response: Response) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() })
		}
		let data = new Model(request.body)
		try {
			await data.save()
			data = transform_idToId(data)
			response.status(201).send(data)
		} catch (error: any) {
			if (error.name === "MongoServerError" && error.code === 11000) {
				return response.status(400).send("Value must be unique")
			}
			response.status(500).send(error)
		}
	}
}

export const createPatchRoute = (Model: mongoose.Model<any>) => {
	return async (request: Request, response: Response) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() })
		}
		try {
			let data = await Model.findByIdAndUpdate(
				request.params.id,
				request.body,
				{
					new: true,
				}
			)
			if (!data) {
				return response.status(404).send("Object doesn´t exist")
			}
			await data.save()
			data = transform_idToId(data)
			response.status(201).send(data)
		} catch (error: any) {
			if (error.name === "MongoServerError" && error.code === 11000) {
				return response.status(400).send("Value must be unique")
			}
			response.status(500).send({ error })
		}
	}
}

export const createDeleteRoute = (Model: mongoose.Model<any>) => {
	return async (request: Request, response: Response) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() })
		}
		try {
			let data = await Model.findByIdAndDelete(request.params.id, {
				runValidators: true,
			})
			if (!data) {
				return response.status(404).send("Object doesn´t exist")
			}
			data = transform_idToId(data)
			response.status(204).send()
		} catch (error) {
			response.status(500).send({ error })
		}
	}
}

const transform_idToId = (data: any) => {
	if (Array.isArray(data)) {
		return data.map((doc: any) => {
			const object = doc.toObject()
			object.id = object._id
			delete object._id
			return object
		})
	} else {
		const object = data.toObject()
		object.id = object._id
		delete object._id
		return object
	}
}

import { ObjectId } from "mongodb"
import mongoose from "mongoose"

// // Example of validation inside of Schema
// export const validateDocumentExists = (model: string) => {
// 	return {
// 		validator: async (v: any) => await mongoose.model(model).findById(v),
// 		message: (props: any) => `The referenced ${model} doesn't exist`,
// 	}
// }

export const validateDocumentExistsById = async (
	modelName: string,
	id: ObjectId
) => {
	const value = await mongoose.model(modelName).findById(id)
	if (!value) {
		throw new Error(`Referenced ${modelName} does not exist`)
	}
}

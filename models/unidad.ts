import mongoose from "mongoose"
import ArticuloModel from "./articulo"

export const unidadExample = {
	nombre: `Test random name ${crypto.randomUUID()}`,
}

const UnidadSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
		collection: "unidades",
	}
)

UnidadSchema.pre(
	"findOneAndDelete",
	{ query: true },
	async function (next: Function) {
		const query = this.getQuery()
		try {
			await ArticuloModel.updateMany(
				{ unidadEntradaId: query._id },
				{ $unset: { unidadEntradaId: "" } }
			)
			await ArticuloModel.updateMany(
				{ unidadSalidaId: query._id },
				{ $unset: { unidadSalidaId: "" } }
			)
		} catch (error) {
			next(error)
		}
		next()
	}
)

const UnidadModel = mongoose.model("Unidad", UnidadSchema)
export default UnidadModel

import mongoose from "mongoose"
import ArticuloModel from "./articulo"

export const marcaExample = {
	nombre: `Test random name ${crypto.randomUUID()}`,
}

const MarcaSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
)

MarcaSchema.pre(
	"findOneAndDelete",
	{ query: true },
	async function (next: Function) {
		const query = this.getQuery()
		try {
			await ArticuloModel.updateMany(
				{ marcaId: query._id },
				{ $unset: { marcaId: "" } }
			)
		} catch (error) {
			next(error)
		}
		next()
	}
)

const MarcaModel = mongoose.model("Marca", MarcaSchema)
export default MarcaModel

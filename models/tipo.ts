import mongoose from "mongoose"
import ArticuloModel from "./articulo"

export const tipoExample = {
	nombre: `Test random name ${crypto.randomUUID()}`,
}

const TipoSchema = new mongoose.Schema(
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

TipoSchema.pre(
	"findOneAndDelete",
	{ query: true },
	async function (next: Function) {
		const query = this.getQuery()
		try {
			await ArticuloModel.updateMany(
				{ tipoId: query._id },
				{ $unset: { tipoId: "" } }
			)
		} catch (error) {
			next(error)
		}
		next()
	}
)

const TipoModel = mongoose.model("Tipo", TipoSchema)
export default TipoModel

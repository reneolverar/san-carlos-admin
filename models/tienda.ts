import mongoose from "mongoose"
import TransaccionModel from "./transaccion"

export const tiendaExample = {
	nombre: `Test random name ${crypto.randomUUID()}`,
}

const TiendaSchema = new mongoose.Schema(
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

TiendaSchema.pre(
	"findOneAndDelete",
	{ query: true },
	async function (next: Function) {
		const query = this.getQuery()
		try {
			await TransaccionModel.updateMany(
				{ tiendaId: query._id },
				{ $unset: { tiendaId: "" } }
			)
		} catch (error) {
			next(error)
		}
		next()
	}
)

const TiendaModel = mongoose.model("Tienda", TiendaSchema)
export default TiendaModel

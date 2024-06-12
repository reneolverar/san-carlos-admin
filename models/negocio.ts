import mongoose from "mongoose"
import EmpleadoModel from "./empleado"
import TransaccionModel from "./transaccion"

export const negocioExample = {
	nombre: `Test random name ${crypto.randomUUID()}`,
}

const NegocioSchema = new mongoose.Schema(
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

NegocioSchema.pre(
	"findOneAndDelete",
	{ query: true },
	async function (next: Function) {
		const query = this.getQuery()
		try {
			await EmpleadoModel.updateMany(
				{ negocioId: query._id },
				{ $unset: { negocioId: "" } }
			)
			await TransaccionModel.updateMany(
				{ negocioId: query._id },
				{ $unset: { negocioId: "" } }
			)
		} catch (error) {
			next(error)
		}
		next()
	}
)

const NegocioModel = mongoose.model("Negocio", NegocioSchema)
export default NegocioModel

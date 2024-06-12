import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import NegocioModel from "./negocio"
import TransaccionModel from "./transaccion"

export const empleadoExample = {
	nombre: `Test random nombre ${crypto.randomUUID()}`,
	negocioId: new ObjectId(),
	activo: true,
	posicion: "Posicion 1",
}

const EmpleadoSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		negocioId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Negocio",
			required: true,
		},
		activo: {
			type: Boolean,
			default: true,
		},
		posicion: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

// Pre-save hook to validate referenced document
EmpleadoSchema.pre(
	"save",
	{ document: true },
	async function (this, next: Function) {
		const empleado = this
		try {
			const negocioExists = await NegocioModel.findById(
				empleado.negocioId
			)
			if (!negocioExists) {
				throw new Error("Referenced Negocio does not exist")
			}
			next()
		} catch (error) {
			next(error)
		}
	}
)

EmpleadoSchema.pre(
	"findOneAndDelete",
	{ query: true },
	async function (next: Function) {
		const query = this.getQuery()
		try {
			await TransaccionModel.updateMany(
				{ empleadoId: query._id },
				{ $unset: { empleadoId: "" } }
			)
			await TransaccionModel.updateMany(
				{ recibioId: query._id },
				{ $unset: { recibioId: "" } }
			)
		} catch (error) {
			next(error)
		}
		next()
	}
)

const EmpleadoModel = mongoose.model("Empleado", EmpleadoSchema)
export default EmpleadoModel

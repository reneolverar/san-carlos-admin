import mongoose from "mongoose"
import { validateDocumentExistsById } from "../utils/modelUtils"
import { ObjectId } from "mongodb"

export const transaccionExample = {
	fecha: new Date(),
	turno: "T1",
	empleadoId: new ObjectId(),
	recibioId: new ObjectId(),
	tiendaId: new ObjectId(),
	articuloId: new ObjectId(),
	cantidad: 1,
	precio: 1,
	negocioId: new ObjectId(),
	factura: false,
	venta: false,
}

const TransaccionSchema = new mongoose.Schema(
	{
		fecha: {
			type: Date,
			required: true,
		},
		turno: {
			type: String,
			enum: ["T1", "T2", "T3"],
			required: true,
		},
		empleadoId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Empleado",
			required: true,
		},
		recibioId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Empleado",
			required: true,
		},
		tiendaId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tienda",
			required: true,
		},
		articuloId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Articulo",
			required: true,
		},
		cantidad: {
			type: Number,
			required: true,
		},
		precio: {
			type: Number,
			required: true,
		},
		negocioId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Negocio",
			required: true,
		},
		factura: {
			type: Boolean,
			required: true,
			default: false,
		},
		venta: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
		collection: "transacciones",
	}
)

// Pre-save hook to validate referenced documents
TransaccionSchema.pre(
	"save",
	{ document: true },
	async function (this, next: Function) {
		const transaccion = this
		try {
			await validateDocumentExistsById("Empleado", transaccion.empleadoId)
			await validateDocumentExistsById("Empleado", transaccion.recibioId)
			await validateDocumentExistsById("Tienda", transaccion.tiendaId)
			await validateDocumentExistsById("Articulo", transaccion.articuloId)
			await validateDocumentExistsById("Negocio", transaccion.negocioId)
			next()
		} catch (error) {
			next(error)
		}
	}
)

const TransaccionModel = mongoose.model("Transaccion", TransaccionSchema)
export default TransaccionModel

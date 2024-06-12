import mongoose from "mongoose"
import TransaccionModel from "./transaccion"
import { validateDocumentExistsById } from "../utils/modelUtils"
import { ObjectId } from "mongodb"

export const articuloExample = {
	tipoId: new ObjectId(),
	marcaId: new ObjectId(),
	nombre: `Test random nombre ${crypto.randomUUID()}`,
	presentacion: `Test random presentacion ${crypto.randomUUID()}`,
	unidadEntradaId: new ObjectId(),
	cantidadPorPieza: 1,
	unidadSalidaId: new ObjectId(),
	fechaInventarioInicial: new Date(),
	inventarioInicial: 1,
}

const ArticuloSchema = new mongoose.Schema(
	{
		tipoId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tipo",
			required: true,
		},
		marcaId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Marca",
			required: true,
		},
		nombre: {
			type: String,
			required: true,
		},
		presentacion: {
			type: String,
			required: true,
		},
		unidadEntradaId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Unidad",
			required: true,
		},
		cantidadPorPieza: {
			type: Number,
			required: true,
		},
		unidadSalidaId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Unidad",
			required: true,
		},
		fechaInventarioInicial: {
			type: Date,
		},
		inventarioInicial: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
)

// Pre-save hook to validate referenced documents
ArticuloSchema.pre(
	"save",
	{ document: true },
	async function (this, next: Function) {
		const articulo = this
		try {
			await validateDocumentExistsById("Tipo", articulo.tipoId)
			await validateDocumentExistsById("Marca", articulo.marcaId)
			await validateDocumentExistsById("Unidad", articulo.unidadEntradaId)
			await validateDocumentExistsById("Unidad", articulo.unidadSalidaId)
			next()
		} catch (error) {
			next(error)
		}
	}
)

ArticuloSchema.pre(
	"findOneAndDelete",
	{ query: true },
	async function (next: Function) {
		const query = this.getQuery()
		const countOfTransacciones = await TransaccionModel.countDocuments({
			articuloId: query._id,
		})
		if (countOfTransacciones > 0) {
			const error = new Error(
				`No es posible borrar un articulo con # de transacciones: ${countOfTransacciones}`
			)
			next(error)
		}
		try {
			await TransaccionModel.updateMany(
				{ articuloId: query._id },
				{ $unset: { articuloId: "" } }
			)
		} catch (error) {
			next(error)
		}
		next()
	}
)

const ArticuloModel = mongoose.model("Articulo", ArticuloSchema)
export default ArticuloModel

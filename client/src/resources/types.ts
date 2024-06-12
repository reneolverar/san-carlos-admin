export interface Empleado {
	id: string
	nombre: string
	negocioId: string
	posicion: string
	activo: boolean
}
export interface Articulo {
	id: string
	tipoId: string
	marcaId: string
	nombre: string
	presentacion: string
	unidadEntradaId: string
	cantidadPorPieza: number
	unidadSalidaId: string
	fechaInventarioInicial: Date
	inventarioInicial: number
}
export interface Transaccion {
	id: string
	fecha: Date
	turno: string
	empleadoId: number
	tiendaId: string
	articuloId: number
	cantidad: number
	precio: number
	recibioId: number
	negocioId: string
	factura: boolean
	venta: boolean
}
export interface Negocio {
	id: string
	nombre: string
}
export interface Unidades {
	id: string
	nombre: string
}
export interface Tipos {
	id: string
	nombre: string
}
export interface Tiendas {
	id: string
	nombre: string
}
export interface Marcas {
	id: string
	nombre: string
}

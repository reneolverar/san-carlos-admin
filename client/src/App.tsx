import {
	Admin,
	EditGuesser,
	ListGuesser,
	Resource,
	ShowGuesser,
} from "react-admin"
import { dataProvider } from "./dataProvider"
import { i18nProvider } from "./i18n/i18nProvider"
import negocioResource from "./resources/negocio"
import empleadoResource from "./resources/empleado"
import articuloResource from "./resources/articulos"
import transaccionResource from "./resources/transaccion"
import { EnumCreate } from "./resources/shared"
import {
	Business,
	Store,
	People,
	ShoppingCart,
	Receipt,
	Straighten,
	Category,
} from "@mui/icons-material"
import { Dashboard } from "./components/Dashboard"

const enumResource = {
	list: ListGuesser,
	edit: EditGuesser,
	show: ShowGuesser,
	create: EnumCreate,
}

export const App = () => (
	<Admin
		dataProvider={dataProvider}
		dashboard={Dashboard}
		i18nProvider={i18nProvider}
	>
		<Resource
			name="negocios"
			{...negocioResource}
			recordRepresentation="nombre"
			icon={Business}
		/>
		<Resource
			name="empleados"
			{...empleadoResource}
			recordRepresentation="nombre"
			icon={People}
		/>
		<Resource
			name="articulos"
			{...articuloResource}
			recordRepresentation="nombre"
			icon={ShoppingCart}
		/>
		<Resource
			name="transacciones"
			{...transaccionResource}
			icon={Receipt}
		/>
		<Resource
			name="unidades"
			{...enumResource}
			recordRepresentation="id"
			icon={Straighten}
		/>
		<Resource name="tipos" {...enumResource} recordRepresentation="id" />
		<Resource
			name="tiendas"
			{...enumResource}
			recordRepresentation="id"
			icon={Store}
		/>
		<Resource
			name="marcas"
			{...enumResource}
			recordRepresentation="id"
			icon={Category}
		/>
	</Admin>
)

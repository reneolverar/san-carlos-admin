import {
	List,
	Datagrid,
	TextField,
	EditButton,
	Edit,
	SimpleForm,
	TextInput,
	Create,
	NumberField,
	NumberInput,
	ReferenceInput,
	DateInput,
	DateField,
	Show,
	SimpleShowLayout,
} from "react-admin"
import { Stack } from "@mui/material"

const articuloFilters = [
	<TextInput key="search" source="q" label="Search" alwaysOn />,
]

export const ArticuloList = () => (
	<>
		<List filters={articuloFilters}>
			<Datagrid rowClick="show">
				{articuloFields}
				<EditButton />
			</Datagrid>
		</List>
	</>
)

export const ArticuloShow = () => (
	<Show>
		<SimpleShowLayout>{articuloFields}</SimpleShowLayout>
	</Show>
)

export const ArticuloEdit = () => (
	<Edit>
		<SimpleForm>
			<NumberInput source="id" InputProps={{ disabled: true }} />
			<ArticuloInputs />
		</SimpleForm>
	</Edit>
)

export const ArticuloCreate = () => (
	<Create>
		<SimpleForm>
			<NumberInput source="id" />
			<ArticuloInputs />
		</SimpleForm>
	</Create>
)

const articuloFields = [
	<NumberField key={"id"} source="id" />,
	<TextField key={"tipo"} source="tipo" />,
	<TextField key={"tienda"} source="tienda" />,
	<TextField key={"marca"} source="marca" />,
	<TextField key={"nombre"} source="nombre" />,
	<TextField key={"presentacion"} source="presentacion" />,
	<TextField key={"unidadEntrada"} source="unidadEntrada" />,
	<NumberField key={"cantidadPorPieza"} source="cantidadPorPieza" />,
	<TextField key={"unidadSalida"} source="unidadSalida" />,
	<DateField
		key={"fechaInventarioInicial"}
		source="fechaInventarioInicial"
	/>,
	<NumberField key={"inventarioInicial"} source="inventarioInicial" />,
]

const ArticuloInputs = () => (
	<>
		<Stack direction="row" spacing={2}>
			<ReferenceInput source="tipo" reference="tipos" />
			<ReferenceInput source="tienda" reference="tiendas" />
			<ReferenceInput source="marca" reference="marcas" />
			<TextInput source="nombre" />
			<TextInput source="presentacion" />
		</Stack>
		<ReferenceInput source="unidadEntrada" reference="unidades" />
		<NumberInput source="cantidadPorPieza" />
		<ReferenceInput source="unidadSalida" reference="unidades" />
		<DateInput
			source="fechaInventarioInicial"
			parse={(val) => new Date(val)}
		/>
		<NumberInput source="inventarioInicial" />
	</>
)

export default {
	list: ArticuloList,
	edit: ArticuloEdit,
	create: ArticuloCreate,
	show: ArticuloShow,
}
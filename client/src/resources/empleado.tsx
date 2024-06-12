import {
	List,
	Datagrid,
	TextField,
	EditButton,
	Edit,
	SimpleForm,
	TextInput,
	Create,
	BooleanField,
	BooleanInput,
	NumberInput,
	NumberField,
	Show,
	SimpleShowLayout,
} from "react-admin"

const empleadoFilters = [
	<TextInput key="search" source="q" label="Search" alwaysOn />,
]

export const EmpleadoList = () => (
	<List filters={empleadoFilters}>
		<Datagrid rowClick="show">
			{empleadoFields}
			<EditButton />
		</Datagrid>
	</List>
)

export const EmpleadoShow = () => (
	<Show>
		<SimpleShowLayout>{empleadoFields}</SimpleShowLayout>
	</Show>
)

export const EmpleadoEdit = () => (
	<Edit>
		<SimpleForm>
			<NumberInput source="id" InputProps={{ disabled: true }} />
			<EmpleadoInputs />
		</SimpleForm>
	</Edit>
)

export const EmpleadoCreate = () => (
	<Create>
		<SimpleForm>
			<NumberInput source="id" />
			<EmpleadoInputs />
		</SimpleForm>
	</Create>
)

const empleadoFields = [
	<NumberField key={"id"} source="id" />,
	<TextField key={"nombre"} source="nombre" />,
	<TextField key={"negocio"} source="negocio" />,
	<BooleanField key={"activo"} source="activo" />,
]

const EmpleadoInputs = () => (
	<>
		<TextInput source="nombre" />
		<TextInput source="negocio" />
		<BooleanInput source="activo" />
	</>
)

export default {
	list: EmpleadoList,
	show: EmpleadoShow,
	edit: EmpleadoEdit,
	create: EmpleadoCreate,
}
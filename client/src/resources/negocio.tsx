import {
	List,
	Datagrid,
	TextField,
	EditButton,
	Edit,
	SimpleForm,
	TextInput,
	Create,
	useRecordContext,
	Show,
	ReferenceManyField,
	SimpleShowLayout,
	useListContext,
	BulkDeleteButton,
	WrapperField,
	NumberInput,
} from "react-admin"
import { TransaccionesByTarget } from "./shared"
import { Negocio } from "./types"

const negocioFilters = [
	<TextInput key="search" source="q" label="Search" alwaysOn />,
]

export const NegocioList = () => (
	<List filters={negocioFilters} perPage={25}>
		<Datagrid
			rowClick="show"
			// expand={<TransaccionesByTarget target="negocioId" />}
			// bulkActionButtons={<BulkDeleteButton mutationMode="pessimistic" />}
		>
			{negocioFields}
			{/* <WrapperField label="Actions"> */}
			<EditButton />
			{/* </WrapperField> */}
		</Datagrid>
	</List>
)

export const NegocioShow = () => (
	<Show>
		<SimpleShowLayout>
			{negocioFields}
			{/* <TransaccionesByTarget target="negocioId" /> */}
		</SimpleShowLayout>
	</Show>
)

export const NegocioEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="id" InputProps={{ disabled: true }} />
			<NegocioInputs />
		</SimpleForm>
	</Edit>
)

export const NegocioCreate = () => (
	<Create>
		<SimpleForm>
			<NumberInput source="id" />
			<NegocioInputs />
		</SimpleForm>
	</Create>
)

const NbMovsField = () => {
	const { data } = useListContext()
	return <>{data?.length}</>
}

const negocioFields = [
	<TextField key={"id"} source="id" />,
	<TextField key={"nombre"} source="nombre" />,
	<ReferenceManyField
		key={"transacciones"}
		reference="transacciones"
		target="negocioId"
		label="Transacciones"
	>
		<NbMovsField />
	</ReferenceManyField>,
]

const NegocioInputs = () => (
	<>
		<TextInput source="nombre" />
	</>
)

export default {
	list: NegocioList,
	show: NegocioShow,
	edit: NegocioEdit,
	create: NegocioCreate,
}

import {
	List,
	TextField,
	EditButton,
	Edit,
	SimpleForm,
	TextInput,
	Create,
	useRecordContext,
	NumberField,
	DateField,
	BooleanField,
	ReferenceField,
	ReferenceInput,
	DateInput,
	NumberInput,
	BooleanInput,
	TopToolbar,
	CreateButton,
	ExportButton,
	SelectColumnsButton,
	DatagridConfigurable,
	AutocompleteInput,
	Show,
} from "react-admin"
import { Articulo } from "./types"
import { CostoField, CurrencyField } from "./shared"
import { Stack } from "@mui/material"

const transaccionFilters = [
	<TextInput key="search" source="q" label="Search" alwaysOn />,
	<ReferenceInput
		key="articulo"
		source="articuloId"
		reference="articulos"
		alwaysOn
	/>,
]

export const TransaccionList = () => {
	// const record = useRecordContext<Transaccion>()
	return (
		<List
			filters={transaccionFilters}
			actions={
				<TopToolbar>
					<SelectColumnsButton />
					<CreateButton />
					<ExportButton />
				</TopToolbar>
			}
		>
			<DatagridConfigurable
				rowClick="show"
				sx={{
					"& .column-articuloId": { width: 500 },
					"& .column-empleadoId": { width: 150 },
					"& .column-recibioId": { width: 150 },
					"& .column-Total": { width: 50 },
				}}
			>
				{transaccionFields}
				<EditButton />
			</DatagridConfigurable>
		</List>
	)
}

export const TransaccionShow = () => (
	<Show>
		<SimpleForm>
			{transaccionFields}
		</SimpleForm>
	</Show>
)

export const TransaccionEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<NumberInput source="id" InputProps={{ disabled: true }} />
				<InputFields />
			</SimpleForm>
		</Edit>
	)
}

export const TransaccionCreate = () => (
	<Create>
		<SimpleForm>
			<NumberInput source="id" />
			<InputFields />
		</SimpleForm>
	</Create>
)

const ArticuloFullDescription = () => {
	const record = useRecordContext<Articulo>()
	return (
		<span>
			{record &&
				`${record.id} - ${record.tipo} - ${record.tienda} - ${record.marca} - ${record.nombre} - ${record.presentacion} - ${record.unidadEntrada}  - ${record.cantidadPorPieza}  - ${record.unidadSalida} - ${record.fechaInventarioInicial}  - ${record.inventarioInicial}`}
		</span>
	)
}

const articuloFullDescription = (record: Articulo) =>
	`${record.id} - ${record.tipo} - ${record.tienda} - ${record.marca} - ${record.nombre} - ${record.presentacion} - ${record.unidadEntrada}  - ${record.cantidadPorPieza}  - ${record.unidadSalida} - ${record.fechaInventarioInicial}  - ${record.inventarioInicial}`

const transaccionFields = [
	<NumberField key={"id"} source="id" />,
	<DateField key={"fecha"} source="fecha" />,
	<TextField key={"turno"} source="turno" />,
	<ReferenceField
		key={"empleadoId"}
		source="empleadoId"
		reference="empleados"
		label="Ingresó"
	/>,
	<ReferenceField
		key={"recibioId"}
		source="recibioId"
		reference="empleados"
		label="Recibió"
	/>,
	<ReferenceField
		key={"negocioId"}
		source="negocioId"
		reference="negocios"
		label="Destino"
	/>,
	<BooleanField key={"venta"} source="venta" />,
	<ReferenceField
		key={"articuloId"}
		source="articuloId"
		reference="articulos"
		label="Articulo (id - tipo - tienda - marca - nombre - presentacion - unidadEntrada - cantidadPorPieza - unidadSalida - fechaInventarioInicial - inventarioInicial)"
	>
		<ArticuloFullDescription />
	</ReferenceField>,
	<NumberField key={"cantidad"} source="cantidad" />,
	<CurrencyField key={"precio"} source="precio" redWhenZero />,
	<CostoField key={"costo"} />,
	// <InventarioActualField key={"inventarioActual"} label="Inventario Actual"/>,
	<BooleanField key={"factura"} source="factura" />,
]

const InputFields = () => (
	<>
		<Stack direction={"row"} spacing={2} alignItems={"center"}>
			<DateInput source="fecha" /> {/* TODO: Fix date input formatting */}
			<ReferenceInput source="turno" reference="turnos" />
		</Stack>
		<Stack direction={"row"} spacing={2} alignItems={"center"}>
			<ReferenceInput
				source="empleadoId"
				reference="empleados"
				filter={{ activo: true }}
				sort={{ field: "nombre", order: "ASC" }}
			>
				<AutocompleteInput label="Ingresó" sx={{ width: 350 }} />
			</ReferenceInput>
			<ReferenceInput
				source="recibioId"
				reference="empleados"
				filter={{ activo: true }}
				sort={{ field: "nombre", order: "ASC" }}
			>
				<AutocompleteInput label="Recibió" sx={{ width: 350 }} />
			</ReferenceInput>
		</Stack>
		<ReferenceInput source="articuloId" reference="articulos">
			<AutocompleteInput
				optionText={articuloFullDescription}
				sx={{ width: 750 }}
			/>
		</ReferenceInput>
		<NumberInput source="cantidad" />
		<NumberInput source="precio" />
		<ReferenceInput source="negocioId" reference="negocios" />
		<BooleanInput source="factura" />
		<BooleanInput source="venta" />
	</>
)

export default {
	list: TransaccionList,
	show: TransaccionShow,
	edit: TransaccionEdit,
	create: TransaccionCreate,
}
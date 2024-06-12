import {
	ReferenceManyField,
	List,
	Datagrid,
	NumberField,
	DateField,
	Create,
	SimpleForm,
	TextInput,
	useRecordContext,
	useGetOne,
	useGetList,
} from "react-admin"
import { Transaccion } from "./types"

export const CurrencyFormattingOptions = {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
}

export const TransaccionesByTarget = ({ target }: { target: string }) => (
	<ReferenceManyField reference="transacciones" target={target}>
		<List>
			<Datagrid>
				<NumberField source="id" />
				<DateField source="fecha" />
			</Datagrid>
		</List>
	</ReferenceManyField>
)

export const EnumCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="id" />
		</SimpleForm>
	</Create>
)

export const CurrencyField = ({
	source,
	redWhenZero = false,
}: {
	source: string
	redWhenZero?: boolean
}) => {
	const record = useRecordContext()
	return (
		<NumberField
			source={source}
			options={{
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
			}}
			transform={(v: number) => v / 1}
			sx={
				redWhenZero && record && record[source] === 0
					? {
							backgroundColor: "error.main",
							color: "white",
					  }
					: {}
			}
		/>
	)
}

// eslint-disable-next-line no-unused-vars
export const CostoField = ({ label }: { label?: string }) => {
	const record = useRecordContext()
	record.total = record.cantidad * record.precio
	return <CurrencyField source="total" redWhenZero />
}

// eslint-disable-next-line no-unused-vars
export const InventarioActualField = ({ label }: { label?: string }) => {
	const record = useRecordContext<Transaccion>()
	const {
		data: articulo,
		isLoading: articuloIsLoading,
		error: articuloError,
	} = useGetOne("articulos", { id: record.articuloId })
	const {
		data: transacciones,
		isLoading: transaccionIsLoading,
		error: transaccionError,
	} = useGetList("transacciones", { pagination: { page: 1, perPage: 1000 } })
	if (
		articuloIsLoading ||
		articuloError ||
		!articulo ||
		transaccionIsLoading ||
		transaccionError
	)
		return null

	return (
		<p>
			{transacciones?.length} - {record.id}
		</p>
	)
}

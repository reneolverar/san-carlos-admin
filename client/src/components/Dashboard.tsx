import { Card, CardContent, CardHeader } from "@mui/material"
import {
	BooleanInput,
	FormDataConsumer,
	SimpleForm,
	TextInput,
	useAuthenticated,
	useGetList,
} from "react-admin"

export const Dashboard = () => {
	useAuthenticated()
	useCalculateRunningSum()
	return (
		<Card>
			<CardHeader title="Welcome to the administration" />
			<CardContent>Lorem ipsum sic dolor amet...</CardContent>
			<SimpleForm shouldUnregister>
				<BooleanInput source="giftWrap" helperText={false} />
				<FormDataConsumer>
					{({ formData }) =>
						formData.giftWrap ? (
							<TextInput
								source="giftMessage"
								autoFocus
								multiline
								minRows={2}
							/>
						) : null
					}
				</FormDataConsumer>
			</SimpleForm>
		</Card>
	)
}

const useCalculateRunningSum = () => {
	const {
		data: articulos,
		isLoading: articuloIsLoading,
		error: articuloError,
	} = useGetList("articulos")
	const {
		data: transacciones,
		isLoading: transaccionIsLoading,
		error: transaccionError,
	} = useGetList(
		"transacciones",
		{
			sort: { field: "date", order: "ASC" },
			pagination: { page: 1, perPage: 1000 },
		}
		// { enabled: !isLoading && transacciones.length > 0 }
	)
	if (
		articuloIsLoading ||
		articuloError ||
		!articulos ||
		transaccionIsLoading ||
		transaccionError ||
		!transacciones
	)
		return null

	transacciones.reduce(
		(acc: number, transaccion: any) => acc + transaccion,
		0
	)

	console.log(transacciones)
}

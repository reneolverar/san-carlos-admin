import express, { Router } from "express"
import MarcaModel from "../models/marca"
import {
	createGetRoute,
	createGetByIdRoute,
	createGetByNameRoute,
	createPostRoute,
	createPatchRoute,
	createDeleteRoute,
} from "../utils/routeCreationUtils"
import {
	hasObjectIdParam,
	hasParam,
	isValidModel,
} from "../utils/routeValidationUtils"

const Model = MarcaModel

const router: Router = express.Router()

router.get("/", createGetRoute(Model))

router.get("/:id", hasObjectIdParam(), createGetByIdRoute(Model))

router.get(
	"/nombre/:nombre",
	hasParam("nombre"),
	createGetByNameRoute(Model)
)

router.post("/", isValidModel(Model), createPostRoute(Model))

router.patch(
	"/:id",
	hasObjectIdParam(),
	isValidModel(Model),
	createPatchRoute(Model)
)

router.delete("/:id", hasObjectIdParam(), createDeleteRoute(Model))

export default router

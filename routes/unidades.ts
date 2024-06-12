import express, { Router } from "express"
import UnidadModel from "../models/unidad"
import {
	createDeleteRoute,
	createGetByIdRoute,
	createGetByNameRoute,
	createGetRoute,
	createPatchRoute,
	createPostRoute,
} from "../utils/routeCreationUtils"
import {
	hasParam,
	hasObjectIdParam,
	isValidModel,
} from "../utils/routeValidationUtils"

const Model = UnidadModel

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

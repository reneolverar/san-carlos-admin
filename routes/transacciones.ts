import express, { Router } from "express"
import TransaccionModel from "../models/transaccion"
import {
	createDeleteRoute,
	createGetByIdRoute,
	createGetRoute,
	createPatchRoute,
	createPostRoute,
} from "../utils/routeCreationUtils"
import { hasObjectIdParam, isValidModel } from "../utils/routeValidationUtils"

const Model = TransaccionModel

const router: Router = express.Router()

router.get("/", createGetRoute(Model))

router.get("/:id", hasObjectIdParam(), createGetByIdRoute(Model))

router.post("/", isValidModel(Model), createPostRoute(Model))

router.patch(
	"/:id",
	hasObjectIdParam(),
	isValidModel(Model),
	createPatchRoute(Model)
)

router.delete("/:id", hasObjectIdParam(), createDeleteRoute(Model))

export default router

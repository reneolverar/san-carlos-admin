// Load the environment variables
import "dotenv/config"

import mongoose from "mongoose"
import app from "./app"

// Connect to MongoDB and Server
const MONGO_DB = process.env.ATLAS_URI || ""
mongoose
	.connect(MONGO_DB, {
		dbName: process.env.TEST_DB_NAME,
	})
	.then(async () => {
		console.log(`Connected to MongoDB`)
		// Listen for incoming requests
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`)
		})
	})
	.catch((error: Error) => {
		console.error("Failed to connect to MongoDB:", error)
	})

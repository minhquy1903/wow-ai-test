const express = require("express");
const path = require("path");

const grpcClient = require("./grpc-client");
const { cors, handleMultipartFormData } = require("./middleware");
const ActionService = require("./services/action.service");
const MLService = require("./services/ml.service");

const app = express();
const PORT = process.env.PORT || 3000;
const actionService = new ActionService();
const mlService = new MLService(grpcClient);

app.use(handleMultipartFormData);
app.use(cors);
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/status", (req, res) => {
	const status = mlService.getStatus();
	res.json(status);
});

app.get("/check-status", async (req, res) => {
	const result = await mlService.checkStatus("token");
	res.json(result);
});

app.post("/import-data", async (req, res) => {
	if (!req.files) {
		res.status(400).json("Bad request");
		return;
	}

	const data = req.files.map((file) => ({
		fileName: file.fileName,
		mimetype: file.mimeType,
		fileContent: { binaryContent: file.data },
	}));

	const result = await mlService.importData(data);

	res.json(result);
});

app.get("/get-coordinates", (req, res) => {
	const result = actionService.getCoordinates();
	return res.json(result);
});

app.post("/action", (req, res) => {
	try {
		const { command, coordinates } = req.body;

		switch (command) {
			case actionService.commandEnum.predict:
				const result = actionService.predict(coordinates);

				res.json({
					result,
				});
			case actionService.commandEnum.export:
				// implement export command

				break;
			case actionService.commandEnum.create_dataset:
				// implement create dataset command

				break;
			case actionService.commandEnum.logs:
				// implement logs command

				break;
			case actionService.commandEnum.download_checkpoint:
				// implement download checkpoint command

				break;
			default:
				break;
		}
	} catch (error) {
		res.status(400).send("Something went wrong");
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

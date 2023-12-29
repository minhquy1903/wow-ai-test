class ActionService {
	constructor() {
		this.commandEnum = {
			predict: "predict",
			export: "export",
			create_dataset: "create_dataset",
			logs: "logs",
			download_checkpoint: "download_checkpoint",
		};
		// this represent for a the table in database, I save it in memory instead of setup database
		this.coordinates = [];
	}

	getCoordinates() {
		return this.coordinates;
	}

	predict(coordinates) {
		return this.coordinates.push(coordinates);
	}

	// define params based on the requirement
	export() {
		// implement export command
	}

	// define params based on the requirement
	createDataset() {
		// implement create dataset command
	}

	// define params based on the requirement
	logs() {
		// implement logs command
	}

	// define params based on the requirement
	downloadCheckpoint() {
		// implement download checkpoint command
	}
}

module.exports = ActionService;

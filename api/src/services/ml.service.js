class MLService {
	constructor(grpcClient) {
		this.grpcClient = grpcClient;

		// this represent for a the table in database, I save it in memory instead of setup database
		this.status = [];
	}

	getStatus() {
		return this.status;
	}

	storeStatus(status) {
		this.status.push({
			status: status,
			time: new Date().toISOString(),
		});
	}

	async checkStatus(token) {
		const result = await new Promise((resolve, reject) => {
			this.grpcClient.getStatus({ token: token }, (err, response) => {
				if (err) {
					reject(err);
				} else {
					resolve(response);
				}
			});
		});

		this.storeStatus(result.status);

		return result;
	}

	async importData(data) {
		const result = await new Promise((resolve, reject) => {
			this.grpcClient.importData(
				{ fileImports: data },
				function (err, response) {
					if (err) {
						reject(err);
					} else {
						resolve(response);
					}
				},
			);
		});

		return result;
	}
}

module.exports = MLService;

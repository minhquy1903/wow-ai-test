function cors(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", "true");

	next();
}
function handleMultipartFormData(req, res, next) {
	if (
		req.headers["content-type"] &&
		req.headers["content-type"].includes("multipart/form-data")
	) {
		const boundary = req.headers["content-type"].split("boundary=")[1];
		const files = [];
		let fileData = Buffer.from("");
		let fileName = "";
		let mimeType = "";

		req.on("data", (chunk) => {
			fileData = Buffer.concat([fileData, chunk]);
			let boundaryIndex;
			while ((boundaryIndex = fileData.indexOf(boundary)) !== -1) {
				const partBeforeBoundary = fileData
					.subarray(0, boundaryIndex)
					.toString();
				const partAfterBoundary = fileData.subarray(
					boundaryIndex + boundary.length,
				);

				const fileNameMatch =
					partBeforeBoundary.match(/filename="(.+?)"/);
				if (fileNameMatch) {
					fileName = fileNameMatch[1];
				}

				const contentTypeMatch = partBeforeBoundary.match(
					/Content-Type: (.+?)\r\n/,
				);
				if (contentTypeMatch) {
					mimeType = contentTypeMatch[1];
				}

				fileData = partAfterBoundary;
				if (fileName && mimeType) {
					files.push({ fileName, mimeType, data: fileData });
				}
			}
		});

		req.on("end", () => {
			req.files = files;
			next();
		});
	} else {
		next();
	}
}

module.exports = { cors, handleMultipartFormData };

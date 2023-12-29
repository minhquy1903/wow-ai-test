function getStatus(call, callback) {
	// handle something with the token, eg: validate
	const token = call.request.token;
	console.log("Receive token", token);

	const status = ["ACTIVE", "TRAINING"];

	const rand = Math.floor(Math.random() * 2);

	callback(null, { status: status[rand] });
}

function importData(call, callback) {
	// do something with files based on requirement
	const files = call.request.fileImports;
	console.log("Receive import data", files);

	callback(null, { isSuccess: true });
}

module.exports = { importData, getStatus };

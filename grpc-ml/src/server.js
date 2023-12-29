const PROTO_PATH = __dirname + "/../proto/services.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { getStatus, importData } = require("./service");

const HOST = "0.0.0.0:50051";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});

const serviceProto = grpc.loadPackageDefinition(packageDefinition).MLService;

function main() {
	const server = new grpc.Server();
	server.addService(serviceProto.ProcessingStatus.service, {
		getStatus: getStatus,
		importData: importData,
	});

	server.bindAsync(HOST, grpc.ServerCredentials.createInsecure(), () => {
		console.info("grpc server is running at", HOST);
		server.start();
	});
}

main();

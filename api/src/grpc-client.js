const PROTO_PATH = __dirname + "/../proto/services.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});

const serviceProto = grpc.loadPackageDefinition(packageDefinition).MLService;

const target = "grpc_ml:50051";

const grpcClient = new serviceProto.ProcessingStatus(
	target,
	grpc.credentials.createInsecure(),
);

module.exports = grpcClient;

frontend/src/generated:
	mkdir -p frontend/src/generated

frontend/src/generated/HelloworldServiceClientPb.ts: frontend/src/generated proto/helloworld.proto
	protoc -I="proto" helloworld.proto --js_out=import_style=commonjs:frontend/src/generated \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:frontend/src/generated

clean:
	rm -rf frontend/src/generated
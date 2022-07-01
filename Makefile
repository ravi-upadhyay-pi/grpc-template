/usr/bin/protoc:
	sudo apt install -y protobuf-compiler

/usr/bin/protoc-gen-grpc-web:
	wget https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64
	sudo mv protoc-gen-grpc-web-1.3.1-linux-x86_64 /usr/bin/protoc-gen-grpc-web
	sudo chmod +x /usr/bin/protoc-gen-grpc-web

protobuf-setup: /usr/bin/protoc /usr/bin/protoc-gen-grpc-web

frontend/src/generated/HelloworldServiceClientPb.ts: protobuf-setup proto/helloworld.proto
	mkdir -p frontend/src/generated
	protoc \
		-I="proto" helloworld.proto \
		--js_out=import_style=commonjs:frontend/src/generated \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:frontend/src/generated

clean:
	rm -rf frontend/src/generated
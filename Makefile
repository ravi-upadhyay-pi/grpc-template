# Source code management rules
HOME := $(HOME)

dev-setup: /usr/bin/protoc /usr/bin/protoc-gen-grpc-web $(HOME)/.nodejs/current/bin/npm $(HOME)/.cargo/bin/cargo

$(HOME)/.nodejs/current/bin/npm:
	sudo apt install npm

$(HOME)/.cargo/bin/cargo:
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

/usr/bin/protoc:
	sudo apt install -y protobuf-compiler

/usr/bin/protoc-gen-grpc-web:
	wget https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64
	sudo mv protoc-gen-grpc-web-1.3.1-linux-x86_64 /usr/bin/protoc-gen-grpc-web
	sudo chmod +x /usr/bin/protoc-gen-grpc-web

ui/src/generated/Grpc_templateServiceClientPb.ts: dev-setup proto/grpc_template.proto
	mkdir -p ui/src/generated && \
	protoc -I="proto" grpc_template.proto \
		--js_out=import_style=commonjs:ui/src/generated \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:ui/src/generated

generated: ui/src/generated/Grpc_templateServiceClientPb.ts

clean:
	rm -rf ui/src/generated
	rm -rf release
	rm -rf backend/target
	rm -rf ui/dist

# Development server rules
/usr/sbin/nginx:
	sudo apt install nginx

/etc/nginx/sites-enabled/grpc-template-dev.conf: grpc-template-dev.nginx.conf
	sudo cp grpc-template-dev.nginx.conf $@

dev-nginx: /usr/sbin/nginx /etc/nginx/sites-enabled/grpc-template-dev.conf
	sudo service nginx restart

backend-dev-server:
	cd backend && cargo run 
	
ui-dev-server: generated
	cd ui && ng serve --hmr --disable-host-check

# Parallely run backend and ui: `make dev-server --jobs=2`
dev-server: backend-dev-server ui-dev-server dev-nginx

# Release build rules
ui/dist: generated
	cd ui && \
	npm i && \
	npm run build

backend/target/release/helloworld: backend
	cd backend && \
	cargo build --release

release: ui/dist backend/target/release/helloworld
	mkdir -p ./release
	mv ./ui/dist ./release/ui-files
	mv ./backend/target/release/hello_world ./release/backend-binary

# Release deployment rules
deployment: /usr/sbin/nginx hello-world.nginx.conf
	sudo rm -r ./release/usr/local/bin/helloworld/ui-files
	sudo rm ./release/usr/local/bin/helloworld/backend-binary
	sudo mv ./release/backend-binary /usr/local/bin/helloworld/
	sudo mv ./release/ui-files /usr/local/bin/helloworld/
	sudo cp hello-world.nginx.conf /etc/nginx/sites-available/
	sudo systemcl restart nginx

.PHONY: generated dev-setup clean deployment release dev-nginx dev-server backend-dev-server ui-dev-server

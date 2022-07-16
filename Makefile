# Source code management rules
HOME := $(HOME)
NPM := $(HOME)/.nodejs/current/bin/npm
NG := $(HOME)/.nodejs/current/bin/ng
CARGO := $(HOME)/.cargo/bin/cargo
PROTOC := /usr/bin/protoc
PROTOC_GRPC_WEB := /usr/bin/protoc-gen-grpc-web
NGINX := /usr/sbin/nginx

builders-setup: $(PROTOC) $(PROTOC_GRPC_WEB) $(NPM) $(CARGO) $(NG)

$(NPM):
	sudo apt install -y npm

$(NG): $(NPM)
	$(NPM) install -g @angular/cli

$(CARGO):
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

$(PROTOC):
	sudo apt install -y protobuf-compiler

$(PROTOC_GRPC_WEB):
	wget https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64
	sudo mv protoc-gen-grpc-web-1.3.1-linux-x86_64 /usr/bin/protoc-gen-grpc-web
	sudo chmod +x /usr/bin/protoc-gen-grpc-web

ui/src/generated/Grpc_templateServiceClientPb.ts: builders-setup proto/grpc_template.proto
	$(PROTOC) -I="proto" grpc_template.proto \
		--js_out=import_style=commonjs:ui/src/generated \
		--grpc-web_out=import_style=typescript,mode=grpcwebtext:ui/src/generated

generated: ui/src/generated/Grpc_templateServiceClientPb.ts

clean:
	rm ui/src/generated/grpc_template_pb.d.ts
	rm ui/src/generated/grpc_template_pb.js
	rm ui/src/generated/Grpc_templteServiceClientPb.ts
	rm -rf release
	rm -rf backend/target
	rm -rf ui/dist

# Development server rules
$(NGINX):
	sudo apt install -y nginx

/etc/nginx/sites-enabled/grpc-template-dev.conf: $(NGINX) nginx/grpc-template-dev.nginx.conf
	sudo cp nginx/grpc-template-dev.nginx.conf $@

dev-nginx: $(NGINX) /etc/nginx/sites-enabled/grpc-template-dev.conf
	sudo service nginx restart

backend-dev-server: builders-setup
	cd backend && $(CARGO) run 
	
ui-dependency: $(NPM) ui/package.json
	cd ui && $(NPM) install

ui-dev-server: builders-setup generated ui-dependency
	cd ui && $(NPM) run devserver

# Parallely run backend and ui: `make dev-server --jobs=2`
dev-server: builders-setup dev-nginx backend-dev-server ui-dev-server 

# Release build rules
test: builders-setup ui-dependency
	cd ui && $(NPM) run test
	cd backend && $(CARGO) test

ui/dist: builders-setup generated ui-dependency
	cd ui && $(NPM) run build

backend/target/release/backend:  $(CARGO)
	cd backend && $(CARGO) build --release

release: test ui/dist backend/target/release/backend
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

.PHONY: generated dev-setup clean deployment release dev-nginx dev-server backend-dev-server ui-dev-server test

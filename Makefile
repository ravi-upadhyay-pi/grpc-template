dev-setup:
	sudo apt install npm
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

ui/src/generated/service.client.ts: proto/service.proto
	cd ui && \
	mkdir -p ./src/generated && \
	npx protoc \
		--ts_out ./src/generated \
		--proto_path ../proto \
		../proto/service.proto

generated: ui/src/generated/service.client.ts

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

/usr/sbin/nginx:
	sudo apt install nginx

deployment: /usr/sbin/nginx hello-world.nginx.conf
	sudo rm -r ./release/usr/local/bin/helloworld/ui-files
	sudo rm ./release/usr/local/bin/helloworld/backend-binary
	sudo mv ./release/backend-binary /usr/local/bin/helloworld/
	sudo mv ./release/ui-files /usr/local/bin/helloworld/
	sudo cp hello-world.nginx.conf /etc/nginx/sites-available/
	sudo systemcl restart nginx

clean:
	rm -rf ui/src/generated
	rm -rf release
	rm -rf backend/target
	rm -rf ui/dist


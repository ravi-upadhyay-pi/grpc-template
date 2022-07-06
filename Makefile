ui/src/generated/helloworld.client.ts: proto/helloworld.proto
	cd ui && \
	mkdir -p ./src/generated && \
	npx protoc \
		--ts_out ./src/generated \
		--proto_path ../proto \
		../proto/helloworld.proto

ui-generated: ui/src/generated/helloworld.client.ts

ui/dist: ui-generated
	cd ui && \
	npm i && \
	npm run build

backend/target/release/helloworld: backend
	cd backend && \
	cargo build --release

release: ui/dist backend/target/release/helloworld
	mkdir -p ./release
	mv ./ui/dist ./release/
	mv ./backend/target/release/hello_world ./release

clean:
	rm -rf ui/src/generated
	rm -rf release
	rm -rf backend/target
	rm -rf ui/dist

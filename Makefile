.PHONY: build image validate smoke

build:
	npm run build

image:
	docker build -t status-page:local .

validate:
	hadolint Dockerfile
	docker compose config --quiet
	npm run build

smoke: image
	./scripts/smoke-test.sh status-page:local

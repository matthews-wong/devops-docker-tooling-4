.PHONY: build image validate

build:
	npm run build

image:
	docker build -t status-page:local .

validate:
	hadolint Dockerfile
	docker compose config --quiet
	npm run build

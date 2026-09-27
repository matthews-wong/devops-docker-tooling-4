# status-page

A small static status page, built and served as a hardened container image.
There's no framework here on purpose: a zero-dependency Node script stamps
build metadata (version, commit, build date) into a static HTML template,
and the result is handed off to nginx in a separate, much smaller final
image. The Dockerfile is the point of the exercise, not incidental to it.

## Build it locally

```sh
npm run build
```

This writes `dist/index.html` and copies the stylesheet alongside it. Open
`dist/index.html` in a browser to check the output before touching Docker
at all.

## Build and run the container

```sh
docker build -t status-page .
docker run --rm -p 8080:8080 status-page
curl localhost:8080/
```

## Run it with Compose

```sh
docker compose up --build
```

Compose adds a healthcheck, resource limits, and a read-only root
filesystem — see `docker-compose.yml` for the full hardening list.

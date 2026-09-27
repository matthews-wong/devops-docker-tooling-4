# status-page

[![validate](https://github.com/matthews-wong/devops-docker-tooling-4/actions/workflows/validate.yml/badge.svg)](https://github.com/matthews-wong/devops-docker-tooling-4/actions/workflows/validate.yml)

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

## Validate

```sh
make validate   # hadolint + docker compose config + build the site
make smoke      # build the image and hit it with a real HTTP request
```

The container runs as the `nginx` image's unprivileged UID 101 on port
8080 (via `nginxinc/nginx-unprivileged`), so `read_only: true` in Compose
doesn't need a custom user — only `/tmp`, `/var/cache/nginx`, and
`/var/run` need the `tmpfs` mounts already in `docker-compose.yml`.

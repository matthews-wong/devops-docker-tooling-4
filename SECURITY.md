# Security Policy

## Reporting a vulnerability

This is a small personal project, not a maintained product with an SLA. If
you find a security issue (e.g. a base image vulnerability, a Dockerfile
misconfiguration, or a compose hardening gap), please open an issue with:

- A description of the problem and its impact
- Steps to reproduce, if applicable
- A suggested fix, if you have one

## Scope

The container images built from this repo pin their base images by digest
and are rebuilt against the latest `hadolint`-clean `Dockerfile` on every
push. Dependency updates for the base images are not automated here yet —
check `docker buildx imagetools inspect` against the pinned digests in
`Dockerfile` if you suspect a stale base image.

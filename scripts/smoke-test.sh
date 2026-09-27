#!/usr/bin/env bash
set -euo pipefail

image="${1:-status-page:ci}"
port="${SMOKE_PORT:-18080}"
container_name="status-page-smoke-$$"

# shellcheck disable=SC2317  # invoked indirectly via trap, not unreachable
cleanup() {
  docker rm -f "$container_name" >/dev/null 2>&1 || true
}
trap cleanup EXIT

docker run -d --name "$container_name" -p "${port}:8080" "$image" >/dev/null

for _ in $(seq 1 10); do
  if curl -sf "http://127.0.0.1:${port}/" | grep -q "All systems operational"; then
    echo "smoke test passed"
    exit 0
  fi
  sleep 1
done

echo "smoke test failed: service did not become healthy" >&2
docker logs "$container_name" >&2 || true
exit 1

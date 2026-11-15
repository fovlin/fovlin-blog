#!/usr/bin/env bash
set -euo pipefail

url="https://repo.acovia.net/packages/docs-go"

curl -fsSL "$url" -o ./docs-go
tar -xzvf docs-go_linux_amd64.tar.gz

chmod +x ./docs-go_linux_amd64/docs-go

./docs-go_linux_amd64/docs-go build .

#!/usr/bin/env bash
# Oasis — startup Pterodactyl / Linux
# La memoria y flags Aikar viven en user_jvm_args.txt (no pongas -Xmx en el panel).
set -euo pipefail
cd "$(dirname "$0")"
NEOFORGE_VERSION="${NEOFORGE_VERSION:-21.1.253}"
exec java @user_jvm_args.txt @libraries/net/neoforged/neoforge/${NEOFORGE_VERSION}/unix_args.txt nogui

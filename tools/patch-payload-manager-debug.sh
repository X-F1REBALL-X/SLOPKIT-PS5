#!/usr/bin/env bash
# Blank Payload Manager on-screen debug notifications we do not want:
#   1) "Autoloading in %ds / Press PS Button to Abort"
#   2) "Payload Manager v%s / IP / Port"
# Safe to re-run after replacing payloads/payload-manager.elf from upstream.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ELF="${1:-$ROOT/payloads/payload-manager.elf}"
python3 - "$ELF" <<'PY'
import sys
from pathlib import Path

path = Path(sys.argv[1])
data = bytearray(path.read_bytes())

# Exact format strings from itsPLK/ps5-payload-manager (pldmgr_notify).
TARGETS = [
    b"Autoloading in %ds\nPress PS Button to Abort",
    b"Payload Manager v%s\nIP: %s\nPort: %d",
]

changed = 0
for t in TARGETS:
    start = 0
    hits = 0
    while True:
        i = data.find(t, start)
        if i < 0:
            break
        # Empty C string: first byte NUL. Leave the rest so layout stays stable.
        if data[i] != 0:
            data[i] = 0
            changed += 1
        hits += 1
        start = i + 1
    label = t.split(b"\n")[0].decode("ascii", "replace")
    print(f"{'patched' if hits else 'MISSING'}: {label!r} (hits={hits})")

if changed:
    path.write_bytes(data)
    print(f"Wrote {path} ({changed} string(s) blanked)")
else:
    print(f"No changes needed: {path}")
PY

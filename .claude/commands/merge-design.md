---
description: Merge a Claude Design export into babil-site, preserving local tweaks (Babil hex favicon, icon link tags)
argument-hint: "[optional: path to export folder]"
allowed-tools: Bash
---

Run the merge-export script for this repo.

If the user gave a path in `$ARGUMENTS`, pass it as an argument. Otherwise let the script auto-detect the newest Babil export folder on Desktop.

```bash
cd "$(git rev-parse --show-toplevel)" && bash scripts/merge-export.sh $ARGUMENTS
```

After it runs:
- If the script committed + pushed, briefly summarize what changed (which files, byte deltas) and remind the user to hard-refresh https://babilfinance.com to confirm.
- If it exited with "Nothing changed", tell the user the export is already in sync.
- If anything failed (export folder not found, git push rejected, etc.), explain the failure and suggest a fix. **Do not** retry the merge silently or attempt workarounds — surface the issue and stop.

#!/usr/bin/env bash
# merge-export.sh — Merge a Claude Design export into babil-site.
#
# Usage:
#   ./scripts/merge-export.sh                       # auto-detects newest export on Desktop
#   ./scripts/merge-export.sh "C:/path/to/folder"   # explicit path
#
# The path may point to either:
#   - the export root (containing landing.jsx alongside a babil-website/ folder), OR
#   - the babil-website/ folder directly.
#
# What it does:
#   - COPIES only real source files when they differ:
#       landing.jsx, app-screens.jsx, pages.jsx, styles.css, tweaks-panel.jsx
#   - SKIPS files that would undo our tweaks:
#       Babil Website.html (would drop our apple-touch-icon + PWA <link> tags)
#       assets/*           (would restore the placeholder cube favicons over our Babil hex)
#       Babil Standalone.html, Babil Website Bundle.html (not deployed)
#       screenshot-*.jpg, .thumbnail, screenshots/, uploads/  (export artifacts)
#   - Shows a per-file summary, then offers to commit + push.

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DESKTOP="${USERPROFILE:-$HOME}/Desktop"
DESKTOP="${DESKTOP//\\//}"

# ── 0. Parse args ─────────────────────────────────────────────────────────────
SRC=""
NO_COMMIT=0
for arg in "$@"; do
  case "$arg" in
    --no-commit) NO_COMMIT=1 ;;
    --*)         echo "❌ Unknown flag: $arg"; exit 1 ;;
    *)           SRC="$arg" ;;
  esac
done

# ── 1. Resolve source folder ──────────────────────────────────────────────────
if [ -z "$SRC" ]; then
  # auto-detect: newest folder on Desktop that contains a babil-website/ subdir
  # OR that contains landing.jsx directly
  CANDIDATE=$(find "$DESKTOP" -maxdepth 3 -type d \
    \( -name "babil-website" -o -name "Yeni klasör" \) \
    -not -path "*/babil-site/*" \
    -not -path "*/babil-website-source/*" \
    -printf "%T@ %p\n" 2>/dev/null \
    | sort -rn | head -1 | cut -d' ' -f2-)
  if [ -z "$CANDIDATE" ]; then
    echo "❌ No export folder found on Desktop. Pass an explicit path."
    echo "   Usage: $0 \"C:/path/to/export\""
    exit 1
  fi
  SRC="$CANDIDATE"
  echo "ℹ Auto-detected newest export: $SRC"
fi

# Normalize: if SRC has a babil-website/ child, descend into it
if [ -d "$SRC/babil-website" ]; then
  SRC="$SRC/babil-website"
fi

if [ ! -f "$SRC/landing.jsx" ]; then
  echo "❌ $SRC does not look like a Babil export (no landing.jsx)."
  exit 1
fi

echo ""
echo "📂 Source : $SRC"
echo "📂 Target : $REPO_DIR"
echo ""

# ── 2. Sync source files ──────────────────────────────────────────────────────
SOURCE_FILES=(landing.jsx app-screens.jsx pages.jsx styles.css tweaks-panel.jsx)
COPIED=()
UNCHANGED=()
MISSING=()

for f in "${SOURCE_FILES[@]}"; do
  src="$SRC/$f"
  dst="$REPO_DIR/$f"
  if [ ! -f "$src" ]; then
    MISSING+=("$f")
    continue
  fi
  if [ ! -f "$dst" ] || ! cmp -s "$src" "$dst"; then
    src_sz=$(wc -c < "$src")
    dst_sz=$([ -f "$dst" ] && wc -c < "$dst" || echo 0)
    delta=$((src_sz - dst_sz))
    sign="+"; [ $delta -lt 0 ] && sign=""
    cp "$src" "$dst"
    COPIED+=("$f ($dst_sz → $src_sz, ${sign}${delta}b)")
  else
    UNCHANGED+=("$f")
  fi
done

echo "═══ MERGE SUMMARY ═══"
if [ ${#COPIED[@]} -gt 0 ]; then
  echo "✅ Updated:"
  printf "   %s\n" "${COPIED[@]}"
fi
if [ ${#UNCHANGED[@]} -gt 0 ]; then
  echo "⚪ Unchanged:"
  printf "   %s\n" "${UNCHANGED[@]}"
fi
if [ ${#MISSING[@]} -gt 0 ]; then
  echo "⚠ Missing in export:"
  printf "   %s\n" "${MISSING[@]}"
fi

# Always-skipped, listed only if they exist (to reassure)
SKIPPED=()
for s in "Babil Website.html" "Babil Standalone.html" "Babil Website Bundle.html"; do
  [ -f "$SRC/$s" ] && SKIPPED+=("$s (would clobber our icon <link> tweaks)")
done
[ -d "$SRC/assets" ] && SKIPPED+=("assets/ (would restore placeholder cube favicons)")
for j in "$SRC"/screenshot-*.jpg; do
  [ -f "$j" ] && SKIPPED+=("screenshot-*.jpg (export artifacts)") && break
done
if [ ${#SKIPPED[@]} -gt 0 ]; then
  echo "🚫 Skipped (intentional):"
  printf "   %s\n" "${SKIPPED[@]}"
fi

# ── 3. Commit + push if anything changed ──────────────────────────────────────
echo ""
cd "$REPO_DIR"
if git diff --quiet && git diff --cached --quiet; then
  echo "✨ Nothing changed. Working tree is clean."
  exit 0
fi

echo "═══ GIT DIFF STAT ═══"
git diff --stat
echo ""

if [ "$NO_COMMIT" = "1" ]; then
  echo "ℹ Skipping commit (--no-commit). Review with 'git diff' and commit manually."
  exit 0
fi

COMMIT_MSG="${COMMIT_MSG:-feat: merge latest Claude Design export

Updated source files:
$(printf '  - %s\n' "${COPIED[@]}")

Skipped wrapper HTML and assets/ to preserve favicon + icon link tweaks.}"

git add "${SOURCE_FILES[@]}" 2>/dev/null || true
git -c user.email=salimcanylmzz35@gmail.com -c user.name=canylmzz35 \
    commit -m "$COMMIT_MSG"

echo ""
echo "🚀 Pushing to origin..."
git push

echo ""
echo "✅ Done. Vercel will auto-deploy in ~30s."
echo "   Check: https://vercel.com/muhcanylmzz35s-projects/babil-site"
echo "   Live : https://babilfinance.com  (hard refresh with Ctrl+Shift+R)"

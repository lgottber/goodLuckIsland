#!/usr/bin/env bash
set -euo pipefail

PUBLIC_DIR="$(cd "$(dirname "$0")/../public" && pwd)"

if ! command -v convert &>/dev/null; then
  echo "Error: ImageMagick is required (install with: sudo apt install imagemagick)" >&2
  exit 1
fi

echo "Working in: $PUBLIC_DIR"

# Converts a filename (without extension) to snake_case:
#   camelCase  -> camel_case
#   hyphens    -> underscores
#   apostrophes and other non-alphanumeric chars -> removed/underscored
to_snake_case() {
  echo "$1" \
    | sed "s/'//g" \
    | sed 's/\([A-Z]\)/_\L\1/g' \
    | sed 's/[-]/_/g' \
    | sed 's/[^a-z0-9_]/_/g' \
    | sed 's/__*/_/g' \
    | sed 's/^_//' \
    | tr '[:upper:]' '[:lower:]'
}

# Step 1: Rename all image files to snake_case.
echo ""
echo "==> Renaming files to snake_case..."
find "$PUBLIC_DIR" -maxdepth 1 -type f \( \
  -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \
  -o -iname "*.gif" -o -iname "*.webp" \
\) | while read -r img; do
  dir="$(dirname "$img")"
  filename="$(basename "$img")"
  ext="${filename##*.}"
  base="${filename%.*}"
  snake="$(to_snake_case "$base")"
  new_name="${snake}.$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
  if [[ "$filename" != "$new_name" ]]; then
    echo "    $filename -> $new_name"
    mv "$img" "$dir/$new_name"
  fi
done

# Step 2: Convert non-PNG static images (jpg, jpeg) to PNG, then remove originals.
# GIFs are skipped — animated GIFs cannot be losslessly represented as a single PNG.
echo ""
echo "==> Converting non-PNG images to PNG..."
find "$PUBLIC_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r img; do
  base="${img%.*}"
  png="${base}.png"
  echo "    $img -> $png"
  convert "$img" "$png"
  rm "$img"
done

# Step 3: Delete all existing webp files.
echo ""
echo "==> Deleting existing WebP files..."
find "$PUBLIC_DIR" -maxdepth 1 -type f -iname "*.webp" | while read -r webp; do
  echo "    Removing $webp"
  rm "$webp"
done

# Step 4: Create webp copies of every image (png, gif).
# Animated GIFs are converted to animated WebP via gif2webp if available, otherwise
# ImageMagick is used as a fallback.
echo ""
echo "==> Creating WebP copies..."
find "$PUBLIC_DIR" -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.gif" \) | while read -r img; do
  base="${img%.*}"
  webp="${base}.webp"
  ext="${img##*.}"
  echo "    $img -> $webp"
  if [[ "$(echo "$ext" | tr '[:upper:]' '[:lower:]')" == "gif" ]] && command -v gif2webp &>/dev/null; then
    gif2webp -quiet "$img" -o "$webp"
  else
    convert "$img" "$webp"
  fi
done

echo ""
echo "Done."

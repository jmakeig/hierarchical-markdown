#! /usr/bin/env bash

if [ -z "$1" ]; then
  echo "ERROR: You need to save the document first."
  echo
  echo
  printenv
  exit 1
fi  

TARGET="$1.html"

/usr/local/bin/pandoc \
  --from=markdown_strict+header_attributes+yaml_metadata_block+pipe_tables \
  --to=html5 \
  --self-contained \
  --template="hierarchical/template.html" \
  --section-divs \
  --toc \
  --toc-depth=6 \
  --output="$TARGET" \
  --quiet \
  "$1"

open "$TARGET"

exit 0
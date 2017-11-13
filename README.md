[Pandoc](https://pandoc.org) templates to render Markdown as hierarchical HTML5.

```bash
git clone git@github.com:jmakeig/hierarchical-markdown.git ~/.pandoc
```

By default, Pandoc will look in the `--data-dir` for templates.

```bash
#! /usr/bin/env bash

pandoc \
  --from=markdown_strict+header_attributes+yaml_metadata_block+pipe_tables\
  --to=html5 \
  --self-contained \
  --template="hierarchical/template.html" \
  --section-divs \
  --output="$1.html" \
  --toc \
  --toc-depth=6 \
  "$1.md"
```

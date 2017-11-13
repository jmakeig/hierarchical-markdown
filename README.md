# Hierarchical Document Formatting for HTML

Render Markdown as HTML5. This is targeted toward meaty text documents with structured headings (`##`) that convey hierarchy. Uses [Pandoc](https://pandoc.org) under the covers.

Features of the output HTML:

  - Fully self-contained for sharing: all external references are inlined with [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
  - Automatic table of contents
  - Collapsible sections
  - Literal copy paste into WYSIWYG editor in [Confluence](https://www.atlassian.com/software/confluence)
  - Print stylesheet
  - Optional document metadata: title, author, history

## Usage

```bash
git clone git@github.com:jmakeig/hierarchical-markdown.git ~/.pandoc
```

By default, Pandoc will look in the `--data-dir` for templates. On Linux and macOS that defaults to `~/.pandoc`. On Windows it’s `C:\Users\`*USERNAME*`\AppData\Roaming\pandoc`. If you already have a `data-dir`, you’ll need to copy (or link) in the `hierarchical` folder into the `~/.pandoc/templates/` directory, or `C:\Users\`*USERNAME*`\AppData\Roaming\pandoc\templates\` on Windows. 

***WARNING**: I can’t figure out how to [specify relative links in the template](https://stackoverflow.com/q/47271344/563324). Thus, you’ll need to change the paths in the `<link>` and `<script>` elements in `templates/hierarchical/template.html` to reflect the absolute path to those files on your system.*

```html
<link rel="stylesheet" href="/Users/jmakeig/.pandoc/templates/hierarchical/hierarchical.css">
```

and

```html
<script type="text/javascript" src="/Users/jmakeig/.pandoc/templates/hierarchical/behavior.js"></script>
```

Finally, the following script will transform a Markdown document into HTML5, using the above template.

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

const heading = document.querySelector('h1');
if (heading && heading.textContent) {
  document.title = heading.textContent;
}

const sections = document.querySelectorAll('section:not(.level1)');
for (const section of sections) {
  section.classList.add('toggleable');
}
document.body.addEventListener('click', evt => {
  if (evt.target && evt.target.matches('.toggleable')) {
    evt.target.classList.toggle('toggle-collapsed');
    evt.stopPropagation();
  }
});

function collapseAll(aboveLevel = 1, parent = document.body) {
  const selector = ['1', '2', '3', '4', '5', '6']
    .map(level => `section.toggleable.level${level}`)
    .slice(aboveLevel - 1)
    .join(', ');
  for (const section of parent.querySelectorAll('section.toggleable')) {
    if (section.matches(selector)) {
      section.classList.add('toggle-collapsed');
    } else {
      section.classList.remove('toggle-collapsed');
    }
  }
}

document.querySelector('#CollapseAll').addEventListener('click', evt => {
  collapseAll();
});

const now = new Date().toISOString().slice(0, 10);
const lastUpdateDate = document.querySelector('.history ul strong')
  ? document.querySelector('.history ul strong').textContent
  : now;

const lastUpdated = document.querySelector('.last-updated');
if (lastUpdated) {
  lastUpdated.textContent = lastUpdateDate;
}
const lastBuilt = document.querySelector('.last-built');
if (lastBuilt) {
  lastBuilt.textContent = now;
}

function* getHeading(node) {
  const children = node.querySelector('h1, h2, h3, h4, h5, h6, .pseudo-heading')
    .childNodes;

  // Nodes are by reference, not value
  // So, you need to clone first
  for (const child of children) yield child.cloneNode();
}

function getTOC(root = document.body) {
  function traverse(node, accumulator) {
    if (!node) return accumulator;
    while (node) {
      accumulator.push({
        // Iterable of Node instances, so you can use HTML in your headings
        heading: getHeading(node),
        href: node.id ? `#${node.id}` : undefined,
        children: traverse(walker.firstChild(), []),
      });
      // The currrentNode is updated on recursive traversal.
      // Need to reset to traverse siblings.
      walker.currentNode = node;
      node = walker.nextSibling();
    }
    return accumulator;
  }
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: node => {
        if ('SECTION' === node.nodeName) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      },
    },
    false
  );

  return traverse(walker.nextNode(), [], walker);
}

function renderTOC(toc, levels = [0]) {
  const ul = document.createElement('ul');
  for (const item of toc) {
    const a = item.href
      ? document.createElement('a')
      : document.createElement('span');
    if (item.href) a.setAttribute('href', item.href);
    // Increment the leaf level
    levels[levels.length - 1]++;
    const level = `${levels.join('.')}. `;
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(level));
    a.appendChild(span);
    // item.heading is a NodeList, not a string
    for (const titleChild of item.heading) {
      a.appendChild(titleChild);
    }
    const li = document.createElement('li');
    li.appendChild(a);
    if (item.children && item.children.length > 0) {
      li.classList.add('toggleable');
      li.appendChild(renderTOC(item.children, [...levels, 0]));
    }
    ul.appendChild(li);
  }
  return ul;
}

document.querySelector('#TOC').appendChild(renderTOC(getTOC()));

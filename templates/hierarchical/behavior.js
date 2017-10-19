const sections = document.querySelectorAll('section:not(.level1)');
for (const section of sections) {
  section.classList.add('toggleable');
}
document.body.addEventListener('click', evt => {
  if (evt.target && evt.target.matches('.toggleable')) {
    evt.target.classList.toggle('toggle-collapsed');
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
const btns = document.querySelectorAll(".nav-btn");
const screens = document.querySelectorAll(".screen");
function activate(id) {
  btns.forEach((b) => b.classList.toggle("active", b.dataset.screen === id));
  screens.forEach((s) => s.classList.toggle("active", s.id === id));
}
btns.forEach((b) =>
  b.addEventListener("click", () => activate(b.dataset.screen)),
);

function toggleTQ(el) {
  const ans = el.nextElementSibling;
  const isOpen = el.classList.contains("open");
  document
    .querySelectorAll(".timeline-question")
    .forEach((q) => q.classList.remove("open"));
  document
    .querySelectorAll(".tq-answer")
    .forEach((a) => a.classList.remove("show"));
  if (!isOpen) {
    el.classList.add("open");
    ans.classList.add("show");
  }
}

function toggleMito(el) {
  const body = el.nextElementSibling;
  const isOpen = body.classList.contains("show");
  document
    .querySelectorAll(".mito-body")
    .forEach((b) => b.classList.remove("show"));
  if (!isOpen) body.classList.add("show");
}

function toggleCheck(el) {
  el.classList.toggle("checked");
}

let currentTextBox = null;
let offsetX, offsetY;
const container = document.getElementById("map-container");

document.getElementById("map").addEventListener("click", (e) => {
  if (e.target.tagName === "TEXTAREA") return;
  const box = document.createElement("textarea");
  box.className = "text-box";
  box.style.left = `${e.offsetX}px`;
  box.style.top = `${e.offsetY}px`;
  box.contentEditable = true;
  applyStyles(box);
  enableInteractions(box);
  container.appendChild(box);
  box.focus();
});

function applyStyles(box) {
  box.style.fontFamily = document.getElementById("fontFamily").value;
  box.style.fontSize = document.getElementById("fontSize").value;
  box.style.color = document.getElementById("fontColor").value;
  box.style.fontWeight = document.queryCommandState("bold") ? "bold" : "normal";
  box.style.fontStyle = document.queryCommandState("italic") ? "italic" : "normal";
}

function toggleBold() {
  document.execCommand("bold", false);
}
function toggleItalic() {
  document.execCommand("italic", false);
}

function enableInteractions(box) {
  box.addEventListener("mousedown", (e) => {
    currentTextBox = box;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    e.stopPropagation();
  });

  box.addEventListener("mouseup", () => currentTextBox = null);
  box.addEventListener("input", () => applyStyles(box));

  box.setAttribute("contenteditable", "true");
  box.spellcheck = false;
  box.addEventListener("click", (e) => e.stopPropagation());

  // Enable resizing
  box.style.resize = "both";
  box.style.overflow = "auto";
}

document.addEventListener("mousemove", (e) => {
  if (currentTextBox) {
    currentTextBox.style.left = `${e.pageX - container.offsetLeft - offsetX}px`;
    currentTextBox.style.top = `${e.pageY - container.offsetTop - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => currentTextBox = null);

function deleteSelected() {
  if (document.activeElement.classList.contains("text-box")) {
    document.activeElement.remove();
  }
}

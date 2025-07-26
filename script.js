const overlay = document.getElementById("overlay");
const addTextBoxBtn = document.getElementById("addTextBoxBtn");
const fontSelect = document.getElementById("fontSelect");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const fontColorPicker = document.getElementById("fontColorPicker");
const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const deleteBtn = document.getElementById("deleteBtn");

let selectedBox = null;
let creatingTextBox = false;

addTextBoxBtn.onclick = () => {
  creatingTextBox = true;
  overlay.style.cursor = "crosshair";
};

overlay.onclick = (e) => {
  if (!creatingTextBox) return;
  const box = document.createElement("div");
  box.className = "text-box";
  box.contentEditable = true;
  box.style.left = `${e.offsetX}px`;
  box.style.top = `${e.offsetY}px`;
  box.style.fontFamily = fontSelect.value;
  box.style.fontSize = fontSizeSelect.value;
  box.style.color = fontColorPicker.value;
  box.style.fontWeight = boldBtn.classList.contains("active") ? "bold" : "normal";
  box.style.fontStyle = italicBtn.classList.contains("active") ? "italic" : "normal";

  box.onmousedown = (ev) => {
    if (ev.target !== box) return;
    selectedBox = box;
    let shiftX = ev.clientX - box.getBoundingClientRect().left;
    let shiftY = ev.clientY - box.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      box.style.left = pageX - shiftX + "px";
      box.style.top = pageY - shiftY + "px";
    };

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    };

    document.addEventListener("mousemove", onMouseMove);

    box.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      box.onmouseup = null;
    };
  };

  box.onclick = (e) => {
    e.stopPropagation();
    selectedBox = box;
  };

  overlay.appendChild(box);
  creatingTextBox = false;
  overlay.style.cursor = "default";
};

boldBtn.onclick = () => {
  boldBtn.classList.toggle("active");
  if (selectedBox) {
    document.execCommand("bold");
  }
};

italicBtn.onclick = () => {
  italicBtn.classList.toggle("active");
  if (selectedBox) {
    document.execCommand("italic");
  }
};

fontSelect.onchange = () => {
  if (selectedBox) selectedBox.style.fontFamily = fontSelect.value;
};

fontSizeSelect.onchange = () => {
  if (selectedBox) selectedBox.style.fontSize = fontSizeSelect.value;
};

fontColorPicker.oninput = () => {
  if (selectedBox) selectedBox.style.color = fontColorPicker.value;
};

deleteBtn.onclick = () => {
  if (selectedBox && overlay.contains(selectedBox)) {
    overlay.removeChild(selectedBox);
    selectedBox = null;
  }
};
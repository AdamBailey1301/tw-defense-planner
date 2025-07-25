
let currentTextBox = null;

function createTextBox() {
  const box = document.createElement("div");
  box.contentEditable = true;
  box.className = "textbox";
  box.style.left = "50px";
  box.style.top = "50px";
  box.style.fontFamily = document.getElementById("fontFamily").value;
  box.style.color = document.getElementById("fontColor").value;
  box.style.fontSize = document.getElementById("fontSize").value + "px";
  box.style.fontWeight = "normal";
  box.style.fontStyle = "normal";
  box.style.position = "absolute";
  box.style.zIndex = 10;
  box.style.cursor = "move";
  box.setAttribute("draggable", true);

  box.onmousedown = (e) => {
    currentTextBox = box;
    let shiftX = e.clientX - box.getBoundingClientRect().left;
    let shiftY = e.clientY - box.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      box.style.left = pageX - shiftX + "px";
      box.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    box.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      box.onmouseup = null;
    };
  };

  box.ondragstart = function () {
    return false;
  };

  document.getElementById("canvas").appendChild(box);
  box.focus();
}

function updateFont(type) {
  if (!currentTextBox) return;
  if (type === "fontFamily") {
    currentTextBox.style.fontFamily = document.getElementById("fontFamily").value;
  } else if (type === "fontColor") {
    currentTextBox.style.color = document.getElementById("fontColor").value;
  } else if (type === "fontSize") {
    currentTextBox.style.fontSize = document.getElementById("fontSize").value + "px";
  }
}

function toggleBold() {
  if (!currentTextBox) return;
  currentTextBox.style.fontWeight = currentTextBox.style.fontWeight === "bold" ? "normal" : "bold";
}

function toggleItalic() {
  if (!currentTextBox) return;
  currentTextBox.style.fontStyle = currentTextBox.style.fontStyle === "italic" ? "normal" : "italic";
}

function exportToImage() {
  html2canvas(document.getElementById("canvasWrapper")).then(canvas => {
    const link = document.createElement("a");
    link.download = "tw-defense-plan.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

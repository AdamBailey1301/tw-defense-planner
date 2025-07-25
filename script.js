const canvas = document.getElementById("twCanvas");
const ctx = canvas.getContext("2d");
const labelInput = document.getElementById("labelText");
let mode = "add";
let labels = [];
let draggingIndex = null;
let offsetX, offsetY;

const background = new Image();
background.src = "map.png";
background.onload = () => ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

function setAddMode() { mode = "add"; }
function setMoveMode() { mode = "move"; }

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (mode === "add" && labelInput.value) {
    labels.push({ text: labelInput.value, x, y });
    redraw();
  } else if (mode === "move") {
    draggingIndex = labels.findIndex(lbl => Math.abs(lbl.x - x) < 60 && Math.abs(lbl.y - y) < 20);
    if (draggingIndex !== -1) {
      offsetX = x - labels[draggingIndex].x;
      offsetY = y - labels[draggingIndex].y;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (draggingIndex !== null) {
    const rect = canvas.getBoundingClientRect();
    labels[draggingIndex].x = e.clientX - rect.left - offsetX;
    labels[draggingIndex].y = e.clientY - rect.top - offsetY;
    redraw();
  }
});

canvas.addEventListener("mouseup", () => draggingIndex = null);

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  labels.forEach(label => ctx.fillText(label.text, label.x, label.y));
}

function exportImage() {
  const link = document.createElement("a");
  link.download = "tw-defense-plan.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

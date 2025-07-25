const container = document.getElementById('canvasContainer');
const addTextBoxBtn = document.getElementById('addTextBox');
const fontFamilySelect = document.getElementById('fontFamily');
const fontColorInput = document.getElementById('fontColor');
const fontSizeInput = document.getElementById('fontSize');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');

addTextBoxBtn.addEventListener('click', () => {
  const textBox = document.createElement('div');
  textBox.className = 'text-box';
  textBox.contentEditable = true;
  textBox.style.fontFamily = fontFamilySelect.value;
  textBox.style.color = fontColorInput.value;
  textBox.style.fontSize = fontSizeInput.value + 'px';
  textBox.style.fontWeight = boldBtn.classList.contains('active') ? 'bold' : 'normal';
  textBox.style.fontStyle = italicBtn.classList.contains('active') ? 'italic' : 'normal';
  textBox.style.left = '50px';
  textBox.style.top = '50px';
  container.appendChild(textBox);
});

fontFamilySelect.addEventListener('change', () => updateSelectedTextBox('fontFamily', fontFamilySelect.value));
fontColorInput.addEventListener('input', () => updateSelectedTextBox('color', fontColorInput.value));
fontSizeInput.addEventListener('input', () => updateSelectedTextBox('fontSize', fontSizeInput.value + 'px'));
boldBtn.addEventListener('click', () => {
  boldBtn.classList.toggle('active');
  updateSelectedTextBox('fontWeight', boldBtn.classList.contains('active') ? 'bold' : 'normal');
});
italicBtn.addEventListener('click', () => {
  italicBtn.classList.toggle('active');
  updateSelectedTextBox('fontStyle', italicBtn.classList.contains('active') ? 'italic' : 'normal');
});

let currentTextBox = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('text-box')) {
    currentTextBox = e.target;
    offsetX = e.clientX - currentTextBox.getBoundingClientRect().left;
    offsetY = e.clientY - currentTextBox.getBoundingClientRect().top;
    currentTextBox.style.zIndex = 1000;
  }
});

document.addEventListener('mousemove', function (e) {
  if (currentTextBox) {
    currentTextBox.style.left = `${e.clientX - offsetX}px`;
    currentTextBox.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', function () {
  if (currentTextBox) {
    currentTextBox.style.zIndex = 1;
    currentTextBox = null;
  }
});

function updateSelectedTextBox(styleProp, value) {
  const boxes = document.querySelectorAll('.text-box');
  boxes.forEach(box => {
    if (box === document.activeElement) {
      box.style[styleProp] = value;
    }
  });
}
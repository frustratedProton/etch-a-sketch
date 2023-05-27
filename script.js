const grid = document.querySelector('.grid')
const userValue = document.querySelector('.new-grid-size')
const submitBtn = document.querySelector('.submit')
const promptText = document.querySelector('#prompt')
const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')


let currentColor = 'black'
let currentMode = 'color'
let currentSize = 16

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    selectNewMode(newMode)
    currentMode = newMode
}

function setCurrentSize() {
    let newSize = getSize()
    setCurrentSize = newSize
    reloadGrid()
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()
userValue.addEventListener('focus', entryHint)
submitBtn.addEventListener('click', setCurrentSize)


function entryHint() {
    promptText.textContent = "Enter a number between 1 and 100.";
}

function selectNewMode(newMode) {
    {
        if (currentMode === 'rainbow') {
            rainbowBtn.classList.remove('active')
        } else if (currentMode === 'color') {
            colorBtn.classList.remove('active')
        } else if (currentMode === 'eraser') {
            eraserBtn.classList.remove('active')
        }

        if (newMode === 'rainbow') {
            rainbowBtn.classList.add('active')
        } else if (newMode === 'color') {
            colorBtn.classList.add('active')
        } else if (newMode === 'eraser') {
            eraserBtn.classList.add('active')
        }
    }
}

function changeColor(e) {
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#b0a58d'
    }
}


function getSize() {
    let size = userValue.value;
    if (size < 0 || size > 100 || isNaN(size)) {
        promptText.textContent = "Make sure it's a number between 1 and 100!";
        size = 16
    } else if (size == "") {
        promptText.textContent = "Enter a number"
        size = 16
    } 
    return size;
}

function reloadGrid() {
    let size = getSize()
    grid.innerHTML = ''
    makeGrid(size)
}

function makeGrid(size) {
    for (let i = 0; i < size * size; i++) {
        let divElement = document.createElement('div')
        divElement.classList.add('grid-element')
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`    
        grid.insertAdjacentElement('beforeend', divElement)
        divElement.addEventListener('mouseover', changeColor)
    }
}

window.onload = () => {
    makeGrid(currentSize)
    selectNewMode('color')
}
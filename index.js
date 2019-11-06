let keys = [
    ["Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab","Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\","Del"],
    ["CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
    ["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", "", "Alt", "◄", "▼", "►", "Ctrl"]
];

let codes = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
    ["ControlLeft", "OSLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"]
];

let keysEn = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab","Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\","Del"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", "", "Alt", "◄", "▼", "►", "Ctrl"]
];



let wrapper = document.createElement('div');
wrapper.className = "wrapper";
document.body.append(wrapper);

let textarea = document.createElement('textarea');
textarea.className = "textarea";
wrapper.append(textarea);
textarea.focus();

let keyboard = document.createElement('div');
keyboard.className = "keyboard";
wrapper.append( keyboard);

for (let i = 0; i < 5; i++) {
    
    let row = document.createElement('div');
    row.classList.add("row");
    keyboard.append(row);
    
        for (let j = 0; j < keys[i].length; j++) {
            
            let key = document.createElement('div');
            key.classList.add("key");
            key.classList.add(codes[i][j]);
            row.append(key);
            
            let span = document.createElement('span');
            span.classList.add("ru");
            span.classList.add("on");
            key.append(span);
            span.innerHTML = keys[i][j];
            
            span = document.createElement('span');
            span.classList.add("en");
            span.classList.add("off");
            key.append(span);
            span.innerHTML = keysEn[i][j];
        }
    
}

document.addEventListener('keydown', function (event) {
    
    event.preventDefault();

    let pressedKey = document.querySelector("." + event.code);

    if (!(pressedKey.classList.contains("ControlLeft") || pressedKey.classList.contains("AltLeft") || pressedKey.classList.contains("OSLeft") ||
    pressedKey.classList.contains("ShiftLeft") || pressedKey.classList.contains("CapsLock") || pressedKey.classList.contains("Tab") ||
    pressedKey.classList.contains("Backspace") || pressedKey.classList.contains("Delete") || pressedKey.classList.contains("Enter") ||
    pressedKey.classList.contains("ControlRight") || pressedKey.classList.contains("AltRight") || pressedKey.classList.contains("ShiftRight"))) {
        textarea.value += pressedKey.querySelector(".on").innerHTML;
    }

    if (pressedKey.classList.contains("Backspace")) {
        let data = textarea.value;
        textarea.value = "";
        for (let i = 0; i < data.length - 1; i++) {
           textarea.value += data[i];
       } 
    }
    
    pressedKey.classList.add("pressed");
    
   
    let pressedAll = document.querySelectorAll(".pressed");
   
    let changelang = 0;
    for (let i = 0; i < pressedAll.length; i++) {
        
        if (pressedAll[i].classList.contains("ShiftLeft")) {
             changelang++;
        }
        
        if (pressedAll[i].classList.contains("ControlLeft")) {
            changelang++;
        }
        
        if (changelang === 2) {
            let on = document.querySelectorAll(".on");
            let off = document.querySelectorAll(".off");
        
            on.forEach(element => {
            element.classList.remove("on");
            element.classList.add("off");
            });
        
            off.forEach(element => {
            element.classList.remove("off");
            element.classList.add("on");
            });
        }   
    }
})

document.addEventListener('keyup', function(event) {
    let unpressedKey = document.querySelector("." + event.code);
    unpressedKey.classList.remove("pressed");
})


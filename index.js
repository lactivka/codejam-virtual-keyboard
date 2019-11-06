// RU keyboard array
let keys = [
    ["Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab","Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\","Del"],
    ["CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
    ["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"]
];

// key's codes array
let codes = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
    ["ControlLeft", "OSLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"]
];

// EN keyboard array
let keysEn = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab","Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\","Del"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"]
];


// create class wrapper and add div element to body
let wrapper = document.createElement('div');
wrapper.className = "wrapper";
document.body.append(wrapper);

// create textarea with class textarea and add to body into wrapper
let textarea = document.createElement('textarea');
textarea.className = "textarea";
wrapper.append(textarea);
textarea.focus();

// create div element with class keyboard and add to body into wrapper
let keyboard = document.createElement('div');
keyboard.className = "keyboard";
wrapper.append( keyboard);

// create keys on keyboard
for (let i = 0; i < 5; i++) { // add five rows with class row into keyboard
    
    let row = document.createElement('div');
    row.classList.add("row");
    keyboard.append(row);
    
        // add keys into rows with classes key and keycode of the key
        for (let j = 0; j < keys[i].length; j++) {
            
            let key = document.createElement('div');
            key.classList.add("key");
            key.classList.add(codes[i][j]);
            row.append(key);
            
            // add two span elements (one with classes ru and on and other with class en and off) into every key
            // add value of every span with class ru from RU keyboard array for and with class en from EN keyboard array
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

// listen to event keydown from real keyboard
document.addEventListener('keydown', function (event) {
    
    // turn off default behavior of real keyboard keys
    event.preventDefault();

    // find what pressed key by selector that equal event.code
    let pressedKey = document.querySelector("." + event.code);

     // in case of CapsLock it stay pressed until we press it again
    if (pressedKey.classList.contains("CapsLock")) {
        pressedKey.classList.toggle("pressed");
    }
    else {
       pressedKey.classList.add("pressed"); 
    }

    // select all elements with class pressed
    let pressedAll = document.querySelectorAll(".pressed");

    // print to textarea value from span element that responds pressed key (except for Alt, Shift, CapsLock etc.) and have class on
    if (pressedAll.length > 1) {
        for (let i = 0; i < pressedAll.length; i++) {
            if (pressedAll[i].classList.contains("CapsLock") || pressedAll[i].classList.contains("ShiftLeft") || pressedAll[i].classList.contains("ShiftRight")) {
                if (!(pressedKey.classList.contains("ControlLeft") || pressedKey.classList.contains("AltLeft") || pressedKey.classList.contains("OSLeft") ||
                pressedKey.classList.contains("ShiftLeft") || pressedKey.classList.contains("CapsLock") || pressedKey.classList.contains("Tab") ||
                pressedKey.classList.contains("Backspace") || pressedKey.classList.contains("Delete") || pressedKey.classList.contains("Enter") ||
                pressedKey.classList.contains("ControlRight") || pressedKey.classList.contains("AltRight") || pressedKey.classList.contains("ShiftRight"))){
                   // print in UpperCase
                    textarea.value += pressedKey.querySelector(".on").innerHTML;  
                    return;
                }   
            }
        }
    }
    else if (!(pressedKey.classList.contains("ControlLeft") || pressedKey.classList.contains("AltLeft") || pressedKey.classList.contains("OSLeft") ||
    pressedKey.classList.contains("ShiftLeft") || pressedKey.classList.contains("CapsLock") || pressedKey.classList.contains("Tab") ||
    pressedKey.classList.contains("Backspace") || pressedKey.classList.contains("Delete") || pressedKey.classList.contains("Enter") ||
    pressedKey.classList.contains("ControlRight") || pressedKey.classList.contains("AltRight") || pressedKey.classList.contains("ShiftRight"))) {
        
        // print in LowerCase
        textarea.value += pressedKey.querySelector(".on").innerHTML.toLowerCase();
    }

    // in case of pressed Backspace remove text from textarea
    if (pressedKey.classList.contains("Backspace")) {
        let data = textarea.value;
        textarea.value = "";
        for (let i = 0; i < data.length - 1; i++) {
           textarea.value += data[i];
       } 
    }
    
    // if we press ShiftLeft and ControlLeft together the language of keyboard change by passing class on to another span element
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

// listen to event keyup from real keyboard
document.addEventListener('keyup', function(event) {
    let unpressedKey = document.querySelector("." + event.code);
    if (!unpressedKey.classList.contains("CapsLock")) {
        unpressedKey.classList.remove("pressed");   
    } 
})
 // listen to event mousedown
document.addEventListener('mousedown', function(event) {
   
    let addclass = event.target.classList;
    
    
   // when click on textarea
   if (addclass.contains("textarea")) {
       return;
   }
   // when click on CapsLock
   if (addclass.contains("CapsLock")) {
       addclass.toggle("pressedmouse");    
   }
   
   // print clicked key value in LowerCase
   // when click on element with class key
    if (addclass.contains("key")) {
            addclass.add("pressedmouse");

            if (!(addclass.contains("ControlLeft") || addclass.contains("AltLeft") || addclass.contains("OSLeft") ||
                addclass.contains("ShiftLeft") || addclass.contains("CapsLock") || addclass.contains("Tab") ||
                addclass.contains("Backspace") || addclass.contains("Delete") || addclass.contains("Enter") ||
                addclass.contains("ControlRight") || addclass.contains("AltRight") || addclass.contains("ShiftRight"))) {
                    textarea.value += event.target.firstChild.innerHTML.toLowerCase();
            }        
    }
    else{
        // when click on span element 
        if (addclass.contains("on")) {
        if (event.target.closest("div").classList.contains("CapsLock")){
               
            event.target.closest("div").classList.toggle("pressedmouse");
        }
        else {
            event.target.closest("div").classList.add("pressedmouse");
            
            if (!(event.target.closest("div").classList.contains("ControlLeft") || event.target.closest("div").classList.contains("AltLeft") || event.target.closest("div").classList.contains("OSLeft") ||
                event.target.closest("div").classList.contains("ShiftLeft") || event.target.closest("div").classList.contains("CapsLock") || event.target.closest("div").classList.contains("Tab") ||
                event.target.closest("div").classList.contains("Backspace") || event.target.closest("div").classList.contains("Delete") || event.target.closest("div").classList.contains("Enter") ||
                event.target.closest("div").classList.contains("ControlRight") || event.target.closest("div").classList.contains("AltRight") || event.target.closest("div").classList.contains("ShiftRight"))) {
                    textarea.value += event.target.innerHTML.toLowerCase();
                } 
           }
       }       
    } 
})

// listen to mouseup event
document.addEventListener('mouseup', function(event) {
    
    // remove class pressedmouse from clicked element (except for CapsLock)
    if (!event.target.classList.contains("CapsLock")) {
        if (event.target.classList.contains("on")) {
            event.target.closest("div").classList.remove("pressedmouse");
        }
    else {
       event.target.classList.remove("pressedmouse"); 
    }
    }    
})




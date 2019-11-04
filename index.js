let keys = [
    ["Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab","Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\","Del"],
    ["CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", ],
    ["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "▲", "Shift", ],
    ["Ctrl", "Win", "Alt", "", "Alt", "◄", "▼", "►", "Ctrl", ],
];

let wrapper = document.createElement('div');
wrapper.className = "wrapper";
document.body.append(wrapper);

let textarea = document.createElement('textarea');
textarea.className = "textarea";
wrapper.insertAdjacentElement('afterbegin', textarea);

let keyboard = document.createElement('div');
keyboard.className = "keyboard";
wrapper.insertAdjacentElement('beforeend', keyboard);

for (let i = 0; i < 5; i++) {
    let row = document.createElement('div');
    row.className = "row";
    keyboard.insertAdjacentElement('beforeend', row);
    
        for (let j = 0; j < keys[i].length; j++) {
            let key = document.createElement('div');
            key.className = "key";
            row.insertAdjacentElement('beforeend', key);
            let span = document.createElement('span');
            key.insertAdjacentElement('afterbegin', span);
            
            span.innerHTML = keys[i][j];
            
            if (i === 0 & j === 13) {
                key.classList.add("backspace");
            }
            
            if (i === 1 & j === 0) {
                key.classList.add("tab");
            }

            if (i === 1 & j === 14) {
                key.classList.add("del");
            }

            if (i === 2 & j === 0) {
                key.classList.add("capslock");
            }
            
            if (i === 2 & j === 12) {
                key.classList.add("enter");
            }

            if (i === 3 & j === 0) {
                key.classList.add("leftshift");
            }

            if (i === 3 & j === 12) {
                key.classList.add("rightshift");
            }

            if ((i === 3 & j === 11) || (i === 4 & j > 4 & j < 8)) {
                key.classList.add("arrow");
            }
            
            if ((i === 4 & (j === 0 || j === 8))) {
                key.classList.add("ctrl");
            }

            if (i === 4 & j === 1) {
                key.classList.add("win");
            }

            if (i === 4 & (j === 2 || j === 4)) {
                key.classList.add("alt");
            }

            if (i === 4 & j === 3) {
                key.classList.add("space");
            }
            
        }
    
    
       
}


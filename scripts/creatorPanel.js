import {_, createElement, imgPreview, getContrast} from 'https://cdn.jsdelivr.net/gh/LeojAnidem/Library/domFunctions.js';

const createPanel = function(){
    const editChk = _('#edit'),
        addItem = _('.creatorCard .add'),
        colorInput = _('#colorSelector'),
        removeItem = _('.creatorCard .delete');

    let numId = 0,
        numItems = '';

    imgPreview('#imgHolder', '#imgPreview');

    // Cambiamos el color en tiempo real
    colorInput.addEventListener('change', function(){
        let color = colorInput.value,
            colorLetter = getContrast(color),
            colorPlaceholder = getContrast(colorLetter);

            console.log(colorLetter);
            console.log(colorPlaceholder);

        document.documentElement.style.setProperty('--c_creatorCardBackground', color);
        document.documentElement.style.setProperty('--c_creatorCardImgBackground', colorLetter);
        document.documentElement.style.setProperty('--c_creatorCardPlaceHolder', colorPlaceholder);
        document.documentElement.style.setProperty('--c_creatorCardFont', colorLetter);
    });

    // Desactivamos o activamos la edicion de la informacion
    editChk.addEventListener('change', function() {
        let otp = document.querySelectorAll('#otp');

        if(editChk.checked){
            otp.forEach(e => {
                e.removeAttribute('disabled');
                e.classList.remove('disabled');
            });
        }

        else{
            otp.forEach(e => {
                e.setAttribute('disabled', 'true');
                e.className += ' disabled';
            });
        }
    });

    // Agregamos opciones de size
    addItem.addEventListener('click', function(){
    
        let itemId = `item${numId}`;

        numItems = document.querySelectorAll('.creatorCard .item').length;

        if (numItems === 1){
            removeItem.classList.remove('hidden');
        }

        if (numItems === 4){
            addItem.className += ' hidden';
        }

        createElement('.creatorCard .items', 'div' , `item ${itemId}`);
        createElement(`.creatorCard .${itemId}`, 'input', 'text', '', '32');

        let item = _(`.creatorCard .items .${itemId} input`);
        item.setAttribute('onKeypress', 'if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;');
        item.setAttribute('maxLength', '2')
        item.setAttribute('id', 'otp'); 

        numId++;
    });
    
    // Eliminamos opciones de size
    removeItem.addEventListener('click', function(){
        let lastItem = _('.creatorCard .items').lastChild;
        lastItem.remove();
        
        numItems = document.querySelectorAll('.creatorCard .item').length;

        if(numItems === 1){
            removeItem.className += ' hidden';
        }

        if(numItems === 4){
            addItem.classList.remove('hidden');
        }

        numId--;
    });
}

export {createPanel};

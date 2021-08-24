"use strict"

const formTag=document.forms.validForm;
formTag.addEventListener('submit', validForm,false); 

function validForm(EO) {
    EO=EO||window.event;
    try {

        const formTag=document.forms.validForm;

        let firstInvalid;
        
        const developerField=formTag.elements.developer;
        const developerValue=developerField.value;
        
        const websiteField=formTag.elements.website;
        const websiteValue=websiteField.value;

        const websiteURLField=formTag.elements.websiteURL;
        const websiteURLValue=websiteURLField.value;

        const dataField=formTag.elements.data;
        const dataValue=dataField.value;

        const amountField=formTag.elements.amount;
        const amountValue=amountField.value;

        const emailField=formTag.elements.email;
        const emailValue=emailField.value;

        const catalogField=formTag.elements.catalog;
        const catalogValue=catalogField.value;

        const kindField=formTag.elements.kind;
        const kindValue=kindField.value;

        const agreeField=formTag.elements.agree;
        const agreeValue=agreeField.checked;

        const descriptionField=formTag.elements.description;
        const descriptionValue=descriptionField.value;


        if (!developerValue) {
           let parent=developerField.parentNode;
           let message=parent.querySelector('.validation_message'); 
           message.textContent='*Введите информацию';
           firstInvalid=firstInvalid||developerField;
        }

        if (websiteValue.length<2) {
            let parent=websiteField.parentNode;
            let message=parent.querySelector('.validation_message');
            message.textContent='*Введите название имеющее больше двух букв';
            firstInvalid=firstInvalid||websiteField;
        }

        if (!websiteURLValue) {
            let parent=websiteURLField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите информацию';
            firstInvalid=firstInvalid||websiteURLField;
        }

        if (isNaN(dataValue)||!dataValue) {
            let parent=dataField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите число';
            firstInvalid=firstInvalid||dataField;
        }

        if (amountValue<0||!amountValue) {
            let parent=amountField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите число';
            firstInvalid=firstInvalid||amountField;
        }

        if (!emailValue) {
            let parent=emailField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите информацию';
            firstInvalid=firstInvalid||emailField;
        }

        if (catalogValue==3) {
            let parent=catalogField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*К сожалению выбранная рубрика пуста';
            firstInvalid=firstInvalid||catalogField;
        }

        if (!agreeValue) {
            let parent=agreeField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Вы не разрешили оставить отзыв';
            firstInvalid=firstInvalid||agreeField;
        }

        if (!descriptionValue) {
            let parent=descriptionField.parentNode;
            let message=parent.querySelector('.validation_message');
            message.textContent='*Введите описание сайта';
            firstInvalid=firstInvalid||descriptionField;
        }

        if (firstInvalid) {
            firstInvalid.focus();
            EO.preventDefault();
        }  

    }

    catch (ex) {
        alert('Извините, что-то пошло не так');
        EO.preventDefault();
        console.log(ex);
    }

}

formTag.addEventListener('focusout', validInput,false); 
function validInput(EO) {
    EO=EO||window.event;

    let input=EO.target;
    let parent=input.parentNode;
    let message=parent.querySelector('.validation_message'); 

    switch (input.name) {
        case 'developer' :
            if (!input.value) {
                message.textContent='*Введите информацию';
            }
            break;
        case 'website' :
            if (input.value.length<2) {
                message.textContent='*Введите название имеющее больше двух букв';
            }
            break;
        case 'websiteURL' :
            if (!input.value) {
                message.textContent='*Введите информацию';
            }
            break;
        case 'data' :
            if (isNaN(input.value)||!input.value) {
                message.textContent='*Введите число';
            }
            break;
        case 'amount' :
            if (input.value<0||!input.value) {
                message.textContent='*Введите число';
            }
            break;
        case 'email' :
            if (!input.value) {
                message.textContent='*Введите информацию';
            }
            break;
        case 'catalog' :
            if (input.value==3) {
                message.textContent='*К сожалению выбранная рубрика пуста';
            }
            break;
        case 'kind' :
            if (!input.value) {
                let parentKind=input[0].parentNode;
                let message=parentKind.querySelector('.validation_message'); 
                message.textContent='*Вы не выбрали способ размещения!';
            }
            break;

        case 'agree' :
            if (!input.checked) {
                message.textContent='*Вы не разрешили оставить отзыв';
            }
            break;
        case 'description' :
            if (!input.value) {
                message.textContent='*Введите описание сайта';
            }
            break
    }

}
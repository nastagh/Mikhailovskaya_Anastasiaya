"use strict"

const formTag=document.forms.validForm;
formTag.addEventListener('submit', validForm,false); 

function validForm(EO) {
    EO=EO||window.event;
    try {

        const formTag=document.forms.validForm;

        let firstInvalid;
        
        const developerField=formTag.elements.developer;
        let developerValue=developerField.value;
        
        const websiteField=formTag.elements.website;
        let websiteValue=websiteField.value;

        const websiteURLField=formTag.elements.websiteURL;
        let websiteURLValue=websiteURLField.value;

        const dataField=formTag.elements.data;
        let dataValue=dataField.value;

        const amountField=formTag.elements.amount;
        let amountValue=amountField.value;

        const emailField=formTag.elements.email;
        let emailValue=emailField.value;

        const catalogField=formTag.elements.catalog;
        let catalogValue=catalogField.value;

        const kindField=formTag.elements.kind;
        let kindValue=kindField.value;

        const agreeField=formTag.elements.agree;
        let agreeValue=agreeField.checked;

        const descriptionField=formTag.elements.description;
        let descriptionValue=descriptionField.value;


        if (!developerValue) {
           let parent=developerField.parentNode;
           let message=parent.querySelector('.validation_message'); 
           message.textContent='*Введите информацию';
           if (!firstInvalid) {
            firstInvalid=developerField;
           } 
           EO.preventDefault();
        }

        if (websiteValue.length<2) {
            let parent=websiteField.parentNode;
            let message=parent.querySelector('.validation_message');
            message.textContent='*Введите название имеющее больше двух букв';
            if (!firstInvalid) {
                firstInvalid=websiteField;
               } 
            EO.preventDefault();
        }

        if (!websiteURLValue) {
            let parent=websiteURLField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите информацию';
            if (!firstInvalid) {
                firstInvalid=websiteURLField;
               }
            EO.preventDefault();
        }

        if (isNaN(dataValue)||!dataValue) {
            let parent=dataField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите число';
            if (!firstInvalid) {
                firstInvalid=dataField;
               }
            EO.preventDefault();
        }

        if (amountValue<0||!amountValue) {
            let parent=amountField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите число';
            if (!firstInvalid) {
                firstInvalid=amountField;
               }
            EO.preventDefault();
        }

        if (!emailValue) {
            let parent=emailField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Введите информацию';
            if (!firstInvalid) {
                firstInvalid=emailField;
               }
            EO.preventDefault();
        }

        if (catalogValue==3) {
            let parent=catalogField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*К сожалению выбранная рубрика пуста';
            if (!firstInvalid) {
                firstInvalid=catalogField;
               }
            EO.preventDefault();
        }

        if (!kindValue) {
            let parent=kindField[0].parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Вы не выбрали способ размещения!';
            if (!firstInvalid) {
                firstInvalid=document.getElementById('textKind');
               }
            EO.preventDefault();
        }

        if (!agreeValue) {
            let parent=agreeField.parentNode;
            let message=parent.querySelector('.validation_message'); 
            message.textContent='*Вы не разрешили оставить отзыв';
            if (!firstInvalid) {
                firstInvalid=agreeField;
               }
            EO.preventDefault();
        }

        if (!descriptionValue) {
            let parent=descriptionField.parentNode;
            let message=parent.querySelector('.validation_message');
            message.textContent='*Введите описание сайта';
            if (!firstInvalid) {
                firstInvalid=descriptionField;
               }
            EO.preventDefault();
        }

        if (firstInvalid) {
            firstInvalid.focus();
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
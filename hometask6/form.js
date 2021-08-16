'use strict'

const dynForm=document.forms.dyn_form;

dynForm.setAttribute('action','https://fe.it-academy.by/TestForm.php');
dynForm.setAttribute('method','post');
const dynForm2=document.forms.dyn_form2;
dynForm2.setAttribute('action','https://fe.it-academy.by/TestForm.php');
dynForm2.setAttribute('method','post');

function fillForm(form,array) {
    for (let description of array) {
        const labelElement=document.createElement('label');
        let inputElement;
        labelElement.innerHTML=description.label; 
        switch (description.kind) {
            case 'longtext':
                inputElement=document.createElement('input');
                inputElement.setAttribute('type','text');
                inputElement.className='longtext';
                inputElement.setAttribute('name',description.name);
                break;
            case 'shorttext':
                inputElement=document.createElement('input');
                inputElement.setAttribute('type','text');
                inputElement.className='shorttext';
                inputElement.setAttribute('name',description.name);
                break;
            case 'number':
                inputElement=document.createElement('input');
                inputElement.setAttribute('type','number');
                inputElement.setAttribute('name',description.name);
                break;
            case 'combo':
                inputElement=document.createElement('select');
                description.variants.forEach(variant => {
                    let  option=document.createElement('option');
                    option.innerHTML=variant.text;
                    option.setAttribute('value',variant.value);
                    inputElement.appendChild(option);
                    
                });
                inputElement.setAttribute('name',description.name);
                break;
            case 'radio':
                inputElement=document.createElement('div');
                description.variants.forEach(variant => {
                    let pElem=document.createElement('p');                   
                    let radioInput=document.createElement('input');
                    radioInput.setAttribute('type','radio');                    
                    pElem.appendChild(radioInput);
                    pElem.append(variant.text);
                    pElem.setAttribute('value', variant.value)
                    inputElement.appendChild(pElem);                                        
                });
                inputElement.setAttribute('name',description.name);
                break;
            case 'check':
                inputElement=document.createElement('input');
                inputElement.setAttribute('type','checkbox');
                inputElement.setAttribute('checked','');
                inputElement.setAttribute('name',description.name);
                break;
            case 'memo':
                inputElement=document.createElement('textarea');
                inputElement.setAttribute('name',description.name);
                break;  
            case 'submit':               
                inputElement=document.createElement('input') ;
                inputElement.setAttribute('type','submit');
                inputElement.setAttribute('value', description.label);
                labelElement.innerHTML='';
                break;
            }            

        labelElement.appendChild(inputElement);
        form.appendChild(labelElement);              
    }
}

const formDef1=[
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
      variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
      variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {label:'Опубликовать:',kind:'submit'},
  ];

  const formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];

fillForm(dynForm, formDef1);
fillForm(dynForm2,formDef2);
'use strict'


function fillForm(form,array) {
    for (let description of array) {
        const labelElement=document.createElement('label');
        let inputElement;
        labelElement.innerHTML=description.label;
        switch (description.kind) {
            case 'longtext':
                inputElement=document.createElement('input');
                inputElement.className='longtext';
                break;
            case 'shorttext':
                inputElement=document.createElement('input');
                inputElement.className='shorttext';
                break;
            case 'number':
                inputElement=document.createElement('input');
                inputElement.setAttribute('type','number');
                break;
            case 'combo':
                inputElement=document.createElement('select');
                description.variants.forEach(variant => {
                    let  option=document.createElement('option');
                    option.innerHTML=variant.text;
                    option.setAttribute('value',variant.value);
                    inputElement.appendChild(option);
                });
                break;
            case 'radio':
                inputElement=document.createElement('input');
                description.variants.forEach(variant => {
                   inputElement.innerHTML=variant.text;
                   inputElement.setAttribute('type','radio');
                })
                
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


const dynForm=document.forms.dyn_form;
fillForm(dynForm, formDef1);
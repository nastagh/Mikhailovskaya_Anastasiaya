'use strict'
// I
// Получить div по айдишке qwerty (используя getElementById), записать в переменную qwertyDiv. Вывести в консоль
const qwertyDiv=document.getElementById('qwerty');
console.log (qwertyDiv);
// Сделать текст в полученном диве зеленого цвета (D.20)
qwertyDiv.style.color='green';
// Увеличить размер текста в диве на 30px
qwertyDiv.style.fontSize='30px';
// Присвоить этому диву стилевые классы class1 и class2 (они уже обьявлены в style.css)
qwertyDiv.className='class1 class2';

// II
// Получить дивы, содержащие смайлики (по названию класса smile) используя getElementsByClassName
// Записать результат в переменную smileDivs. Вывести в консоль (посмотреть, что это несовсем обычный массив)
const smileDivs=document.getElementsByClassName('smile');
console.log(smileDivs);
// Поставить всем смайликам цвет текста красным
// С помощью циклов: for(;;) и(ли) for(of) пробежаться по каждому элементу и установить ему цвет
for (let element of smileDivs) {
    element.style.color='red';
}
// Установить второму смайлику цвет желтый (с помощью обращению по индексу массива)
smileDivs[2].style.color='yellow';
// Чтобы использовать forEach() на этом массиве, необходимо его преобразовать в немного другой
// const smileDivsArr = Array.from(smileDivs). Теперь в smileDivsArr будет лежать самый обыкновенный массив, у которого доступен метод forEach
// С помощью forEach, сделать им цвет бэкграунда серым
const smileDivsArr = Array.from(smileDivs);
smileDivsArr.forEach(v => v.style.backgroundColor='grey');

// III
// Получить все дочерние span внутри дива с айдишкой wrapper (используя querySelectorAll)
// Записать результат в переменную wrapperSpans.
const wrapperSpans=document.querySelectorAll('div#wrapper>span');
// С помощью forEach, добавить каждому спану класс class3. Обрати внимание, что у первого спана уже есть класс.
// Если напрямую писать element.className = "qwe", то оно перезапишет всё что там было до изменений.
// Чтобы именно "добавить" класс, лучше использовать element.classList.add(название_класса)
wrapperSpans.forEach(v=>v.classList.add('class3'));
// Измени текст последнего спана на 44 (с помощью innerHTML (D.35))
wrapperSpans[wrapperSpans.length-1].innerHTML='<span>44</span>';
// Измени содержимое второго спана на <div>MY DIV</div> (тоже с помощью innerHTML)
wrapperSpans[1].innerHTML='<div>MY DIV </div>';

// IV
// В переменную credentialsForm поместить форму credentials (через document.forms (D.40)), для проверки вывести в консоль
const credentialsForm=document.forms['credentials'];
console.log(credentialsForm);
// Через обьект формы credentialsForm, получить доступ к инпуту username и password. 
// Записать их в переменные usernameInput, usernamePassword, вывести в консоль, посмотреть значения
const usernameInput=credentialsForm.elements.username;
console.log(usernameInput);
const usernamePassword=credentialsForm.elements.password;
console.log(usernamePassword);
// Расскоменти следующий кусок кода

credentialsForm.onsubmit = (e) => {
    e.preventDefault(); // чтоб страница не обновлялась
    const form = e.target;
    console.log(usernameInput.value);
    console.log(usernamePassword.value);
}

// Он будет срабатывать каждый раз, когда ты подтверждаешь форму (Нажимаешь на кнопку "ENTER").
// В переменной form лежит твоя текущая форма, которая была submit
// с помощью form.elements (D.40) обратись к инпутам username и password.
// Запиши их в переменные usernameInput, passwordInput. 
// У них есть свойство value, в котором хранится текущее значение инпута
// Выведи usernameInput.value и passwordInput.value в консоль. 
// Попробуй ввести значения в инпут username или password, и подтвердить форму, посмотреть в консоль
// Там должны вывестить значения
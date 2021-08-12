'use strict'
// /**
//  * Задать массив simpleNumbers, состоящий из чисел 1 3 5 7 11 
const simpleNumbers=[1,3,5,7,11];
//  * Вывести в консоль четвертый элемент массива
console.log(simpleNumbers[3]);
//  * Создать пустой массив numbers. Заполнить его последовательностю чисел от 1 до N включительно (n=100, можно поменять)
const N = 50;
const numbers=[];
for (let s=1; s<=N; s++) {
    numbers.push(s);
}
console.log(numbers);
//  * Вывести последний элемент массива, не используя переменную N
console.log(numbers[numbers.length-1]);
//  * Добавить в начало и в конец полученного массива -1
numbers.push(-1);
numbers.unshift(-1);
console.log(numbers[0], numbers[numbers.length-1]);
//  * Отсортировать массив, вывести наибольший и наименьший элемент
function mySort (a,b) {
    return a-b;
}
numbers.sort(mySort);
console.log(numbers);
numbers.sort ((a,b)=>b-a);  // второй вариант вызова функции
console.log(numbers);
console.log(numbers[0], numbers[numbers.length-1]);
//  * Создать функцию gen, которая создает и возвращает хеш со свойствами value = случайное число, date = случайная дата
function gen () {
    const hash ={
        value: randomNumber(100),
        date: new Date (randomNumber(10**12))
    }
    return hash;
}
function randomNumber (max) {
    return Math.floor(Math.random()*max);
}
console.log(gen ());
//  * Создать массив history. Заполнить его M элементами, сгенерированными с помощью функции, описанной выше
const M = 7;
const history=[];
for (let s=0; s<M; s++){
    history.push (gen());
}
console.log(history);
//  * Отсортировать полученный массив по дате по возрастанию
function sortHashByDate (a,b){
    return a.date.getTime()-b.date.getTime();
}
history.sort(sortHashByDate);
console.log (history);
//  * Для каждого элемента массива вывести в консоль: "Дата: Thu Jul 22 2021, Значение: 0.7754"
for (let s=0; s<history.length; s++) {
    console.log(`Дата: ${history[s].date.toDateString()}, Значение: ${history[s].value}`)

}
// второй способ
for (let element of history) {
    console.log (`Дата: ${element.date.toDateString()}, Значение: ${element.value}`);
}
// третий способ

history.forEach(printHash);
function printHash (v,i,a) {
    console.log (`Дата: ${v.date.toDateString()}, Значение: ${v.value}`)
}
// 
console.log('dkjfbgk');
history.forEach (v=>console.log (`Дата: ${v.date.toDateString()}, Значение: ${v.value}`));
//  * Создать массив, в который внести те элементы предыдущего массива, у которых значение болье 50
const array = history.filter(v=>v.value>50);
console.log(array); 


// Посчитать сумму value всех элементов массива history . 
// Результат вычисления записать в переменную sumResult
console.log(history)
let sumResult =history.reduce((summ,v)=>summ+v.value,0);
console.log(sumResult);

let dateSumm = history.reduce((summ,v)=>summ+v.date.getFullYear(),0);
console.log(dateSumm);

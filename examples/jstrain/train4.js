'use strict'

// Создать класс HumanF и HumanC через функцию конструктор и класс ES6 соответсвенно, 
// Свойства класса: имя, фамилия 
// Предусмотреть задание имени и фамилии через конструктор
// Реализовать метод hello, который выводит "Привет, Я Имя Фамилия" в консоль
// Реализовать метод changeSurname, который меняет поле surname на полученное
function HumanF (name, surname) {
    this.name=name;
    this.surname=surname;
    this.hello=function () {
        console.log(`Привет, Я ${this.name} ${this.surname}`)
    }
    this.changeSurname = function (newSurname) {
        this.surname=newSurname;
    }
}

const nastya=new HumanF ('Nastya','as');
const pasha=new HumanF ('Pasha', 'df');
nastya.hello();
pasha.hello();
nastya.changeSurname('jhlkj');
nastya.hello();

class HumanC {
    constructor (name, surname) {
        this.name=name;
        this.surname=surname;
    }
    hello() {
        console.log(`Привет, Я ${this.name} ${this.surname}`)
    }
    changeSurname(newSurname) {
        this.surname=newSurname;
    }
}
const nastyaA=new HumanF ('Nastya','as');
const pashaA=new HumanF ('Pasha', 'df');
nastyaA.hello();
pashaA.hello();
nastyaA.changeSurname('jhlkj');
nastyaA.hello();





/**
 * Создать класс Cash, в котором будет храниться количество денег на счете.
 * Реализовать метод add - добавления денег к счету, и subtract
 */

class Cash {
    constructor () {
        this.balance=0;
    }
    add(summ) {
        this.balance+=summ;
    }
    subtract(summ) {
        this.balance-=summ;
    }
    printBalance() {
        console.log(this.balance);
    }
}

const cash1=new Cash;
const cash2=new Cash;
cash1.add(50);
cash1.printBalance();
cash2.subtract(20);
cash2.printBalance();


function CashF () {
    this.balance=0;
    this.add=function (summ) {
        this.balance+=summ;
    }
    this.subtract=function (summ) {
        this.balance-=summ;
    }
    this.printBalance=function () {
        console.log(this.balance);
    }
}
const cash3=new Cash;
const cash4=new Cash;
cash3.add(50);
cash3.printBalance();
cash4.subtract(20);
cash4.printBalance();



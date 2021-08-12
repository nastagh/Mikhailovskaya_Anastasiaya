// /**

//  * Создать хеш weather со свойствами temperature = 25, windSpeed = 10
const weather={temperature:25, windSpeed:10, humidity: 'normal'};

//  * вывести свойство windSpeed в консоль
console.log(weather.windSpeed);

//  * Добавить в хеш свойство isRain = true
weather.isRain=true;

//  * Добавить в хеш свойство date с текущей датой
weather.date=new Date ();
console.log(weather.date.toString());

//  * Создать переменную weatherDate с датой 1 июня 2021
const weatherDate= new Date (2021, 5, 1);
console.log(weatherDate.toString());

//  * Поменять в хеше свойство date на созданную выше дату
weather.date=weatherDate;
console.log(weather.date.toString());

//  * Добавить функцию-метод для обьекта weather, выводящий "Сейчас дождь" или "Сейчас нет дождя" в зависимости от значения isRain
weather.print=function () {
    if (this.isRain) {
        console.log ("Сейчас Дождь")
    }
    else {
        console.log ("Сейчас нет дождя")
    }
}
weather.print();

weather.isRain=false;
weather.print();
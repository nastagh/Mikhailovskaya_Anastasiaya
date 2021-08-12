
/**
 * 1. Создать хеш human c свойствами name=Andrj и surname=Qwerty.
 * 2. Вывести свойство name в консоль. 
 * 2.1Вывести свойство surname в консоль с использованием []
 * 3. Добавить хешу human свойство age = 44
 * 4. Cоздать хеш address с полями street =zzz и houseNumber=24
 * 5. Добавить хешу human поле address, со значением, созданным в предыдущем пункте
 * 6. Вывести полученный хеш в консоль
 * 7. Добавить к хешу human свойство hello - функцию, которая выводит в консоль Hello. Вызвать эту функцию.
 * 8. Добавить к хешу свойство с названием passport-number = sdff11r-4pp
 */
// 1
const human = {name: 'Andrj', surname: 'Qwerty'};
// 2
console.log (human.name);
// 2.1
// console.log (human['surname']);
const surnameKey='surname';
console.log (human[surnameKey]);
// 3
human.age=44;
console.log (human.age);

// 4
const address={street:'zzz', houseNumber: 24};

// 5
human.address=address;
console.log (human);

// 7
human.hello= function () {
    console.log ('Hello')
}
human.hello();
// console.log(human.hello);
// 8
human['passport-number']='sdff11r-4pp';
// console.log (human);
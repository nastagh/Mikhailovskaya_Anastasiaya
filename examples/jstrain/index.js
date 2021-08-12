// Создать функцию summ, принимающая два аргумента, возвращающая их сумму
function summ (a,b) {
    return a+b;
}
console.log (summ (2,5));
// Создать функцию addToArray, которая добавляет элемент в массив
// Входные данные: массив, элемент
// Возвращает: длину массива после добавлени
function addToArray (array, element) {
    array.push(element);
    return array.length;
}
const arrayN=[1,5];
console.log(addToArray(arrayN, 9));
console.log(arrayN);

// Создать функцию summArray, суммирующую элементы массива 
// Вход: массив с элементами
// Выход: их сумма
function summArray (array) {
 // for(;;)
    let summ =0;
    for (s=0; s<array.length; s++) {
        summ+=array[s];
    }
    return summ;
}
const arrayM=[10,-5,2,8];
console.log(summArray(arrayM));

function summArrayForOf (array) {
    //for of
    let summ=0;
    for (let element of array) {
        summ+=element;
    }
    return summ;
}
console.log(summArrayForOf(arrayM));

function summArrayForeach(array) {
    let summ=0;
    //for each
    array.forEach(v=>summ+=v);
    return summ;
}
console.log(summArrayForeach(arrayM));

function summArrayReduce(array) {
    return array.reduce((summ,v)=>summ+v,0);
    // reduce
}
console.log(summArrayReduce(arrayM));


// Создать функцию concatArrays, принимающую два массива, возвращающую их обьединение
const arrayOne = [2, 'asd', 5];
const arrayTwo = [true, '', 8];
function concatArrays(a,b) {
    return a.concat(b);
}
console.log(concatArrays(arrayOne, arrayTwo));


function concatArraysAnother(a,b) {
    const arraySumm =[];
    a.forEach(v=>arraySumm.push(v));
    b.forEach(v=>arraySumm.push(v));
    return arraySumm;
}
console.log(concatArraysAnother(arrayOne,arrayTwo));

const concatDesctr = (a,b) => [...a, ...b];
console.log(concatDesctr(arrayOne, arrayTwo));

function concatPushDesctr(a,b) {
    const arraySumm = [];
    arraySumm.push(...a);
    arraySumm.push(...b);
    return arraySumm;
}
console.log(concatPushDesctr(arrayOne, arrayTwo));

// Создать функцию compareArrays, которая принимает два массива, и возвращает тот, у которого максимальный элемент больше
function compareArrays(a,b) {
        return (getMaxValue(a)>getMaxValue(b))?a:b;
}

function getMaxValue(array) {
    let max=array[0];
    for (let element of array) {
        // if (element>max) {
        //     max=element;
        // }
        (element>max)&&(max=element); // (true)=>переходит к след выражению (max=element) либо просто (false)
        (element<max)||(max=element); // (false)=> (max=element)
    }
    return max;
}
const arrayMaxOne=[5,-5];
const arrayMaxTwo=[-2,0];
console.log(compareArrays(arrayMaxOne, arrayMaxTwo));

const a =1;
const b = true;
const c = {};
const d = () => {console.log('EEEEEEEE')};
// console.log(a || b || c || d());
// console.log(a && b && c && d());

// Создать функцию addToHash, добавляющую ключ-значение в хэш
// Вход: хэш, ключ, значение 
// Выход: количество ключей в полученном хеше
// Добавить проверку, что если данный ключ уже есть, функция должна кидать ошибку-исключение
function addToHash (hash, key, value) {
    if (key in hash) {
        throw new Error ('Такой ключ имеется')
    }
    
    hash[key]=value;
    return Object.keys(hash).length;
}
const hashEx={nastya: true, pasha: false, 2:5}
console.log(addToHash(hashEx,'ghb',5));
try {addToHash(hashEx,'ghb',5);
}
catch (ex) {
    console.log ('Не удалось добавить ключ. '+ex.message) ;
}

// Создать функцию countElements, определяющую количество различных элементов в массиве
// Выход: хэш вида ключ- элемент, значение - количество вхождений
const arrayEx=['a', 'v', 'd', 'a', 'v', 'c'];
function countElements(array) {
     const hash = {};
     for (let element of array) {
        if (!(element in hash)) {
            hash[element]=1;
        }
        else {
            hash[element]++;
        }
     }
     return hash;
 }
console.log(countElements(arrayEx));

function countElementsReduce(array) {
    const result=array.reduce((hash,element)=>{
        if (!(element in hash)) {
            hash[element]=1;
        }
        else {
            hash[element]++;
        }
        return hash;
    },{})
    return  result;  
}
console.log(countElementsReduce(arrayEx));

// Создать функцию, преобразующую массив из чисел в массив хешей вида {value: 5}
const arrayHash =[2,5,6,7]
function summArrayHash (array) {
    const arrayNew=[];
    for (let element of array) {
        const hash={value: element};
        arrayNew.push(hash);
    }
return arrayNew;
}
console.log(summArrayHash(arrayHash));

function summArrayHashMap (array) {
    return array.map(element=>{value:element})
}
console.log(summArrayHash(arrayHash));

// проверить, есть ли у хеша свойство-хеш, у которого есть свойтсов

const x = {
    qwerty: {
        asdfg: 1
    }
}

const y = {
    qwerty: {
        zxcvb: 1
    }
}

function checkKeys(hash, firstKeyName, secondKeyName) {
    return (hash)&&(firstKeyName in hash)&&(secondKeyName in hash[firstKeyName])?true:false;
}
console.log(checkKeys(x, 'qwerty', 'asdfg'));
console.log(checkKeys(y, '1', 'asdfg'));
console.log(checkKeys(undefined, 1,2));

//checkKeys(x, 'qwerty', 'asdfg') => true
//checkKeys(y, 'qwerty', 'asdfg') => false
//checkKeys(y, 'qwerty', 'zxcvb') = > true
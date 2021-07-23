"use strict"

function HashStorageFunc() {
    const drinks ={};
    this.addValue=function(key, value) {
        drinks[key]=value;
    }
    this.getValue=function(key) {
        return drinks[key];
    }
    this.deleteValue=function(key) {
        if (key in drinks) {
            delete drinks[key];
            return true;
        }
        else {
            return false;
        }
    }

    this.getKeys=function() {
        return Object.keys(drinks);
    }
}

const drinksStorage = new HashStorageFunc;

function addValueToStorage() {
    const key= prompt('Введите название напитка');
    if (!key ) {
        return;
    }
    const alcohol=confirm('Этот напиток алгольный?');
    const recept = prompt('Введите рецепт приготовления');
    drinksStorage.addValue(key,{alcohol:alcohol, recept:recept});
}

function getValueFromStorage() {
    const key= prompt('Введите название напитка');
    const value=drinksStorage.getValue(key);
    if (value) {
        alert(`
        Напиток ${key}
        Алкольный ${value.alcohol?'Да':'Нет'}
        Рецепт приготовления ${value.recept}`);
    }
    else {
        alert('Напиток отсутствует');
    }
}

function deleteValueFromStorage() {
    const key =prompt('Какой напиток Вы хотите удалить?');
    const isDeleted=drinksStorage.deleteValue(key);
    if (isDeleted) {
        alert ('Напиток удален');
    }
    else {
        alert ('Такого напитка нет');
    }
}

function getKeysFromStorage() {
    alert(drinksStorage.getKeys());
}




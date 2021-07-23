"use strict"

class HashStorageClass {
    constructor() {
        this.hash ={};
    }

    addValue(key, value) {
        this.hash[key]=value;
    }
    getValue(key) {
        return this.hash[key];
    }
    
    deleteValue(key) {
        if (key in this.hash) {
            delete this.hash[key];
            return true;
        }
        else {
            return false;
        }
    }

    getKeys() {
        return Object.keys(this.hash);
    }
}

const drinksStorage = new HashStorageClass;

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




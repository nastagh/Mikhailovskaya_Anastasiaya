"use strict"

const string=prompt ('Введите предложение');
console.log(countVowelsForEach (string));
console.log(countVowelsReduce (string));
console.log(countVowelsFilter (string));

function countVowelsForEach (string) {
    const vowels = {'а':true, 'у':true, 'о':true, 'и':true, 'э':true, 'ы':true, 'я':true, 'ю':true, 'е':true, 'ё':true, 'А':true, 'У':true, 'О':true, 'И':true, 'Э':true, 'Ы':true, 'Я':true, 'Ю':true, 'Е':true, 'Ё':true};
    const chars = string.split('');
    let counter=0;
    chars.forEach(char => {
        if (vowels[char]){
            counter++;
        }
    })

    return counter;    
}

function countVowelsFilter(string) {
    const vowels = {'а':true, 'у':true, 'о':true, 'и':true, 'э':true, 'ы':true, 'я':true, 'ю':true, 'е':true, 'ё':true, 'А':true, 'У':true, 'О':true, 'И':true, 'Э':true, 'Ы':true, 'Я':true, 'Ю':true, 'Е':true, 'Ё':true};
    const chars = string.split('');
    const filtered = chars.filter(char=> vowels[char]);

    return filtered.length;
}

function countVowelsReduce (string) {
    const vowels = {'а':true, 'у':true, 'о':true, 'и':true, 'э':true, 'ы':true, 'я':true, 'ю':true, 'е':true, 'ё':true, 'А':true, 'У':true, 'О':true, 'И':true, 'Э':true, 'Ы':true, 'Я':true, 'Ю':true, 'Е':true, 'Ё':true};
    const chars = string.split('');
    
    return chars.reduce((sum, char)=>vowels[char]?sum+1:sum ,0);
}





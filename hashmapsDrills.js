//coreFunctions: Set, Find, Delete, Get, Resize

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this.capacity = initialCapacity;
    this.slots = [];
    this.del = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    let index = this._findSlot(key);
    if (this.slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this.slots[index].value;
  }

  delete(key) {
    let index = this._findSlot(key);
    if (this.slots[index] === undefined) {
      throw new Error('Key error');
    }
    this.slots[index].delete = true;
    this.length--;
    this.delete++;
  }

  set(key, value) {
    if ((this.del + this.length + 1)/ this.capacity > HashMap.MAX_LOAD_RATIO) {
      this._resize(this.capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    
    if(this.slots[index]===undefined || this.slots[index].key !==key){
      this.slots[index] = {
        key,
        value,
        delete: false
      };
      this.length++;
    }else {
      this.slots[index] = {
        key,
        value,
        delete: false
      };
    }}

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this.capacity;

    for (let i = start; i < start + this.capacity; i++) {
      const index = i % this.capacity;
      const slot = this.slots[index];
      if (slot === undefined || (slot.key === key && !slot.delete)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlot = this.slots;
    this.capacity = size;
    this.length = 0;
    this.delete = 0;
    this.slots = [];

    for (const slot of oldSlot) {
      if (slot !== undefined && !slot.delete) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

//this.del+this.length-1/this.capacity
//this.capacity * this.SIZE_RATIO;

// function main() {
//   const lor = new HashMap(10);

//   lor.set('Hobbit', 'Bilbo');
//   lor.set('Hobbit', 'Frodo');
//   lor.set('Wizard', 'Gandolf');
//   lor.set('Human', 'Aragon');
//   lor.set('Elf', 'Legolas');
//   lor.set('Maiar', 'The Necromancer');
//   lor.set('Maiar', 'Sauron');
//   lor.set('RingBearer', 'Gollum');
//   lor.set('LadyOfLight', 'Galadriel');
//   lor.set('HalfElven', 'Arwen');
//   lor.set('Ent', 'Treebeard');
//   lor.set('HighElf', 'Elrond');

//   console.log(lor.capacity, 'this is capacity') ;
//   console.log(lor.get('LadyOfLight'), '110');

// }

// main();

function palindrome(str){
  //input: 'acecarr';
  //output: true
  //explanation: 'acecarr' rearranged to 'racecar' is a palindrome
  //create instance of our letter database
  //create instance of singleLetter
  //create instance of doubleletters
  //loop through the string 
  //if letter is in letter database the add to letter value plus one and doubleletters ++
  //if not set(letter, 1) 
  //
  // const singleLetters = 1 || 0
  // const doubleletters%2=0
 
  // const letterDatabase = new HashMap();


  //Option 1: Nik's mad scientist version
  let singleLetters= 0;
  let dupeletters= 0;
  const obj = {};

  for(let i=0; i<str.length; i++){
    if(!obj[str[i]]){
      obj[str[i]]=1;
      // letterDatabase.set(str[i],1);
    }else if(obj[str[i]]===1){
      obj[str[i]]= obj[str[i]]+1;
      // letterDatabase.set(str[i], obj[str[i]]);
      dupeletters +=2;
    }
    else{
      obj[str[i]]= obj[str[i]]+1;
      // letterDatabase.set(str[i], obj[str[i]]);
      dupeletters ++;
    }
  }

  

  Object.keys(obj).forEach(letter=>{
    if(obj[letter] ===1){
      singleLetters++;
    }
  });


  console.log(obj);
  console.log(dupeletters, 'dupeletters');
  console.log(singleLetters, 'singleletters');
  if((singleLetters ===0 || singleLetters ===1) && dupeletters%2===0){
    return true;
  }else{
    return false;
  }

}

console.log(palindrome('ddda'));



//input: array of words
//output: array of arrays
//each arry should be a grouping of words that are anagrms of each other
//loop through each word in the array and get it's total ascII value by adding all of 
//ASCII values for each letter
//set the key as the total ASCII value
//set the words as the key's value in an array. Use spread operator to not lose current array items
//for each item (slot) in the hashMap, push that whole array into the new array
//return new array
function anagramGroup(arr){
  const newArray=[];
  const anagramDB = new HashMap();
  arr.forEach(word=>{
    let wordVal=0;
    for(let letter of word){
      wordVal += letter.charCodeAt(0);  
    }
    try{
      anagramDB.set(wordVal, [word, ...anagramDB.get(wordVal)]);
    }catch(error){
      anagramDB.set(wordVal, [word]);
    }
    wordVal=0;
  });

  anagramDB.slots.forEach(slot=>{
    newArray.push(slot.value);
  });


console.log(newArray);

}

anagramGroup(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);
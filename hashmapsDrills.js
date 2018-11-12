//coreFunctions: Set, Find, Delete, Get, Resize

class HashMap{
  constructor(initialCapacity=8){
    this.length= 0;
    this.capacity=initialCapacity;
    this.slots=[];
    this.del=0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  set(key,value){
    if(this.del+this.length-1/this.capacity > HashMap.MAX_LOAD_RATIO){
      this._resize(this.capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this.slot[index]={
      key,
      value,
      delete: false
    };
    this.length ++;
  }
  



  _findSlot(key){
    const hash = this._hashString(key);
    const start = hash % this.capacity;

    for (let i =start; i<start + this.capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if(slot === undefined || slot.key===key){
        return index;
      }
    }
  }

  _resize(size){
    const oldSlot = this.slots;
    this.capacity = size;
    this.length = 0;
    this.slot= []; 
    
    for(const slot of oldSlot){
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


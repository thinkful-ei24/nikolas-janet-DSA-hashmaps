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
    if (this.del + this.length - 1 / this.capacity > HashMap.MAX_LOAD_RATIO) {
      this._resize(this.capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this.slots[index] = {
      key,
      value,
      delete: false
    };
    this.length++;
  }

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

function main() {
  const lor = new HashMap(10);

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');

  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');

  console.log(lor.get('Maiar'));
  console.log(lor);
}

main();

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    // if the key does not exist, return -1
    // get the value of the key and delete it from the cache
    // add the key back to the cache to make it the most recently used
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    // if the key already exists, delete it from the cache
    // if the capacity has been reached, delete the least recently used key
    // add the new key to the cache
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size === this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        return this.cache.set(key, value);
    }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
console.log(cache.get(3)); // -1
cache.put(3, 3);
console.log(cache.get(2)); // -1
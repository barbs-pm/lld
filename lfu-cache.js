class Node {
    constructor(value, count) {
        this.value = value;
        this.count = count;
    }
}

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.nodeKeys = new Map();
        this.nodeCounts = new Map();
        this.minCount = null;
    }

    // if the key does not exist, return -1
    // get the node of the key and delete it from the frequency list it was in
    // if there are no more keys with the same frequency, remove the frequency to keep the cache organized
    // create a new frequency if it doesn't exist and add the key to it
    get(key) {
        if (!this.nodeKeys.has(key)) return -1;

        let node = this.nodeKeys.get(key);
        this.nodeCounts.get(node.count).delete(key);

        if (this.nodeCounts.get(node.count).size === 0) {
            this.nodeCounts.delete(node.count);
            if (this.minCount === node.count) this.minCount += 1;
        }

        node.count += 1;
        if (!this.nodeCounts.has(node.count)) {
            this.nodeCounts.set(node.count, new Map());
        }
        this.nodeCounts.get(node.count).set(key, node);

        return node.value;
    }

    // if the capacity is 0, return
    // if the key already exists, update the value and frequency of the item by calling get, which handles that
    // if the capacity has been reached, get the least used key from the minCount frequency
    // remove this key from the frequency; if there are no more keys with the same frequency, remove the frequency
    // remove the key from the cache
    // add the new key with frequency 1
    // set minCount back to 1 because the new key has been "used" once (added)
    put(key, value) {
        if (this.capacity === 0) return;

        if (this.nodeKeys.has(key)) {
            this.nodeKeys.get(key).value = value;
            this.get(key);
            return;
        }

        if (this.nodeKeys.size === this.capacity) {
            let lfuKey = this.nodeCounts.get(this.minCount).keys().next().value;
            this.nodeCounts.get(this.minCount).delete(lfuKey);
            if (this.nodeCounts.get(this.minCount).size === 0) {
                this.nodeCounts.delete(this.minCount);
            }
            this.nodeKeys.delete(lfuKey);
        }

        let newNode = new Node(value, 1);
        this.nodeKeys.set(key, newNode);
        if (!this.nodeCounts.has(1)) {
            this.nodeCounts.set(1, new Map());
        }
        this.nodeCounts.get(1).set(key, newNode);
        this.minCount = 1;
    }
}

const cache = new LFUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));  // 1
cache.put(3, 3);            // 
console.log(cache.get(2));  // -1
console.log(cache.get(3));  // 3
cache.put(4, 4);            // 
console.log(cache.get(1));  // -1
console.log(cache.get(3));  // 3
console.log(cache.get(4));  // 4

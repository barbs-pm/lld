class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Para armazenar os pares chave-valor
        this.head = new Node(null, null); // Sentinela para o início da lista
        this.tail = new Node(null, null); // Sentinela para o fim da lista
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Remove o nó da lista duplamente ligada
    _remove(node) {
        let prevNode = node.prev;
        let nextNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }

    // Adiciona o nó ao início da lista (perto da head)
    _add(node) {
        let realHead = this.head.next;
        this.head.next = node;
        node.prev = this.head;
        node.next = realHead;
        realHead.prev = node;
    }

    // Obtém o valor da chave e move o item para o início (mais recente)
    get(key) {
        if (this.cache.has(key)) {
            let node = this.cache.get(key);
            this._remove(node); // Remove da posição atual
            this._add(node); // Reinsere no início (mais recentemente utilizado)
            return node.value;
        }
        return -1; // Se a chave não existe
    }

    // Insere um par chave-valor na cache
    put(key, value) {
        if (this.cache.has(key)) {
            this._remove(this.cache.get(key)); // Remove o item antigo
        }

        let newNode = new Node(key, value);
        this._add(newNode); // Adiciona o novo item ao início
        this.cache.set(key, newNode);

        // Se a cache exceder a capacidade, remover o menos recentemente usado (perto do tail)
        if (this.cache.size > this.capacity) {
            let lruNode = this.tail.prev; // O nó menos recentemente usado está antes do tail
            this._remove(lruNode); // Remove da lista
            this.cache.delete(lruNode.key); // Remove do mapa
        }
    }
}

// Exemplo de uso
const lruCache = new LRUCache(3); // Capacidade de 3

// Adicionando elementos
lruCache.put(1, 'A');
lruCache.put(2, 'B');
lruCache.put(3, 'C');

console.log(lruCache.get(1)); // Saída: 'A' (1 é agora o mais recentemente usado)
lruCache.put(4, 'D'); // Remove o 2, já que é o menos recentemente utilizado

console.log(lruCache.get(2)); // Saída: -1 (não encontrado, removido)
console.log(lruCache.get(3)); // Saída: 'C'
console.log(lruCache.get(4)); // Saída: 'D'

lruCache.put(5, 'E'); // Remove o 1, pois foi o menos recentemente usado
console.log(lruCache.get(1)); // Saída: -1 (não encontrado, removido)

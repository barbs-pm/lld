class HashTable {
    constructor(size = 50) {
        this.size = size; // Tamanho da tabela hash
        this.buckets = Array(size).fill(null).map(() => []); // Inicializa com listas vazias (encadeamento)
    }

    // Função hash simples para calcular o índice da chave
    hash(key) {
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i); // Soma os valores de código ASCII dos caracteres da chave
        }
        return hashValue % this.size; // Garante que o índice esteja dentro dos limites da tabela
    }

    // Insere ou atualiza um par chave-valor
    set(key, value) {
        const index = this.hash(key); // Obtém o índice da chave
        const bucket = this.buckets[index]; // Acessa o bucket correspondente

        // Verifica se a chave já existe e atualiza o valor
        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                bucket[i] = [key, value]; // Atualiza o valor
                return;
            }
        }

        // Se a chave não existe, adiciona um novo par chave-valor
        bucket.push([key, value]);
    }

    // Retorna o valor associado a uma chave
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Percorre o bucket para encontrar o valor associado à chave
        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                return storedValue;
            }
        }
        return undefined; // Retorna undefined se a chave não for encontrada
    }

    // Remove um par chave-valor da tabela
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Percorre o bucket para encontrar e remover a chave
        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                bucket.splice(i, 1); // Remove o par chave-valor
                return true;
            }
        }
        return false; // Retorna false se a chave não for encontrada
    }

    // Verifica se uma chave está presente na tabela
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Percorre o bucket para verificar a existência da chave
        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                return true;
            }
        }
        return false;
    }
}

// Exemplo de uso
const hashTable = new HashTable();

// Inserindo pares chave-valor
hashTable.set("nome", "Alice");
hashTable.set("idade", 25);
hashTable.set("cidade", "Nova York");

// Obtendo valores
console.log(hashTable.get("nome")); // Saída: Alice
console.log(hashTable.get("idade")); // Saída: 25
console.log(hashTable.get("cidade")); // Saída: Nova York

// Atualizando um valor
hashTable.set("idade", 26);
console.log(hashTable.get("idade")); // Saída: 26

// Verificando se uma chave existe
console.log(hashTable.has("cidade")); // Saída: true
console.log(hashTable.has("profissao")); // Saída: false

// Removendo uma chave
hashTable.remove("cidade");
console.log(hashTable.get("cidade")); // Saída: undefined

class Node {
    constructor(value) {
        this.value = value;   // Node's value
        this.left = null;     // Left child
        this.right = null;    // Right child
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null; // Root of the tree
    }

    // Insert a value into the BST
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode; // If tree is empty, set the new node as root
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                // Go left
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                // Go right
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    // Search for a value in the BST
    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return true; // Value found
            }
            current = value < current.value ? current.left : current.right;
        }
        return false; // Value not found
    }

    // In-order traversal (left, root, right)
    inOrderTraversal(node = this.root, result = []) {
        if (node !== null) {
            this.inOrderTraversal(node.left, result); // Visit left
            result.push(node.value);                 // Visit root
            this.inOrderTraversal(node.right, result); // Visit right
        }
        return result;
    }

    // Pre-order traversal (root, left, right)
    preOrderTraversal(node = this.root, result = []) {
        if (node !== null) {
            result.push(node.value);                  // Visit root
            this.preOrderTraversal(node.left, result); // Visit left
            this.preOrderTraversal(node.right, result); // Visit right
        }
        return result;
    }

    // Post-order traversal (left, right, root)
    postOrderTraversal(node = this.root, result = []) {
        if (node !== null) {
            this.postOrderTraversal(node.left, result); // Visit left
            this.postOrderTraversal(node.right, result); // Visit right
            result.push(node.value);                    // Visit root
        }
        return result;
    }
}

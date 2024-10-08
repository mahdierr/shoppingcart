// Classe Produit
class Product {
    constructor(id, name, price) {
        // Initialiser les propriétés id, name, et price du produit
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Classe Item de Panier
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        // Initialiser les propriétés product et quantity (quantité de produit)
        this.product = product;
        this.quantity = quantity;
    }

    // Méthode pour calculer le prix total de cet item dans le panier
    getTotalPrice() {
        // Retourner le prix total en multipliant le prix du produit par la quantité
        return this.product.price * this.quantity; // Correction ici
    }
}

// Classe Panier
class ShoppingCart {
    constructor() {
        // Initialiser un tableau vide pour stocker les items du panier
        this.items = []; // Correction ici
    }

    // Méthode pour ajouter un produit au panier
    addItem(product) {
        // Vérifier si le produit existe déjà dans le panier
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            // Si oui, augmenter la quantité
            existingItem.quantity += 1;
        } else {
            // Sinon, ajouter un nouvel item au panier
            this.items.push(new ShoppingCartItem(product));
        }
    }

    // Méthode pour supprimer un produit du panier
    removeItem(productId) {
        // Supprimer un produit du panier en utilisant son id
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Méthode pour mettre à jour la quantité d'un produit dans le panier
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            // Si la nouvelle quantité est 0 ou moins, supprimer l'item du panier
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity; // Mettre à jour la quantité
            }
        }
    }

    // Méthode pour afficher les items du panier
    displayCart() {
        this.items.forEach(item => {
            console.log(`${item.product.name}: ${item.quantity} x ${item.product.price} = ${item.getTotalPrice()}`);
        });
    }

    // Méthode pour calculer le nombre total d'articles dans le panier
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Méthode pour calculer le prix total de tous les items dans le panier
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Méthode pour mettre à jour l'affichage du panier
    updateCartDisplay() {
        this.displayCart();
        console.log(`Total items: ${this.getTotalItems()}`);
        console.log(`Total price: ${this.getTotalPrice()}`);
    }
}

// Liste des produits (à remplir)
const products = [
    new Product(1, 'Apple', 1.00),
    new Product(2, 'Banana', 0.50),
    new Product(3, 'Cherry', 2.00),
];

// Instance du panier (ShoppingCart)
const cart = new ShoppingCart();

// Fonction pour afficher la liste des produits
function displayProductList() {
    products.forEach(product => {
        console.log(`${product.name} - ${product.price}€`);
        console.log(`Ajouter au panier: [Ajouter]`);
        // Ici, tu devrais ajouter un gestionnaire d'événement pour le bouton "Ajouter"
        // qui appelle cart.addItem(product);
    });
}

// Exemple d'utilisation
displayProductList();
cart.addItem(products[0]); // Ajoute une pomme
cart.addItem(products[1]); // Ajoute une banane
cart.addItem(products[0]); // Ajoute une autre pomme
cart.updateCartDisplay(); // Affiche le contenu du panier

// storage.js
const STORAGE_KEY = 'products';

const DEMO_PRODUCTS = [
    { id: crypto.randomUUID(), name: "Nike Air Max", price: 89.99, quantity: 12, category: "Chaussures",  createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "T-shirt Basic", price: 24.99, quantity: 3,  category: "Vêtements",   createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "Casque Sony",   price: 59.99, quantity: 0,  category: "Accessoires", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "Jean Slim",     price: 49.99, quantity: 8,  category: "Vêtements",   createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "Sac à dos",     price: 34.99, quantity: 2,  category: "Accessoires", createdAt: new Date().toISOString() },
];

//Initialisation 
export function initStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if(!saved) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(DEMO_PRODUCTS)
        );
    };
}

//Recuperer les produits
export function getProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data).map(p => ({
        ...p,
        price    : parseFloat(p.price),
        quantity : parseInt(p.quantity),
    }));
}

//Sauvegarder
export function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

//Ajouter
export function addProduct(product) {
    const products = getProducts();
    products.push(product);
    saveProducts(products);
    return product;  
}

//Mettre a jour
export function updateProduct(updatedProduct) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index === -1) {
        console.error('Produit introuvable');
        return;
    }
    products[index] = updatedProduct;
    saveProducts(products);
    return updatedProduct; 
}

//Supprimer
export function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
}

initStorage();
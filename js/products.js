import { Product } from "./product.js";
import { addProduct, getProducts, updateProduct, deleteProduct } from "./storage.js";

//CRUD 
export function createProduct(data) {
    const product = new Product(
        data.name, 
        data.price, 
        data.quantity, 
        data.category
    );
    console.log(product);
    return addProduct(product);
}

export function getAllProducts() {
    return getProducts();
}

export function editProduct(updatedProduct) {
    return updateProduct(updatedProduct);
}

export function removeProduct(id) {
    return deleteProduct(id);
} 

//FILTRES & TRI 
export function searchProducts(query) {
    const toLower = query.toLowerCase();
    const products = getAllProducts();
    return products.filter(p => p.name.toLowerCase().includes(toLower));
}

export function filterByCategory(category) {
    const products = getAllProducts();
    return products.filter(p => p.category === category);
}

export function sortProducts(products, by, order = 'asc') {
    return [...products].sort((a, b) => {
        if (by === 'name') {
            return order === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
        return order === 'asc'
            ? a[by] - b[by]
            : b[by] - a[by];
    });
}

//STATS 
export function getStats() {
    const products = getAllProducts();

    const totalValue = products.reduce((acc, p) => {
        return acc + (p.price * p.quantity);
    }, 0);

    const outOfStock = products.filter(p => p.quantity === 0).length;
    const lowStock   = products.filter(p => p.quantity > 0 && p.quantity <= 4).length;

    return {
        totalProducts : products.length,
        totalValue    : totalValue,
        outOfStock    : outOfStock,
        lowStock      : lowStock,
    };
}
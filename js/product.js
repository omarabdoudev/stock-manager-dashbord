export class Product {
    constructor (name, price, quantity, category) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.price = parseFloat(price);
        this.quantity = parseInt(quantity)
        this.category = category;
        this.createdAt = new Date().toISOString();
    }

    isOutOfStock() { 
        return this.quantity === 0;
    }

    isLowStock(){
        return this.quantity >0 && this.quantity <= 4;
    }

    getTotalValue(){
        return this.quantity * this.price;
    }

    addStock(amount) {
        if(amount <= 0) {
            console.error('La quantité à ajouter doit être positive');
            return;
        }
        this.quantity += amount;
    }

    removeStock(amount) {
        if(amount > this.quantity) {
            console.error('Stock insuffisant');
            return;
        }
        this.quantity -= amount;
    }

    updatePrice(newPrice) {
        if(newPrice <= 0) {
            console.error('Le prix doit être positif');
            return;
        };
        this.price = newPrice;
    }

    describe() {
        return `${this.name} (${this.category}) — ${this.price}€ | ${this.quantity} en stock`;
    }
}


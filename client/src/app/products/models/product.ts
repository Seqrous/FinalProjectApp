interface ProductCredentials {
    id: number;
    name: string;
    price: number;
    quantity: number;
    photoUrl: string;
}

export class Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    photoUrl: string;

    constructor(cred: ProductCredentials) {
        this.id = cred.id;
        this.name = cred.name;
        this.price = cred.price;
        this.quantity = cred.quantity;
        this.photoUrl = cred.photoUrl;
    }
}

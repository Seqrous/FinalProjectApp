interface ProductDetailsCredentials {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
}

export class ProductDetails {

    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    readonly description: string;

    constructor(cred: ProductDetailsCredentials) {

        if (cred) {

            this.id = cred.id;
            this.name = cred.name;
            this.price = cred.price;
            this.quantity = cred.quantity;
            this.description = cred.description;
        }
    }
}

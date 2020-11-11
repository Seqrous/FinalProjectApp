interface ProductQueryCredentials {
    name: string;
    minPrice: number;
    maxPrice: number;
}

export class ProductQuery {
    name: string;
    minPrice: number;
    maxPrice: number;

    constructor(cred?: ProductQueryCredentials) {
        if (cred) {
            this.name = cred.name;
            this.minPrice = cred.minPrice;
            this.maxPrice = cred.maxPrice;
        }
    }
}

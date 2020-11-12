interface ProductQueryCredentials {
    name: string;
    minPrice: number;
    maxPrice: number;
    manufacturer: string[];
    condition: string[];
}

export class ProductQuery {
    name: string;
    minPrice: number;
    maxPrice: number;
    manufacturer: string[];
    condition: string[];

    constructor(cred?: ProductQueryCredentials) {
        if (cred) {
            this.name = cred.name;
            this.minPrice = cred.minPrice;
            this.maxPrice = cred.maxPrice;
            this.manufacturer = cred.manufacturer;
            this.condition = cred.condition;
        }
    }
}

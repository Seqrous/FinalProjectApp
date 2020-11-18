import { ResponsePageCredentials } from 'app/common/models/Pageable';
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

interface ProductsCredentials extends ResponsePageCredentials<Product> {
}

export class ProductsPage {
    size = 0;
    page = 0;
    totalPages = 0;
    totalCount = 0;

    products: Product[] = [];

    constructor(cred?: ProductsCredentials) {
        
        if (cred) {
            this.size = cred.pageSize;
            this.page = cred.currentPage;
            this.totalPages = cred.totalPages;
            this.totalCount = cred.totalCount;

            if (cred.items) {
                cred.items.forEach(i => this.products.push(new Product(i)));
            }
        }
    }
}

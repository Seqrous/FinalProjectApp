interface UserCredentials {
    name: string;
    email: string;
}

export class User {
    readonly name: string;
    readonly email: string;

    constructor(cred: UserCredentials) {
        this.name = cred.name;
        this.email = cred.email;
    }
}

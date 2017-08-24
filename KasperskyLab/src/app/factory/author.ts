export class Author {
    id:string;
    name:string;
    surname:string;
    constructor(obj: Author = {} as Author) {
        Object.assign(this, obj);
    }

}

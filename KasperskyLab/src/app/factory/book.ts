import {Author} from "./author";
export class Book {
    id: string;
    title: string;
    authors: Author[];
    numberOfPage:number;
    publisherName:string;
    yearOfPublication:number;
    releaseDate:string;
    ISBN:string;
    image:string;

    constructor(obj: Book = {} as Book) {
        obj.id = (new Date().getTime()).toString(5);
        Object.assign(this, obj);
    }
}

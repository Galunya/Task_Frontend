import { Injectable } from '@angular/core';
import {Book} from "../factory/book";

@Injectable()
export class BookService {

    constructor() {
    }

    public getBooks():Book[] {
        return JSON.parse(localStorage.getItem("bookList"));
    }

    public getBook(id:string):Book {
        let bookList = [];
        bookList = JSON.parse(localStorage.getItem("bookList"));
        let book:Book = bookList.filter(item=> item.id == id)[0];
        return book;
    }

    public setBooks(books:Book[]) {
        localStorage.setItem("bookList", JSON.stringify(books));
    }

    public addBook(book:Book):Book {
        let bookList = [];
        Object.assign(bookList, JSON.parse(localStorage.getItem("bookList")));
        bookList.push(book);
        localStorage.setItem("bookList", JSON.stringify(bookList));
        return book;
    }

    public deleteBook(id:string):Book[] {
        let filterListBooks = this.getBooks().filter((item)=> {
            return item.id != id
        })
        this.setBooks(filterListBooks);
       return filterListBooks;

    }


    public setBook(book:Book) {
        this.deleteBook(book.id);
        let bookList:Book[];
        bookList = JSON.parse(localStorage.getItem("bookList"));
        bookList.push(book);
        localStorage.setItem("bookList", JSON.stringify(bookList));
    }


}

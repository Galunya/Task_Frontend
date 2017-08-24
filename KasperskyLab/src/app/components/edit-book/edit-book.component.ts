import { Component, OnInit } from '@angular/core';
import {Book} from "../../factory/book";
import {BookService} from "../../services/book.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
    private  book:Book;

    constructor(private route:ActivatedRoute,
                private bookService:BookService) {
    }

    ngOnInit() {
        let idBook = this.route.snapshot.url[1].path;
        this.book = this.bookService.getBook(idBook);
    }


}

import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {Book} from "../../factory/book";
import {BookService} from "../../services/book.service";
import {Filter} from "../../factory/filter";

@Component({
    selector: 'app-book-lists',
    templateUrl: './book-lists.component.html',
    styleUrls: ['./book-lists.component.css']
})
export class BookListsComponent implements OnInit {
    private bookList:Book[];
    private  filter:Filter;

    constructor(private configService:ConfigService,
                private bookService:BookService) {

    }

    ngOnInit() {
        this.bookList = this.bookService.getBooks();
        this.filter = this.configService.getFilter();
        if (!this.filter)
            this.filter = new Filter(null);

    }

    deleteItem(id) {
        this.bookList = this.bookService.deleteBook(id);
    }

    setFilter(columnFilter:any) {
        if (columnFilter && columnFilter.length > 0) {
            this.filter.isActivColumn = columnFilter;
            if (this.filter.columnFilter == columnFilter)
                this.filter.directionUp = !this.filter.directionUp;
            else {
                this.filter.columnFilter = columnFilter;
                this.filter.directionUp = true;
            }
            this.configService.setFilter(this.filter);
        }
    }
}

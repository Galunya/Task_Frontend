import {RouterModule, Routes} from "@angular/router";
import {BookListsComponent} from "./components/book-lists/book-lists.component";
import {AddBookComponent} from "./components/add-book/add-book.component";
import {EditBookComponent} from "./components/edit-book/edit-book.component";

const APP_ROUTES: Routes = [
    {
        path: '', component: BookListsComponent
    },
    {
        path: 'edit-book/:id', component: EditBookComponent
    },
    {
        path: 'add-book', component: AddBookComponent
    } ,
    {
        path: '*', component: BookListsComponent
    },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
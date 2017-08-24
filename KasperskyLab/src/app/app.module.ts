import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from "@angular/http";
import { AppComponent } from './app.component';
import { BookListsComponent } from './components/book-lists/book-lists.component';
import { BookComponent } from './components/book/book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import {routing} from "./app-routing.module";
import {BookService} from "./services/book.service";
import { NumberDirective } from './directives/number.directive';
import {ConfigService} from "./services/config.service";
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { FilterColumnPipe } from './pipes/filter-column.pipe';

export function loadConfig(config:ConfigService) {
    let that = this;
    return () => {
        config.get().subscribe(res => {
                console.log("Ура")
                console.log(res)

            },
            err => {
                console.log("err")
                console.log(err)
            });


    };
}
@NgModule({
    declarations: [
        AppComponent,
        BookListsComponent,
        BookComponent,
        AddBookComponent,
        NumberDirective,
        EditBookComponent,
        FilterColumnPipe,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        FormsModule, ReactiveFormsModule
    ],
    providers: [BookService, ConfigService, {
        provide: APP_INITIALIZER,
        useFactory: loadConfig,
        deps: [ConfigService],
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}

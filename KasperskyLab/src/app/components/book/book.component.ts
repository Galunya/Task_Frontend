import { Component, OnInit,Input } from '@angular/core';
import {Book} from "../../factory/book";
import {BookService} from "../../services/book.service";
import {AbstractControl,FormGroup, FormBuilder, Validators,FormArray} from "@angular/forms";
import {Author} from "../../factory/author";
import {Router} from '@angular/router'

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


    formCreate:FormGroup;
    private book:Book;
    private isEdit:boolean;
    private nameAuthor:string;
    private surnameAuthor:string;
    private editAithor;
    private incorrectAuthor:boolean;
    private sendData:boolean;
    private tempImage:any;
    private dummyImage:string = '../../../assets/book-icon.png';

    @Input()
    set bookEdit(bookEdit) {
        this.book = bookEdit;
        this.isEdit = true;

    }

    constructor(private formBuilder:FormBuilder,
                private router:Router,
                private bookService:BookService) {
    }

    ngOnInit() {
        this.formCreate = this.formBuilder.group({
            id: '',
            title: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            authors: this.formBuilder.array([]),
            numberOfPage: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10000)])],
            publisherName: ['', Validators.maxLength(30)],
            yearOfPublication: ['', Validators.min(1799)],
            releaseDate: ['', this.releaseDateValidator],
            ISBN: ['', Validators.compose([this.isbnValidator])],
            image: ''
        });

        this.formCreate.valueChanges.subscribe(data=> {
            this.sendData = false;
        })

        if (this.book) {
            this.initForm();
        }
    }

    initForm() {
        this.formCreate.controls['id'].setValue(this.book.id);
        this.formCreate.controls['title'].setValue(this.book.title);
        this.book.authors.forEach(author=> {
            let items = this.formCreate.get('authors') as FormArray;
            items.push(this.createItem(author as Author));
        })
        this.formCreate.controls['numberOfPage'].setValue(this.book.numberOfPage);
        this.formCreate.controls['publisherName'].setValue(this.book.publisherName);
        this.formCreate.controls['yearOfPublication'].setValue(this.book.yearOfPublication);
        this.formCreate.controls['releaseDate'].setValue(this.book.releaseDate);
        this.formCreate.controls['ISBN'].setValue(this.book.ISBN);
        this.formCreate.controls['image'].setValue(this.book.image);
        this.tempImage = this.book.image;

    }

    releaseDateValidator(control:AbstractControl) {
        if (control.value.length > 0) {
            return new Date(control.value) > new Date("01.01.1800") ? null : {'releaseDate': true};
        }
        return null;
    }

    isbnValidator(control:AbstractControl) {
        let isbn;
        let isbnCode = control.value;
        if (isbnCode.trim().length == 0) return null;
        if (!isbnCode || typeof(isbnCode) !== "string") return {'isbnValidate': true};
        isbn = isbnCode.replace(/\-/g, '');
        let numberTenInISBN = "X";
        let sum = 0;
        let factor = 10;
        let characterIndex = 0;
        let isValid = undefined;
        let sequenceEnd = isbn.length - 1;

        for (; factor > 0; factor--, characterIndex++) {
            if (characterIndex === sequenceEnd &&
                isbn.charAt(characterIndex) === numberTenInISBN) {
                sum += 10 * factor;
            } else {
                sum += isbn.charAt(characterIndex) * factor;
            }
        }

        if (isbn.match(/\d\d\d\d\d\d\d\d\d[0-9|xX]$/)) {
            return (sum % 11 === 0) ? null : {'isbnValidate': true};
        } else {
            return {'isbnValidate': true};
        }
    };


    initBook() {
        this.book = new Book();
        this.book.title = this.formCreate.get('title').value;
        this.book.authors = this.formCreate.get('authors').value;
        this.book.numberOfPage = this.formCreate.get('numberOfPage').value;
        this.book.publisherName = this.formCreate.get('publisherName').value;
        this.book.yearOfPublication = this.formCreate.get('yearOfPublication').value;
        this.book.releaseDate = this.formCreate.get('releaseDate').value;
        this.book.ISBN = this.formCreate.get('ISBN').value;
        this.book.image = this.formCreate.get('image').value;

    }


    editAuthor(item) {
        this.nameAuthor = item.value.name;
        this.surnameAuthor = item.value.surname;
        let items = this.formCreate.get('authors') as FormArray;
        this.editAithor = items.controls.filter(i=> {
            return i.value.id == item.value.id
        })
        this.nameAuthor = this.editAithor[0].value.name;
        this.surnameAuthor = this.editAithor[0].value.surname;


    }

    deleteAuthor(index) {
        let items = this.formCreate.get('authors') as FormArray;
        items.removeAt(index);
    }


    createItem(author:Author):FormGroup {
        if (!author) {
            author = new Author(null);
            author.name = this.nameAuthor;
            author.surname = this.surnameAuthor;
        }
        return this.formBuilder.group(author);


    }

    changed(value) {
        this.sendData = false;
        this.validateFio(value);
    }

    validateFio(fio:string) {
        if ((this.nameAuthor && this.nameAuthor.length > 20) || (this.surnameAuthor && this.surnameAuthor.length > 20))
            this.incorrectAuthor = true;
        else
            this.incorrectAuthor = false;
    }

    addAuthor():void {
        if (!this.incorrectAuthor && this.nameAuthor && this.nameAuthor.length > 0 && this.surnameAuthor && this.surnameAuthor.length > 0) {
            if (!this.editAithor) {
                let items = this.formCreate.get('authors') as FormArray;
                items.push(this.createItem(null));
            } else {
                this.editAithor[0].value.name = this.nameAuthor;
                this.editAithor[0].value.surname = this.surnameAuthor;
            }
            this.editAithor = null;
            this.nameAuthor = '';
            this.surnameAuthor = '';
        }
    }


    onSubmit() {
        this.sendData = true;
        if (this.isEdit)
            this.bookService.setBook(<Book>this.formCreate.value);
        else
            this.bookService.addBook(new Book(this.formCreate.value));
        this.close();
    }


    readURL(event) {
        let image:any = new Image();
        let file:File = event.target.files[0];
        let myReader:FileReader = new FileReader();
        let that = this;
        myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.tempImage = image.src;
            that.formCreate.get('image').setValue(that.tempImage);
        };
        myReader.readAsDataURL(file);
    }

    clearImage() {
        this.tempImage = null;
        this.formCreate.get('image').setValue(null);
    }


    close() {
        this.router.navigate(['/']);
    }


}

import { Component, OnInit } from '@angular/core';
import {Todo} from './models/todo';
import {TodoService} from './todo.service';
import {nzModalAnimations, NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import {NzI18nService} from 'ng-zorro-antd/i18n';
import {format} from "date-fns";
import {NzMessageService} from 'ng-zorro-antd/message';


interface DataItem {
  wichtigkeit: string;
  wann: string;
  was: string;
  kategorie: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoListe';
  todo: Todo[] = [];
  error = '';
  success = '';
  isConfirmLoading = false;
  isVisible = false;
  date = null;
  isEnglish = false;
  productForm !: FormGroup;
  checked = true;

  toto: Todo = {
    id: 0,
    wichtigkeit: '',
    wann: '',
    was: '',
    kategorie: '',
    isVisible: true
  }

  constructor(private todoService: TodoService, private formBuilder: FormBuilder, private message: NzMessageService, private modal: NzModalService, private i18n: NzI18nService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.productForm = this.formBuilder.group({
      wichtigkeit: ['', Validators.required],
      wann: ['', Validators.required],
      was: ['', Validators.required],
      kategorie: ['', Validators.required],
      id: ['']
    })
  }

  getAll(): void {
    this.todoService.getAll().subscribe(
      (data: Todo[]) => {
        this.todo = data;
        this.success = 'test';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  deleteEintrag(data: any) {
    this.todoService.delete(data.id).subscribe(res => {
      }
    );
    this.getAll();
    this.createMessageDeleted('warning')
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  addEintrag() {
    this.isVisible = true;
  }

  handleCancelNeu(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.productForm.reset();
  }


  // ADD EINTRAG
  addEintragConfirm(values: any) {
    if(this.productForm.valid) {
      this.isVisible = false;


      // WANN
      const wann1 = new Date(values.wann);
      const wann2 = format(wann1, 'yyyy-MM-dd')


      // ZUSAMMENFASSUNG
      const obj = [values.wichtigkeit, wann2, values.was, values.kategorie]

      // ABSCHICKEN
      this.todoService.store(obj).subscribe(res => {
        this.getAll();
        this.createMessageAdded('success');
      });
    } else{
      this.createMessageFill('warning');
    }
  }


  // LINKS
  gotoYT() {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: 'https://youtube.com',
    }).click();
  }

  gotoReddit() {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: 'https://reddit.com',
    }).click();
  }

  gotoTwitter() {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: 'https://twitter.com',
    }).click();
  }

  gotoChrome() {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: 'https://google.com',
    }).click();
  }


  // ON CHANGE
  onChange(result: Date): void {
  }


  // MESSAGES
  createMessageAdded(type: string): void {
    this.message.create(type, `Erfolgreich eingetragen!`);
  }

  createMessageDeleted(type: string): void {
    this.message.create(type, `Erfolgreich gelöscht! Seite wird neu geladen.`);
  }

  createMessageFill(type: string): void {
    this.message.create(type, 'Alle Felder müssen ausgefüllt sein!');
  }


  // COLUMNS
  listOfColumn = [
    {
      title: 'Wichtigkeit',
      compare: (a: DataItem, b: DataItem) => a.wichtigkeit.localeCompare(b.wichtigkeit),
    },
    {
      title: 'Bis wann?',
      compare: (a: DataItem, b: DataItem) => a.wann.localeCompare(b.wann),
    },
    {
      title: 'Was ist zu erledigen?',
      compare: (a: DataItem, b: DataItem) => a.was.localeCompare(b.was),
    },
    {
      title: 'Kategorie',
      compare: (a: DataItem, b: DataItem) => a.kategorie.localeCompare(b.kategorie),
    }
    ]



}

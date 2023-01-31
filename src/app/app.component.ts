import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({ // metadata do Component
  selector: 'app-root', // <app-root> cria o html
  templateUrl: './app.component.html', // é o que ta chamando o arquivo html externamente do arquivo
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list'
  public todos: Todo[] = []; // any é como se fosse um objeto [] sinaliza que é um array
  public title: String='Minhas tarefas'
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
    this.load()
  }

  add(){
    const title = this.form.controls['title'].value
    const id = this.todos.length + 1
    this.todos.push(new Todo(id, title, false))
    this.save()
    this.clear();
  }

  clear(){
    this.form.reset()
  }
  // param do tipo Todo
  remove(todo: Todo){
    const index = this.todos.indexOf(todo)
    if(index != -1){
      this.todos.splice(index, 1)
    }
    this.save()
  }

  markAsDone(todo: Todo){
    todo.done = true
    this.save()
  }

  markAsUndone(todo: Todo){
    todo.done = false
    this.save()
  }


  // esse método converte o JSON em string
  save(){
    const data = JSON.stringify(this.todos)
    // ele pede chave e valor
    localStorage.setItem('todos', data)
  }

  // esse método converte string em JSON
  load(){
    const data = localStorage.getItem('todos')
    this.todos = JSON.parse(data || '[]')
  }

  changeMode(mode: string){
    this.mode = mode
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
/*  constructor(public personService: PersonService) { }
  ngOnInit(): void {
    this.personService.getPerson().subscribe(data => { this.person = data })
  }
} */
/*Debemos ser capaces de llamar a las funciones como getPersons cada vez que este componente se carga o se inicializa, y para esto, debe implementar la interfaz OnInit que viene del @angular/core y debemos sobreescribir la funcion ngOnInit */
export class PersonComponent implements OnInit {
  /*vamos a definir una variable que va a conetener a todos los personas siempre que los recuperemos del backend con la función getPersons. Va a ser public porque va a ser utilizada por el template que es el archivo app.component.html.*/
  public persons: Person[] = [];
  /*updatePerson va a representar al persona que se esté editando, puede ser cualquier persona. */
  public editPerson: Person | undefined;
  /*deletePerson se usará para representar al persona a borrar y se podrá usar este persona en el template (html) porque se declara a nivel de clase */
  public deletePerson: Person | undefined;

  /*CONSTRUCTOR */
  /*Vamos a inyectar nuestro servicio en el constructor para poder tener acceso al mismo*/
  constructor(private personService: PersonService) { }

  /* Luego del constructor vamos a sobreescribir el método de inicialización, no posee parámetros y no devuelve nada, VOID.
  Todo lo que hay que hacer es llamar a las funciones que queremos que se inicien cada vez que el componente se cargue o inicie.
  Cada vez que se inicie va a llamar a la función ngOnInit la cual llamará a get.Persons la cual va a establecer la variable persons cada vez que obtenga la respuesta del servidor y si recibe un error mostrará la alerta al usuario. */
  ngOnInit() {
    this.getPersons();
    console.log(this.persons);
  }

  /*GET ALL PERSONAS */
  /*Vamos a crear la función getPersons, no tendrá parámetros y no retorna nada, VOID */
  public getPersons(): void {
    /*Vamos a llamar al servicio y su método para obtener personas. Dado que es un Observable va a hacer una solicitud por internet o la red, tomará tiempo por lo que debemos SUSCRIBIRnos al OBSERVABLE, así seremos notificados cada vez que un dato regrese del servidor, ya sea la lista de personas o un error.*/
    /*para que deje de tachar al ".suscribe" agregué, inmediatamente después del paréntesis unas llaves y dentro de ellas reemplacé: "(response:" por "next: (response:" y "(error:" por "error: (error:"*/
    this.personService.getAllPerson().subscribe({
      /*aquí vamos a especificar que si recibimos una respuesta va a ser de tipo persona, y vamos a cargar el cuerpo de esa respuesta (response) en la variable que creamos (this.persons) */
      next: (response: Person[]) => {
        this.persons = response;
        console.log(this.persons);
      },
      /*en caso de que nos devuelva un error, debemos manejarlo, será de tipo HttpErrorResponse y la accion que realizaremos será enviar una alerta o a la consola un msj de error.*/
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  /**ADD PERSONA */
  public onAddPerson(addForm: NgForm): void {
    /*Despues de hacer el método, agregamos la línea que queda como primera para que, al hacer click en el botón "save changes" (cuyo id es add-person-form), el formulario desaparezca, es decir, cerramos el model.*/
    document.getElementById('add-person-form')?.click();
    /*vamos a llamar al servicio de personas y le vamos a pasar el formulario en JSON, y esto se logra con el método '.value' y esta representación en JSON se logra gracias a los atributos "name" que le agregamos a las entradas. */
    /* "personService.addPerson" es el servicio haciendo una llamada al backend, asi que tenemos que usar el método suscribe() para que podamos ser notificados cada vez que vuelva una respuesta del servidor.*/
    this.personService.addPerson(addForm.value).subscribe({
      /*para que deje de tachar al ".suscribe" agregué, inmediatamente después del paréntesis unas llaves y dentro de ellas reemplacé: "(response:" por "next: (response:" y "(error:" por "error: (error:"*/
      /*Si hay una respuesta será una persona y queremos que (se ejecute =>) la respuesta quede registrada en la consola (console.log(response)) y vamos a llamar al método getPersons() para recargar la lista de personas*/
      next: (response: Person) => {
        console.log(response);
        this.getPersons();
        /*Si cargamos dos nuevos personas, cuando vayamos a cargar el segundo, veremos en el formulario los datos del primero, entonces debemos limpiar el formulario antes de salir, después de guardar o si dio error.*/
        addForm.reset();
      },
      /*En caso de que se produzca un error, que será del tipo HttpErrorResponse, se va a mostrar una alerta, vamos a acceder al mensaje del error. Se puede hacer aquí una notificación y hacer un manejo del error... etc. */
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        /*limpiamos el form */
        addForm.reset();
      },
    });
  }

  /**EDIT PERSONA */
  /*Recibe como parámetro una persona. Vamos a enlazar una persona del template (html) a una persona del formulario, que será el mismo persona. Necesitaremos definir una variable para esto. -> updatePerson*/
  public onUpdatePerson(person: Person): void {
    /*vamos a llamar al servicio de personas, llamamos al método que actualiza y le vamos a pasar la persona a actualizar. */
    /*"personService.updatePerson" es el servicio haciendo una llamada al backend, asi que tenemos que usar el método suscribe() para que podamos ser notificados cada vez que vuelva una respuesta del servidor.*/
    /*Aquí no usamos código para cerrar el model ya que el usuario lo cierra desde cancel o la cruz si decide no modificar datos. */
    this.personService.editPerson(person).subscribe({
      /*para que deje de tachar al ".suscribe" agregué, inmediatamente después del paréntesis unas llaves y dentro de ellas reemplacé: "(response:" por "next: (response:" y "(error:" por "error: (error:"*/
      /*Si hay una respuesta será una persona y queremos que (se ejecute =>) la respuesta quede registrada en la consola (console.log(response)) y vamos a llamar al método getPersons() para recargar la lista de personas*/
      next: (response: Person) => {
        console.log(response);
        this.getPersons();
      },
      /*En caso de que se produzca un error, que será del tipo HttpErrorResponse, se va a mostrar una alerta, vamos a acceder al mensaje del error. Se puede hacer aquí una notificación y hacer un manejo del error... etc. */
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
    console.log("onUpdate");
    console.log(person);
  }


  /**DELETE PERSONA */
  /*Recibe como parámetro el id de una persona.*/
  public onDeletePerson(personId: number): void {
    /*vamos a llamar al servicio de personas con el método que los borra y le vamos a pasar el id correspondiente. */
    /*"personService.deletePerson" es el servicio haciendo una llamada al backend, asi que tenemos que usar el método suscribe() para que podamos ser notificados cada vez que vuelva una respuesta del servidor.*/
    /*Aquí no usamos código para cerrar el model ya que el usuario lo cierra desde cancel o la cruz si decide no modificar datos. */
    this.personService.deletePerson(personId).subscribe({
      /*para que deje de tachar al ".suscribe" agregué, inmediatamente después del paréntesis unas llaves y dentro de ellas reemplacé: "(response:" por "next: (response:" y "(error:" por "error: (error:"*/
      /*Si salió todo bien, la respuesta es VOID y se mostrará por consola (console.log(response)). Vamos a llamar al método getPersons() para recargar la lista de personas*/
      next: (response: void) => {
        console.log(response);
        this.getPersons();
      },
      /*En caso de que se produzca un error, que será del tipo HttpErrorResponse, se va a mostrar una alerta, vamos a acceder al mensaje del error. */
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal( mode: string, person: Person|undefined): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonModal');
    }
    if (mode === 'edit') {
      this.editPerson = person;
      button.setAttribute('data-target', '#updatePersonModal');
    }
    if (mode === 'delete') {
      this.deletePerson = person;
      button.setAttribute('data-target', '#deletePersonModal');
    }
    container!.appendChild(button);
    button.click();
  }
  
 
  /*<!-- Button trigger modal -- esto iría en el html pero no hace falta porque desarrollamos 'programáticamente' este código en este archivo.-->
  <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
  </button> --> */
}

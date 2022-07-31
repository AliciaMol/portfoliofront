import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';
import { environment } from 'src/environments/environment';

/*Si no colocamos la siguiente anotation Injectable, debemos registrar este servicio como proveedor
 en el archivo app.module.ts, en "providers: []" poner "providers: [PersonService]"*/
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  /*Vamos a definir la url, en un principio dejamos cadena vacía y ya mas avanzado le cargamos
  la ruta configurada en enviroment.ts mientras estemos desarrollando*/
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /*Vammos a listar las funciones que necesito*/
  /*tipo de retorno por Person[]*/
  public getAllPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiServerUrl}/person/getall`);
    /*vamos a llamar al client para hacer la solicitud, vamos a decirle dónde hacer la solicitud
    y qué tipo de solicitud hacer, entonces en el return llamamos al cliente http con this.http,
    indicamos GET porque necesitamos una solicitud de estas y el tipo de retorno en un principio
    pusimos ANY, lo cambiamos a Person[], ya que va a estar esperando una matriz o lista de
    empleados, es lo que el back está esperando. No debemos pasar nada en el body ni hay
    que pasar encabezados, solo hay que pasar la url.
    Para pasar la url real del servidor, usaremos apiServerUrl definida arriba, se usa
    para esto acentos invertidos ``, usamos la notación de JavaScript ${} para pasar variables y
    le agregamos la ruta definida en el back /person/all */
  }

  /* addPerson
  Va a tomar como parámetro el empleado real que estamos agregando y va a retornar un solo 
  empleado por lo que va Person sin corchetes.  La solicitud debe ser POST porque se crea un
  nuevo empleado en el back.*/
  public addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/person/add`, person);
    /*Retorna un empleado. Para pasar la url del servidor, nos queda igual que la anterior,
    cambiando el end point a /person/add y debemos pasarle ademas la carga util en el
    body, que será el person que recibimos para agregar ese empleado al backend*/
  }

  /*updatePerson
  Va a tomar como parámetro un empleado y va a retornar un empleado. La solicitud debe ser PUT
  porque es una actualización.*/
  public editPerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);
    /*Retorna un empleado. Para pasar la url del servidor, nos queda igual que la anterior,
    cambiando el end point a /person/update y debemos pasarle ademas la carga util en el
    body, que será el person que recibimos para modificar y devolver al backend*/
  }

  /*deletePerson
  Vamos a pasarle el id del empleado, que sera de tipo number. Y siempre que se elimine un
  empleado no enviamos nada en el body, simplemente devuelve la respuesta http con el estado,
  por lo que es VOID.
  La solicitud será DELETE.*/
  public deletePerson(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${personId}`);
    /*Para pasar la url del servidor, cambiamos el end point a /person/delete/${personId} 
    ya que debemos pasarle como variable el id del empleado a eliminar en el backend*/
  }
}

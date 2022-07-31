export interface Person {
    /* Vamos a definir los atributos y el tipo de datos de la persona que va a estar
    retornando el back cuando hagamos las solicitudes, es un reflejo de lo que tenemos 
    en el back*/
    id: number;
    name: string;
    lastname: string;
    email: string;
    ocupation: string;
    phone: string;
    aboutmedescription: string;
    imageurl: string;
}
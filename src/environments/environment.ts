// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*Dentro de la carpeta 'enviroments' hay dos archivos, enviroments.ts que contiene una configuración
 de entorno para el desarrollo y enviroments.prod.ts que contiene una configuración de entorno para 
 la producción. Cuando estamos desarrollando, usamos loclahost y debemos usar enviroments.ts motivo
 por el que "production : false" y en el archivo de producción es "true".
 y cuando
 */

export const environment = {
  production: false,
  /*En un atributo vamos a cargar la url de base para el servidor de nuestro backend, entonces
  podemos acceder a esta url desde el servicio de personas usando nuestra variable apiBaseUrl */
  apiBaseUrl:'http://localhost:8080'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

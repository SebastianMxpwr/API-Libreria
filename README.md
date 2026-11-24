# API-Libreria

Ejercicio de curso, 2020. Es una variante de [002-servidor-rest](https://github.com/SebastianMxpwr/002-servidor-rest): la misma API con **Express 4** y **MongoDB** (Mongoose 5), cambiada en diciembre de 2020 de una cafetería a una biblioteca escolar con libros, alumnos y préstamos.

## Qué hace

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/` | Mensaje de bienvenida |
| GET | `/usuario?desde=0&hasta=5` | Lista los alumnos activos, con paginación |
| POST | `/usuario` | Crea un alumno (`matricula`, `appaterno`, `apmaterno`, `nombre`, `email`, `telefono`, `carrera`, `semestre`, `grupo`) |
| PUT | `/usuario/:id` | Actualiza los datos del alumno, salvo la matrícula |
| DELETE | `/usuario/:id` | Borrado lógico (`estado: false`) |
| POST | `/login` | No funciona (ver limitaciones) |
| GET | `/libro?desde=0&hasta=5` | Lista los libros |
| POST | `/libro` | Crea un libro (`clave`, `nombre`, `isbn`, `editorial`, `autor`, `anio`) |
| PUT | `/libro/:id` | Actualiza un libro, salvo la clave |
| DELETE | `/libro/:id` | Borra un libro (ver limitaciones) |
| GET | `/prestamos?desde=0&hasta=5` | Lista los préstamos activos |
| POST | `/prestamos` | Registra un préstamo (`matricula`, `clave`, `fechasalida`, `fechadevolucion`) |
| PUT | `/prestamos/:id` | Actualiza un préstamo |
| DELETE | `/prestamos/:id` | Termina el préstamo (`estadoprestamo: false`) |

## Cómo correrlo

Necesita **MongoDB** local. `server/server.js` apunta a un cluster de MongoDB Atlas que ya no existe, así que antes de arrancar hay que cambiar la cadena de `mongoose.connect` por `mongodb://localhost:27017/Libreria`.

```bash
npm install
npm start        # http://localhost:3000  (cambia el puerto con la variable PORT)
```

Con npm 12 o más reciente, bcrypt necesita permiso para compilarse:

```bash
npm install-scripts approve bcrypt
npm rebuild bcrypt
```

## Estado y limitaciones conocidas

Es un ejercicio terminado y archivado. No está pensado para usarse en serio.

- **El login está roto:** el modelo de usuario ya no tiene `password`, pero `routes/login.js` sigue comparándolo con bcrypt. La comparación lanza un error.
- **`DELETE /libro/:id` borra el primer libro que encuentra**, no el del id (`findOneAndRemove(id)`; lo correcto es `findByIdAndRemove`).
- No tiene autenticación: cualquiera puede llamar a todas las rutas.
- Los préstamos no comprueban que el alumno y el libro existan, ni que el libro esté libre. Tampoco validan el email ni que la fecha de devolución sea posterior a la de salida.
- Si MongoDB no está corriendo, el servidor se cae a los ~30 segundos.
- Las dependencias son de 2020 y `npm audit` reporta vulnerabilidades. Para pasar a Mongoose 7 o más reciente habría que reescribir las rutas, porque esas versiones ya no aceptan callbacks.

## Estructura

```
server/
├─ server.js          ← arranque, conexión a MongoDB y registro de rutas
├─ config/config.js   ← puerto
├─ models/            ← usuario, libro, prestamo
└─ routes/            ← usuario, login, libros, prestamos
```

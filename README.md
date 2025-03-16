# Descargar repositorio

Para poder descargar el repositorio en su maquina vamos a ejecutar el siguiete comando en la carpeta donde se va a alojar el repositorio

```bash
git clone https://github.com/araquebarrerag/pruebaSmartTalent.git
```

# FrontEnd

Este proyecto en la parte de front fue realizado usando [Angular CLI] en la version version 19.2.3.

## Correr Servidor Angular

Primero vamos a correr el sigiente comando en la carpeta [FrontEnd] para instalar dependencias:

```bash
npm install
```
Ahora vamos a ejecutar este comando en la carpeta [FrontEnd] para empezar a correr el servidor de Angular

```bash
ng serve
```

Despues de ejecutar este comando el servidor empezara a correr en el link: `http://localhost:4200/`.

# BackEnd

Este proyecto en la parte de back fue realizado usando [NodeJs] en la version version 22.13.1.

## Correr Servidor Node

Primero vamos a correr el sigiente comando en la carpeta [BackEnd] para instalar dependencias:

```bash
npm install
```
Ahora vamos a ejecutar este comando en la carpeta [BackEnd] para empezar a correr el servidor de Node

```bash
node index.js
```

Despues de ejecutar este comando el servidor empezara a correr en el link: `http://localhost:8080/`.

# Tecnologias Usadas en la prueba

Ya con estos comandos se podria realizar la prueba desde el link donde se corrio la aplicacion de Angular, para la prueba use la tecnologia de NodeJs para el back
ya que es la tecnologia que se usa mayormente en la actualidad con Angular, para la parte de la base de datos use sqlite3 que es una dependecia de Node que se usa
para poder crear bases de datos en memoria o en mi caso use un archivo que esta en la carpeta raiz del proyecto back que se llama prueba.db

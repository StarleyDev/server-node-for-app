# Server NodeJs for Angular with SQLite e SqlServer database

This backend makes queries via using method API POST.

- Is not encritpted or use https for connections. ( Is a future feature )

## Installation

Run.

```bash
npm install ( To install dependencies )

npm run nodemon ( Run aplication )
```

## Usage
#### For creation of DB
```javascript
http://localhost:1255/api/createDb  
body : 
{
    "todo" : "nameDatabase"
}

return message createDbOk
OR
return status 400 with error message
```
#### For insert in to DB
* You send a single insert or array of inserts

```javascript
http://localhost:1255/api/insertDb  
body : 
{
    "todo" : "INSERT INTO  PEDIDO_TEMP  (clienteId, empresaId, statusPedido, agendaId, clienteIdStr, clienteRazaoSocialStr, vendedorId) VALUES (4441, 0, 2, 0, '4441', 'A K ROSENO', 140)",
    "dbForUse" : "nameDatabaseForUse"
}

return status 200 with insertId 
OR
return status 400 with error message
```
#### For execute SQL generic

```javascript
http://localhost:1255/api/executeDb  
body : 
{
    "todo" : "SELECT * FROM CLIENT",
    "dbForUse" : "nameDatabaseForUse"
}

return status 200 with data[]
OR
return status 400 with error message
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
-- Not Licensed --

# Server NodeJs for Angular with SQLite e SqlServer database ( PWA )


This backend makes queries via using method API POST.

- Is not encritpted or use https for connections. ( Is a future feature )

## Installation

Run.

```bash
npm install ( To install dependencies )

npm run nodemon ( Run aplication )
```

## For authenticate


## For database
#### For creation of DB (POST)
```javascript
http://localhost:1256/api/executeDb/create
body :
{
    "dbName" : "user_dbName",
    "instanceDb": "sqlite" // or sqlserver
}

return  "sucesso": "Base criada/conectada com suceso!"
OR
return status 400 with error message
```
#### For insert in to DB (POST)
* You send a single insert or array of inserts

```javascript
http://localhost:1255/api/executeDb/insert
body :
{
    "stringSql" : "INSERT INTO  PEDIDO_TEMP  (clienteId, empresaId, statusPedido, agendaId, clienteIdStr, clienteRazaoSocialStr, vendedorId) VALUES (4441, 0, 2, 0, '4441', 'A K ROSENO', 140)",
    "dbForUse" : "user_dbName",
    "instanceDb": "sqlite" // or sqlserver
}

return status 200 with insertId
OR
return status 400 with error message
```
#### For execute SQL generic (POST)

```javascript
http://localhost:1255/api/executeDb/execute
body :
{
    "stringSql" : "SELECT * FROM CLIENT",
    "dbForUse" : "user_dbName"
    "instanceDb": "sqlite" // or sqlserver
}

return status 200 with data[]
OR
return status 400 with error message
```

## For Files
#### Construction ....

## For Logs

#### For send logs (POST)

```javascript
http://localhost:1255/logger/send-log
body :
{
    "logs": {
        "appName": "appName",
        "userId": 00000,
        "error": "messageHere"
    }
}

return status 200 with data[]
OR
return status 400 with error message
```

#### For get logs (GET)

```javascript
http://localhost:1255/logger/get-log

return status 200 with json
OR
return status 400 with error message
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('quotes.db');
var quotes = [
    {
        id: 1,
        quote: "The best is yet to come",
        author: "Unknown",
        year: 2000
    },
    {
        id: 2,
        quote: "This is a quote",
        author: "First Last",
        year: 1930
    },
    {
        id: 3,
        quote: "This is another quote",
        author: "First2 Last2",
        year: 1910
    }
    ];
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response){
    response.send("Get request received at '/'");
});
app.get('/quotes', function(request, response){
    console.log("Get a list of all quotes as json");
  //  response.send("Return quote with the ID: " + request.params.id);
    if(request.query.year){
        response.send("Return a list of quotes from the year: " + request.query.year);
    }
    else{
        response.json(quotes);
    }
});
app.get('/quotes/:id', function(request, response){
    console.log("return quote with the ID: " + request.params.id);
    response.send("Return quote with the ID: " + request.params.id);
});
app.post('/quotes', function(request, response){
    console.log("Insert a new quote: " + request.body.quote);
    response.json(request.body);
});
app.listen(port, function(){
    console.log('Express app listening on port ' + port);
});
app.get('/quotes', function(request, response){
    if(request.query.year){
        db.all('SELECT * FROM quotes WHERE year = ?', [request.query.year], function(err, rows){
            if(err){
                res.send(err.message);
            }
            else{
                console.log("Return a list of quotes from the year: " + request.query.year);
                response.json(rows);
            }
        });
    }
    else{
        db.all('SELECT * FROM quotes', function processRows(err, rows){
            if(err){
                response.send(err.message);
            }
            else{
                for( var i = 0; i < rows.length; i++){
                    console.log(rows[i].quote);
                }
                response.json(rows);
            }
        });
    }
});

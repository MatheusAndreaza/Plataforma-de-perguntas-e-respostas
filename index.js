const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

connection.authenticate()
    .then(() => {
        console.log('conectado com sucesso!!');
    })
    .catch(erro => {
        console.log('Erro do banco : '+ erro);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    const { titulo, descricao } = req.body;

    if(titulo != '' && descricao != ''){
        Pergunta.create({
            titulo,
            descricao
        }).then(() => {
            res.redirect('/');
        });
    }else{
        res.redirect('/perguntar');
    }
});

app.listen(3000);
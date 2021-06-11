const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

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
    Pergunta.findAll({ raw: true, order: [
        ['id', 'desc']
    ]}).then(perguntas => {
        res.render('index', {
            perguntas
        });
    });
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

app.get('/pergunta/:id', (req, res) => {
    const { id } = req.params;

    Pergunta.findOne({
        where: { id }
    }).then(pergunta => {
        if(pergunta){
            Resposta.findAll({
                where: { perguntaId: pergunta.id }, 
                order: [
                    ['id', 'desc']
                ]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta,
                    respostas
                });
            });
        }else{
            res.redirect('/');
        }
    })
});

app.post('/responder', (req, res) => {
    const { corpo, pergunta: perguntaId } = req.body;

    if(corpo != ''){
        Resposta.create({
            corpo,
            perguntaId
        }).then(() => {
            res.redirect(`/pergunta/${perguntaId}`);
        });
    }
});

app.listen(3000);
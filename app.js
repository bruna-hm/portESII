const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sobre, habilidades, certificados, projetos } = require('./data');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { sobre, habilidades, certificados, projetos });
});

app.post('/form/sobre/salvar', (req, res) => {
    sobre.texto = req.body.texto;
    res.redirect('/');
});

app.post('/form/habilidades/adicionar', (req, res) => {
    habilidades.push({ h: req.body.h });
    res.redirect('/');
});

app.post('/form/habilidades/editar', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && habilidades[index]) {
        habilidades[index].h = req.body.novaHab;
    }
    res.redirect('/');
});

app.post('/form/habilidades/excluir', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && habilidades[index]) {
        habilidades.splice(index, 1);
    }
    res.redirect('/');
});

app.post('/form/certificados/adicionar', (req, res) => {
    certificados.push({
        nome: req.body.nome,
        instituicao: req.body.instituicao,
        link: req.body.link
    });
    res.redirect('/');
});

app.post('/form/certificados/editar', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && certificados[index]) {
        certificados[index] = {
            nome: req.body.nome,
            instituicao: req.body.instituicao,
            link: req.body.link
        };
    }
    res.redirect('/');
});

app.post('/form/certificados/excluir', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && certificados[index]) {
        certificados.splice(index, 1);
    }
    res.redirect('/');
});

app.post('/form/projetos/adicionar', (req, res) => {
    projetos.push({
        categoria: req.body.categoria,
        nome: req.body.nome,
        descricao: req.body.descricao,
        tecnologias: req.body.tecnologias ? req.body.tecnologias.split(',').map(t => t.trim()) : [],
        repositorio: req.body.repositorio,
        status: req.body.status
    });
    res.redirect('/');
});

app.post('/form/projetos/editar', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && projetos[index]) {
        projetos[index] = {
            categoria: req.body.categoria,
            nome: req.body.nome,
            descricao: req.body.descricao,
            tecnologias: req.body.tecnologias ? req.body.tecnologias.split(',').map(t => t.trim()) : [],
            repositorio: req.body.repositorio,
            status: req.body.status
        };
    }
    res.redirect('/');
});

app.post('/form/projetos/excluir', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && projetos[index]) {
        projetos.splice(index, 1);
    }
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Servidor rodando em localhost:${PORT}`));
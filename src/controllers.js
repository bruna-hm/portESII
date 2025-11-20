const services = require('./services');

module.exports = {

    async getHome(req, res) {
        const dados = await services.getAllData();
        res.render('index', dados);
    },

    async updateSobre(req, res) {
        await services.updateSobre(req.body);
        res.redirect('/');
    },

    async addHabilidade(req, res) {
        await services.addHabilidade(req.body.h);
        res.redirect('/');
    },

    async editHabilidade(req, res) {
        await services.editHabilidade(req.body.index, req.body.novaHab);
        res.redirect('/');
    },

    async excluirHabilidade(req, res) {
        await services.excluirHabilidade(req.body.index);
        res.redirect('/');
    },

    async addCertificado(req, res) {
        await services.addCertificado(req.body);
        res.redirect('/');
    },

    async editCertificado(req, res) {
        await services.editCertificado(req.body.index, req.body);
        res.redirect('/');
    },

    async excluirCertificado(req, res) {
        await services.excluirCertificado(req.body.index);
        res.redirect('/');
    },

    async addProjeto(req, res) {
        await services.addProjeto(req.body);
        res.redirect('/');
    },

    async editProjeto(req, res) {
        await services.editProjeto(req.body.index, req.body);
        res.redirect('/');
    },

    async excluirProjeto(req, res) {
        await services.excluirProjeto(req.body.index);
        res.redirect('/');
    }
};

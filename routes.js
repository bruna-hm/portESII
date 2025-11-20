const express = require('express');
const router = express.Router();

const controller = require('./controllers');

router.get('/', controller.getHome);

router.put('/form/sobre/salvar', controller.updateSobre);

router.post('/form/habilidades/adicionar', controller.addHabilidade);
router.post('/form/habilidades/editar', controller.editHabilidade);
router.post('/form/habilidades/excluir', controller.excluirHabilidade);

router.post('/form/certificados/adicionar', controller.addCertificado);
router.post('/form/certificados/editar', controller.editCertificado);
router.post('/form/certificados/excluir', controller.excluirCertificado);

router.post('/form/projetos/adicionar', controller.addProjeto);
router.post('/form/projetos/editar', controller.editProjeto);
router.post('/form/projetos/excluir', controller.excluirProjeto);

module.exports = router;

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
    database: 'portfolio'
});

module.exports = {

    query: pool.query.bind(pool),

    async getSobre() {
        const [rows] = await pool.query("SELECT * FROM sobre WHERE id = 1");
        return rows[0];
    },

    async salvarSobre(dados) {

        Object.keys(dados).forEach(key => {
            if (dados[key] === "" || dados[key] === undefined) {
                delete dados[key];
            }
        });

        const campos = Object.keys(dados)
            .map(key => `${key} = ?`)
            .join(", ");

        const valores = Object.values(dados);

        const sql = `UPDATE sobre SET ${campos} WHERE id = 1`;

        await pool.query(sql, valores);
    },

    async getHabilidades() {
        const [rows] = await pool.query("SELECT * FROM habilidades");
        return rows;
    },

    async addHabilidade(nome) {
        await pool.query("INSERT INTO habilidades (nome) VALUES (?)", [nome]);
    },

    async editarHabilidade(id, nome) {
        await pool.query("UPDATE habilidades SET nome = ? WHERE id = ?", [nome, id]);
    },

    async excluirHabilidade(id) {
        await pool.query("DELETE FROM habilidades WHERE id = ?", [id]);
    },

    async getCertificados() {
        const [rows] = await pool.query("SELECT * FROM certificados");
        return rows;
    },

    async addCertificado({ nome, instituicao, link }) {
        await pool.query(
            "INSERT INTO certificados (nome, instituicao, link) VALUES (?, ?, ?)",
            [nome, instituicao, link]
        );
    },

    async editarCertificado(id, { nome, instituicao, link }) {
        await pool.query(
            "UPDATE certificados SET nome = ?, instituicao = ?, link = ? WHERE id = ?",
            [nome, instituicao, link, id]
        );
    },

    async excluirCertificado(id) {
        await pool.query("DELETE FROM certificados WHERE id = ?", [id]);
    },

    async getProjetos() {
        const [rows] = await pool.query("SELECT * FROM projetos");
        return rows;
    },

    async addProjeto(dados) {
        await pool.query(
            "INSERT INTO projetos (categoria, nome, descricao, tecnologias, repositorio, status) VALUES (?, ?, ?, ?, ?, ?)",
            [
                dados.categoria,
                dados.nome,
                dados.descricao,
                JSON.stringify(dados.tecnologias),
                dados.repositorio,
                dados.status
            ]
        );
    },

    async editarProjeto(id, dados) {
        await pool.query(
            "UPDATE projetos SET categoria=?, nome=?, descricao=?, tecnologias=?, repositorio=?, status=? WHERE id=?",
            [
                dados.categoria,
                dados.nome,
                dados.descricao,
                JSON.stringify(dados.tecnologias),
                dados.repositorio,
                dados.status,
                id
            ]
        );
    },

    async excluirProjeto(id) {
        await pool.query("DELETE FROM projetos WHERE id = ?", [id]);
    }

};

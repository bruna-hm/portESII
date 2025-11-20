const db = require('./models/dbModels');
const { sobre, habilidades, certificados, projetos } = require('./data');

let dbOnline = true;

(async () => {
    try {
        await db.query("SELECT 1");
        console.log("MySQL OK - Modo híbrido ativado");
    } catch (err) {
        console.log("MySQL indisponível - usando apenas JSON");
        dbOnline = false;
    }
})();

module.exports = {

    async getAllData() {

        if (dbOnline) {
            try {
                const [sobreDB] = await db.query("SELECT * FROM sobre LIMIT 1");
                const [redesDB] = await db.query("SELECT * FROM redes");
                const [habilidadesDB] = await db.query("SELECT * FROM habilidades");
                const [certificadosDB] = await db.query("SELECT * FROM certificados");
                const [projetosDB] = await db.query("SELECT * FROM projetos");

                projetosDB.forEach(p => {
                    if (p.tecnologias) {
                        p.tecnologias = p.tecnologias.split(',').map(t => t.trim());
                    } else {
                        p.tecnologias = [];
                    }
                });

                if (sobreDB.length) {
                    sobreDB[0].redes = redesDB;
                }

                const habilidadesFormatadas = habilidadesDB.length
                    ? habilidadesDB.map(h => ({
                        id: h.id,
                        h: h.habilidade || h.nome || h.h
                    }))
                    : habilidades;

                return {
                    sobre: sobreDB.length ? sobreDB[0] : sobre,
                    habilidades: habilidadesFormatadas,
                    certificados: certificadosDB.length ? certificadosDB : certificados,
                    projetos: projetosDB.length ? projetosDB : projetos
                };

            } catch (e) {
                console.log("Erro no MySQL — fallback JSON", e);
            }
        }

        return {
            sobre,
            habilidades,
            certificados,
            projetos
        };
    },

    async updateSobre(dados) {

        Object.keys(dados).forEach(k => {
            if (dados[k] !== undefined) sobre[k] = dados[k];
        });

        if (dbOnline) {
            try {
                await db.salvarSobre(dados);
            } catch (e) {
                console.log("Falha ao salvar no MySQL:", e);
            }
        }
    },

    async addRede({ nome, link }) {

        sobre.redes.push({ nome, link });

        if (dbOnline) {
            try {
                await db.query(
                    "INSERT INTO redes (id_sobre, nome, link) VALUES (1, ?, ?)",
                    [nome, link]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async deleteRede(id) {

        sobre.redes = sobre.redes.filter(r => r.id !== id);

        if (dbOnline) {
            try {
                await db.query(
                    "DELETE FROM redes WHERE id = ?",
                    [id]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async addHabilidade(habilidade) {

        habilidades.push({ habilidade });

        if (dbOnline) {
            try {
                await db.query(
                    "INSERT INTO habilidades (habilidade) VALUES (?)",
                    [habilidade]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async editHabilidade(index, novaHab) {

        if (!habilidades[index]) return;

        const id = habilidades[index].id;
        habilidades[index].habilidade = novaHab;

        if (dbOnline) {
            try {
                await db.query(
                    "UPDATE habilidades SET habilidade = ? WHERE id = ?",
                    [novaHab, id]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async excluirHabilidade(index) {

        if (!habilidades[index]) return;

        const id = habilidades[index].id;
        habilidades.splice(index, 1);

        if (dbOnline) {
            try {
                await db.query(
                    "DELETE FROM habilidades WHERE id = ?",
                    [id]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async addCertificado({ nome, instituicao, link }) {

        certificados.push({ nome, instituicao, link });

        if (dbOnline) {
            try {
                await db.query(
                    "INSERT INTO certificados (nome, instituicao, link) VALUES (?, ?, ?)",
                    [nome, instituicao, link]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async editCertificado(index, data) {

        if (!certificados[index]) return;

        const id = certificados[index].id;
        certificados[index] = data;

        if (dbOnline) {
            try {
                await db.query(
                    `UPDATE certificados 
                     SET nome=?, instituicao=?, link=? 
                     WHERE id=?`,
                    [data.nome, data.instituicao, data.link, id]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async excluirCertificado(index) {

        if (!certificados[index]) return;

        const id = certificados[index].id;
        certificados.splice(index, 1);

        if (dbOnline) {
            try {
                await db.query(
                    "DELETE FROM certificados WHERE id = ?",
                    [id]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async addProjeto(data) {

        const novo = {
            categoria: data.categoria,
            nome: data.nome,
            descricao: data.descricao,
            tecnologias: data.tecnologias
                ? data.tecnologias.split(',').map(t => t.trim())
                : [],
            repositorio: data.repositorio,
            status: data.status
        };

        projetos.push(novo);

        if (dbOnline) {
            try {
                await db.query(
                    `INSERT INTO projetos 
                        (categoria, nome, descricao, tecnologias, repositorio, status) 
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        novo.categoria,
                        novo.nome,
                        novo.descricao,
                        novo.tecnologias.join(','),
                        novo.repositorio,
                        novo.status
                    ]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async editProjeto(index, data) {

        if (!projetos[index]) return;

        const id = projetos[index].id;

        const atualizado = {
            categoria: data.categoria,
            nome: data.nome,
            descricao: data.descricao,
            tecnologias: data.tecnologias
                ? data.tecnologias.split(',').map(t => t.trim())
                : [],
            repositorio: data.repositorio,
            status: data.status
        };

        projetos[index] = atualizado;

        if (dbOnline) {
            try {
                await db.query(
                    `UPDATE projetos 
                     SET categoria=?, nome=?, descricao=?, tecnologias=?, repositorio=?, status=?
                     WHERE id=?`,
                    [
                        atualizado.categoria,
                        atualizado.nome,
                        atualizado.descricao,
                        atualizado.tecnologias.join(','),
                        atualizado.repositorio,
                        atualizado.status,
                        id
                    ]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    },

    async excluirProjeto(index) {

        if (!projetos[index]) return;

        const id = projetos[index].id;
        projetos.splice(index, 1);

        if (dbOnline) {
            try {
                await db.query(
                    "DELETE FROM projetos WHERE id = ?",
                    [id]
                );
            } catch (e) {
                console.log("Erro MySQL:", e);
            }
        }
    }
};

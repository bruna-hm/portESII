window.addProj = function () {
    const container = document.getElementById('formulario-projetos');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    function makeField(labelText, name) {
        const label = document.createElement('label');
        label.textContent = labelText + ':';
        label.style.display = 'block';
        label.style.marginBottom = '0.5rem';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = name;
        input.required = true;
        input.style.width = '30%';
        input.style.padding = '0.5rem';
        input.style.textAlign = 'center';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '0.3rem';

        label.appendChild(input);
        return label;
    }

    form.appendChild(makeField('Categoria', 'categoria'));
    form.appendChild(makeField('Nome', 'nome'));
    form.appendChild(makeField('Descrição', 'descricao'));
    form.appendChild(makeField('Tecnologias (separadas por vírgula)', 'tecnologias'));
    form.appendChild(makeField('Repositório', 'repositorio'));
    form.appendChild(makeField('Status', 'status'));

    const wrapper = document.createElement('div');
    wrapper.style.textAlign = 'center';
    wrapper.style.marginTop = '1rem';

    const btnCancel = document.createElement('button');
    btnCancel.type = 'button';
    btnCancel.textContent = 'Cancelar';
    btnCancel.onclick = () => { container.innerHTML = ''; };

    const btnSave = document.createElement('button');
    btnSave.type = 'button';
    btnSave.textContent = 'Salvar';
    btnSave.onclick = () => {
        const categoria = form.categoria.value.trim();
        const nome = form.nome.value.trim();
        const descricao = form.descricao.value.trim();
        const tecnologias = form.tecnologias.value.trim();
        const repositorio = form.repositorio.value.trim();
        const status = form.status.value.trim();
        if (!categoria || !nome) return;

        fetch('/form/projetos/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `categoria=${encodeURIComponent(categoria)}&nome=${encodeURIComponent(nome)}&descricao=${encodeURIComponent(descricao)}&tecnologias=${encodeURIComponent(tecnologias)}&repositorio=${encodeURIComponent(repositorio)}&status=${encodeURIComponent(status)}`
        }).then(() => {
            const novoProj = {
                categoria,
                nome,
                descricao,
                tecnologias: tecnologias.split(',').map(t => t.trim()),
                repositorio,
                status
            };
            window.projetos.push(novoProj);

            const sec = document.querySelector('#projetos');
            const div = document.createElement('div');
            div.className = 'projeto';
            div.innerHTML = `<h3>${nome} (${categoria})</h3>
                             <p>${descricao}</p>
                             ${novoProj.tecnologias.length ? `<p>Tecnologias: ${novoProj.tecnologias.join(', ')}</p>` : ''}
                             <p>Status: ${status}</p>
                             <p><a href="${repositorio}" target="_blank">Repositório</a></p>`;
            sec.appendChild(div);
            container.innerHTML = '';
        });
    };

    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnSave);
    form.appendChild(wrapper);
    container.appendChild(form);
};

window.editProj = function () {
    const container = document.getElementById('formulario-projetos');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    const labelSel = document.createElement('label');
    labelSel.textContent = 'Escolha o projeto para editar:';
    labelSel.style.display = 'block';
    labelSel.style.marginBottom = '1rem';

    const select = document.createElement('select');
    select.name = 'index';
    select.style.width = '30%';
    select.style.padding = '0.5rem';
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '0.3rem';

    window.projetos.forEach((p, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${p.nome} (${p.categoria})`;
        select.appendChild(option);
    });

    labelSel.appendChild(select);
    form.appendChild(labelSel);

    const campos = {};

    function makeField(labelText, name, value = '') {
        const label = document.createElement('label');
        label.textContent = labelText + ':';
        label.style.display = 'block';
        label.style.marginBottom = '0.5rem';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = name;
        input.value = value;
        input.required = true;
        input.style.width = '30%';
        input.style.padding = '0.5rem';
        input.style.textAlign = 'center';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '0.3rem';

        label.appendChild(input);
        return label;
    }

    const primeiro = window.projetos[0] || {};
    campos.categoria = makeField('Categoria', 'categoria', primeiro.categoria);
    campos.nome = makeField('Nome', 'nome', primeiro.nome);
    campos.descricao = makeField('Descrição', 'descricao', primeiro.descricao);
    campos.tecnologias = makeField('Tecnologias (separadas por vírgula)', 'tecnologias', (primeiro.tecnologias || []).join(', '));
    campos.repositorio = makeField('Repositório', 'repositorio', primeiro.repositorio);
    campos.status = makeField('Status', 'status', primeiro.status);

    for (let key in campos) form.appendChild(campos[key]);

    select.addEventListener('change', () => {
        const p = window.projetos[select.value];
        campos.categoria.querySelector('input').value = p.categoria;
        campos.nome.querySelector('input').value = p.nome;
        campos.descricao.querySelector('input').value = p.descricao;
        campos.tecnologias.querySelector('input').value = (p.tecnologias || []).join(', ');
        campos.repositorio.querySelector('input').value = p.repositorio;
        campos.status.querySelector('input').value = p.status;
    });

    const wrapper = document.createElement('div');
    wrapper.style.textAlign = 'center';
    wrapper.style.marginTop = '1rem';

    const btnCancel = document.createElement('button');
    btnCancel.type = 'button';
    btnCancel.textContent = 'Cancelar';
    btnCancel.onclick = () => { container.innerHTML = ''; };

    const btnSave = document.createElement('button');
    btnSave.type = 'button';
    btnSave.textContent = 'Salvar';
    btnSave.onclick = () => {
        const index = select.value;
        const categoria = campos.categoria.querySelector('input').value.trim();
        const nome = campos.nome.querySelector('input').value.trim();
        const descricao = campos.descricao.querySelector('input').value.trim();
        const tecnologias = campos.tecnologias.querySelector('input').value.trim();
        const repositorio = campos.repositorio.querySelector('input').value.trim();
        const status = campos.status.querySelector('input').value.trim();

        fetch('/form/projetos/editar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `index=${index}&categoria=${encodeURIComponent(categoria)}&nome=${encodeURIComponent(nome)}&descricao=${encodeURIComponent(descricao)}&tecnologias=${encodeURIComponent(tecnologias)}&repositorio=${encodeURIComponent(repositorio)}&status=${encodeURIComponent(status)}`
        }).then(() => {
            window.projetos[index] = {
                categoria,
                nome,
                descricao,
                tecnologias: tecnologias.split(',').map(t => t.trim()),
                repositorio,
                status
            };

            const sec = document.querySelector('#projetos');
            sec.innerHTML = '<h2>Projetos Desenvolvidos</h2>';
            window.projetos.forEach(p => {
                const div = document.createElement('div');
                div.className = 'projeto';
                div.innerHTML = `<h3>${p.nome} (${p.categoria})</h3>
                                 <p>${p.descricao}</p>
                                 ${p.tecnologias.length ? `<p>Tecnologias: ${p.tecnologias.join(', ')}</p>` : ''}
                                 <p>Status: ${p.status}</p>
                                 <p><a href="${p.repositorio}" target="_blank">Repositório</a></p>`;
                sec.appendChild(div);
            });
            container.innerHTML = '';
        });
    };

    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnSave);
    form.appendChild(wrapper);
    container.appendChild(form);
};

window.exProj = function () {
    const container = document.getElementById('formulario-projetos');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    const labelSel = document.createElement('label');
    labelSel.textContent = 'Escolha o projeto para excluir:';
    labelSel.style.display = 'block';
    labelSel.style.marginBottom = '1rem';

    const select = document.createElement('select');
    select.name = 'index';
    select.style.width = '30%';
    select.style.padding = '0.5rem';
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '0.3rem';

    window.projetos.forEach((p, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${p.nome} (${p.categoria})`;
        select.appendChild(option);
    });

    labelSel.appendChild(select);
    form.appendChild(labelSel);

    const wrapper = document.createElement('div');
    wrapper.style.textAlign = 'center';
    wrapper.style.marginTop = '1rem';

    const btnCancel = document.createElement('button');
    btnCancel.type = 'button';
    btnCancel.textContent = 'Cancelar';
    btnCancel.style.marginRight = '0.5rem';
    btnCancel.onclick = () => { container.innerHTML = ''; };

    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.textContent = 'Excluir';
    btnDel.onclick = () => {
        const index = select.value;
        fetch('/form/projetos/excluir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `index=${index}`
        }).then(() => {
            window.projetos.splice(index, 1);

            const sec = document.querySelector('#projetos');
            sec.innerHTML = '<h2>Projetos Desenvolvidos</h2>';
            window.projetos.forEach(p => {
                const div = document.createElement('div');
                div.className = 'projeto';
                div.innerHTML = `<h3>${p.nome} (${p.categoria})</h3>
                                 <p>${p.descricao}</p>
                                 ${p.tecnologias.length ? `<p>Tecnologias: ${p.tecnologias.join(', ')}</p>` : ''}
                                 <p>Status: ${p.status}</p>
                                 <p><a href="${p.repositorio}" target="_blank">Repositório</a></p>`;
                sec.appendChild(div);
            });
            container.innerHTML = '';
        });
    };

    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnDel);
    form.appendChild(wrapper);
    container.appendChild(form);
};
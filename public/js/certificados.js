window.addCert = function () {
    const container = document.getElementById('formulario-certificados');
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

    form.appendChild(makeField('Nome', 'nome'));
    form.appendChild(makeField('Instituição', 'instituicao'));
    form.appendChild(makeField('Link', 'link'));

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
        const nome = form.nome.value.trim();
        const instituicao = form.instituicao.value.trim();
        const link = form.link.value.trim();
        if (!nome || !instituicao || !link) return;

        fetch('/form/certificados/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `nome=${encodeURIComponent(nome)}&instituicao=${encodeURIComponent(instituicao)}&link=${encodeURIComponent(link)}`
        }).then(() => {
            const novoCert = { nome, instituicao, link };
            window.certificados.push(novoCert);

            const ul = document.querySelector('#certificados ul');
            const li = document.createElement('li');
            li.innerHTML = `<a href="${link}" target="_blank">${nome}</a> - ${instituicao}`;
            ul.appendChild(li);

            container.innerHTML = '';
        });
    };

    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnSave);
    form.appendChild(wrapper);
    container.appendChild(form);
};

window.editCert = function () {
    const container = document.getElementById('formulario-certificados');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    const labelSel = document.createElement('label');
    labelSel.textContent = 'Escolha o certificado para editar:';
    labelSel.style.display = 'block';
    labelSel.style.marginBottom = '1rem';

    const select = document.createElement('select');
    select.name = 'index';
    select.style.width = '30%';
    select.style.padding = '0.5rem';
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '0.3rem';

    window.certificados.forEach((c, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${c.nome} - ${c.instituicao}`;
        select.appendChild(option);
    });

    labelSel.appendChild(select);
    form.appendChild(labelSel);

    const nomeInput = document.createElement('input');
    nomeInput.type = 'text';
    nomeInput.placeholder = 'Novo nome';
    nomeInput.style.display = 'block';
    nomeInput.style.margin = '0.5rem auto';
    nomeInput.style.width = '30%';

    const instituicaoInput = document.createElement('input');
    instituicaoInput.type = 'text';
    instituicaoInput.placeholder = 'Nova instituição';
    instituicaoInput.style.display = 'block';
    instituicaoInput.style.margin = '0.5rem auto';
    instituicaoInput.style.width = '30%';

    const linkInput = document.createElement('input');
    linkInput.type = 'text';
    linkInput.placeholder = 'Novo link';
    linkInput.style.display = 'block';
    linkInput.style.margin = '0.5rem auto';
    linkInput.style.width = '30%';

    form.appendChild(nomeInput);
    form.appendChild(instituicaoInput);
    form.appendChild(linkInput);

    const wrapper = document.createElement('div');
    wrapper.style.textAlign = 'center';
    wrapper.style.marginTop = '1rem';

    const btnCancel = document.createElement('button');
    btnCancel.type = 'button';
    btnCancel.textContent = 'Cancelar';
    btnCancel.style.marginRight = '0.5rem';
    btnCancel.onclick = () => { container.innerHTML = ''; };

    const btnSave = document.createElement('button');
    btnSave.type = 'button';
    btnSave.textContent = 'Salvar';
    btnSave.onclick = () => {
        const index = select.value;
        const novoNome = nomeInput.value.trim();
        const novaInstituicao = instituicaoInput.value.trim();
        const novoLink = linkInput.value.trim();
        if (!novoNome || !novaInstituicao || !novoLink) return;

        fetch('/form/certificados/editar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `index=${index}&nome=${encodeURIComponent(novoNome)}&instituicao=${encodeURIComponent(novaInstituicao)}&link=${encodeURIComponent(novoLink)}`
        }).then(() => {
            window.certificados[index] = { nome: novoNome, instituicao: novaInstituicao, link: novoLink };

            const ul = document.querySelector('#certificados ul');
            ul.innerHTML = '';
            window.certificados.forEach(c => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${c.link}" target="_blank">${c.nome}</a> - ${c.instituicao}`;
                ul.appendChild(li);
            });

            container.innerHTML = '';
        });
    };

    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnSave);
    form.appendChild(wrapper);
    container.appendChild(form);
};

window.exCert = function () {
    const container = document.getElementById('formulario-certificados');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    const labelSel = document.createElement('label');
    labelSel.textContent = 'Escolha o certificado para excluir:';
    labelSel.style.display = 'block';
    labelSel.style.marginBottom = '1rem';

    const select = document.createElement('select');
    select.name = 'index';
    select.style.width = '30%';
    select.style.padding = '0.5rem';
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '0.3rem';

    window.certificados.forEach((c, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${c.nome} - ${c.instituicao}`;
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
        fetch('/form/certificados/excluir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `index=${index}`
        }).then(() => {
            window.certificados.splice(index, 1);
            const ul = document.querySelector('#certificados ul');
            ul.innerHTML = '';
            window.certificados.forEach(c => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${c.link}" target="_blank">${c.nome}</a> - ${c.instituicao}`;
                ul.appendChild(li);
            });
            container.innerHTML = '';
        });
    };

    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnDel);
    form.appendChild(wrapper);
    container.appendChild(form);
};
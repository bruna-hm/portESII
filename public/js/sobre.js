window.editSobre = function () {
    const sobreData = window.sobre;
    const container = document.getElementById('formulario-sobre');
    if (!container) return;

    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    function makeField(labelText, name, value, type = 'text') {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.marginBottom = '1rem';
        label.style.textAlign = 'center';

        const span = document.createElement('span');
        span.textContent = labelText + ':';
        span.style.display = 'block';
        span.style.marginBottom = '0.3rem';
        label.appendChild(span);

        let input;
        if (type === 'textarea') {
            input = document.createElement('textarea');
            input.name = name;
            input.rows = 4;
            input.value = value || '';
        } else {
            input = document.createElement('input');
            input.type = type;
            input.name = name;
            input.value = value || '';
        }

        input.style.width = '30%';
        input.style.padding = '0.5rem';
        input.style.textAlign = 'center';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '0.3rem';
        label.appendChild(input);
        return label;
    }

    form.appendChild(makeField('Nome', 'nome', sobreData.nome));
    form.appendChild(makeField('Profissão', 'profissao', sobreData.profissao));
    form.appendChild(makeField('Formação', 'formacao', sobreData.formacao));
    form.appendChild(makeField('Email', 'email', sobreData.email));
    form.appendChild(makeField('Descrição', 'descricao', sobreData.descricao, 'textarea'));

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

    btnSave.onclick = async () => {

        const data = {
            nome: form.querySelector('input[name="nome"]').value,
            profissao: form.querySelector('input[name="profissao"]').value,
            formacao: form.querySelector('input[name="formacao"]').value,
            email: form.querySelector('input[name="email"]').value,
            descricao: form.querySelector('textarea[name="descricao"]').value
        };

        await fetch('/form/sobre/salvar', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        window.sobre = data;

        document.querySelector('h1').textContent = data.nome;
        document.querySelector('h2').textContent = data.profissao;
        document.querySelector('#descricao_style').textContent = data.descricao;

        const emailA = document.querySelector('p a[href^="mailto:"]');
        emailA.textContent = data.email;
        emailA.href = `mailto:${data.email}`;

        container.innerHTML = '';
    };

    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnSave);
    form.appendChild(wrapper);
    container.appendChild(form);
};

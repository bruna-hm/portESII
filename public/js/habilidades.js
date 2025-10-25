window.addHab = function () {
    const container = document.getElementById('formulario-habilidades');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    const label = document.createElement('label');
    label.textContent = 'Nova Habilidade: ';
    label.style.display = 'block';
    label.style.marginBottom = '1rem';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'h';
    input.required = true;
    input.style.width = '30%';
    input.style.padding = '0.5rem';
    input.style.textAlign = 'center';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '0.3rem';

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
        const novaH = input.value.trim();
        if (!novaH) return;

        fetch('/form/habilidades/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `h=${encodeURIComponent(novaH)}`
        }).then(() => {
            window.habilidades.push({ h: novaH });
            const ul = document.querySelector('#habilidades ul');
            const li = document.createElement('li');
            li.textContent = novaH;
            ul.appendChild(li);
            container.innerHTML = '';
        });
    };

    label.appendChild(input);
    form.appendChild(label);
    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnSave);
    form.appendChild(wrapper);
    container.appendChild(form);
};

window.editHab = function () {
    const container = document.getElementById('formulario-habilidades');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    const labelSel = document.createElement('label');
    labelSel.textContent = 'Escolha a habilidade para editar: ';
    labelSel.style.display = 'block';
    labelSel.style.marginBottom = '1rem';

    const select = document.createElement('select');
    select.name = 'index';
    select.style.width = '30%';
    select.style.padding = '0.5rem';
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '0.3rem';

    window.habilidades.forEach((h, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = h.h;
        select.appendChild(option);
    });

    const labelEdit = document.createElement('label');
    labelEdit.textContent = 'Nova descrição:';
    labelEdit.style.display = 'block';
    labelEdit.style.marginTop = '1rem';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'novaHab';
    input.required = true;
    input.style.width = '30%';
    input.style.padding = '0.5rem';
    input.style.textAlign = 'center';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '0.3rem';

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
        const novaH = input.value.trim();
        if (!novaH) return;

        fetch('/form/habilidades/editar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `index=${index}&novaHab=${encodeURIComponent(novaH)}`
        }).then(() => {
            window.habilidades[index].h = novaH;
            const ul = document.querySelector('#habilidades ul');
            ul.innerHTML = '';
            window.habilidades.forEach(h => {
                const li = document.createElement('li');
                li.textContent = h.h;
                ul.appendChild(li);
            });
            container.innerHTML = '';
        });
    };

    labelSel.appendChild(select);
    form.appendChild(labelSel);
    labelEdit.appendChild(input);
    form.appendChild(labelEdit);
    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnSave);
    form.appendChild(wrapper);
    container.appendChild(form);
};

window.exHab = function () {
    const container = document.getElementById('formulario-habilidades');
    if (!container) return;
    container.innerHTML = '';

    const form = document.createElement('form');
    form.style.textAlign = 'center';

    const label = document.createElement('label');
    label.textContent = 'Escolha a habilidade para excluir:';
    label.style.display = 'block';
    label.style.marginBottom = '1rem';

    const select = document.createElement('select');
    select.name = 'index';
    select.style.width = '30%';
    select.style.padding = '0.5rem';
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '0.3rem';

    window.habilidades.forEach((h, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = h.h;
        select.appendChild(option);
    });

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
        fetch('/form/habilidades/excluir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `index=${index}`
        }).then(() => {
            window.habilidades.splice(index, 1);
            const ul = document.querySelector('#habilidades ul');
            ul.innerHTML = '';
            window.habilidades.forEach(h => {
                const li = document.createElement('li');
                li.textContent = h.h;
                ul.appendChild(li);
            });
            container.innerHTML = '';
        });
    };

    label.appendChild(select);
    form.appendChild(label);
    wrapper.appendChild(btnCancel);
    wrapper.appendChild(btnDel);
    form.appendChild(wrapper);
    container.appendChild(form);
};

let jogos = JSON.parse(localStorage.getItem("jogos")) || [
    { id: 1, nome: "Minecraft", genero: "Aventura", plataforma: "PC", ano: 2011 },
    { id: 2, nome: "FIFA 24", genero: "Esportes", plataforma: "PlayStation", ano: 2023 },
    { id: 3, nome: "GTA V", genero: "Ação", plataforma: "Xbox", ano: 2013 },
    { id: 4, nome: "Fortnite", genero: "Battle Royale", plataforma: "PC", ano: 2017 }
];

let editando = false;

function mostrarJogos() {
    tabelaJogos.innerHTML = jogos.map(jogo => `
        <tr>
            <td>${jogo.id}</td>
            <td>${jogo.nome}</td>
            <td>${jogo.genero}</td>
            <td>${jogo.plataforma}</td>
            <td>${jogo.ano}</td>
            <td>
                <button class="btn-editar" onclick="editarJogo(${jogo.id})">
                    Editar
                </button>
                <button class="btn-excluir" onclick="excluirJogo(${jogo.id})">
                    Excluir
                </button>
            </td>
        </tr>
    `).join("");
}

function abrirFormulario() {
    editando = false;
    tituloFormulario.textContent = "Adicionar Jogo";

    ["idJogo", "nomeJogo", "generoJogo", "plataformaJogo", "anoJogo"]
        .forEach(id => document.getElementById(id).value = "");

    modal.style.display = "flex";
}

function fecharFormulario() {
    modal.style.display = "none";
}

function salvarJogo() {
    const nome = nomeJogo.value.trim();
    const genero = generoJogo.value.trim();
    const plataforma = plataformaJogo.value.trim();
    const ano = anoJogo.value;

    if (!nome || !genero || !plataforma || !ano) {
        alert("Preencha todos os campos!");
        return;
    }

    if (editando) {
        const jogo = jogos.find(j => j.id == idJogo.value);

        jogo.nome = nome;
        jogo.genero = genero;
        jogo.plataforma = plataforma;
        jogo.ano = ano;

        alert("Jogo editado com sucesso!");
    } else {
        jogos.push({
            id: jogos.length ? Math.max(...jogos.map(j => j.id)) + 1 : 1,
            nome,
            genero,
            plataforma,
            ano
        });

        alert("Jogo adicionado com sucesso!");
    }

    salvarDados();
    mostrarJogos();
    fecharFormulario();
}

function editarJogo(id) {
    const jogo = jogos.find(j => j.id === id);
    if (!jogo) return;

    editando = true;
    tituloFormulario.textContent = "Editar Jogo";

    idJogo.value = jogo.id;
    nomeJogo.value = jogo.nome;
    generoJogo.value = jogo.genero;
    plataformaJogo.value = jogo.plataforma;
    anoJogo.value = jogo.ano;

    modal.style.display = "flex";
}

function excluirJogo(id) {
    const jogo = jogos.find(j => j.id === id);

    if (jogo && confirm(`Deseja excluir "${jogo.nome}"?`)) {
        jogos = jogos.filter(j => j.id !== id);
        salvarDados();
        mostrarJogos();
        alert("Jogo excluído com sucesso!");
    }
}

function salvarDados() {
    localStorage.setItem("jogos", JSON.stringify(jogos));
}

mostrarJogos();
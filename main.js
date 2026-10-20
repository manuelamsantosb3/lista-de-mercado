let listaTextos = JSON.parse(localStorage.getItem("meusTextos")) || [];

const form = document.getElementById("meuFormulario");
const inputId = document.getElementById("itemId");
const inputTexto = document.getElementById("texto");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const listaItens = document.getElementById("listaItens");

renderizarLista();

function renderizarLista() {
  listaItens.innerHTML = "";

  if (listaTextos.length === 0) {
    listaItens.innerHTML = `<li class="mensagem">Nenhum texto cadastrado.</li>`;
    return;
  }

  listaTextos.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item}</span>
      <div class="acoes">
        <button class="btn-editar" onclick="prepararEdicao(${index})">Editar</button>
        <button class="btn-deletar" onclick="deletarTexto(${index})">Excluir</button>
      </div>
    `;
    listaItens.appendChild(li);
  });
}


function salvarNoLocalStorage() {
  localStorage.setItem("meusTextos", JSON.stringify(listaTextos));
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const index = inputId.value;
  const texto = inputTexto.value.trim();

  if (!texto) return;

  if (index !== "") {

    listaTextos[index] = texto;
  } else {

    listaTextos.push(texto);
  }

  salvarNoLocalStorage();
  renderizarLista();
  limparFormulario();
});


window.prepararEdicao = (index) => {
  inputId.value = index;
  inputTexto.value = listaTextos[index];
  btnSalvar.textContent = "Atualizar";
  btnCancelar.classList.remove("hidden");
};


window.deletarTexto = (index) => {
  if (confirm("Deseja realmente excluir este texto?")) {
    listaTextos.splice(index, 1);
    salvarNoLocalStorage();
    renderizarLista();
    limparFormulario();
  }
};


btnCancelar.addEventListener("click", limparFormulario);

function limparFormulario() {
  inputId.value = "";
  inputTexto.value = "";
  btnSalvar.textContent = "Salvar";
  btnCancelar.classList.add("hidden");
}

//Variaveis
let total = 250;
let listaItens = [];

let botao = document.querySelector("#botao");
let botaoSaldo = document.querySelector("#botaoSaldo");
//Classes
class Item {
    nome;
    preco;
    data;
    constructor(nome,preco,data) {
        this.nome = nome;
        this.preco = preco;
        this.data = data;
    }
}

//Funções
function mostrarItens(nome,preco,data) {
    let tabela = document.querySelector("tbody");
    let linha = document.createElement("tr");
    
    for(let i = 0;i<3;i++) {
        let propriedades = [nome,"R$: " + Number(preco).toFixed(2),data];

        let dados = document.createElement("td");
        dados.textContent = propriedades[i];
        linha.appendChild(dados);
    }
    tabela.appendChild(linha);

    //Mudar o estilo da tabela
    if (listaItens.length > 0) {
        document.querySelector("#tabela").style.display = "flex";
    }
    if (listaItens.length <= 0) {
        document.querySelector("#tabela").style.display = "none";
    }
} 

function adicionarItem() {
    let produto = document.querySelector("#produto").value;
    let preco = document.querySelector("#preco").value;
    if (produto != "" && (preco != 0 || preco > 0) && preco < 1000000) {
        //Manipulando datas
        let data = new Date();
        let diaSemana = data.getDay();
        let dia = data.getDate();
        let mes = data.getMonth();
        let ano = data.getFullYear();

        //Adicionando um 0 a mais no mes quando for menos que 10
        if (dia < 10) 
            dia = "0" + dia;

        //Controlando os dias da semana
        switch(diaSemana) {
            case 0:
                diaSemana = "domingo";
                break;
            case 1:
                diaSemana = "segunda-feira";
                break;
            case 2:
                diaSemana = "terça-feira";
                break;
            case 3:
                diaSemana = "quarta-feira";
                break;
            case 4:
                diaSemana = "quinta-feira";
                break;
            case 5:
                diaSemana = "sexta-feira";
                break;
            case 6:
                diaSemana = "sabado";
                break;
        }
        let texto = `Comprado ${diaSemana} dia: ${dia}/${mes+1}/${ano}`;
        let novoItem = new Item(produto,preco,texto);

        //Colocando o novoItem na lista
        listaItens.push(novoItem);

        //Diminuir o total
        total -= preco;
        let titulo = document.querySelector("h1");
        titulo.textContent = "Saldo: R$ " + total.toFixed(2);

        //Salvando dados no LocalStorage
        localStorage.setItem("item",JSON.stringify(listaItens));
        localStorage.setItem("total",total.toString());


        //Adicionar dados na tabela
        mostrarItens(novoItem.nome,novoItem.preco,novoItem.data);
    }else {
        alert("Coloque dados corretamente!");
    }
}
function mudarSaldo() {
    let saldoNovo = Number(prompt("Coloque o novo valor do saldo: "))

    if (saldoNovo != NaN) {
        if (saldoNovo > 0) {
            total = saldoNovo
            document.querySelector("h1").textContent = "Saldo: " + "R$" + total.toFixed(2);
            localStorage.setItem("total",saldoNovo);
        }
    }else {
        alert("Valor inválido, coloque um número.");
    }
}

//Eventos
window.addEventListener("load",() => {
    if (localStorage.getItem("total") !== null) {
        let totalStorage = localStorage.getItem("total");
        total = Number(totalStorage);
    }else {
        total = 250;
    }
    let titulo = document.querySelector("h1");
    titulo.textContent = "Saldo: R$ " + total.toFixed(2);

    //Colocando as coisas salvas toda a vez no LocalStorage
    let itens = JSON.parse(localStorage.getItem("item"));
    if (itens.length > 0) {
        listaItens = itens;
        for(let i =0;i<itens.length;i++) {
            mostrarItens(itens[i].nome,itens[i].preco,itens[i].data);
        }
    }

})
window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        adicionarItem();
    }
})
botao.addEventListener("click",() => {
    adicionarItem();
})

//* TEMA CLARO E ESCURO
const botaoTema = document.querySelector("#botaoTema");
let change = false;

//Carregar as imagens antes de usa-la, para evitar atrasados
const sunImage = new Image();
sunImage.src = "images/sun.webp";
const moonImage = new Image();
moonImage.src = "images/moon.webp";

botaoTema.addEventListener("click",() => {
    change = !change;
    let imagem = document.querySelector("img");
    if (!change) {
        imagem.src = sunImage.src;
        document.body.style.backgroundColor = '#FFFFFF';
        document.querySelector(".menu").style = `background-color: #669178;
                                                 color: white;
        `
        document.querySelector("#botao").style.backgroundColor = "#264d37";

        //Cabeçalho das tabelas
        let th = document.querySelectorAll("th");
        for(let i = 0;i<th.length;i++) {
            th[i].style.backgroundColor = "#1E3327"
            th[i].style.color = "white";

        }
        //Dados das tabelas
        let td = document.querySelectorAll("td");
        for(let i = 0;i<td.length;i++) {
            td[i].style.borderBottom = "1px solid black";
            td[i].style.color = "black";

        }
    }else {
        imagem.src = moonImage.src;
        document.body.style.backgroundColor = '#242B36';
        document.querySelector(".menu").style = `background-color: #00E568;
                                                 color: black;
        `
        document.querySelector("#botao").style.backgroundColor = "#2A332E";

        //Cabeçalho das tabelas
        let th = document.querySelectorAll("th");
        for(let i = 0;i<th.length;i++) {
            th[i].style.backgroundColor = "#30915C"
            th[i].style.color = "black";
        }
        //Dados das tabelas
        let td = document.querySelectorAll("td");
        for(let i = 0;i<td.length;i++) {
            td[i].style.borderBottom = "1px solid white";
            td[i].style.color = "white";

        }
    }
})
botaoSaldo.addEventListener("click",mudarSaldo);

'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js"

function estruturarJson() {

}

async function criarCards() {
    const contatos = await getContatos()

    const cards = document.getElementById("cards")

    for (let contato of contatos) {

        const card = document.createElement("div")
        card.className = "card"

        const dados = document.createElement("div")
        dados.className = "dados"

        const id = document.createElement("span")
        id.textContent = `ID: ${contato.id}`

        const nome = document.createElement("span")
        nome.textContent = `Nome: ${contato.nome}`

        const celular = document.createElement("span")
        celular.textContent = `Celular: ${contato.celular}`

        const foto = document.createElement("img")
        foto.className = "foto"
 
        if(contato.foto == ""){
            foto.src = "./img/usuario-sem-icone.png"
            foto.alt = "Usuário sem foto"
        }else{
            foto.src = `${contato.foto}`
            foto.alt = "Foto do usuário"
        }

        const email = document.createElement("span")
        email.textContent = `Email: ${contato.email}`

        const endereco = document.createElement("span")
        endereco.textContent = `Endereço: ${contato.endereco}`

        const cidade = document.createElement("span")
        cidade.textContent = `Cidade: ${contato.cidade}`

        const botoes = document.createElement("div")
        botoes.className = "botoes"

        const buttonUpdate = document.createElement("button")
        buttonUpdate.className = "button-atualizar"
        buttonUpdate.onclick = () => atualizarDados(contato)
        buttonUpdate.textContent = "🔄"

        const buttonDelete = document.createElement("button")
        buttonDelete.className = "button-deletar"
        buttonDelete.onclick = () => deletarEAtualizar(contato.id)
        buttonDelete.textContent = "X"

        botoes.append(buttonUpdate, buttonDelete)
        dados.append(id, nome, celular, foto, email, endereco, cidade, botoes)
        card.append(foto, dados)
        cards.append(card)
    }
}   

async function deletarEAtualizar(id){
    await deleteContato(id)
}

function atualizarDados(contato) {

}

criarCards()


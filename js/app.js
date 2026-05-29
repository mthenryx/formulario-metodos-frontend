'use strict'

import { getContatos, postContato, putContato, deleteContato } from "./contatos.js"

let contatoSelecionado = null

function validarCampos(nome, telefone, email, endereco, cidade) {
    let result = { "status": false, "message": "" }

    if (nome.value == "") {
        result.message = "Nome não foi preenchido"
    } else if (telefone.value == "") {
        result.message = "Telefone não foi preenchido"
    } else if (email.value == "") {
        result.message = "E-mail não foi preenchido"
    } else if (endereco.value == "") {
        result.message = "Endereco não foi preenchido"
    } else if (cidade.value == "") {
        result.message = "Cidade não foi preenchido"
    } else {
        result.status = true
    }

    return result
}

async function criarCards() {

    const contatos = await getContatos()

    const cards = document.getElementById("cards")

    cards.innerHTML = ""

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

        if (contato.foto == "") {
            foto.src = "./img/usuario-sem-icone.png"
            foto.alt = "Usuário sem foto"
        } else {
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
        dados.append(id, nome, celular, email, endereco, cidade, botoes)
        card.append(foto, dados)
        cards.append(card)
    }
}

async function deletarEAtualizar(id) {
    await deleteContato(id)
    await criarCards()
}

function atualizarDados(contato) {

    contatoSelecionado = contato

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    const nome = document.getElementById("nomeInput")
    nome.value = contato.nome
    const telefone = document.getElementById("numeroInput")
    telefone.value = contato.celular
    const foto = document.getElementById("fotoInput")
    foto.value = contato.foto
    const email = document.getElementById("emailInput")
    email.value = contato.email
    const endereco = document.getElementById("enderecoInput")
    endereco.value = contato.endereco
    const cidade = document.getElementById("cidadeInput")
    cidade.value = contato.cidade
}

document.getElementById("salvar").addEventListener("click", async () => {
    try {
        const nome = document.getElementById("nomeInput")
        const telefone = document.getElementById("numeroInput")
        const foto = document.getElementById("fotoInput")
        const email = document.getElementById("emailInput")
        const endereco = document.getElementById("enderecoInput")
        const cidade = document.getElementById("cidadeInput")

        const validar = validarCampos(nome, telefone, email, endereco, cidade)

        if (!validar.status) {
            alert(validar.message)
            return
        }

        const contato = {
            nome: nome.value,
            celular: telefone.value,
            foto: foto.value,
            email: email.value,
            endereco: endereco.value,
            cidade: cidade.value
        }

        if (contatoSelecionado) {
            await putContato(contatoSelecionado.id, contato)
            contatoSelecionado = null
        } else {
            await postContato(contato)
        }

        nome.value = ""
        telefone.value = ""
        foto.value = ""
        email.value = ""
        endereco.value = ""
        cidade.value = ""

        await criarCards()

    } catch (error) {
        alert(error.message)
    }
})

criarCards()
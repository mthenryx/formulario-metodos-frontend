'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js"

async function listarElemento (){
    const id       = document.getElementById("idAlocado")
    const nome     = document.getElementById("nomeTabela")
    const telefone = document.getElementById("telefonetabela")
    const foto     = document.getElementById("fotoTabela")
    const email    = document.getElementById("emailTabela")
    const endereco = document.getElementById("enderecoTabela")
    const cidade   = document.getElementById("cidadeTabela")

    let contatos = await getContatos()

    contatos.forEach((pessoa) => {
        id.textContent = pessoa.id
        nome.textContent = pessoa.nome
        telefone.textContent = pessoa.celular
        foto.textContent = pessoa.foto
        email.textContent = pessoa.email
        endereco.textContent = pessoa.endereco
        cidade.textContent = pessoa.cidade
    });

    const itens = document.createElement("tr")
    const table = document.createElement("table")
    itens.append(id, nome, telefone, foto, email, endereco, cidade)
    table.append(itens)
}
 
listarElemento()
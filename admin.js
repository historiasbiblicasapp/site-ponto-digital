async function salvarApp(){

let nome = document.getElementById("nomeApp").value
let descricao = document.getElementById("descricaoApp").value
let imagem = document.getElementById("imagemApp").value
let link = document.getElementById("linkApp").value

await supabase
.from("apps")
.insert([
{
nome,
descricao,
imagem,
link
}
])

alert("App salvo!")

}
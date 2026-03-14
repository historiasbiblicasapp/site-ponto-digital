const SUPABASE_URL = "https://iyhqcxbhgoonijxsjvew.supabase.co"
const SUPABASE_KEY = "sb_publishable_Nj7nsNsAFjlYhuPLqlLPUw_4l9FxqXM"

const supabaseClient = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)

async function salvarApp(){

let nome = document.getElementById("nome").value
let descricao = document.getElementById("descricao").value
let link = document.getElementById("link").value
let imagemFile = document.getElementById("imagem").files[0]

if(!imagemFile){
alert("Escolha uma imagem")
return
}

let nomeArquivo = Date.now()+"_"+imagemFile.name

// upload
let { data, error } = await supabaseClient
.storage
.from("apps")
.upload(nomeArquivo, imagemFile)

if(error){
console.log("ERRO UPLOAD:", error)
alert("Erro no upload")
return
}

// pegar url
let { data: publicURL } = supabaseClient
.storage
.from("apps")
.getPublicUrl(nomeArquivo)

let imagemURL = publicURL.publicUrl

// salvar no banco
let { error: erroDB } = await supabaseClient
.from("apps")
.insert([{
nome:nome,
descricao:descricao,
imagem:imagemURL,
link:link
}])

if(erroDB){
console.log("ERRO BANCO:", erroDB)
alert("Erro ao salvar no banco")
return
}

alert("App cadastrado!")

carregarAdmin()

}

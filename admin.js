const SUPABASE_URL = "SUA_URL"
const SUPABASE_KEY = "SUA_CHAVE"

const supabaseClient = supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

async function salvarApp(){

let nome = document.getElementById("nome").value
let descricao = document.getElementById("descricao").value
let link = document.getElementById("link").value
let imagemFile = document.getElementById("imagem").files[0]

let nomeArquivo = Date.now()+"_"+imagemFile.name

// upload da imagem
let {data,error} = await supabaseClient
.storage
.from("apps")
.upload(nomeArquivo,imagemFile)

if(error){
alert("Erro no upload")
return
}

// pegar url pública
let { data: urlData } = supabaseClient
.storage
.from("apps")
.getPublicUrl(nomeArquivo)

let imagemURL = urlData.publicUrl

// salvar no banco
await supabaseClient
.from("apps")
.insert([{

nome:nome,
descricao:descricao,
imagem:imagemURL,
link:link

}])

alert("App cadastrado!")

carregarAdmin()

}

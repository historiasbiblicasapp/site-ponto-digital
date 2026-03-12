const SUPABASE_URL = "sb_publishable_Nj7nsNsAFjlYhuPLqlLPUw_4l9FxqXM"
const SUPABASE_KEY = "sb_secret_0jrh4ZelcQrx59slPBmFng_ffW6Tdeh"

const supabaseClient = supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

async function carregarApps(){

let { data, error } = await supabaseClient
.from("apps")
.select("*")

if(error){
console.log(error)
return
}

let lista = document.getElementById("lista-apps")

lista.innerHTML=""

data.forEach(app=>{

lista.innerHTML += `
<div class="card">

<img src="${app.imagem}">

<div class="card-content">

<h3>${app.nome}</h3>

<p>${app.descricao}</p>

<a href="${app.link}" target="_blank">
<button>Ver demonstração</button>
</a>

</div>

</div>
`

})

}

carregarApps()
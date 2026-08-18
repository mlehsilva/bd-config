const inputUpload = document.getElementById('uploadImg');
const inputNome = document.getElementById("nome");
const button = document.getElementById("btn");
const avatarPreview = document.getElementById('avatar-preview');
const mensagem = document.getElementById('mensagem');
const labelUpload = document.querySelector('.custom-file-upload');

// Guarda a imagem padrão correta para resetar depois se necessário
const imagemPadrao = "https://i.pinimg.com/736x/14/0e/2a/140e2a06aaae0db9ce21e21b0bb767a1.jpg";

let url_imagem = "";
let nome = "";

// Pega o arquivo de imagem selecionado, converte para Base64 e atualiza o círculo
inputUpload.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            url_imagem = e.target.result; // String completa com a imagem
            
            // Atualiza instantaneamente a foto do círculo no topo
            avatarPreview.src = url_imagem; 
            
            console.log("Imagem carregada com sucesso!");
        };
        leitor.readAsDataURL(arquivo);

        // Atualiza o texto do botão com o nome do arquivo selecionado
        labelUpload.innerText = arquivo.name;
    } else {
        url_imagem = "";
        avatarPreview.src = imagemPadrao; // Volta para a padrão se cancelar
        labelUpload.innerText = "Escolher foto de perfil";
        console.log("Nenhum arquivo selecionado.");
    }
});

// Evento de clique no botão Salvar Perfil
button.addEventListener("click", async () => {
    nome = inputNome.value.trim();

    // Validação básica com feedback na tela
    if (!nome) {
        mensagem.style.color = '#FF9AA2';
        mensagem.innerText = "Por favor, digite o nome do usuário. 🌸";
        return;
    }

    // Chama a função de envio
    await criar();
});

async function criar() {
    const novo = { "nome": nome, "url": url_imagem };

    try {
        mensagem.style.color = '#FF85A2';
        mensagem.innerText = "Salvando perfil... ✨";

        const resposta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(novo)
        });

        if (resposta.ok) {
            const resultado = await resposta.json();
            console.log('Criado com sucesso:', resultado);
            
            // Exibir mensagem de sucesso estilizada na tela
            mensagem.style.color = '#FF85A2';
            mensagem.innerText = `Tudo certo! Redirecionando... ✨🎨`;

            // Salva os dados no navegador para a Home conseguir ler
            localStorage.setItem('krono_nome', nome);
            localStorage.setItem('krono_foto', url_imagem);

            // Redireciona para a tela inicial após 1.5 segundos
            setTimeout(() => {
                window.location.href = '\Perfil\index.html';
            }, 1500);

        } else {
            mensagem.style.color = '#FF9AA2';
            mensagem.innerText = "Erro ao salvar perfil no servidor. 😢";
        }

    } catch (error) {
        console.error("Erro ao enviar para o servidor:", error);
        mensagem.style.color = '#FF9AA2';
        mensagem.innerText = "Erro ao conectar com o servidor. Verifique se o backend está ligado!";
    }
}
const userAvatar = document.getElementById('user-avatar');
const welcomeTitle = document.getElementById('welcome-title');
const btnSair = document.getElementById('btn-sair');

// Pega os dados salvos no navegador (localStorage)
const nomeUsuario = localStorage.getItem('krono_nome');
const fotoUsuario = localStorage.getItem('krono_foto');

// Se não houver dados, manda de volta para o cadastro
if (!nomeUsuario) {
    window.location.href = 'index.html';
} else {
    // Exibe o nome e a foto personalizada
    welcomeTitle.innerText = `Olá, ${nomeUsuario}! ✨`;
    if (fotoUsuario) {
        userAvatar.src = fotoUsuario;
    }
}

// Botão para limpar os dados e voltar para o cadastro
btnSair.addEventListener('click', () => {
    localStorage.removeItem('krono_nome');
    localStorage.removeItem('krono_foto');
    window.location.href = 'index.html';
});
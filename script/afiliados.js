// Use a API global do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmwyAwg1t5cee1Gu_JlmfG4JRFVNbm4h4",
    authDomain: "databaseidc.firebaseapp.com",
    databaseURL: "https://databaseidc-default-rtdb.firebaseio.com",
    projectId: "databaseidc",
    storageBucket: "databaseidc.firebasestorage.app",
    messagingSenderId: "625496683532",
    appId: "1:625496683532:web:9120e1d6662e6b385bea29"
  };
  
  // Inicialize o Firebase
  firebase.initializeApp(firebaseConfig);

  document.addEventListener('DOMContentLoaded', function () {
    const ul = document.getElementById('affiliatesList');
    const database = firebase.database();
    const affiliatesRef = database.ref('afiliados');

    // Carregar afiliados do Firebase Realtime Database
    affiliatesRef.on('value', function(snapshot) {
        ul.innerHTML = ''; // Limpa a lista antes de renderizar novos dados

        snapshot.forEach(function(childSnapshot) {
            const afiliado = childSnapshot.val();
            const li = document.createElement('li');
            li.innerHTML = `
                <strong style="color: rgb(9, 27, 77);">${afiliado.nomeCompleto}</strong> E-mail: ${afiliado.email} | Data de Nascimento: ${afiliado.dataNascimento} | Telefone: ${afiliado.telefone}
                <button class="btn-ver-detalhes" onclick="viewDetails('${childSnapshot.key}')">Ver Detalhes</button>
                <button class="btn-editar" onclick="editAffiliate('${childSnapshot.key}')"><i class="fa-solid fa-user-pen"></i> Editar</button>
                <button class="btn-excluir" onclick="deleteAffiliate('${childSnapshot.key}')">Excluir</button>
            `;
            ul.appendChild(li);
        });
    });
});

function editAffiliate(key) {
    window.location.href = `/pages/editar_afiliado.html?index=${key}`;
}

// Função para visualizar detalhes do afiliado
function viewDetails(index) {
    window.location.href = `/pages/pagina_unica_afiliado.html?index=${index}`;
}

// Função para excluir um afiliado
function deleteAffiliate(key) {
    const affiliateRef = firebase.database().ref(`afiliados/${key}`);
    affiliateRef.remove()
        .then(() => {
            alert('Afiliado excluído com sucesso!');
            // A lista será atualizada automaticamente pelo listener
        })
        .catch((error) => {
            console.error('Erro ao excluir afiliado: ', error);
        });
}

function filterAffiliatesName() {
    // Obter o valor digitado no campo de busca
    var searchQuery = document.getElementById('searchBar').value.toLowerCase();
    
    // Obter todos os itens da lista de afiliados
    var affiliates = document.querySelectorAll('#affiliatesList li');
    
    // Percorrer cada item e verificar se o nome do afiliado contém o texto de busca
    affiliates.forEach(function(affiliate) {
        // Verificar se o nome do afiliado contém o texto digitado
        if (affiliate.textContent.toLowerCase().includes(searchQuery)) {
            affiliate.style.display = '';  // Exibe o item
        } else {
            affiliate.style.display = 'none';  // Oculta o item
        }
    });
}
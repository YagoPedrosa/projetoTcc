// Configuração do Firebase
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
    const affiliateDetailsDiv = document.getElementById('affiliateDetails');
    const database = firebase.database();
    const affiliatesRef = database.ref('afiliados');

    // Armazenar todos os afiliados para poder filtrar
    let affiliatesData = [];

    // Carregar afiliados do Firebase Realtime Database
    affiliatesRef.on('value', function(snapshot) {
        affiliatesData = [];  // Limpar os dados ao carregar novos
        snapshot.forEach(function(childSnapshot) {
            const afiliado = childSnapshot.val();
            affiliatesData.push(afiliado);  // Armazenar dados do afiliado
        });
    });

    // Função para filtrar afiliados pelo nome
    window.filterAffiliatesName = function() {
        const searchQuery = document.getElementById('searchBar').value.toLowerCase();

        // Limpar o conteúdo atual do div onde os dados serão exibidos
        affiliateDetailsDiv.innerHTML = '';

        // Procurar afiliados que correspondem ao nome digitado
        const foundAffiliate = affiliatesData.find(function(afiliado) {
            return afiliado.nomeCompleto.toLowerCase() === searchQuery;
        });

        if (foundAffiliate) {
            // Exibir os detalhes do afiliado encontrado
            affiliateDetailsDiv.innerHTML = `
                <strong style="color: rgb(9, 27, 77);">${foundAffiliate.nomeCompleto}</strong><br>
                E-mail: ${foundAffiliate.email}<br>
                Data de Nascimento: ${foundAffiliate.dataNascimento}<br>
                Telefone: ${foundAffiliate.telefone}
            `;
        } else {
            // Se não encontrar nenhum afiliado correspondente, exibir uma mensagem
            affiliateDetailsDiv.innerHTML = 'Afiliado não encontrado!';
        }
    };
});

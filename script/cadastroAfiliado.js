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
  
  const database = firebase.database(); // Obtenha a instância do banco de dados
  
  document.getElementById('cadastroForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Captura os dados do formulário
      const afiliados = {
          nomeCompleto: document.getElementById('nomeCompleto').value,
          dataNascimento: document.getElementById('dataNascimento').value,
          nacionalidade: document.getElementById('nacionalidade').value,
          estadoCivil: document.getElementById('estadoCivil').value,
          nomeMae: document.getElementById('nomeMae').value,
          profissao: document.getElementById('profissao').value,
          CPF: document.getElementById('CPF').value,
          RG: document.getElementById('RG').value,
          endereco: document.getElementById('endereco').value,
          numero: document.getElementById('numero').value,
          bairro: document.getElementById('bairro').value,
          cidade: document.getElementById('cidade').value,
          estado: document.getElementById('estado').value,
          CEP: document.getElementById('CEP').value,
          telefone: document.getElementById('telefone').value,
          email: document.getElementById('email').value,
          meses: {
              janeiro: document.getElementById('janeiro').checked,
              fevereiro: document.getElementById('fevereiro').checked,
              marco: document.getElementById('marco').checked,
              abril: document.getElementById('abril').checked,
              maio: document.getElementById('maio').checked,
              junho: document.getElementById('junho').checked,
              julho: document.getElementById('julho').checked,
              agosto: document.getElementById('agosto').checked,
              setembro: document.getElementById('setembro').checked,
              outubro: document.getElementById('outubro').checked,
              novembro: document.getElementById('novembro').checked,
              dezembro: document.getElementById('dezembro').checked
          }
      };
  
      // Criar uma nova referência e salvar os dados
      const newAfiliateRef = database.ref('afiliados').push();
      newAfiliateRef.set(afiliados)
          .then(() => {
              alert('Afiliado cadastrado com sucesso!');
          })
          .catch((error) => {
              console.error('Erro ao cadastrar afiliado: ', error);
          });
  });
  
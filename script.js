async function consultarCEP() {
    const cep = document.getElementById('cepId').value;
    console.log(cep)
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error(error);
    }
}

async function consultarCNPJ() {
    const cnpj = document.getElementById('cnpjId').value;
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}

async function verificarCPFCNPJ() {
    
}

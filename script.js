async function criarNotaFiscal() {
    const discriminacao = document.getElementById("discriminacaoId").value;
    const valorVenda = parseFloat(document.getElementById("valorVendaId").value) || 0;
    const irpf = parseFloat(document.getElementById("PorcentagemIRPFId").value) || 0;
    const pis = parseFloat(document.getElementById("PorcentagemPISId").value) || 0;
    const cofins = parseFloat(document.getElementById("PorcentagemCOFINSId").value) || 0;
    const inss = parseFloat(document.getElementById("PorcentagemINSSId").value) || 0;
    const issqn = parseFloat(document.getElementById("PorcentagemISSQNId").value) || 0;

    const discriminacaoFormatada = discriminacao.replace(/\n/g, '<br>');
    const totalDeductions = valorVenda * ((irpf + pis + cofins + inss + issqn) / 100);
    const netValue = valorVenda - totalDeductions;

    const notaFiscalContainer = document.getElementById("notaFiscal");
    notaFiscalContainer.innerHTML = `
        <h2>Nota Fiscal</h2>
        <br>
        <p><strong>Discriminação dos Serviços:</strong><br> ${discriminacaoFormatada}</p>
        <br>
        <p><strong>Valor da Venda:</strong> R$ ${valorVenda.toFixed(2)}</p>
        <p><strong>Total de Deduções:</strong> R$ ${totalDeductions.toFixed(2)}</p>
        <p><strong>Valor Líquido:</strong> R$ ${netValue.toFixed(2)}</p>
        <hr>
        <p><em>Nota gerada automaticamente.</em></p>
    `;

    notaFiscalContainer.hidden = false;
}

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

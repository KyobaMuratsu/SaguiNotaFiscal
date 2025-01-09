var nomeRazaoPrestador = "";
var nomeRazaoTomador = "";
var telefonePrestador = "";
var telefoneTomador = "";
var emailPrestador = "";
var emailTomador = "";
var cpfCnpjPrestador = "";
var cpfCnpjTomador = "";
var cepPrestador = "";
var cepTomador = "";


async function criarNotaFiscalSimplificado() {
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

function cpf() {
    const buttonCpf = document.getElementById("cpfCheckboxPrestadorId");
    const buttonCnpj = document.getElementById("cnpjCheckboxPrestadorId");

    const formularioPrestador = document.getElementById("formPrestador");
    const buttonConfirm = document.getElementById("confirmButton");

    buttonConfirm.hidden = false;
    buttonCnpj.hidden = true;
    buttonCpf.hidden = true;

    formularioPrestador.innerHTML = `
                    <label for="nomeRazao">Nome/Razão Social</label>
                    <input type="text" id="nomePrestadorId">
                    <label for="nomeFantasia">Nome Fantasia</label>
                    <input type="text" id="nomeFantasiaPrestadorId">
                    <label for="telefone">Telefone</label>
                    <input type="text" id="telefonePrestadorId">
                    <label for="email">E-mail</label>
                    <input type="text" id="emailPrestadorId">
                    <label for="cpfcnpj">CPF</label>
                    <input type="text" id="cpfPrestadorId">
                    <label for="cepId">CEP</label>
                    <input type="text" id="cepPrestadorId">`
}

async function cnpj() {
    const buttonCpf = document.getElementById("cpfCheckboxPrestadorId");
    const buttonCnpj = document.getElementById("cnpjCheckboxPrestadorId");

    const formularioPrestador = document.getElementById("formPrestador");
    const buttonConfirm = document.getElementById("confirmButton");

    buttonConfirm.hidden = false;
    buttonCnpj.hidden = true;
    buttonCpf.hidden = true;

    formularioPrestador.innerHTML = `
                    <label for="cpfcnpj">CNPJ</label>
                    <input type="text" id="cnpjPrestadorId">
                    <label for="telefone">Telefone</label>
                    <input type="text" id="telefonePrestadorId">
                    <label for="email">E-mail</label>
                    <input type="text" id="emailPrestadorId">`
}


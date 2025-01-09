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

var prestadorOuTomador = "";


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
    prestadorOuTomador = document.getElementById("titleId").textContent;

    const buttonCpf = document.getElementById("cpfButtonPrestadorId");
    const buttonCnpj = document.getElementById("cnpjButtonPrestadorId");

    const formularioPrestador = document.getElementById("formPrestador");

    buttonCnpj.hidden = true;
    buttonCpf.hidden = true;

    formularioPrestador.innerHTML = `
                    <label for="nomeRazao">Nome/Razão Social</label>
                    <input type="text" id="nome${prestadorOuTomador}Id">
                    <label for="nomeFantasia">Nome Fantasia</label>
                    <input type="text" id="nomeFantasia${prestadorOuTomador}Id">
                    <label for="telefone">Telefone</label>
                    <input type="text" id="telefone${prestadorOuTomador}Id">
                    <label for="email">E-mail</label>
                    <input type="text" id="email${prestadorOuTomador}Id">
                    <label for="cpfcnpj" id="cpfcnpj">CPF</label>
                    <input type="text" id="cpf${prestadorOuTomador}Id">
                    <label for="cepId">CEP</label>
                    <input type="text" id="cep${prestadorOuTomador}Id">
                    <input type="button" onclick="confirmarFormulario('${prestadorOuTomador}')" value="Confirmar">`
                    
}

async function cnpj() {
    prestadorOuTomador = document.getElementById("titleId").textContent;

    const buttonCpf = document.getElementById("cpfButtonPrestadorId");
    const buttonCnpj = document.getElementById("cnpjButtonPrestadorId");

    const formularioPrestador = document.getElementById("formPrestador");

    buttonCnpj.hidden = true;
    buttonCpf.hidden = true;

    formularioPrestador.innerHTML = `
                    <label for="cpfcnpj" id="cpfcnpj">CNPJ</label>
                    <input type="text" id="cnpj${prestadorOuTomador}Id">
                    <label for="telefone">Telefone</label>
                    <input type="text" id="telefone${prestadorOuTomador}Id">
                    <label for="email">E-mail</label>
                    <input type="text" id="email${prestadorOuTomador}Id">
                    <input type="button" onclick="confirmarFormulario('${prestadorOuTomador}')" value="Confirmar">`
}

function confirmarFormulario(prestadorOuTomador) {
    const cpfCnpjPrestadorTomador = document.getElementById("cpfcnpj").textContent;

    if(prestadorOuTomador == "Prestador" && cpfCnpjPrestadorTomador === "CNPJ"){
        telefonePrestador = document.getElementById("telefonePrestadorId").value;
        emailPrestador = document.getElementById("emailPrestadorId").value;
        cpfCnpjPrestador = document.getElementById("cnpjPrestadorId").value;

        alert("Dados do Prestador confirmados!");
        limparFormulario();
        gerarFormularioTomador();
    }
    if (prestadorOuTomador == "Prestador" && cpfCnpjPrestadorTomador === "CPF") {
        nomeRazaoPrestador = document.getElementById("nomePrestadorId").value;
        telefonePrestador = document.getElementById("telefonePrestadorId").value;
        emailPrestador = document.getElementById("emailPrestadorId").value;
        cpfCnpjPrestador = document.getElementById("cpfPrestadorId").value;
        cepPrestador = document.getElementById("cepPrestadorId").value;

        alert("Dados do Prestador confirmados!");
        limparFormulario();
        gerarFormularioTomador();
    } 
    if(prestadorOuTomador === "Tomador" && cpfCnpjPrestadorTomador === "CNPJ"){
        telefonePrestador = document.getElementById("telefoneTomadorId").value;
        emailPrestador = document.getElementById("emailTomadorId").value;
        cpfCnpjPrestador = document.getElementById("cnpjTomadorId").value;

        alert("Dados do Prestador confirmados!");
        limparFormulario();
        gerarFormularioDiscriminacaoValor();
    }

    if (prestadorOuTomador === "Tomador" && cpfCnpjPrestadorTomador === "CPF") {
        nomeRazaoTomador = document.getElementById("nomeTomadorId").value;
        telefoneTomador = document.getElementById("telefoneTomadorId").value;
        emailTomador = document.getElementById("emailTomadorId").value;
        cpfCnpjTomador = document.getElementById("cpfTomadorId").value;
        cepTomador = document.getElementById("cepTomadorId").value;

        alert("Dados do Tomador confirmados!");
        limparFormulario();
    }
}

function limparFormulario() {
    const formularioContainer = document.getElementById("formPrestador");
    formularioContainer.innerHTML = ``;
}

function gerarFormularioTomador() {
    const titulo = document.getElementById("titleId");
    const buttonCpf = document.getElementById("cpfButtonPrestadorId");
    const buttonCnpj = document.getElementById("cnpjButtonPrestadorId");
    
    titulo.innerHTML = `Tomador`;

    buttonCnpj.hidden = false;
    buttonCpf.hidden = false;

}


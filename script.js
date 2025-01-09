var nomeRazaoPrestador = "";
var nomeRazaoTomador = "";
var nomeFantasiaPrestador = "";
var nomeFantasiaTomador = "";
var telefonePrestador = "";
var telefoneTomador = "";
var emailPrestador = "";
var emailTomador = "";
var cpfCnpjPrestador = "";
var cpfCnpjTomador = "";
var cepPrestador = "";
var cepTomador = "";
var enderecoPrestador = "";
var enderecoTomador = "";
var municipioPrestador = "";
var municipioTomador = "";
var ufPrestador = "";
var ufTomador = "";

var prestadorOuTomador = "";

function formatarCampos() {
    const cpfInput = document.getElementById("cpfPrestadorId");
    const cnpjInput = document.getElementById("cnpjPrestadorId");
    const telefoneInput = document.getElementById("telefonePrestadorId");

    cpfInput.addEventListener("input", function(event) {
        this.value = formatarCPF(this.value);
    });

    cnpjInput.addEventListener("input", function(event) {
        this.value = formatarCNPJ(this.value);
    });

    telefoneInput.addEventListener("input", function(event) {
        this.value = formatarTelefone(this.value);
    });
}

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
    try {
            if (prestadorOuTomador === "Prestador") {
                const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepPrestador}`);
                const data = await response.json();
                enderecoPrestador = `${data.street}, ${data.neighborhood}`;
                municipioPrestador = data.city;
                ufPrestador = data.state;
            } else {
                const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepTomador}`);
                const data = await response.json();
                enderecoTomador = `${data.street}, ${data.neighborhood}`;
                municipioTomador = data.city;
                ufTomador = data.state;
            }
    } catch (error) {
        console.error(error);
        alert("Erro ao consultar o CEP.");
    }
}

async function consultarCNPJ() {
    try {
            if (prestadorOuTomador === "Prestador") {
                const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cpfCnpjPrestador}`);
                const data = await response.json();
                nomeRazaoPrestador = data.razao_social;
                nomeFantasiaPrestador = data.nome_fantasia || "N/A";
                emailPrestador = data.email || "N/A";
                cepPrestador = data.cep || "N/A";
                enderecoPrestador = `${data.logradouro}, ${data.numero || "s/n"}`;
                municipioPrestador = data.municipio;
                ufPrestador = data.uf;
            } else {
                const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cpfCnpjTomador}`);
                const data = await response.json();
                nomeRazaoTomador = data.razao_social;
                nomeFantasiaTomador = data.nome_fantasia || "N/A";
                emailTomador = data.email || "N/A";
                cepTomador = data.cep || "N/A";
                enderecoTomador = `${data.logradouro}, ${data.numero || "s/n"}`;
                municipioTomador = data.municipio;
                ufTomador = data.uf;
            }
    } catch (error) {
        console.error(error);
        alert("Erro ao consultar o CNPJ.");
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
        consultarCNPJ();
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
        consultarCEP();
        limparFormulario();
        gerarFormularioTomador();
    } 
    if(prestadorOuTomador === "Tomador" && cpfCnpjPrestadorTomador === "CNPJ"){
        telefoneTomador = document.getElementById("telefoneTomadorId").value;
        emailTomador = document.getElementById("emailTomadorId").value;
        cpfCnpjTomador = document.getElementById("cnpjTomadorId").value;
        alert("Dados do Prestador confirmados!");
        consultarCNPJ();
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
        consultarCEP();
        limparFormulario();
        gerarFormularioDiscriminacaoValor();
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

function gerarFormularioDiscriminacaoValor() {
    const titulo = document.getElementById("titleId");
    titulo.innerHTML = ``;

    const formularioDiscriminacao = document.getElementById("formPrestador");

    formularioDiscriminacao.innerHTML = `
                <section class="discriminacaoClass">    
                    <label for="discriminação">Discriminação dos Serviços</label>
                    <textarea id="discriminacaoId" class="discriminacaoTextClass"></textarea>
                </section>
                <div class="formContainer">
                    <section class="valorClass">
                        <label for="valor">Valor da Venda</label>
                        <input id="valorVendaId">
                    </section>
                </div>
                <div class="formContainer">
                    <section class="valorClass">
                        <label for="valor">Porcentagem <br> IRPF</label>
                        <input id="PorcentagemIRPFId">
                    </section>
                    <section class="valorClass">
                        <label for="valor">Porcentagem <br> PIS</label>
                        <input id="PorcentagemPISId">
                    </section>
                    <section class="valorClass">
                        <label for="valor">Porcentagem <br> COFINS</label>
                        <input id="PorcentagemCOFINSId">
                    </section>
                </div>
                <div class="formContainer">
                    <section class="valorClass">
                        <label for="valor">Porcentagem <br> INSS</label>
                        <input id="PorcentagemINSSId">
                    </section>
                    <section class="valorClass">
                        <label for="valor">Porcentagem <br> ISSQN</label>
                        <input id="PorcentagemISSQNId">
                    </section>
                </div>
                <input type="button" value="Gerar Nota Fiscal Completa" onclick="gerarNotaFiscalCompleta()">`

}

function gerarNotaFiscalCompleta() {
    const discriminacao = document.getElementById("discriminacaoId").value;
    const valorVenda = parseFloat(document.getElementById("valorVendaId").value) || 0;
    const irpf = parseFloat(document.getElementById("PorcentagemIRPFId").value) || 0;
    const pis = parseFloat(document.getElementById("PorcentagemPISId").value) || 0;
    const cofins = parseFloat(document.getElementById("PorcentagemCOFINSId").value) || 0;
    const inss = parseFloat(document.getElementById("PorcentagemINSSId").value) || 0;
    const issqn = parseFloat(document.getElementById("PorcentagemISSQNId").value) || 0;

    const totalDeductions = valorVenda * ((irpf + pis + cofins + inss + issqn) / 100);
    const netValue = valorVenda - totalDeductions;

    const notaFiscalCompleta = `
        <div class="nota-fiscal">
            <h2 class="nota-titulo">Nota Fiscal Completa</h2>
            <section class="nota-secao prestador">
                <h3>Prestador</h3>
                <p><strong>Nome/Razão Social:</strong> ${nomeRazaoPrestador || "Não informado"}</p>
                <p><strong>Nome Fantasia:</strong> ${nomeFantasiaPrestador || "Não informado"}</p>
                <p><strong>Telefone:</strong> ${telefonePrestador || "Não informado"}</p>
                <p><strong>Email:</strong> ${emailPrestador || "Não informado"}</p>
                <p><strong>CPF/CNPJ:</strong> ${cpfCnpjPrestador || "Não informado ou Invalido"}</p>
                <p><strong>CEP:</strong> ${cepPrestador || "Não informado ou Invalido"}</p>
                <p><strong>Endereço:</strong> ${enderecoPrestador || "Não informado"}</p>
                <p><strong>Municipio:</strong> ${municipioPrestador || "Não informado"}</p>
                <p><strong>UF:</strong> ${ufPrestador || "Não informado"}</p>
            </section>
            <hr>
            <section class="nota-secao tomador">
                <h3>Tomador</h3>
                <p><strong>Nome/Razão Social:</strong> ${nomeRazaoTomador || "Não informado"}</p>
                <p><strong>Nome Fantasia:</strong> ${nomeFantasiaTomador || "Não informado"}</p>
                <p><strong>Telefone:</strong> ${telefoneTomador || "Não informado"}</p>
                <p><strong>Email:</strong> ${emailTomador || "Não informado"}</p>
                <p><strong>CPF/CNPJ:</strong> ${cpfCnpjTomador || "Não informado ou Invalido"}</p>
                <p><strong>CEP:</strong> ${cepTomador || "Não informado ou Invalido"}</p>
                <p><strong>Endereço:</strong> ${enderecoTomador || "Não informado"}</p>
                <p><strong>Municipio:</strong> ${municipioTomador || "Não informado"}</p>
                <p><strong>UF:</strong> ${ufTomador || "Não informado"}</p>
            </section>
            <hr>
            <section class="nota-secao discriminacao">
                <h3>Discriminação dos Serviços</h3>
                <p>${discriminacao.replace(/\n/g, "<br>")}</p>
            </section>
            <section class="nota-secao valores">
                <h3>Valores</h3>
                <p><strong>Valor da Venda:</strong> R$ ${valorVenda.toFixed(2)}</p>
                <p><strong>Total de Deduções:</strong> R$ ${totalDeductions.toFixed(2)}</p>
                <p><strong>Valor Líquido:</strong> R$ ${netValue.toFixed(2)}</p>
            </section>
            <hr>
            <p class="nota-rodape"><em>Nota gerada automaticamente.</em></p>
        </div>
    `;

    const notaFiscalContainer = document.getElementById("formPrestador");
    notaFiscalContainer.innerHTML = notaFiscalCompleta;
    notaFiscalContainer.hidden = false;

}



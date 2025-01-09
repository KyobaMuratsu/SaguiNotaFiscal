# SaguiNotaFiscal

## Como usar a tela simplificada
Na primeira tela, inicia-se com a tela simplificada da aplicação, sendo possível discriminar os serviços, seu valor total e impostos.  
Os valores de porcentagem são em formato decimal, sendo assim, ao declarar as porcentagens deve-se utilizar números como nos exemplos: `10`, `20`, `3`, `4`, etc.  
Ao clicar no botão de "Gerar Nota Fiscal", o sistema calcula os impostos e o valor líquido.

## Como usar a tela completa
Nesta tela, deve-se selecionar o **prestador** e, posteriormente, o **tomador**, especificando se é CPF ou CNPJ.  
Ao selecionar uma dessas opções, abrirá um formulário com o restante dos campos a serem preenchidos.  
Após preencher ambos, a tela de discriminação de serviços será exibida.  
Após preenchê-la e gerar a nota fiscal, ela será gerada completa.

## Referências
- [Site Nota Fiscal do Município de Americana](https://nfse.americana.sp.gov.br/exemplo.aspx)  
- [API usada para consulta de informações por CEP e CNPJ](https://github.com/WillianAgostini/brasilapi-js)

const button = document.getElementById("convert-button")
const select = document.getElementById("currency-select")


const convertValues = async () => {  // async e await serve para consultar o valor atual
    const inputReais = document.getElementById("input-real").value
    const realValueText = document.getElementById("real-value-text")
    const currencyValueText = document.getElementById("currency-value-text")

    //Site que sera usado para pesquisa
    const data = await fetch(' https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').then(response => response.json()) // resposta do tipo json

    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
    const bitcoin = data.BTCBRL.high

    realValueText.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL", // Sigla do Real brasileiro
    }).format(inputReais)

    if (select.value === "US$ Dólar Americano") {
        currencyValueText.innerHTML = new Intl.NumberFormat("en-US", { //atualValorTexto.innerHTML = (valorEmReais / dolar) Dessa forma fica semformatação de moeda.
            style: "currency",
            currency: "USD", // Sigla do Dolar americano
        }).format(inputReais / dolar) //Formula tirada do site -> https://www.samanthaming.com/tidbits/30-how-to-format-currency-in-es6/

    }

    if (select.value === "€ Euro") {
        currencyValueText.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR", // Sigla do Euro
        }).format(inputReais / euro)
    }

    if (select.value === "Bitcoin") { //Adicionado
        currencyValueText.innerHTML = new Intl.NumberFormat("en-US", { //Adicionado
            style: "currency", //Adicionado
            currency: "BTC", //Adicionado
        }).format(inputReais / bitcoin / 1000) //Adicionado
    } //Adicionado

}

changeCurrency = () => {
    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.getElementById("currency-img")

    if (select.value === 'US$ Dólar Americano') {
        currencyName.innerHTML = "Dólar Americano"
        currencyImg.src = "./assets/eua.png"
    }
    if (select.value === '€ Euro') {
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./assets/euro.png"
    }
    if (select.value === 'Bitcoin') { //Adicionado
        currencyName.innerHTML = "Bitcoin"  //Adicionado
        currencyImg.src = "./assets/Bitcoin.png"  //Adicionado
    }  //Adicionado

    convertValues() //Assim ao trocar de moeda ja faz o calculo de conversão

}

button.addEventListener("click", convertValues) //Quando clicado chama a função convertValues
select.addEventListener("change", changeCurrency) //Quando clicado chama a função changeCurrency
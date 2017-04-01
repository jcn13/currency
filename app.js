const url = 'https://api.fixer.io/latest?base='
const quote = document.getElementById('quote')
let currency = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR']
let money
let firstCurrency
let secondCurrency
let currencyDB
quote.addEventListener('submit', (e) => { 	
  	e.preventDefault()  	
  	fecthFunc( input() )
})

function input() {
	money = document.getElementById('amount').value
	let a = document.getElementById("first")
	let b = document.getElementById("second")
	firstCurrency = a[a.selectedIndex].value
	secondCurrency = b[b.selectedIndex].value 
	console.log(firstCurrency , secondCurrency)  
}

function fecthFunc() {
fetch(`${url}${firstCurrency}`)
	.then( (res) => res.json() )
	.then( (data) => {
	console.log(data)
	add(data)  
	})
	.catch( (e) => console.log(`${e} something is donkin' up your wiz biz`))
}

function add (data) {
    let item = data
    currencyDB = JSON.parse(localStorage.getItem('db'))
    if (currencyDB === null){
        currencyDB = []
    }    
    currencyDB.push(item)    
    localStorage.setItem('db', JSON.stringify(currencyDB))
    console.log(currencyDB)     
    math()   
    return false
}

function addList (data, currency) {
    let html =`<select id="${currency}"><option>Choose currency</option>`
  	for(let i=0; i<data.length; i++) {            
    	html += '<option value="' + data[i] + '">' + data[i] + '</option>'
  	} 
  	html += '</select>' 
  	let name = currency + 'Currency' 
  	document.getElementById(`${name}`).innerHTML = html  		 
    return false
}

function math (){
	let list = JSON.parse(localStorage.getItem('db')) 
	answer = (list[0].rates[secondCurrency] * money).toFixed(2)
	let html = `<div id="math"><p>Your exchange will result in <b>${secondCurrency}$ ${answer}</b></p></div>`
  document.getElementById('result').innerHTML = html
  localStorage.clear()  	 	
}

addList(currency, 'first')
addList(currency, 'second')

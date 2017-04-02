const url = 'https://api.fixer.io/latest?base='
const quote = document.getElementById('quote')
let currency = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR']
let money
let firstCurrency
let secondCurrency
const currencyDB = new PouchDB('db')
let db
let database
quote.addEventListener('submit', (e) => { 	
  	e.preventDefault()  	
  	getDB( input() )
})

function input() {
	money = document.getElementById('amount').value
	let a = document.getElementById("first")
	let b = document.getElementById("second")
	firstCurrency = a[a.selectedIndex].value
	secondCurrency = b[b.selectedIndex].value	    
}

function getDB(){ 
  currencyDB.info().then(function (result) {    
    if(result.doc_count == 0){    
    fecthFunc()
    } else {           
      currencyDB.get('0').then((doc) => {        
        database = doc   
        if (database['obj'].base == firstCurrency) {
          math()
        } else {      
          currencyDB.get('0').then((doc) => {
            return currencyDB.remove(doc);
          }).then(function (result) {
            fecthFunc()            
          }).catch(function (err) {
            console.log(err)
          })
        }
      })
    }    
  }).catch(function (err) {
    console.log(err)
  })
}

function fecthFunc() {       
    fetch(`${url}${firstCurrency}`)
    	.then( (res) => res.json() )
    	.then( (data) => {
      db = data
      add(db)            
    	})
    	.catch( (e) => console.log(`just wrong dude`))      
}

function add(data) {
    let item = {
      _id: '0',
      "obj": data
    }
    currencyDB.put(item)           
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
  if(firstCurrency === secondCurrency){
    alert(`Same currency ${firstCurrency} equals to ${secondCurrency}`)
  } else {
    currencyDB.get('0').then((doc) => {    
    database = doc
  	answer = (database['obj'].rates[secondCurrency] * money).toFixed(2)
  	let html = `<div id="math"><p>Your exchange will result in <b>${secondCurrency}$ ${answer}</b></p></div>`
    document.getElementById('result').innerHTML = html         	 	
    })  
  }
}

addList(currency, 'first')
addList(currency, 'second')

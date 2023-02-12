const socket = io()

const prodAdd = document.getElementById('btnAdd')
const deleteBtn = document.getElementById('btnDeleted')

// Datos form producto
const title = document.getElementById('title')
const code = document.getElementById('code')
const description = document.getElementById('description')
const thumbail = document.getElementById('thumbail')
const price = document.getElementById('price')
const stock = document.getElementById('stock')

prodAdd.addEventListener('click',(e)=>{
    e.preventDefault()
    if(title.value = " " || code.value ==' ' || description.value == ' ' || price.value == ' '  ){ 
        alert("Ingresa los datos completos ; Title, Code, Description y Price")
    } else{ 
        const prod = { 
            valueTitle : title.value,
            valueCode : code.value,
            valueDescription : description.value,
            valueThumbail : thumbail.value,
            valuePrice : Number(price.value),
            valueStock : Number(stock.value)
        }
        socket.emit('add',prod)
    }

    title.value = ' ';
    code.value = ' ';
    description.value = ' ';
    price.value = ' '; 
    stock.value = ' ';
    thumbail.value = ' ';

    socket.on('add-exitoso', (data)=>{ 
        alert(data)
    })

})

const prodByID = document.getElementById('prodID')

deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = prodByID.value
    if(id != "" && id > 0){
        socket.emit('borrar', id) 
    } else {
        alert("Ingresa un id valido")
    }
    prodByID.value = " "
    
    socket.on('deleted-exitoso', (data)=>{ 
        alert(data)
    })

})





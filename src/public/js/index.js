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

// Pintar lista en html
const lista = document.getElementById('listProducts')

const funcionPintarHtml = (data) => {
    data.forEach(product => {
        let tr = document.querySelector(`tr[data-id="${product.id}"]`);
        if (!tr) {
            tr = document.createElement('tr');
            tr.setAttribute('data-id', product.id);
            for (key in product) {
                tr.innerHTML += `<td> ${product[key]} </td>`
            }
            lista.appendChild(tr);
        }
    })
}

socket.on('products', (data) => {
    console.log(data)
    funcionPintarHtml(data)
})

// Funcion btn agregar producto
prodAdd.addEventListener('click', (e) => {
    e.preventDefault()

    if (title.value !== " " && code.value !== " " && description.value !== " " && price.value !== "") {
        const prod = {
            valueTitle: title.value,
            valueCode: code.value,
            valueDescription: description.value,
            valueThumbail: thumbail.value,
            valuePrice: Number(price.value),
            valueStock: Number(stock.value)
        }
        socket.emit('add', prod)

        socket.on('add-exitoso', (data) => {
            let tr = document.createElement('tr');
            tr.setAttribute('data-id', product.id);
            for (key in product) {
                tr.innerHTML += `<td> ${product[key]} </td>`
            }
            document.getElementById('listProducts').appendChild(tr);
            alert(data)
        })


        title.value = ' ';
        code.value = ' ';
        description.value = ' ';
        price.value = ' ';
        stock.value = ' ';
        thumbail.value = ' ';

     
    } else {
        alert("Ingresa los datos completos ; Title, Code, Description y Price")
    }

})

// Datos formulario Delete
const prodByID = document.getElementById('prodID')

// Funcion delete btn
deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const id = prodByID.value
    if (id != "" && id > 0) {
        socket.emit('borrar', id)
        prodByID.value = " "

        socket.on('deleted-exitoso', (data) => {
            let tr = document.querySelector(`tr[data-id="${id}"]`);
            tr.remove();
            alert(data)
        })
        
    } else {
        alert("Ingresa un id valido")
    }
})


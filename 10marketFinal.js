// const fnInputData = () => {
//     console.log(`input data`)

// }

let products = [
    { id: 1661089678281, category: `Food`, name: `Noodle`, price: 20000, stock: 8 },
    { id: 1661089678282, category: `Cloth`, name: `hoodie`, price: 15000, stock: 7 },
    { id: 1661089678283, category: `Electronics`, name: `Headphone`, price: 20000, stock: 8 },
    { id: 1661089678284, category: `Fruits`, name: `Apple`, price: 10000, stock: 5 }
]

let categories = [`All`, `Food`, `Cloth`, `Electronics`, `Fruits`]

let carts = []


///////////////////////////////////////////////////////////
// calculate all items

const fnPayment = () => {

    // ini yang ngeprint
    const listPayment = carts.map((v, i, a) => {

        const { id, category, name, price, qty } = v

        return `<p> ${id} | ${name} | ${category} | ${price} x ${qty} = ${price * qty}</p>`

    })

    // ini hitung total ppn dll
    let subTotal = 0

    carts.forEach((v, i, a) => {

        const { price, qty } = v

        subTotal += price * qty

    });

    // Pajak Pembangunan NEGARA!
    const PPN = subTotal * 0.1

    const finalPrice = subTotal + PPN

    const listDetail = listPayment.join(``)

    const listTotal = `
    <h3> Sub Total Rp.${subTotal.toLocaleString()} </h3>
    <h3> PPN Rp.${PPN.toLocaleString(`id`)} </h3>
    <h3> Total Rp.${finalPrice.toLocaleString(`id`)} </h3>
    `

    document.getElementById(`payment`).innerHTML = listDetail + listTotal
}


// untuk memberikan tampilan
const fnRenderList = (index) => {
    const listProduct = products.map((v, i, a) => {

        const { id, category, name, price, stock } = v

        if (id != index) {

            return `
                    <tr>
                        <td>${id}</td>
                        <td>${category}</td>
                        <td>${name}</td>
                        <td>${price}</td>
                        <td>${stock}</td>

                        <td><input type="button" value="Add" onclick="fnAdd(${id})"></td>
                        <td><input type="button" value="Delete" onclick="fnDelete(${id})"></td>
                        <td><input type="button" value="Edit"   onclick="fnEdit(${id})"></td>
                    </tr>`

        }

        return `
                    <tr>
                        <td>${id}</td>
                        <td>${category}</td>
                        <td><input value="${name}" type="text" id="priceEdit"></td>
                        <td><input value="${price}" type="text" id="nameEdit" ></td>
                        <td><input value="${stock}" type="text" id="stockEdit"></td>
                        <td><input type="button" value="Add" disabled></td> 
                        <td><input type="button" value="Save" onclick="fnSave(${id})"></td>
                        <td><input type="button" value="Cancel" onclick="fnCancel()"></td>
                    </tr>`
    })




    const listCategory = categories.map((v, i, a) => {

        return `<option value="${v}">${v}</option>`

    })

    document.getElementById(`render`).innerHTML = listProduct.join(``)

    document.getElementById(`catFilter`).innerHTML = listCategory.join(``)
    document.getElementById(`catInput`).innerHTML = listCategory.join(``)

    // ini semua buat pas refresh data langsung keluar
}


////////////////////////////////////
// fnAdd

const fnAdd = (index) => {

    // dapatkan object produk yang terpilih
    const selectedProduct = products.find((v, i, a) => { return v.id == index })

    // priksa stock produk yang terpilih, apakah sudah habis ?
    if (selectedProduct.stock == 0) {
        alert(`\n\nMaaf, stock sudah habis`)
    } else {


        const foundCart = carts.find((v, i, a) => { return v.id == index })

        // jika tidak ada
        if (!foundCart) {

            const { id, category, name, price, product } = selectedProduct

            carts.push({ id, category, name, price, product, qty: 1 })

        } else {

            const idx = carts.findIndex((i) => { return i.id == index })

            carts[idx].qty++

        }


        // pengurangan diluar if else
        const idPro = products.findIndex((i) => { return i.id == index })

        // stleah ada pengurangan maka render ulang
        products[idPro].stock--


    }




    fnRenderList()

    fnRenderCart()

}







////////////////////////////////////
// edit
const fnEdit = (index) => {
    fnRenderList(index)
}






////////////////////////////////////
// cancel
const fnCancel = (index) => {
    fnRenderList()
}






////////////////////////////////////
// Save
const fnSave = (index) => {
    // get all new data from text box
    const name = document.getElementById(`nameEdit`).value
    const price = document.getElementById(`priceEdit`).value
    const stock = document.getElementById(`stockEdit`).value

    // find index
    const found = products.findIndex((product) => {

        return product.id == index
    })

    // change data
    products[found] = { ...products[found], name, price, stock }

    fnRenderList()
}







///////////////////////////////////////
// Delete
const fnDelete = (index) => {

    products = products.filter((v, i, a) => {
        return v.id != index
    })

    fnRenderList()
}








///////////////////////////////////////
// Delete
const fnDeleteCart = (index) => {

    // temukan index array products
    const idxProducts = products.findIndex((i) => { return i.id == index })

    // temukan index array carts
    const idxCarts = carts.findIndex((i) => { return i.id == index })

    //jumlahkan stock pada array carts dengan product
    products[idxProducts].stock += carts[idxCarts].qty


    // hapus produk
    carts = carts.filter((v, i, a) => {
        return v.id != index
    })

    // render ulang biar kelihatan hasilnya

    fnRenderList()

    fnRenderCart()
}








////////////////////////////////////////
// Render Carts

const fnRenderCart = () => {

    const listCart = carts.map((v, i, a) => {

        const { id, category, name, price, qty } = v

        return `
            <tr>
                <td>${id}</td>
                <td>${category}</td>
                <td>${name}</td>
                <td>${price}</ >
                <td>${qty}</td>
                <td><input type="button" value="Delete" onclick= "fnDeleteCart(${id})" ></td>
            </tr>
            `

    })

    document.getElementById(`carts`).innerHTML = listCart.join(``)

}












////////////////////////////////////////
// Render Filter
// function ini buat di panggil sama fnFiltername()
const fnRenderFilter = (arr) => { // ini tadi di ganti
    const listProduct = arr.map((v, i, a) => {

        const { id, category, name, price, stock } = v

        return `
        <tr>
            <td>${id}</td>
            <td>${category}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${stock}</td>
            <td><input type="button" value="Add" onclick="fnAdd(${id})"></td>
            <td><input type="button" value="Delete" onclick="fnDelete(${id})"></td>
            <td><input type="button" value="Edit"   onclick="fnEdit(${id})"></td>
        </tr>`
    })

    //tampilkan para html yang memiliki id render
    document.getElementById(`render`).innerHTML = listProduct.join(``)

}







////////////////////////////////////////
// reset filter
const fnResetFilter = () => {

    const inputTags = document.getElementsByName(`txtFilter`)

    for (const input of inputTags) {
        input.value = ``
    }

    fnRenderList()
}








//////////////////////////////////////
// untuk input data
const fnInputData = () => {
    // get data from html
    const name = document.getElementById(`nameInput`).value
    const price = parseInt(document.getElementById(`priceInput`).value)
    const category = document.getElementById(`catInput`).value
    const stock = document.getElementById(`stockInput`).value

    //create date object untuk Primarry Key
    const time = new Date()
    const id = time.getTime()


    // push new data
    products.push({ id, name, price, category, stock })

    // clean new data
    document.getElementById(`nameInput`).value = ``
    document.getElementById(`priceInput`).value = ``
    // document.getElementById(`catInput`).value = ``
    document.getElementById(`stockInput`).value = ``

    fnRenderList()
}








///////////////////////////////////////////////////////////////////
// FILTER name

const fnFilterName = () => {

    // get data from user
    const keyword = document.getElementById(`nameFilter`).value

    // filtering menggunakan array product
    const filterResult = products.filter((v, i, a) => {

        // buat ke 2 variabel toLowercase()
        const nameLow = v.name.toLowerCase()
        const keywordLow = keyword.toLowerCase()

        // return array yang memiliki name ke variabel filter result
        return nameLow.includes(keywordLow)
    })

    // lemparkan data ke function fnRenderDilter
    fnRenderFilter(filterResult)
}






/////////////////////////////////////
// Filter Harga
const fnFilterPrice = () => {

    // ambil data pada min dan max
    const min = document.getElementById(`min`).value
    const max = document.getElementById(`max`).value

    // buat patokan muncul semua
    let filterResult = products

    // jika min = kosong atau max sama dengan kosong = implikasi
    if (!(min == `` || max == ``)) {

        filterResult = products.filter((v, i, a) => {

            const { price } = v
            return price >= min && price <= max

        })
    }

    fnRenderFilter(filterResult)
}






//////////////////////////////////////
// Filter Category
const fnFilterCategory = () => {

    const selectedCategory = document.getElementById(`catFilter`).value

    let filterResult = products

    if (selectedCategory != `ALL`) {

        filterResult = products.filter((v, i, a) => {

            return v.category == selectedCategory

        })

    } // min 47 aneh

    fnRenderFilter(filterResult)
}

// ini yang manggil functionya
fnRenderList()




// console.log(document.getElementById(`render`))



// 01.03.50
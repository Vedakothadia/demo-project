let addTocart = document.querySelectorAll('.addtocart_index');
let NumberOfQty = document.querySelector('.NumberOfQty');
function update(cake) {
    // use axios from CDN
    axios.post('update-cart', JSON.parse(cake)).then((res) => {
        NumberOfQty.innerText = res.data.totalQty
    }).catch((e) => {
        console.log(e)
    })
}

addTocart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let cake = btn.getAttribute("data-addcartCake")
        // console.log(cake);
        update(cake);
    })
})
let productsCart = []
const savedProducts = localStorage.getItem('productsCart')
if (savedProducts) {
  productsCart = JSON.parse(savedProducts)
}

// HEADER e FAVORITOS
const cartSidebarEl = document.querySelector('.cart-sidebar')
function openSidebar (event) {
  event.stopPropagation()
  handleCartUpdate()
  cartSidebarEl.classList.add('cart-sidebar-open')
}
function closeSidebar () {
  cartSidebarEl.classList.remove('cart-sidebar-open')
}
const btnCartEl = document.getElementById('btn-cart')
btnCartEl.addEventListener('click', openSidebar)
const btnCloseCartEl = document.querySelector('#btn-close-cart')
btnCloseCartEl.addEventListener('click', closeSidebar)
document.addEventListener('click', closeSidebar)
cartSidebarEl.addEventListener('click', (event) => {
  event.stopPropagation();
})
const btnAddMore = document.querySelector('#btn-add-more')
btnAddMore?.addEventListener('click', closeSidebar)

const handleCartUpdate = (renderItens = true) => {
  // Salva carrinho no localstorage
  const productsCartString = JSON.stringify(productsCart)
  localStorage.setItem('productsCart', productsCartString)
  const emptyCartEl = document.querySelector('#empty-cart')
  const cartWithProductsEl = document.querySelector('#cart-with-products')
  const cartProductsListEl = cartWithProductsEl.querySelector('ul')
  if (productsCart.length > 0) {
    
    
    // // Atualizo o total do carrinho
    // const cartTotalEl = document.querySelector('.cart-total p:last-child')
    // cartTotalEl.textContent = totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    // Exibir carrinho com produtos
    cartWithProductsEl.classList.add('cart-with-products-show')
    emptyCartEl.classList.remove('empty-cart-show')
    // Exibir produtos do carrinho na tela
    if (renderItens) {
      cartProductsListEl.innerHTML = ''
      productsCart.forEach((product) => {

        const listItemEl = document.createElement('li')
        listItemEl.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="100" height="100" />
          <div>
            <p class="price">
              ${product.price.toLocaleString('pt-br', { minimumFractionDigits: 0 })}
            </p>
          </div>
          <button>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        `
        const btnRemoveEl = listItemEl.querySelector('button')

        btnRemoveEl.addEventListener('click', () => {
          removeOfCart(product.id)
        })
        const removeOfCart = id => {
          productsCart = productsCart.filter((product) => {
            if (product.id === id) {
              return false
            }
            return true
          })
          handleCartUpdate()
          if (productsCart.length === 0) {
            closeSidebar()
          }
        }
        // const inputQtyEl = listItemEl.querySelector('input')
        // inputQtyEl.addEventListener('keyup', (event) => {
        //   updateItemQty(product.id, event.target.value)
        // })
        // inputQtyEl.addEventListener('keydown', (event) => {
        //   if (event.key === '-' || event.key === '.' || event.key === ',') {
        //     event.preventDefault()
        //   }
        // })
        // inputQtyEl.addEventListener('change', (event) => {
        //   updateItemQty(product.id, event.target.value)
        // })
        cartProductsListEl.appendChild(listItemEl)
      })
    }
  } else {
    // Exibir carrinho vazio
    emptyCartEl.classList.add('empty-cart-show')
    cartWithProductsEl.classList.remove('cart-with-products-show')
  }
}

handleCartUpdate()

// localStorage.setItem

// const cardSelected = localStorage.getItem("cardSelected")

// const showCards = (cardSelected) => {
//   const aside = document.querySelector('#empty-cart')
//   const sectionEl = document.createElement("section");
//   aside.appendChild(sectionEl)  
//   sectionEl.innerHTML = `${cardSelected.name}`
  
// } 

// showCards(cardSelected)

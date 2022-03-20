let productsCart = [];
const savedProducts = localStorage.getItem("productsCart");
if (savedProducts) {
  productsCart = JSON.parse(savedProducts);
}

const cartSidebarEl = document.querySelector(".cart-sidebar");
function openSidebar(event) {
  event.stopPropagation();
  handleCartUpdate();
  cartSidebarEl.classList.add("cart-sidebar-open");
}
function closeSidebar() {
  cartSidebarEl.classList.remove("cart-sidebar-open");
}
const btnCartEl = document.getElementById("btn-cart");
btnCartEl.addEventListener("click", openSidebar);
const btnCloseCartEl = document.querySelector("#btn-close-cart");
btnCloseCartEl.addEventListener("click", closeSidebar);
document.addEventListener("click", closeSidebar);
cartSidebarEl.addEventListener("click", (event) => {
  event.stopPropagation();
});
const btnAddMore = document.querySelector("#btn-add-more");
btnAddMore?.addEventListener("click", closeSidebar);

const handleCartUpdate = (renderItens = true) => {
  // Salva carrinho no localstorage
  const productsCartString = JSON.stringify(productsCart);
  localStorage.setItem("productsCart", productsCartString);
  const emptyCartEl = document.querySelector("#empty-cart");
  const cartWithProductsEl = document.querySelector("#cart-with-products");
  const cartProductsListEl = cartWithProductsEl.querySelector("ul");
  if (productsCart.length > 0) {
    cartWithProductsEl.classList.add("cart-with-products-show");
    emptyCartEl.classList.remove("empty-cart-show");
    if (renderItens) {
      cartProductsListEl.innerHTML = "";
      productsCart.forEach((product) => {
        const listItemEl = document.createElement("li");
        listItemEl.innerHTML = `
        <img src="${product.image}" alt="${
          product.name
        }" width="64" height="93" />
        <span>${product.name}</span>
        <span>${product.edition}</span>
        <div>
          <p class="price">
            <span>${product.currency}</span> ${product.price.toLocaleString(
          "pt-br",
          { minimumFractionDigits: 0 }
        )}
          </p>
        </div>
          <button>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        `;
        const btnRemoveEl = listItemEl.querySelector("button");

        btnRemoveEl.addEventListener("click", () => {
          removeOfCart(product.id);
        });
        const removeOfCart = (id) => {
          productsCart = productsCart.filter((product) => {
            if (product.id === id) {
              return false;
            }
            return true;
          });
          handleCartUpdate();
          if (productsCart.length === 0) {
            closeSidebar();
          }
        };
        cartProductsListEl.appendChild(listItemEl);
      });
    }
  } else {
    emptyCartEl.classList.add("empty-cart-show");
    cartWithProductsEl.classList.remove("cart-with-products-show");
  }
};

handleCartUpdate();

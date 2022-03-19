const titleEl = document.querySelector("#title");
const imageEl = document.querySelector("#image");
const descriptionEl = document.querySelector("#description");
const editionEl = document.querySelector("#edition");
const linkEl = document.querySelector("#link");

const getCardLocalStorage = () => {
  const cardString = localStorage.getItem("cardSelected");
  const card = JSON.parse(cardString);
  console.log(card);
  titleEl.innerHTML = card.name;
  imageEl.innerHTML = `<img src="${card.image}"width="170" height="246"/>`;
  editionEl.innerHTML = card.edition;
  descriptionEl.innerHTML = card.description;
  card.sites.forEach((data) => {
    const sectionEl = getTemplateLink({...data, image:card.image});
    linkEl.appendChild(sectionEl);
  });
};

const getTemplateLink = (data) => {
  const sectionEl = document.createElement("section");
  // sectionEl.classList.add("sites");
  sectionEl.innerHTML = `
        <div class="sites">
        <div class="stores">              
          <a href="${data.link}" target="blank">${data.name}</a>
        </div>
        <div class="prices">
          <span>${data.currency} </span>${data.price}
        </div>
        <button id ="add-favorites">Adicionar aos Favoritos</button>
        </div>`;

        const btnAddCartEl = sectionEl.querySelector('button')
        btnAddCartEl.addEventListener('click', () => {
          addToCart(data)
        })

  return sectionEl;
};

getCardLocalStorage();

const addToCart = newData => {
  console.log(productsCart)
  const productIndex = productsCart.findIndex(
    item => item.id === newData.id
  )
  if (productIndex === -1) {
    productsCart.push({
      ...newData,
      qty: 1
    })
  } else {
    productsCart[productIndex].qty++
  }
  handleCartUpdate()
}







/* <img src="assets/img/sad.png" alt="sadYugi" class="teste"/>
<p class="h2">Favoritos sem Cartas</p> */


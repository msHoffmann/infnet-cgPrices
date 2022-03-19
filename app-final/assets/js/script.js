const fetchCards = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  const cardsListHighEl = document.querySelector("#cards-high");
  const cardsListLowEl = document.querySelector("#cards-low");

  data.cards.forEach((card) => {
    let sectionEl = getSectionEl(card);
    if (card.high) {
      cardsListHighEl.appendChild(sectionEl);
    } else {
      cardsListLowEl.appendChild(sectionEl);
    }
  });
};

fetchCards();

const getSectionEl = (card) => {
  const articleEl = document.createElement("article");
  articleEl.classList.add("card");
  articleEl.innerHTML = `<div>
      <img src="${card.image}" alt="${card.name}" width="122" height="176" />   
    <div class="card-content">
      <h3>Yu-gi-oh!</h3>
      <p class="card-name">${card.name}</p>
      <p>${card.edition}</p>
    </div>
  </div>`;
  const divCard = articleEl.querySelector("img")
  divCard.addEventListener('click', () => {
  handleClickCard(card)
  })
  return articleEl;
};

const handleClickCard = (card) => {
  localStorage.setItem("cardSelected", JSON.stringify(card))
  window.location.href = "cardDetail-yugioh.html"
} 



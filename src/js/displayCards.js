const typeColor = {
  bug: '#26de81',
  dragon: '#ffeaa7',
  electric: '#fed330',
  fairy: '#FF0069',
  fighting: '#30336b',
  fire: '#f0932b',
  flying: '#81ecec',
  grass: '#00b894',
  ground: '#EFB549',
  ghost: '#a55eea',
  ice: '#74b9ff',
  normal: '#95afc0',
  poison: '#6c5ce7',
  psychic: '#a29bfe',
  rock: '#2d3436',
  water: '#0190FF',
}; // ignore these DO NOT REMOVE
const displayCards = (Cards) => {
  Cards.forEach((Card) => {
    fetch(Card.url)
      .then((response) => response.json())
      .then((data) => {
        const pokemonName = data.species.name[0].toUpperCase() + data.species.name.substring(1);
        const pokeImgURL = data.sprites.other.dream_world.front_default;
        const pokeID = data.id;
        const statAttack = data.stats[1].base_stat;
        const statDefense = data.stats[2].base_stat;
        const statSpeed = data.stats[5].base_stat;

        const card = document.createElement('section');
        card.classList.add('card');
        card.setAttribute('id', `${pokeID}`);
        const cardCollection = document.querySelector('.card-collection');
        card.innerHTML = `<img
            src="${pokeImgURL}"
            alt="pokemon-img"
          />
          <h2>${pokemonName}</h2>
          <div class="abilities">
            
          </div>
          <ul class="stats">
            <li class="attack-score">
              <h3>Attack</h3>
              <p class="score">${statAttack}</p>
            </li>
            <li class="defense-score">
              <h3>Defense</h3>
              <p class="score">${statDefense}</p>
              </li>
              <li class="Speed-score">
              <h3>Speed</h3>
              <p class="score">${statSpeed}</p>
              </li>
              </ul>
              <div class="interactions">
              <button class="see-details">See Details</button>
              <span class="like-btn">
              <i class="fa-solid fa-star"></i>
              <span class="count">0 Stars</span>
              </span>
              </div>`;

        const { types } = data;
        let themeColor;
        if (types[0].type.name !== 'normal' || types[1] === undefined) {
          themeColor = typeColor[types[0].type.name];
        } else {
          themeColor = typeColor[types[1].type.name];
        }
        const abilities = card.querySelector('.abilities');
        types.forEach((type) => {
          const ability = document.createElement('span');
          ability.classList.add('ability');
          ability.innerHTML = type.type.name;
          ability.style.background = themeColor;
          abilities.appendChild(ability);
        });
        card.style.background = `radial-gradient(circle at 50% 0%,${themeColor} 36%,hsl(0, 0%, 100%) 36%)`;
        card.querySelector('.see-details').style.background = themeColor;
        cardCollection.appendChild(card);
      });
  });
};

export default displayCards;

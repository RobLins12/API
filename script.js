const animeForm = document.getElementById('anime-form');
const animeInput = document.getElementById('anime-input');
const characterList = document.getElementById('character-list');
const divImg = document.getElementById('img');
const divDesc = document.getElementById('desc');

animeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const anime = animeInput.value;
  const url = `https://api.jikan.moe/v4/anime?q=${anime}&limit=1`;
  console.log(url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const id  = data.data[0].mal_id;
    const img  = data.data[0].images.jpg.image_url;
    const desc = data.data[0].synopsis;

    divImg.innerHTML = "<img src='" + img + "' </img>";
    divDesc.innerHTML = "<p>" + desc + "</p>"

    console.log(id);

    const url2 = `https://api.jikan.moe/v4/anime/${id}/characters`;
    getChars(url2);
    
    
  } catch (error) {
    console.error(error);
    alert('Não foi possível obter os personagens. Tente novamente mais tarde.');
  }
});

async function getChars(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const characters = data.data;
    console.log(characters);

    characterList.innerHTML = '';
    
    characters.forEach((character) => {
      const characterItem = document.createElement('li');
      const characterIMG = document.createElement('a');

      characterIMG.innerHTML = character.character.name;
      characterIMG.href = character.character.images.jpg.image_url;
      characterIMG.target = "_blank";
      
      characterList.appendChild(characterItem);
      characterItem.appendChild(characterIMG);
    });
}
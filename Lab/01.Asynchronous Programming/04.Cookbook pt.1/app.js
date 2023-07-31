async function loadAllRecipies() {
   const url = `http://localhost:3030/jsonstore/cookbook/recipes`;
   const response = await fetch(url);
   if (!response.ok) {
      throw new Error();
   }
   document.querySelector('p').style.display = 'none';
   const data = await response.json();
   for (const element of Object.values(data)) {
      const article = createFoodPreview(element);
      article.addEventListener('click', loadRecipe);
   }
}
loadAllRecipies();

async function loadRecipe(e) {
   const url = `http://localhost:3030/jsonstore/cookbook/details/${e.target.getAttribute(
      'id'
   )}`;
   const response = await fetch(url);
   if (!response.ok) {
      throw new Error();
   }
   const data = await response.json();
   const main = document.querySelector('main');
   let ingredients = '';
   for (const element of data.ingredients) {
      ingredients += `<li>${element}</li>\n`;
   }
   let preparation = '';
   for (const element of data.steps) {
      preparation += `<p>${element}</p>\n`;
   }
   main.innerHTML = `<article>
      <h2>${data.name}</h2>
      <div class="band">
          <div class="thumb">
              <img src="${data.img}">
          </div>
          <div class="ingredients">
              <h3>Ingredients:</h3>
              <ul>
                  ${ingredients}
              </ul>
          </div>
      </div>
      <div class="description">
          <h3>Preparation:</h3>
          ${preparation}
      </div>
   </article>`;
}

//Helper Function
function createFoodPreview(element) {
   const article = document.createElement('article');
   article.classList.add('preview');
   article.setAttribute('id', `${element._id}`);
   const div = document.createElement('div');
   div.classList.add('title');
   const h2 = document.createElement('h2');
   h2.textContent = `${element.name}`;
   const div2 = document.createElement('div');
   div2.classList.add('small');
   const img = document.createElement('img');
   img.setAttribute('src', element.img);

   const main = document.querySelector('main');
   main.appendChild(article);
   article.appendChild(div);
   div.appendChild(h2);
   article.appendChild(div2);
   div2.appendChild(img);

   return article;
}

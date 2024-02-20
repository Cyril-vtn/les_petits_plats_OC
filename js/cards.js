import { recipes } from "../data/recipes.js";

const cardContainer = document.querySelector("#cards_container");
const recipeNumber = document.querySelector("#recipes-number");

export function displayCard() {
  recipes.forEach((recipe) => {
    let truncatedDescription = recipe.description;
    if (recipe.description.length > 180) {
      truncatedDescription = recipe.description.substring(0, 180) + "...";
    }

    let cardInnerDiv = document.createElement("div");
    cardInnerDiv.className =
      "w-[380px] h-[730px] bg-white rounded-[21px] shadow-lg relative";
    cardInnerDiv.tabIndex = 0;

    let timeDiv = document.createElement("div");
    timeDiv.className =
      "absolute w-[65px] h-[26px] bg-yellow flex justify-center items-center rounded-[14px] top-[21px] right-[22px]";
    let timeP = document.createElement("p");
    timeP.textContent = `${recipe.time}min`;
    timeDiv.appendChild(timeP);
    cardInnerDiv.appendChild(timeDiv);

    let imgDiv = document.createElement("div");
    imgDiv.className = "h-[253px] w-full";
    let img = document.createElement("img");
    img.className = "h-full w-full object-cover rounded-t-[8px]";
    img.src = `./assets/images/${recipe.image}`;
    img.alt = `${recipe.name}`;
    imgDiv.appendChild(img);
    cardInnerDiv.appendChild(imgDiv);

    let nameDiv = document.createElement("div");
    nameDiv.className = "pt-8 px-[25px] w-full";
    let nameH3 = document.createElement("h3");
    nameH3.className = "font-anton text-[18px] text-black";
    nameH3.textContent = `${recipe.name}`;
    nameDiv.appendChild(nameH3);
    cardInnerDiv.appendChild(nameDiv);

    let descDiv = document.createElement("div");
    descDiv.className = "px-[25px] pt-7";
    let descP1 = document.createElement("p");
    descP1.className = "font-manrope font-bold text-[12px] text-grey uppercase";
    descP1.textContent = "RECETTE";
    descDiv.appendChild(descP1);
    let descP2 = document.createElement("p");
    descP2.className =
      "font-manrope text-[14px] text-black font-normal pt-[15px]";
    descP2.textContent = `${truncatedDescription}`;
    descDiv.appendChild(descP2);
    cardInnerDiv.appendChild(descDiv);

    let ingredientsDiv = document.createElement("div");
    ingredientsDiv.className =
      "grid pt-[15px] grid-cols-2 gap-y-[21px] gap-x-[60px]";
    recipe.ingredients.forEach((ingredient) => {
      let ingredientDiv = document.createElement("div");
      ingredientDiv.className = "flex flex-col gap-[1px]";
      let ingredientH3 = document.createElement("h3");
      ingredientH3.className =
        "font-manrope text-[14px] font-medium text-black text-nowrap";
      ingredientH3.textContent = `${ingredient.ingredient}`;
      ingredientDiv.appendChild(ingredientH3);
      let ingredientP = document.createElement("p");
      ingredientP.className = "font-manrope text-[14px] font-normal text-grey";
      ingredientP.textContent = `${
        ingredient.quantity && ingredient.quantity !== 0
          ? ingredient.quantity
          : ""
      } ${
        ingredient.unit && ingredient.unit !== "unit" ? ingredient.unit : ""
      }`;
      ingredientDiv.appendChild(ingredientP);
      ingredientsDiv.appendChild(ingredientDiv);
    });
    cardInnerDiv.appendChild(ingredientsDiv);

    cardContainer.appendChild(cardInnerDiv);
  });
  recipeNumber.textContent = `${recipes.length} recette${
    recipes.length > 1 ? "s" : ""
  }`;
}

function addIngredientsToCard() {}

displayCard();

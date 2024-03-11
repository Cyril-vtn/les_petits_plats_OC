// Get the container where cards will be displayed
const cardContainer = document.querySelector("#cards_container");

export function displayCard(recipes) {
  // Clear the container
  cardContainer.innerHTML = "";
  // Loop through each recipe
  recipes.forEach((recipe) => {
    // Truncate the description if it's too long
    let truncatedDescription = recipe.description;
    if (recipe.description.length > 180) {
      truncatedDescription = recipe.description.substring(0, 180) + "...";
    }

    // Create the main card div
    let cardDiv = document.createElement("div");
    cardDiv.className =
      "w-[380px] h-[730px] bg-white rounded-[21px] shadow-lg relative";
    cardDiv.tabIndex = 0;

    // Create the time display
    let timeDisplayDiv = document.createElement("div");
    timeDisplayDiv.className =
      "absolute w-[65px] h-[26px] bg-yellow flex justify-center items-center rounded-[14px] top-[21px] right-[22px]";
    let timeText = document.createElement("p");
    timeText.textContent = `${recipe.time}min`;
    timeDisplayDiv.appendChild(timeText);
    cardDiv.appendChild(timeDisplayDiv);

    // Create the image display
    let imageDiv = document.createElement("div");
    imageDiv.className = "h-[253px] w-full";
    let image = document.createElement("img");
    image.className = "h-full w-full object-cover rounded-t-[21px]";
    image.src = `./assets/images/${recipe.image}`;
    image.alt = `${recipe.name}`;
    imageDiv.appendChild(image);
    cardDiv.appendChild(imageDiv);

    // Create the name display
    let nameDiv = document.createElement("div");
    nameDiv.className = "pt-8 px-[25px] w-full";
    let nameText = document.createElement("h3");
    nameText.className =
      "font-anton text-[18px] text-black overflow-hidden whitespace-nowrap overflow-ellipsis";
    nameText.textContent = `${recipe.name}`;
    nameDiv.appendChild(nameText);
    cardDiv.appendChild(nameDiv);

    // Create the description display
    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "px-[25px] pt-7";

    let recipeTitle = document.createElement("p");
    recipeTitle.className =
      "font-manrope font-bold text-[12px] text-grey uppercase";
    recipeTitle.textContent = "RECETTE";
    descriptionDiv.appendChild(recipeTitle);

    let descriptionText = document.createElement("p");
    descriptionText.className =
      "font-manrope text-[14px] text-black font-normal pt-[15px]";
    descriptionText.textContent = `${truncatedDescription}`;
    descriptionDiv.appendChild(descriptionText);

    // Add ingredients to the card
    let ingredientsContainer = document.createElement("div");
    ingredientsContainer.className = "pt-[32px]";
    let ingredientTitle = document.createElement("p");
    ingredientTitle.className =
      "font-manrope font-bold text-[12px] text-grey uppercase";
    ingredientTitle.textContent = "INGRÉDIENTS";

    let ingredientsGrid = document.createElement("div");
    ingredientsGrid.className =
      "grid pt-[15px] grid-cols-2 gap-y-[21px] w-auto";
    ingredientsContainer.appendChild(ingredientTitle);

    recipe.ingredients.forEach((ingredient) => {
      let ingredientDiv = document.createElement("div");
      ingredientDiv.className = "flex flex-col w-auto";

      let ingredientName = document.createElement("p");
      ingredientName.className =
        "font-manrope text-[14px] text-black overflow-hidden whitespace-nowrap overflow-ellipsis w-auto";
      ingredientName.textContent = ingredient.ingredient;
      ingredientDiv.appendChild(ingredientName);

      let ingredientQuantity = document.createElement("p");
      ingredientQuantity.className = "font-manrope text-[14px] text-grey";
      if (ingredient.quantity !== undefined) {
        ingredientQuantity.textContent =
          ingredient.quantity + " " + (ingredient.unit ? ingredient.unit : "");
      }
      ingredientDiv.appendChild(ingredientQuantity);

      ingredientsGrid.appendChild(ingredientDiv);
      ingredientsContainer.appendChild(ingredientsGrid);
      descriptionDiv.appendChild(ingredientsContainer);
    });

    cardDiv.appendChild(descriptionDiv);
    cardContainer.appendChild(cardDiv);
  });
}

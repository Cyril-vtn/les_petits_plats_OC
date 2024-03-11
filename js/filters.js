// Import recipes from data
import { recipes } from "../data/recipes.js";
import { displayCard } from "./cards.js";
import { ITEM_TYPES } from "./api.types.js";

// Initialization of selected items
let selectedItems = {
  ingredients: [],
  ustensiles: [],
  appareils: [],
};

//
let filteredRecipes = [];

// Function to get the elements of each type
const getItems = (type) => {
  let items = [];
  recipes.forEach((recipe) => {
    let elements = [];
    switch (type) {
      // For ingredients, we extract the name of each ingredient
      case ITEM_TYPES.INGREDIENTS:
        elements = recipe.ingredients.map(
          (ingredient) => ingredient.ingredient
        );
        break;
      // For utensils, we directly use the array
      case ITEM_TYPES.USTENSILES:
        elements = recipe.ustensils;
        break;
      // For appliances, we create an array from the unique value
      case ITEM_TYPES.APPAREILS:
        elements = [recipe.appliance];
        break;
    }
    // We add each element to the list if it is not already there
    elements.forEach((element) => {
      if (!items.includes(element)) {
        items.push(element);
      }
    });
  });
  // We sort the elements in alphabetical order
  items.sort();
  // We populate the list with the obtained elements
  populateList(type, items);
  return items;
};

// Function to populate the list of a given type with the given elements
const populateList = (type, items) => {
  const list = document.getElementById(`${type}_list`);
  list.innerHTML = "";
  items.forEach((item) => {
    let div = document.createElement("div");
    div.className =
      "h-[37px] font-manrope w-full flex items-center text-sm hover:bg-yellow cursor-pointer px-4";
    div.textContent = item;
    list.appendChild(div);
  });
};

const filterRecipes = () => {
  // Reset filteredRecipes to the full recipes list before each filtering
  filteredRecipes = [...recipes];

  // We filter the recipes based on the selected items
  filteredRecipes = filteredRecipes.filter(
    (recipe) =>
      selectedItems.ingredients.every((ingredient) =>
        recipe.ingredients.some((i) => i.ingredient === ingredient)
      ) &&
      selectedItems.ustensiles.every((ustensile) =>
        recipe.ustensils.includes(ustensile)
      ) &&
      selectedItems.appareils.every((appareil) => recipe.appliance === appareil)
  );
  displayCard(filteredRecipes);
  displayRecipeNumber(filteredRecipes.length);
};

// Function to display the selected filters
const displaySelectedFilters = (type) => {
  const selectedFiltersDiv = document.getElementById("selected_filters");
  const selectedList = document.getElementById(`selected_${type}`);

  selectedFiltersDiv.innerHTML = "";
  // selectedList.innerHTML = "";

  Object.keys(selectedItems).forEach((type) => {
    selectedItems[type].forEach((item) => {
      let div = document.createElement("div");
      div.className =
        "w-auto h-[53px] text-black text-[14px] font-manrope  bg-yellow rounded-[10px] flex justify-center items-center gap-[60px] px-[18px] py-[17px]";
      div.textContent = item;
      let deleteElement = document.createElement("i");
      deleteElement.className =
        " right-4 cursor-pointer fa-solid fa-xmark text-sm ";

      deleteElement.addEventListener("click", () => {
        selectedItems[type] = selectedItems[type].filter((i) => i !== item);
        populateList(type, getItems(type));
        console.log(selectedList);
        Array.from(selectedList.childNodes).forEach((div) => {
          if (div.textContent === item) {
            selectedList.removeChild(div);
          }
        });
        displaySelectedFilters(type);
        filterRecipes();
      });

      div.appendChild(deleteElement);
      selectedFiltersDiv.appendChild(div);
    });
  });
};

// Display the number of recipes
const displayRecipeNumber = (number) => {
  const recipeNumber = document.getElementById("recipes_number");
  let text = number === 1 ? "recette" : "recettes";
  recipeNumber.textContent = `${number} ${text}`;
};

// Function to set up the dropdown menu of a given type
const setupDropdown = (type) => {
  let items = getItems(type);
  const button = document.getElementById(`${type}`);
  const input = document.getElementById(`${type}_input`);
  const clear = document.getElementById(`clear_${type}`);
  const clearContainer = document.getElementById(`clear_${type}_container`);
  const dropdown = document.getElementById(`${type}_dropdown`);
  const arrow = document.getElementById(`${type}_arrow`);
  const list = document.getElementById(`${type}_list`);
  const search = document.getElementById(`search_${type}`);
  const selectedList = document.getElementById(`selected_${type}`);
  const selectedFiltersDiv = document.getElementById("selected_filters");

  // We initialize the filtered recipes with all the recipes
  filteredRecipes = recipes;

  // Function to toggle the display of the dropdown menu
  const toggleDropdown = () => {
    arrow.classList.toggle("rotate-180");
    dropdown.classList.toggle("hidden");
  };

  // We add event listeners to handle interaction with the dropdown menu
  button.addEventListener("click", toggleDropdown);

  input.addEventListener("input", () => {
    clearContainer.classList.toggle("hidden", input.value.length === 0);
    const items = list.querySelectorAll("div");
    items.forEach((item) => {
      item.style.display = item.textContent
        .toLowerCase()
        .includes(input.value.toLowerCase())
        ? "flex"
        : "none";
    });
  });

  clear.addEventListener("click", () => {
    input.value = "";
    clearContainer.classList.add("hidden");
    list.querySelectorAll("div").forEach((item) => {
      item.style.display = "flex";
    });
  });

  document.addEventListener("click", (e) => {
    if (![button, input, clear, arrow, dropdown, search].includes(e.target)) {
      arrow.classList.remove("rotate-180");
      dropdown.classList.add("hidden");
    }
  });

  list.addEventListener("click", (e) => {
    if (e.target.tagName === "DIV") {
      let item = e.target.textContent;
      selectedItems[type].push(item);
      items = items.filter((i) => i !== item);
      populateList(type, items);

      // We create a div to display the selected item
      let div = document.createElement("div");
      div.className =
        "relative h-[37px] font-manrope w-full flex items-center text-sm bg-yellow text-regular px-4 hover:font-black cursor-pointer group";
      div.textContent = item;
      let deleteElement = document.createElement("i");
      deleteElement.className =
        "absolute right-4 cursor-pointer fa-solid fa-circle-xmark text-sm invisible group-hover:visible";

      // We add an event listener to remove the item from the selected list
      deleteElement.addEventListener("click", () => {
        selectedItems[type] = selectedItems[type].filter((i) => i !== item);
        Array.from(selectedFiltersDiv.childNodes).forEach((div) => {
          if (div.textContent === item) {
            selectedFiltersDiv.removeChild(div);
          }
        });
        Array.from(selectedList.childNodes).forEach((div) => {
          if (div.textContent === item) {
            selectedList.removeChild(div);
          }
        });
        items.push(item);
        items.sort();
        populateList(type, items);
        filterRecipes();
      });

      // We append the delete element to the div and the div to the selected list
      div.appendChild(deleteElement);
      selectedList.appendChild(div);

      // We display the selected filters
      displaySelectedFilters(type);
      // filter the recipes
      filterRecipes();

      // We clear the input and hide the clear button
      input.value = "";
      arrow.classList.remove("rotate-180");
      dropdown.classList.add("hidden");
    }
  });
};

// We call the setup function for each type
["ingredients", "ustensiles", "appareils"].forEach(setupDropdown);

// Initialize displayCard function when the page loads
displayCard(recipes);

// Initialize displayRecipeNumber function when the page loads
displayRecipeNumber(recipes.length);

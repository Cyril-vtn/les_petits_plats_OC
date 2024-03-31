// Import recipes from data
import { recipes } from "../data/recipes.js";
import { displayCard } from "./cards.js";
import { ITEM_TYPES } from "./api.types.js";

// get the input, search button and clear button
const input = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clear");

// Initialization of selected items
let selectedItems = {
  ingredients: [],
  ustensiles: [],
  appareils: [],
};

//
export let filteredRecipes = [];

// Function to get the elements of each type
const getItems = (type) => {
  let items = [];

  if (filteredRecipes.length === 0) {
    filteredRecipes = recipes;
  } else {
    filteredRecipes = filteredRecipes;
  }

  filteredRecipes.forEach((recipe) => {
    let elements = [];
    switch (type) {
      case ITEM_TYPES.INGREDIENTS:
        elements = recipe.ingredients
          .map((ingredient) => ingredient.ingredient)
          .filter(
            (ingredient) =>
              !selectedItems[type]
                .map((i) => i.toLowerCase())
                .includes(ingredient.toLowerCase())
          );
        break;
      case ITEM_TYPES.USTENSILES:
        elements = recipe.ustensils
          .map((ustensil) => ustensil)
          .filter(
            (ustensil) =>
              !selectedItems[type]
                .map((i) => i.toLowerCase())
                .includes(ustensil.toLowerCase())
          );
        break;
      case ITEM_TYPES.APPAREILS:
        elements = [recipe.appliance].filter(
          (appliance) =>
            !selectedItems[type]
              .map((i) => i.toLowerCase())
              .includes(appliance.toLowerCase())
        );
        break;
    }

    elements.forEach((element) => {
      const lowerCaseElement = element.toLowerCase();
      if (!items.map((item) => item.toLowerCase()).includes(lowerCaseElement)) {
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
  filteredRecipes = filteredRecipes.filter((recipe) => {
    const filterByItem = (itemType) => {
      return selectedItems[itemType].every((item) => {
        if (itemType === "appareils") {
          return recipe.appliance === item;
        }
        if (itemType === "ingredients") {
          return recipe.ingredients.some((i) => i.ingredient === item);
        }
        return recipe.ustensils.includes(item);
      });
    };

    return ["ingredients", "ustensiles", "appareils"].every(filterByItem);
  });

  // If there is an input value, filter based on it
  if (input.value.length >= 3) {
    filteredRecipes = filterByInput(filteredRecipes, input.value.toLowerCase());
  }
  displayCard(filteredRecipes);
  displayRecipeNumber(filteredRecipes.length);
};

// Function to create a div for a selected filter
const createFilterDiv = (item, type, selectedFiltersDiv, selectedList) => {
  let div = document.createElement("div");
  div.className =
    "w-auto h-[53px] text-black text-[14px] font-manrope  bg-yellow rounded-[10px] flex justify-center items-center gap-[60px] px-[18px] py-[17px]";
  div.textContent = item;

  let deleteElement = document.createElement("i");
  deleteElement.className =
    " right-4 cursor-pointer fa-solid fa-xmark text-sm ";

  deleteElement.addEventListener("click", () => {
    let items = Array.from(
      document.getElementById(`${type}_list`).childNodes.values()
    ).map((node) => node.textContent);
    removeFilter(item, type, selectedFiltersDiv, selectedList, items);
  });

  div.appendChild(deleteElement);
  return div;
};

const displaySelectedFilters = (type) => {
  const selectedFiltersDiv = document.getElementById("selected_filters");
  selectedFiltersDiv.innerHTML = "";
  Object.keys(selectedItems).forEach((type) => {
    const selectedList = document.getElementById(`selected_${type}`);
    selectedItems[type].forEach((item) => {
      const filterDiv = createFilterDiv(
        item,
        type,
        selectedFiltersDiv,
        selectedList
      );
      selectedFiltersDiv.appendChild(filterDiv);
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
const createItemDiv = (item, type, selectedFiltersDiv, selectedList, items) => {
  let div = document.createElement("div");
  div.className =
    "relative h-[37px] font-manrope w-full flex items-center text-sm bg-yellow text-regular px-4 hover:font-black cursor-pointer group";
  div.textContent = item;
  let deleteElement = document.createElement("i");
  deleteElement.className =
    "absolute right-4 cursor-pointer fa-solid fa-circle-xmark text-sm invisible group-hover:visible";

  deleteElement.addEventListener("click", () => {
    removeFilter(item, type, selectedFiltersDiv, selectedList, items);
  });

  div.appendChild(deleteElement);
  return div;
};

const removeFilter = (item, type, selectedFiltersDiv, selectedList, items) => {
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
  if (items) {
    items.push(item);
    items.sort();
    populateList(type, items);
  }
  filterRecipes();

  // Call getItems for each type after removing a filter
  ["ingredients", "ustensiles", "appareils"].forEach((type) => getItems(type));
};

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

  filteredRecipes = recipes;

  const toggleDropdown = () => {
    arrow.classList.toggle("rotate-180");
    dropdown.classList.toggle("hidden");
  };

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
      if (!selectedItems[type].includes(item)) {
        selectedItems[type].push(item);
        items = items.filter((i) => i !== item);
        populateList(type, items);

        const itemDiv = createItemDiv(
          item,
          type,
          selectedFiltersDiv,
          selectedList,
          items
        );
        selectedList.appendChild(itemDiv);

        displaySelectedFilters(type);
        filterRecipes();
        ["ingredients", "ustensiles", "appareils"].forEach((type) =>
          getItems(type)
        );
      }
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

// Event listener for the search button
const filterByInput = (recipesToFilter, inputValue) => {
  let filteredRecipes = [];

  for (let i = 0; i < recipesToFilter.length; i++) {
    let recipe = recipesToFilter[i];

    if (
      recipe.name.toLowerCase().includes(inputValue) ||
      recipe.description.toLowerCase().includes(inputValue)
    ) {
      filteredRecipes.push(recipe);
      continue;
    }

    for (let j = 0; j < recipe.ingredients.length; j++) {
      if (recipe.ingredients[j].ingredient.toLowerCase().includes(inputValue)) {
        filteredRecipes.push(recipe);
        break;
      }
    }
  }

  return filteredRecipes;
};

const filterBySelectedItems = (recipesToFilter) => {
  return recipesToFilter.filter(
    (recipe) =>
      selectedItems.ingredients.every((ingredient) =>
        recipe.ingredients.some((i) => i.ingredient === ingredient)
      ) &&
      selectedItems.ustensiles.every((ustensile) =>
        recipe.ustensils.includes(ustensile)
      ) &&
      selectedItems.appareils.every((appareil) => recipe.appliance === appareil)
  );
};

// create a function to escape HTML characters to prevent HTML injection attacks
const escapeHTML = (unsafeText) => {
  let div = document.createElement("div");
  div.textContent = unsafeText;
  return div.innerHTML;
};

// Event listener for the search button
searchButton.addEventListener("click", () => {
  // start at 3 caracter for the search input
  if (input.value.length < 3) {
    return;
  }

  // Escape the search input to prevent HTML injection
  const inputValue = escapeHTML(input.value).toLowerCase();

  // Start with all recipes or the already filtered recipes
  let recipesToFilter =
    filteredRecipes.length === 0 ? recipes : filteredRecipes;

  // Filter based on the search input
  recipesToFilter = filterByInput(recipesToFilter, inputValue);

  // Apply the selected filters
  recipesToFilter = filterBySelectedItems(recipesToFilter);

  // Update filteredRecipes
  filteredRecipes = recipesToFilter;

  // Update the displayed recipes
  displayCard(recipesToFilter);
  displayRecipeNumber(recipesToFilter.length);

  // Call getItems for each type after filtering
  ["ingredients", "ustensiles", "appareils"].forEach((type) => getItems(type));
});

// Event listener for the clear button
clearButton.addEventListener("click", () => {
  input.value = "";
  clearButton.classList.add("hidden");
  // Reset selected items
  filterRecipes();
  ["ingredients", "ustensiles", "appareils"].forEach((type) => getItems(type));
});

// Event listener for the input
input.addEventListener("input", () => {
  clearButton.classList.toggle("hidden", input.value.length === 0);
});

function setupDropdown(type) {
  const button = document.getElementById(`${type}`);
  const arrow = document.getElementById(`${type}_arrow`);
  const input = document.getElementById(`${type}_input`);
  const clear = document.getElementById(`clear_${type}`);
  const dropdown = document.getElementById(`${type}_dropdown`);

  const toggleDropdown = () => {
    console.log("toggleDropdown");
    arrow.classList.toggle("rotate-180");
    dropdown.classList.toggle("hidden");
  };

  button.addEventListener("click", toggleDropdown);
  arrow.addEventListener("click", toggleDropdown);

  input.addEventListener("input", () => {
    if (input.value.length > 0) {
      clear.classList.remove("hidden");
    } else {
      clear.classList.add("hidden");
    }
  });

  clear.addEventListener("click", () => {
    input.value = "";
    clear.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    if (
      e.target !== button &&
      e.target !== input &&
      e.target !== clear &&
      e.target !== arrow &&
      e.target !== dropdown
    ) {
      arrow.classList.remove("rotate-180");
      dropdown.classList.add("hidden");
    }
  });
}

// Call the function for each type
setupDropdown("ingredients");
setupDropdown("ustensiles");
setupDropdown("appareils");

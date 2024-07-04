// ¡Claro! Aquí tienes la versión refactorizada del código con la función para renderizar los datos almacenados en el Local Storage:

// La función `renderTable()` se encarga de mostrar los datos almacenados en el Local Storage en la tabla. Si tienes alguna otra pregunta o necesitas más ayuda, no dudes en decírmelo. 😊
const form = document.getElementById("formRegister");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const tableBody = document.getElementById("tableBody");

let data = JSON.parse(localStorage.getItem("formData")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;

  if (name && email) {
    const newData = { name, email };
    data.push(newData);
    saveDataToLocalStorage();
    renderTable();
    form.reset();
  } else {
    alert("Todos los campos son obligatorios");
  }
});

const saveDataToLocalStorage = () => {
  localStorage.setItem("formData", JSON.stringify(data));
};

const renderTable = () => {
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameCell.textContent = item.name;
    emailCell.textContent = item.email;
    editButton.textContent = "Editar";
    deleteButton.textContent = "Eliminar";

    editButton.classList.add("button", "button--secondary");
    deleteButton.classList.add("button", "button--tertiary");

    editButton.addEventListener("click", () => {
      editData(index);
    });
    deleteButton.addEventListener("click", () => {
      deleteData(index);
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
};

const editData = (index) => {
  const item = data[index];
  nameInput.value = item.name;
  emailInput.value = item.email;
  data.splice(index, 1);
  saveDataToLocalStorage();
  renderTable();
};

const deleteData = (index) => {
  data.splice(index, 1);
  saveDataToLocalStorage();
  renderTable();
};

renderTable();


// Esta versión incluye la función `renderTable()` que se encarga de mostrar los datos almacenados en el Local Storage en la tabla. Si tienes alguna otra pregunta o necesitas más ayuda, no dudes en decírmelo. 😊
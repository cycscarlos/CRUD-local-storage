const form = document.getElementById("formRegister");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const tableBody = document.getElementById("tableBody");

// Los datos se almacenarán en el Local Storage de forma persistente, es decir que los datos no se borren cuando se recargue el sitio..

// Almacenamos los datos en una variable llamada formData, y en el caso de que no exista ningún dato registrado, creamos un nuevo arreglo vacio (el simbolo || significa or)

let data = JSON.parse(localStorage.getItem("formData")) || [];

// Almacenamos los datos en el Local Storage
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;

  // validamos que vengan datos
  if (name && email) {
    const newData = { name, email };
    data.push(newData);
    saveDataToLocalStorage();

    // necesitamos una función para que renderize todos los datos cada vez que se ingresen nuevos datos
    renderTable();
    form.reset();
  } else {
    alert("Todos los campos son obligatorios");
  }
});

saveDataToLocalStorage = () => {
  localStorage.setItem("formData", JSON.stringify(data));
};

renderTable = () => {
  // limpiamos la tabla
  tableBody.innerHTML = "";
  // recorrer todos los registros que tenemos en Local Storage
  data.forEach(function (item, index) {
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

    // se le colocan estilos a los botones de editar/eliminar
    editButton.classList.add("button", "button--secondary");
    deleteButton.classList.add("button", "button--tertiary");

    // agregamos los escuchas de eventos a los botones
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

// se crean las funciones de los botones de editar y eliminar
editData = (index) => {
  const item = data[index];
  nameInput.value = item.name;
  emailInput.value = item.email;
  data.splice(index, 1);
  saveDataToLocalStorage();
  renderTable();
};

deleteData = (index) => {
  data.splice(index, 1);
  saveDataToLocalStorage();
  renderTable();
};

renderTable();

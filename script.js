const budget = document.getElementById("set");
const table = document.getElementById("table");
const setedbudget = document.getElementById("seted-budget");
const budgetvalue = document.getElementById("budget-input");
const setedbalance = document.getElementById("seted-balance");
const setedexpenses = document.getElementById("seted-expenses");
const producttitle = document.getElementById("producttitle");
const productnumber = document.getElementById("productnumber");
const check = document.getElementById("check");
const list = document.getElementById("list");
let totalbudget = 0;
let totalExpenses = 0;
let costs = [];
let isAdd = true;
let deletitem;

budget.addEventListener("click", (e) => {
  if (budgetvalue.value > 0) {
    totalbudget = Number(budgetvalue.value);
    setedbudget.innerHTML = `${totalbudget}`;
    updateremain();
    budgetvalue.value = ``;
  }
});

check.addEventListener("click", (e) => {
  if (isAdd) {
    if (producttitle.value !== "" && productnumber.value !== "") {
      let price = Number(productnumber.value);
      totalExpenses += price;
      setedexpenses.innerHTML = `${totalExpenses}`;
      const newUser = {
        id: costs.length + 1,
        title: producttitle.value,
        costs: productnumber.value,
      };
      costs.push(newUser);
      updateremain();
      productnumber.value = ``;
      producttitle.value = ``;
      updatetable(costs);
    }
  }
  if (!isAdd) {
    costs = costs.map((i) => {
      if (i.id === editItem.id) {
        totalExpenses -= Number(editItem.costs);
        setedexpenses.innerHTML = `${totalExpenses}`;
        updateremain();
        return { ...i, title: producttitle.value, costs: productnumber.value };
      }
      return i;
    });
    totalExpenses += Number(productnumber.value);
    setedexpenses.innerHTML = `${totalExpenses}`;
    productnumber.value = ``;
    producttitle.value = ``;
    check.innerHTML = "add";
    isAdd = true;
    updateremain();
    updatetable(costs);
  }
});

function handleEdit(id) {
  isAdd = false;
  check.innerHTML = "edit";
  editItem = costs.find((cost) => cost.id === id);
  producttitle.value = editItem.title;
  productnumber.value = editItem.costs;
  updateremain();
  updatetable(costs);
}

function handleDelete(id) {
  deletitem = costs.find((cost) => cost.id === id);
  setedexpenses.innerHTML = `${totalExpenses - Number(deletitem.costs)}`;
  totalExpenses = totalExpenses - Number(deletitem.costs);
  updateremain();
  costs = costs.filter((cost) => cost.id !== id);
  updatetable(costs);
}

function updateremain() {
  remain = totalbudget - totalExpenses;
  setedbalance.innerText = `${remain}`;
}

const updatetable = function (array) {
  list.innerHTML = `<p>Expense List</p>`;
  array.map((cost) => {
    list.innerHTML += `
    <div class="items" id="${cost.id}">
        <span id="name">${cost.title}</span>
        <span id="numb">${cost.costs}</span>
            <div class="icons">
            <button id="edit" onclick="handleEdit(${cost.id})" > <i class="fa-solid fa-pen-to-square" > </i> </button>
            <button id="delete" onclick="handleDelete(${cost.id})"> <i class="fa-solid fa-trash-can"> </i> </button>
            </div>
</div>`;
  });
};
updatetable(costs);

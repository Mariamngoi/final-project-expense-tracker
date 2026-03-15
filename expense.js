// Select elements
const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const tableBody = document.getElementById("Table");
const totalAmount = document.getElementById("totalAmount");



let expenses = [];



function loadExpenses() {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }

    displayExpenses();
    calculateTotal();
}

loadExpenses();



function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}



form.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = nameInput.value;
    const amount = amountInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    const expense = {
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    saveExpenses();
    displayExpenses();
    calculateTotal();

    form.reset();

});



function displayExpenses() {

    tableBody.innerHTML = "";

    expenses.forEach(function(expense, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td>
        <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        </td>
        `;

        tableBody.appendChild(row);

    });

}


function deleteExpense(index) {

    expenses.splice(index, 1);

    saveExpenses();
    displayExpenses();
    calculateTotal();

}



function calculateTotal() {

    let total = 0;

    expenses.forEach(function(expense) {

        total += Number(expense.amount);

    });

    totalAmount.textContent = total;

}
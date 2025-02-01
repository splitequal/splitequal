document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expenseForm");
    const expenseList = document.getElementById("expenseList");
    const clearExpenses = document.getElementById("clearExpenses");
    
    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.forEach(expense => addExpenseToDOM(expense.description, expense.amount));
    }
    
    function saveExpense(description, amount) {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({ description, amount });
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }
    
    function addExpenseToDOM(description, amount) {
        const listItem = document.createElement("li");
        listItem.textContent = `${description}: $${amount}`;
        expenseList.appendChild(listItem);
    }
    
    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const description = document.getElementById("description").value;
        const amount = document.getElementById("amount").value;
        
        if (description && amount) {
            addExpenseToDOM(description, amount);
            saveExpense(description, amount);
            
            document.getElementById("description").value = "";
            document.getElementById("amount").value = "";
        }
    });
    
    clearExpenses.addEventListener("click", () => {
        localStorage.removeItem("expenses");
        expenseList.innerHTML = "";
    });
    
    loadExpenses();
});

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const debitAmount = document.getElementById("debitAmount");
const credit = document.getElementById("credit");
const debit = document.getElementById("debit");

// Add expense
credit.addEventListener("click",(e)=>{
    e.preventDefault
    let name = expenseName.value
    let amount = parseInt(expenseAmount.value)
    let category = expenseCategory.value
    const expense = {
        id:Date.now(),
        type:"Credit",
       name,
       amount,
       category 
    }
    // console.log(name,amount,category)
    expenses.push(expense);
    renderExpenses();
    saveExpenses();
    calculateTotal();
    
})
debit.addEventListener("click",(e)=>{
    e.preventDefault
    let name = expenseName.value
    let amount = expenseAmount.value
    let category = expenseCategory.value
    const expense = {
        id:Date.now(),
        type:"Debit",
       name,
       amount,
       category 
    }
    // console.log(name,amount,category)
    expenses.push(expense);
    renderExpenses();
    saveExpenses();
    calculateTotal();

})
// Save expenses to LocalStorage
function saveExpenses() {
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}
// Display expenses
function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(function (expense) {
        const expenseElement = document.createElement("div");
        expenseElement.classList.add("expense");
        if(expense.type == "Credit"){
            expenseElement.innerHTML = `
            <div class="expense-info">
                <strong>${expense.name}</strong>
                <span>${expense.category}</span>
                <span style="color:red">₹${expense.amount}</span>
            </div>
            <button
                class="delete-btn"
                onclick="deleteExpense(${expense.id})"
            >
                Delete
            </button>
        `;
        }else{
            expenseElement.innerHTML = `
            <div class="expense-info">
                <strong>${expense.name}</strong>
                <span>${expense.category}</span>
                <span style="color:green">₹${expense.amount}</span>
            </div>
            <button
                class="delete-btn"
                onclick="deleteExpense(${expense.id})"
            >
                Delete
            </button>
        `;
        }
        
        expenseList.append(expenseElement);
    });
    calculateTotal();
}
// Calculate total
function calculateTotal() {
    const total = expenses.reduce((sum, expense) => {
        if (expense.type === "Credit") {
            return sum + parseInt(expense.amount);
        }
        return sum;
    }, 0);

    totalAmount.textContent = total;
    const debit = expenses.reduce((sum,expense)=>{
        if (expense.type === "Debit") {
            return sum + parseInt(expense.amount);
        }
        return sum;
    },0)
    debitAmount.textContent = debit;
}
// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });
    saveExpenses();
    renderExpenses();
}
// Render existing expenses when page loads
renderExpenses();
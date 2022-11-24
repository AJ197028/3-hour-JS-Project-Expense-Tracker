function saveToLocalStorage(event){
  event.preventDefault();
  const amount = event.target.amountId.value;
  const description = event.target.descriptionId.value;
  const cat = event.target.catId.value;
  const obj = {
    amount,
    cat,
    description
  }

  // Setting unique key as cat

  localStorage.setItem(obj.cat, JSON.stringify(obj)); 
  showNewExpenseOnScreen(obj);

  
};

//Hold the all detsils after page refresh
window.addEventListener("DOMContentLoaded", () =>{

  const localStorageObj = localStorage;                   //contain all storage data          
  const localStorageKeys = Object.keys(localStorageObj);  //keys  
  
  for(var i=0; i<localStorageKeys.length; i++){
    const key = localStorageKeys[i];                      //show all cat
    
    expenseDetailString =  localStorageObj[key];          //every expense details as string     
    expenseDetailObj = JSON.parse(expenseDetailString);   //every expense details as object            
     
    showNewExpenseOnScreen(expenseDetailObj);
  }
});

//show all expense details
function showNewExpenseOnScreen(expense){
    // clear field after submiting
    document.getElementById('catId').value = '';
    document.getElementById('amountId').value = '';
    document.getElementById('descriptionId').value ='';
    // console.log(localStorage.getItem(expense.cat))
  
    const parentNode = document.getElementById('listOfExpenses');
    const childHtML = `<li id = ${expense.cat}> ${expense.amount} - ${expense.cat} - ${expense.description} 
                      <button onclick = editExpenseDetails('${expense.amount}','${expense.cat}','${expense.description}')>Edit Expense</button>
                      <button onclick = deletExpense('${expense.cat}')>Delete Expense</button>
                      </li>`
    parentNode.innerHTML = parentNode.innerHTML+childHtML;

  };  
  

//DELETE EXPENSE FROM LOCAL STORAGE
function deletExpense(catId){
  console.log(catId)
  localStorage.removeItem(catId);                      //remove expense from local
  removeExpenseFromScreen(catId);                       //to remove from screen also
};

//DELETE EXPENSE FROM SCREEN
function removeExpenseFromScreen(catId){
  const parentNode = document.getElementById('listOfExpenses');
  const childNodeToBeDeleted = document.getElementById(catId);
  parentNode.removeChild(childNodeToBeDeleted);
}

//EDIT EXPENSE
function editExpenseDetails(amount,cat,description){
  document.getElementById('catId').value = cat;
  document.getElementById('amountId').value = amount;
  document.getElementById('descriptionId').value = description ;

  deletExpense(cat);
}
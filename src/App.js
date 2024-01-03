import { useState } from "react";
import Header from "./components/Header";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function App() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(null)
  const [transaction, setTransaction] = useState([])
  const [editId, setEditId] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [type, SetType] = useState('daily')
  const [iterations, setIterations] = useState(null)
  const [expense, setExpense] = useState(0)
  const [budget, setBudget] = useState(1000)
  const [newBudget, setNewBudget] = useState('');
 



  const addTransaction = (e) => {
    e.preventDefault()
    setExpense(expense + (amount * iterations))

  

  if (editId) {
    const newTransaction = transaction.map((t) => (
      t.id === editId ? { id: editId, description, amount, type, startDate, iterations, cost: amount * iterations, } : t
    ))

    setTransaction(newTransaction)
    setEditId(null)

  }
  else {

    setTransaction([...transaction, { id: Date.now(), description, amount, type, startDate, iterations, cost: amount * iterations, }])

  }
  setAmount(null)
  setDescription('')
  setIterations(0)



}
const handleBudgetChange = (e) => {
  setNewBudget(e.target.value);
};
const handleBudgetSubmit = (e) => {
  e.preventDefault();
  
  const parsedBudget = parseFloat(newBudget);
  if (!isNaN(parsedBudget)) {
    setBudget(parsedBudget);
    setNewBudget('');
  } else {
    
    alert('Invalid budget input. Please enter a valid number.');
  }
};



const handleEdit = (t) => {
  setEditId(t.id)
  setAmount(t.amount)
  setDescription(t.description)
}
const doc=new jsPDF()
const handleDelete = (id) => {
  setTransaction(transaction.filter(t => t.id !== id))
}
const exportHandler=()=>{
doc.autoTable({html:'#table'})
doc.save('transactions.pdf')
}


return (
  <div>
    <Header />
    <div className="export">
      <button onClick={exportHandler} className="exportBtn">Export PDF</button>
    </div>
    <div className="budget">
      Your Expenditure Limit is set to {budget}
      <form onSubmit={handleBudgetSubmit}>
        <label>
          Enter new budget:

          <input className="budgetForm"
            type="number"
            value={newBudget}
            onChange={handleBudgetChange}
            min="0"
            placeholder="New Budget"
            required
          />
        </label>
        <button type="submit" className="budget">Update Budget</button>
      </form>
      
    </div>
    <div className="expenses">
      Your Total Expenses: {expense}
    </div>
    {expense > budget && <div style={{ color: 'red' }}>Budget Exceeded! Please review your expenses or increase set budget</div>}

    <form onSubmit={addTransaction}>
      <div className='divForm'>
        <label className='label'>
          Description :
          <input className='input'
            type='text'
            onChange={e => setDescription(e.target.value)}
            value={description}
            placeholder='Description'
            required />
        </label>
        <label className='label'>
          Amount :
          <input className='input'
            type='number'
            value={amount}
            placeholder='Amount'
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <label className='label'>
          Start Date
          <input className='input'
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='divForm'>
        <label className='label'>
          Type of Expense :
          <select  className='input'value={type} onChange={e => SetType(e.target.value)} required>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="onetime">One Time</option>
          </select>
        </label>
        <label className='label'>
          Iterations of payment made :
          <input className='input'
            type='number'
            value={iterations}

            onChange={e => setIterations(e.target.value)}
            min="1"
            required />
        </label>
      </div>
      <div className='addTxnDiv'>
        <button type='submit' className="exportBtn">ADD TRANSACTION</button>
      </div>
    </form>
    <div className="tableDiv">
      <table className="table" id="table">
        <thead className="tableHead">
          <tr>
            <th className="tH">Description</th>

            <th className="tH">Date</th>
            <th className="tH">Frequecy</th>
            <th className="tH">cost</th>
            <th className="tH">Iterations</th>
            <th className="tH">Total Amount</th>


            <th className="tH">Action</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((t) => (
            <tr key={t.id} className="tableRow">
              <td className="tH">{t.description}</td>

              <td className="tH">{t.startDate}</td>
              <td className="tH">{t.type}</td>
              <td className="tH">{t.amount}</td>
              <td className="tH">{t.iterations}</td>
              <td className="tH">{t.cost}</td>


              <td>
                <button className="exportBtn" onClick={e => handleEdit(t)}>Edit</button>
                <button className="exportBtn" onClick={e => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  </div>

);
}

export default App;

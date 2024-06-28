import { useContext, useRef } from "react";
import { transData } from "../store/Data";

const AddItem = () => {
      const { transactionlist, income, expense, dispatch } = useContext(transData);
      const amountRef = useRef();
      const sourceRef = useRef();

      const handleExpense = (event) => {
            event.preventDefault();
            const amountValue = Number(amountRef.current.value);
            const sourceValue = sourceRef.current.value.trim();

            if (amountValue < 1 || !sourceValue) {
                  alert("Please enter valid amount and source.");
                  return;
            }

            const newItem = {
                  amount: -amountValue,
                  cont: sourceValue,
            };
            dispatch({ type: "ADD_EXPENSE", payload: newItem });
            amountRef.current.value = "";
            sourceRef.current.value = "";
      };

      const handleIncome = (event) => {
            event.preventDefault();
            const amountValue = Number(amountRef.current.value);
            const sourceValue = sourceRef.current.value.trim();

            if (amountValue < 1 || !sourceValue) {
                  alert("Please enter valid amount and source.");
                  return;
            }

            const newItem = {
                  amount: amountValue,
                  cont: sourceValue,
            };
            dispatch({ type: "ADD_INCOME", payload: newItem });
            amountRef.current.value = "";
            sourceRef.current.value = "";
      };

      return (
            <form className="additems">
                  <button type="button" onClick={handleIncome}>Income</button>
                  <input
                        ref={amountRef}
                        type="number"
                        placeholder="Enter Amount"
                        style={{ width: "40%" }}
                        min={1}
                        required
                  />
                  <input
                        type="text"
                        ref={sourceRef}
                        placeholder="Enter source or destination"
                        style={{ width: "30%" }}
                        required
                  />
                  <button type="button" onClick={handleExpense}>Expense</button>
            </form>
      );
};

export default AddItem;

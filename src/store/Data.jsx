import { createContext, useReducer, useEffect } from "react";

export const transData = createContext({
      transactionlist: [],
      income: 0,
      expense: 0,
      dispatch: () => { },
});

const initialState =
      localStorage.getItem('data') == '' ? {
            transactionlist: [],
            income: 0,
            expense: 0,
      } :
      JSON.parse(localStorage.getItem('data'));

const transReducer = (state, action) => {
      switch (action.type) {
            case "ADD_EXPENSE": {
                  const newState = {
                        ...state,
                        transactionlist: [...state.transactionlist, action.payload],
                        expense: state.expense + Number(action.payload.amount),
                  };
                  localStorage.setItem('data', JSON.stringify(newState));
                  return newState;
            }
            case "ADD_INCOME": {
                  const newState = {
                        ...state,
                        transactionlist: [...state.transactionlist, action.payload],
                        income: state.income + Number(action.payload.amount),
                  };
                  localStorage.setItem('data', JSON.stringify(newState));
                  return newState;
            }
            case "DELETE_ITEM": {
                  console.log("delete clicked");
                  const { index } = action;
                  const deletedTransaction = state.transactionlist[index];
                  const newTransactionList = state.transactionlist.filter((_, i) => i !== index);

                  return {
                        ...state, // Spread the current state
                        transactionlist: newTransactionList,
                        income: state.income - (deletedTransaction.amount > 0 ? deletedTransaction.amount : 0), // Subtract income if it's an income transaction
                        expense: state.expense + (deletedTransaction.amount < 0 ? Math.abs(deletedTransaction.amount) : 0), // Subtract expense if it's an expense transaction
                  };
            }
            default:
                  return state;
      }
};

function Data({ children }) {
      const [state, dispatch] = useReducer(transReducer, initialState);

      // Ensure the state is saved to localStorage when the component mounts
      useEffect(() => {
            localStorage.setItem('data', JSON.stringify(state));
      }, [state]);

      return (
            <transData.Provider
                  value={{
                        transactionlist: state.transactionlist,
                        income: state.income,
                        expense: state.expense,
                        dispatch,
                  }}
            >
                  {children}
            </transData.Provider>
      );
}

export default Data;

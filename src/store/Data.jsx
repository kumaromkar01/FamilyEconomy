import { createContext, useReducer, useEffect } from "react";

export const transData = createContext({
  transactionlist: [],
  income: 0,
  expense: 0,
  dispatch: () => {},
});

// Function to get initial state
const getInitialState = () => {
  const data = localStorage.getItem('data');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }
  // Return a default initial state if data is not available or invalid
  return {
    transactionlist: [],
    income: 0,
    expense: 0,
  };
};

const initialState = getInitialState();

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

      const newState = {
        ...state,
        transactionlist: newTransactionList,
        income: state.income - (deletedTransaction.amount > 0 ? deletedTransaction.amount : 0),
        expense: state.expense - (deletedTransaction.amount < 0 ? Math.abs(deletedTransaction.amount) : 0),
      };
      localStorage.setItem('data', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};

function Data({ children }) {
  const [state, dispatch] = useReducer(transReducer, initialState);

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

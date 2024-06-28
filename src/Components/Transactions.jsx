import { useContext } from "react";
import { transData } from "../store/Data";

const Transactions = () => {
  const context = useContext(transData);
  const translist = context.transactionlist;
  const dispatch = context.dispatch;

  const deleteItem = (index) => {
    dispatch({
      type: "DELETE_ITEM",
      index: index,
    });
  };

  return (
    <div className="transactions">
      {translist.map((item, index) => (
        <div className="transaction" key={index}>
          <button onClick={() => deleteItem(index)}>&#128465;</button>
          <div>{item.amount > 0 && <span>+{item.amount}</span>}</div>
          <div>{item.amount < 0 && <span>{item.amount}</span>}</div>
          <div className="cont">{item.cont}</div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;

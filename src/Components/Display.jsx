import { useContext } from "react";
import { transData } from "../store/Data";


function Display(){
      const {income,expense} = useContext(transData);
      return (
            <div className="display">
                  <div>
                        <p>Net Income</p>
                        <p>Rs. {income}</p>
                  </div>
                  <div>
                        <p>Net Expense</p>
                        <p>Rs. {expense}</p>
                  </div>
            </div>
      )
}

export default Display;
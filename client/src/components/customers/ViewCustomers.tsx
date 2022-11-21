import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { CreateCustomer } from "./CreateCustomer";
import { Customer } from "./CustomerDetails";
import { CustomerRecord } from "./CustomerRecord";
import {Searchbar} from "../Searchbar";
import { isRole } from "../../utils/CheckRole";


const ViewCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const [flag, setFlag] = useState(false);

    const updateView = () => {
        setFlag(!flag);
    }

    useEffect(() => { 
        setCustomers(queryResult);
    }, [queryResult]);

    const sortAlphabetically = (isAsc: Boolean ) => {
        if(isAsc){
            customers.sort((a : Customer, b : Customer) => {
                let fa = a.name.val.toLowerCase(),
                    fb = b.name.val.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
        }
        else{
            customers.sort((a : Customer, b : Customer) => {
                let fa = a.name.val.toLowerCase(),
                    fb = b.name.val.toLowerCase();

                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            })
        }

        setQueryResult([...customers]);
    };

    return (
        <div>
            <Searchbar path={ENDPOINTS.filterCustomer} all={ENDPOINTS.customers} setData={setQueryResult} queryParser={queryParser} flag ={flag}
                options = {[
                    {name: "name", description:"The name of the customer"},
                    {name: "email", description: "The email of the customer"},
                    {name: "mobileNumber", description: "The mobile number of the customer"}
                ]}>
            <br />
      
                <table>
                    <thead>
                        <tr>
                            <th> Name 
                                <button onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</button>

                                <button onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</button> 
                            </th>
                            <th> Email </th>
                            <th> Mobile Number </th>

                            <th hidden={isRole("VIEW")}></th>
                            <th hidden={isRole("VIEW")}></th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {customers.map((value, index) => {
                            return (<CustomerRecord customer={value} key={index} rerenderFlag={() => {setFlag(!flag)}}/>);
                        })}
                    </tbody>
                </table>
                <br />
                <div hidden={isRole("VIEW")}>
                <ModalWrapper front={"Create Customer"}> 
                    <CreateCustomer observer={updateView}/>
                </ModalWrapper>
                </div>
           
            </Searchbar>
        </div>      
    );
}


const queryParser = (q : string) => {
    const toks = q.split(',');
    const query = {
        name: "",
        skip: 0,
        limit: 1000,
        email: "",
        mobileNumber: "",
    };

    for(let i = 0; i < toks.length; ++i){
        const subtoks = toks[i].split(":");
        const key = subtoks[0].trim();
        const value = subtoks[1];

        if (key === "name"){
            query.name = value?.trim();
        }
        else if (key === "mobileNumber"){
            query.mobileNumber = value?.trim();
        }
        else if (key === "email"){
            query.email = value?.trim();
        }
    }

    return query;
}



export default ViewCustomers;
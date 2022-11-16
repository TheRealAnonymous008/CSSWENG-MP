import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { Order, OrderRequest } from "./OrderDetails";
import { RequestOrder } from "./RequestOrder";

export const UpdateOrder = (props : {order : Order, observer : Function}) => {
    const [data, setData] = useState<OrderRequest>();
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.updateOrder).post(data, {id: props.order.id})
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <div>
          <ModalWrapper front={"Edit"}>
            <RequestOrder setResponse={setData} default={{
                ...props.order, 
                timeIn: new Date(props.order.timeIn), 
                timeOut: new Date(props.order.timeOut),
                customer : props.order.customer.id,
                vehicle: props.order.vehicle.id,
                expenses: props.order.expenses,
            }}/>
          </ModalWrapper>
        </div>
    )
}
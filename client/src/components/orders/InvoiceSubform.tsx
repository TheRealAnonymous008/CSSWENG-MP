import { Invoice } from "./InvoiceDetails"

export const InvoiceSubform = (props: {register : any, errors : any, default? : Invoice}) => {
    const register = props.register;
    const errors = props.errors;

    return (
        <>
            <div>
                <label htmlFor="invoiceAmount">Invoice Amount</label>
                <input {... register("invoice.amount", {required : false})} type='text' name="invoice.amount" id="invoice.amount"
                    defaultValue={props.default?.amount.toString()}/>
                {errors.invoice?.amount && <p>Invoice amount has wrong format</p>}
            </div>

            <div>
                <label htmlFor="invoiceDeductible">Invoice Deductible</label>
                <input {... register("invoice.deductible", {required : false})} type='text' name="invoice.deductible" id="invoice.deductible"
                    defaultValue={props.default?.deductible}/>
                {errors.invoice?.deductible && <p>Deductible has wrong format</p>}
            </div>

            <div>
                <label htmlFor="agentFirstName">Agent First Name</label>
                <input {... register("invoice.agentFirstName", {required : false})} type='text' name="invoice.agentFirstName" id="invoice.agentFirstName"
                    defaultValue={props.default?.agentFirstName}/>
                {errors.invoice?.agentFirstName && <p>Agent first name has wrong format</p>}
            </div>

            <div>
                <label htmlFor="agentLastName">Agent Last Name</label>
                <input {... register("invoice.agentLastName", {required : false})} type='text' name="invoice.agentLastName" id="invoice.agentLastName"
                    defaultValue={props.default?.agentLastName}/>
                {errors.invoice?.agentLastName && <p>Agent last name has wrong format</p>}
            </div>

            <div>
                <label htmlFor="datePaid">Date Paid</label>
                <input  {...register('invoice.datePaid', {
                required: false ,valueAsDate: true})} 
                defaultValue = {
                    props.default ? 
                    props.default.datePaid.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
                    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : ""
                }
                type='date' name="invoice.datePaid" id="invoice.datePaid"/>
                {errors.invoice?.datePaid && <p>Date is invalid</p>}
            </div>

            <div>
                <label htmlFor="invoiceAgentCommision">Agent Commission</label>
                <input {... register("invoice.agentCommission", {required : false})} type='text' name="invoice.agentCommission" id="invoice.agentCommission"/>
                {errors.invoice?.agentCommission && <p>Agent Commission has wrong format</p>}
            </div>
        </>
    )
}
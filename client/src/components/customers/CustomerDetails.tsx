export interface CustomerRequest {
    firstName: string,
    lastName: string,
    mobileNumber : string,
    email : string
}

export interface CustomerTypeKVP {
    id: number,
    name: string
}

export interface Customer {
    id : number,
    name: string,
    mobileNumber? : string,
    email? : string
}
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { CreateUser } from "./CreateUser";
import { User } from "./UserDetails";
import { UserRecord } from "./UserRecord";
import "../../style/TablesView.css";
import { Searchbar } from "../Searchbar";
import "../../style/UsersView.css";

const UsersView = () => {

    const [users, setUsers] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const fetchUsers = async () => {
        await createAPIEndpoint(ENDPOINTS.users).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const usersList = data.map((value: any) => {
                    let user: User = value;
                    return user;
                });

                return usersList
            })
            .then((list) => {
                setUsers(list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateView = () => {
        fetchUsers();
    }

    useEffect(() => {
        setUsers(queryResult)
    }, [queryResult])

    const sortAlphabetically = (isAsc: Boolean ) => {
        if(isAsc){
            users.sort((a : User, b : User) => {
                let fa = a.username.toLowerCase(),
                    fb = b.username.toLowerCase();

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
            users.sort((a : User, b : User) => {
                let fa = a.username.toLowerCase(),
                    fb = b.username.toLowerCase();

                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            })
        }

        setQueryResult([...users]);
    };


    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterUser} setData={setQueryResult} queryParser={queryParser} 
                options = {[
                    {name: "username", description:"The username of the user"},
                ]}/>
            <br />
            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th className="firstNameCol"> First Name </th>
                            <th className="lastNameCol"> Last Name</th>
                            <th className="usernameCol"> Username 
                                <button onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</button>

                                <button onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</button>
                            </th>
                            <th className="roleCol"> Role </th>
                            
                            <th className="editCol"></th>
                            <th className="delCol"></th>
                        </tr>
                    </thead>

                    <tbody className="tbodyDiv">
                        {users.map((value, index) => {
                            return (<UserRecord user={value} key={index }/>);
                        })}
                    </tbody>
                </table>
                <br />
                <div className="createBtn">
                <ModalWrapper front={"Create User"}> 
                    <CreateUser observer={updateView}/>
                </ModalWrapper>
                </div>
            </div>    
        </div>  
    );
}

const queryParser = (q : string) => {
    const toks = q.split(',');
    const query = {
        username: "",
        skip: 0,
        limit: 1000,
    };

    for(let i = 0; i < toks.length; ++i){
        const subtoks = toks[i].split(":");
        const key = subtoks[0].trim();
        const value = subtoks[1];

        if (key === "username"){
            query.username = value?.trim();
        }
    }

    return query;
}

export default UsersView;
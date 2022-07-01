import React, {createContext} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Pool from '../../UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { toast } from "react-toastify";

const AccountContext=createContext();

const Account = (props)=>{

    let navigate = useNavigate();

    const getSession= async ()=>{
        return await new Promise((resolve,reject)=>{
            const user = Pool.getCurrentUser();
            if(user){
                user.getSession(async (err, session)=>{
                    if (err){
                        reject()
                    }else{
                        const attributes= await new Promise((resolve,reject)=>{
                            user.getUserAttributes((err,attributes)=>{
                                if(err){
                                    reject(err);
                                }
                                else{
                                    const results={}
                                    for(let attribute of attributes){
                                        const {Name, Value}=attribute;
                                        results[Name]=Value;
                                    }
                                    resolve(results)
                                }
                            })
                        })
                        resolve({user, ...session, ...attributes});
                    }
                })
            }else{
                reject();
            }
        })
    }

    const authenticate = async (Username, Password)=>{
        return await new Promise((resolve, reject)=>{
            const user=new CognitoUser({Username, Pool});
          const authDetails = new AuthenticationDetails({Username, Password});
          user.authenticateUser(authDetails,{
            onSuccess:(data)=>{
              console.log("onSuccess : ",data);
              localStorage.setItem('login_status',true);

              console.log(localStorage.getItem('login_status'))
              console.log("logged in ",data)
              resolve(data);
            },
            onFailure:(err)=>{
              console.log("onFailure : ",err);
            //   navigate('/');
              reject(err);
            },
            newPasswordRequired:(data)=>{
              console.log("newPasswordRequired : ",data);
              navigate('/setPassword');
              resolve(data);
            },
          })

        })    
    }
    const logout=async()=>{
        console.log("logout main");
        const user=Pool.getCurrentUser();
        if(user){
            console.log("logout successfully");
            user.signOut();
            localStorage.removeItem('login_status');
            localStorage.removeItem('activeElem');
            console.log(localStorage.getItem('login_status'))
        }
    }

    return(
    <AccountContext.Provider value={{authenticate, getSession, logout}}>
        {props.children}
    </AccountContext.Provider>
    );
};
export {Account, AccountContext};
// function WithNavigate(props) {
//     let navigate = useNavigate();
//     return <Dashboard {...props} navigate={navigate} />
//   }
  
//   export default WithNavigate;
  
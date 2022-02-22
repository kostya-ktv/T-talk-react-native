import axios from "axios";
import { API_URL, LOGIN_ACTION, LOGOUT_ACTION, REGISTRATION_ACTION } from "../constants";
import { login, logout, registation } from "../../Service/AuthService"
import { AuthResponse } from "../types";
import { Dispatch } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showNotification } from "../../Util";

export const login_action = async(email: string, password: string, dispatch: Dispatch, onBackdropPress: ()=>void) => {
   
      await login(email, password)
         .then((res) => {
            if (res === undefined) throw Error('')
            AsyncStorage.setItem('token', res.data.accessToken)
            dispatch({ type: LOGIN_ACTION, payload: res.data.user })
            showNotification("Welcome","success",'Successful login')
         })
         .catch(error => {
            AsyncStorage.removeItem('token');
            showNotification("Access denied","danger",'Invalid credentials')
             onBackdropPress();
         })
}


export const registation_action = async(email: string, password: string, dispatch: Dispatch, onBackdropPress: ()=>void) => {

     await registation(email, password)
      .then((res) => {
         if (res === undefined) throw Error('')
         AsyncStorage.setItem('token', res.data.accessToken);
         dispatch({ type: REGISTRATION_ACTION, payload: res?.data.user })
         showNotification("Welcome","success", 'Successfull registration');
       })
       .catch(error => {
         AsyncStorage.removeItem('token');
         showNotification("Access denied","danger",'Invalid credentials or email already exists')
          onBackdropPress();
      })
       
}
//USER LOGOUT

export const userLogout_action = async(dispatch: Dispatch) => {
   try {
      await logout().then(() => dispatch({ type: LOGOUT_ACTION }))
      AsyncStorage.removeItem('token');
   } catch (error) {
      AsyncStorage.removeItem('token');
      console.log(error);    
   }
}
//CHECKING USER AUTH WITH STARTING APP
export const checkAuth_action = async () => {
   try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials: true})
      AsyncStorage.setItem('token', response.data.accessToken);
      return response;
   } catch (error) {
      AsyncStorage.removeItem('token');
      console.log(error);  
   }
   
}


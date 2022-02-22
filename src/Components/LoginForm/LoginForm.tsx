
import React, { FC, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native"

import { useDispatch } from "react-redux"
import { login_action, registation_action } from "../../Store/actions/auth-actions"

type Props = {
   label: string,
   onBackdropPress: () => void
}
const LoginForm:FC<Props> = ({label, onBackdropPress}) => {

   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const dispatch = useDispatch();
 //LOGIN
 const loginUser = async () => {
   await login_action(email, password, dispatch, onBackdropPress)
   
 };
 //REGISTRATION
 const registerUser = async () => {
  await registation_action(email, password, dispatch, onBackdropPress) 
};

   return(
      <View>
         <TextInput 
            placeholder='Email' 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            autoCompleteType='off'/>

          <TextInput 
            placeholder="Password" 
            secureTextEntry={true} style={styles.input} 
            value={password} onChangeText={setPassword} 
            autoCompleteType='off'/>

          <TouchableOpacity 
            style={label == '🔑 LOGIN' ? styles.submit : {...styles.submit, backgroundColor: '#91ADE6'}} 
            activeOpacity={0.7}
            onPress={label == '🔑 LOGIN' ? loginUser : registerUser}>

         <Text style={{color: 'white'}}>{label}</Text>
          </TouchableOpacity>
      </View>
   )
}
const styles = StyleSheet.create({
   input: {
      position: 'relative',
      width: 330,
      height: 40,
      borderWidth: 1,
      borderColor: 'grey',
      marginHorizontal: 15,
      marginVertical: 10,
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: '#E0E9D0'
    },
    submit: {
      backgroundColor: '#A4C6B8',
      height: 'auto',
      width: 230,
      alignSelf: 'center',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
    }
})
export default React.memo(LoginForm)
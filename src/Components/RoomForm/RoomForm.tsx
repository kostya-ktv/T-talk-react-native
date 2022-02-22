import React, { FC, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native"

type Props = {
   label: string,
}
const RoomForm:FC<Props> = ({label}) => {
   const [room, setRoom] = useState<string>('')
   const [nickname, setNickname] = useState<string>('')


   return(
      <View>
         <TextInput 
            placeholder='Room' 
            style={styles.input} 
            value={room} 
            onChangeText={setRoom} 
            autoCompleteType='off'/>

          <TextInput 
            placeholder="Nickname" 
            style={styles.input} 
            value={nickname} onChangeText={setNickname} 
            autoCompleteType='off'/>

          <TouchableOpacity 
            style={label == '💾 CREATE ROOM' ? styles.submit : {...styles.submit, backgroundColor: '#91ADE6'}} 
            activeOpacity={0.7}
           >

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
export default React.memo(RoomForm)
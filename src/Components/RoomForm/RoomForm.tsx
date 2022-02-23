import { useNavigation } from "@react-navigation/native"
import React, { FC, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { createRoom_action, getRoomByRoomID_action} from "../../Store/actions/room-actions"
import { GlobalStateType } from "../../store/types"
import { showNotification } from "../../Util"

type Props = {
   label: string,
   action: string,
   toggle: () => void
}
const RoomForm:FC<Props> = ({label, action, toggle}) => {
   const myRooms = useSelector((state: GlobalStateType) => state.room)
   const auth = useSelector((state: GlobalStateType) => state.auth)
   const [room, setRoom] = useState<string>('')
   const [nickname, setNickname] = useState<string>('')
   const dispatch = useDispatch();
   const navigation = useNavigation();
 //HANDLE CREATE ROOM
   const handleCreateRoom = async () => {
      await createRoom_action(room, nickname, dispatch, navigation)
      toggle()
   }
   //HANDLE JOIN ROOM
   const handleJoinRoom = async () => {

      // navigation.navigate('/chat',{...el})
      const isYourRoom = myRooms.find(el => el.room_id == room)
      if(isYourRoom){ 
         showNotification(`Its your room <${isYourRoom.name}>`, 'info', 'You should connect from the list below')
         toggle()
      }else{ 
        await getRoomByRoomID_action(room)
        .then(res => { 
            if(!res?.data.length){
               showNotification(`Error`, 'warning', `The room does not exist or has been deleted`)
            }else{
               const user = {
                  id: res.data[0].id,
                  iuser_id: auth.user.id,
                  name: res.data[0].name,
                  nickname: nickname,
                  room_id: res.data[0].room_id
               }
               //@ts-ignore
                  navigation.navigate('/chat', {...user})
                  toggle()
            }})
      }   
   }

   return(
      <View>
         <TextInput 
            placeholder={label == '💾 CREATE ROOM' ? 'Room name' : 'Room ID'} 
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
            onPress={action == 'Create' ? handleCreateRoom: handleJoinRoom}
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
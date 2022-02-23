import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Socket } from "socket.io-client"

import { RoomResponseType } from "../../store/types"
import ChatMenu from "../ChatMenu/ChatMenu"

type Props = {
   user: RoomResponseType,
   socket: Socket
}
const ChatHeader:FC<Props> = ({user, socket}) =>{ 
   return(
      <View style={styles.header}>
         
         <View style={styles.avatar}><Text style={styles.textAvatar}>{user.nickname.charAt(0)}</Text></View>
         <View style={styles.details}>
            <Text style={{fontSize: 20}}>{user.nickname}: {user.name}</Text>
            <Text>{user.room_id}</Text>
         </View>       
         <ChatMenu socket={socket}/>    
      </View>
   )
}
const styles = StyleSheet.create({
   header: {
      backgroundColor: 'rgb(188, 219, 190)',
      flexDirection: 'row',
      paddingTop: 40,
      paddingHorizontal: 10,
      paddingBottom:4,
      alignItems: 'center'
     },
   avatar: {
      height: 40,
      width: 40,
      marginRight: 10,
   },
   details: {
      flex: 2,
   },
 
   textAvatar: {
      fontSize: 30,
      textAlign: "center",
      backgroundColor: '#75A97E',
      borderRadius: 100,
      color: 'white',
   },
   
})
export default ChatHeader
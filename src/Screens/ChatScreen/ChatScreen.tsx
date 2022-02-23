import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Chat from '../../Components/Chat/Chat';
import ChatHeader from '../../Components/ChatHeader/ChatHeader';
import { io } from 'socket.io-client';
import { API_CHAT } from '../../Store/constants';

const ChatScreen = () => {
   const [socket, setSocket] = useState<any>();
   const user:any = useRoute().params

   useEffect(() => {
      setSocket(io(API_CHAT));
     },[])
  
    useEffect(() => {
      socket?.emit('join', {
         id: user.room_id,
         nickname: user.nickname,
         room: user.name,
         time: new Date(Date.now()).toLocaleString()
      });
    },[socket])
  

   return(
      <View style={styles.box}>
            <View style={styles.main}>
               <ChatHeader user={user} socket={socket}/>
               
               <Chat socket={socket} user={user}/>
            </View>    
      </View>
   )
}
const styles = StyleSheet.create({
   box: {
      height: '100%'
  },

  main: {
     height: '100%',
     width: '100%',
  },
  

})
export default ChatScreen;
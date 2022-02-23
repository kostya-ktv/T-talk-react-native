import React, { FC, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Socket } from 'socket.io-client';
//@ts-ignore
import send from '../../../assets/send.png';
import { MessageType, RoomResponseType } from '../../store/types';
import ListMessages from '../ListMessages/ListMessages';
import { Keyboard } from 'react-native'
import OnlineUsers from '../OnlineUsers/OnlineUsers';

type Props = {
  socket: Socket,
  user: RoomResponseType
}

const Chat:FC<Props> = ({socket, user}) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentUsers, setCurrentUsers] = useState<Array<string>>([]);
  const [messages, setMessages] = useState<Array<MessageType>>([]);

  const sendMessage = () => {  
    if(currentMessage) {
      Keyboard.dismiss()
       const messageData = {
          roomid: user.room_id,
          message: currentMessage,
          nickname: user.nickname,
          time: new Date(Date.now()).toLocaleTimeString()
       }
        socket?.emit('sendMessage', messageData);  
        setCurrentMessage('')   
    }
 }

 //EFFECT FOR EVENT USER MESSAGE
 useEffect( ()=> {
  socket?.on('receiveMessage', ({roomid, message, nickname, time, users}) => { 
 
     const msg: MessageType = {
       message: message,
       sender: nickname,
       time: time,
       type: 'user-message'
     }
     setMessages(prev => [...prev, msg])  
     setCurrentUsers(users) 
  })
},[socket])

//EFFECT FOR EVENT JOINING CHAT
useEffect( ()=> {
  socket?.on('user-join', ({id, nickname, room, time, users}) => { 

   const msg: MessageType = {
     message: `🔔 ${nickname} join chat`,
     sender: 'Server',
     time: time,
     type: 'notification'
   }
     setMessages(prev => [...prev, msg])    
     setCurrentUsers(users)    
     
  })
},[socket])

useEffect( ()=> {
  //@ts-ignore
  socket?.on('user-disconnect', ({disconnectedUser, users}) => { 
   const msg: MessageType = {
     message: `🔔 ${disconnectedUser[0].nickname} left chat...`,
     sender: 'Server',
     time: '',
     type: 'notification'
   }
     setMessages(prev => [...prev, msg]) 
     setCurrentUsers(users)               
  })
},[socket])

useEffect( ()=> {
  //@ts-ignore
  socket?.on('user-close', ({disconnectedUser, users}) => { 
   const msg: MessageType = {
     message: `🔔 ${disconnectedUser[0].nickname} left chat...`,
     sender: 'Server',
     time: '',
     type: 'notification'
   }
     setMessages(prev => [...prev, msg]) 
     setCurrentUsers(users)               
  })
},[socket])
  
  return (
    <View style={styles.chat}>
      <OnlineUsers users={currentUsers}/>
      <View style={styles.window}>
      {messages.length > 0 && <ListMessages messages={messages} currentUser={user.nickname}/>}
      </View>

      <View style={styles.footer}>

        <TextInput
          placeholder='Message...'
          style={styles.input}
          autoCompleteType='off'
          value={currentMessage}
          onChangeText={setCurrentMessage}
        />
        <TouchableOpacity style={styles.sendBox} onPress={sendMessage}>
          <Image source={send} style={styles.send} resizeMode='center'/>
        </TouchableOpacity>

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  chat: {
    backgroundColor: '#EFFFE2',
    flex: 2,
    paddingHorizontal: 3
  },
  
  send: {
     height: 20,
     width: 20,
  },
  sendBox: {
     padding: 15,
     backgroundColor: '#E0EBFF',
     borderWidth: 1,
     borderColor: '#C9C9C9'

  },
  footer: {
     flexDirection: 'row',
     
  },
  input: {
   flex: 2,
   borderWidth: 1,
     borderColor: '#C9C9C9',
     backgroundColor: 'white',
     paddingLeft: 20
},
  window: {
     flex: 2
  }
});
export default Chat;

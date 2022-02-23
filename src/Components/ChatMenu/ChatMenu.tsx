import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, Modal, StyleSheet } from "react-native";
import { Tooltip, Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
//@ts-ignore
import menu from '../../../assets/menu.png'
import { userLogout_action } from "../../Store/actions/auth-actions";

type Props ={ 
  socket: Socket
}
const ChatMenu:React.FC<Props> = ({socket}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const closeSocket = () => {
    socket?.emit('close');  
   }
  const navigateToRoom = () =>{ 
    closeSocket()
    //@ts-ignore
    navigation.navigate('/')
  }
  const logout = async() =>{ 
    closeSocket()
    await userLogout_action(dispatch)
  }

  return (
     //@ts-ignore
    <Tooltip
      popover={
      <>
        <Text onPress={navigateToRoom} style={styles.item}>🔃 Change Room</Text>
        <Text onPress = {logout} style={styles.item}>🚪Logout</Text>
      </>}
      containerStyle={{}}
      height={100}
      width={180}
      backgroundColor="rgba(250, 250, 250, 1)"
      highlightColor="transparent"
      ModalComponent={Modal}
      // withPointer={false}
      withOverlay={false}
    >
      <Image source={menu} resizeMode="center" style={styles.image}/>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
   image: {
      height: 25,
      width: 30
   },
   item: {
      marginVertical: 9,
      fontSize: 18,
   }
})

export default ChatMenu
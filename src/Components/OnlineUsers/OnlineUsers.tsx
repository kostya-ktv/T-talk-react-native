import * as React from "react";
import {  Modal, StyleSheet, View } from "react-native";
import { Tooltip, Text } from "react-native-elements";

type Props ={ 
  users: Array<string>
}
const OnlineUsers:React.FC<Props> = ({users}) => {

  return (
     //@ts-ignore
    <Tooltip
      popover={
      <>
      {users.map( (el, index) => <Text key={index}style={styles.modal}>{el}</Text>)}
      </>}
      containerStyle={{}}
      width={200}
      backgroundColor="rgba(250, 250, 250, 1)"
      highlightColor="transparent"
      ModalComponent={Modal}
      // withPointer={false}
      withOverlay={false}
    >
      <Text style={styles.title}>ONLINE:{users.length > 0 && users.length}</Text>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
   title: {
      backgroundColor: '#53c659',
      width: 80,
      paddingHorizontal: 6,
      borderBottomRightRadius: 8
   },
   modal: {
      backgroundColor: '#e6f7e6',
      width: '100%',
      height: '100%',
      marginBottom: 2
      
   }
})

export default OnlineUsers
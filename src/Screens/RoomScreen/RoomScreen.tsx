import React, { FC, useEffect } from "react";
import { ImageBackground, StyleSheet, View, Text} from "react-native"
import RoomOverlay from "../../Components/RoomOverlay/RoomOverlay";
//@ts-ignore
import bg from '../../../assets/bgblur.png'
import { userLogout_action } from "../../Store/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStateType } from "../../store/types";
import { showNotification } from "../../Util";
import { getRooms_action } from "../../Store/actions/room-actions";
import ListRooms from "../../Components/ListRooms/ListRooms";

const RoomScreen = () => {
   const dispatch = useDispatch()
   const auth = useSelector((state: GlobalStateType) => state.auth)
   const myRooms = useSelector((state:GlobalStateType) => state.room)

   useEffect( () => {
      getRooms_action(auth.user.id, dispatch)
      !auth.user.isactivated && showNotification("Hi","info",'To create rooms, your email must be verified')
   }, [])
   
   return (
      <View  style={styles.box}>

          <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
             <View style={styles.container}>
               { auth.user.isactivated && 
                  <RoomOverlay label="💾 CREATE ROOM" action="Create"/>
               }
               <RoomOverlay label="🔌 JOIN ROOM" action="Join"/>
               <Text style={styles.logout} onPress={() => userLogout_action(dispatch)}>👋 Logout</Text>
            </View>
            <ListRooms rooms={myRooms} user={auth.user}/>       
         </ImageBackground>
      </View>
      
   )
}
const styles = StyleSheet.create({
   box: {
      height: '100%'
  },
  image: {
    height: '100%',
    justifyContent: "center"
  },
  container: {
     backgroundColor: 'white',
     width: '90%',
     alignSelf: 'center',
     padding: 20,
     borderRadius: 8
  },
  logout: {
   
     textAlign: "center",
     marginTop: 10
  }
 });
export default React.memo(RoomScreen)
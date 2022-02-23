import { useNavigation } from "@react-navigation/native"
import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import { deletRoom_action, getRooms_action } from "../../Store/actions/room-actions"
import { RoomResponseType, IUser } from "../../store/types"
import { showNotification } from "../../Util"

type Props = {
   rooms: Array<RoomResponseType>,
   user: IUser
}
const ListRooms:FC<Props> = ({rooms, user}) => {
   const navigation = useNavigation()
   const dispatch = useDispatch()

   const handleDelete = async (roomid: string) => {  
      await deletRoom_action(roomid).then( async() => {
         showNotification('Successfull','success', 'Room deleted')
         await getRooms_action(user.id, dispatch)
      })
   }
   const handleJoin = (el: RoomResponseType) => {
      //@ts-ignore
      navigation.navigate('/chat',{...el})
   }
   
   return(
      <View style={styles.box}>
         <Text>🔎YOUR ROOMS: {!rooms.length && <Text>no room created yet</Text>}</Text>
         {
            rooms.map(el => 
            <View key={el.room_id}>
               <View style={styles.item}>
                  <TouchableOpacity onPress={() => handleDelete(el.room_id)} style={styles.button}>
                     <Text>🗑 Delete</Text>
                  </TouchableOpacity>

                  <Text>{el.name}</Text>

                  <TouchableOpacity onPress={() => handleJoin(el)} style={styles.button}>
                     <Text>🔌Join</Text>
                  </TouchableOpacity>
               </View>
            </View>)
         }
      </View>
   )
}

const styles = StyleSheet.create({
   box: {
      backgroundColor: 'white',
      position: 'relative',
      width: '80%',
      alignSelf: 'center',
      borderRadius: 8,
      marginTop: 10,
      padding: 4,

   },
   item: {
      backgroundColor: '#F7DDF3',
      margin: 7,
      padding: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 8,
      borderColor: '#9D9C9D',
      borderWidth: 1
   },
   button: {
      backgroundColor: '#DEECE0',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderColor: '#D1D0D1',
      borderWidth: 1,
      borderRadius: 8
   }

})

export default ListRooms;
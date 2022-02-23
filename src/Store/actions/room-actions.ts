import { NavigationProp } from "@react-navigation/native";
import { Dispatch } from "redux";
import { createRoom, deleteRoom, fetchRooms, getRoomByRoomId} from "../../Service/RoomService";
import { showNotification } from "../../Util";
import { FETCH_ROOMS_ACTION } from "../constants";

//CREATE ROOM
export const createRoom_action = async(room: string, nickname: string, dispatch: Dispatch, navigation: NavigationProp<any>) => {
   await createRoom(room, nickname)
   .then(async (res) => {       
      if(res === undefined){
         showNotification('Denied', 'warning', 'Room already exists')
      } else {
         //@ts-ignore
         const resultRoom = res.data[0]
         showNotification('Successfully', 'success', `Room <${resultRoom.name}> is created`)                 
         //FETCH CREATED ROOMS
         await getRooms_action(resultRoom.iuser_id, dispatch)
         //REDIRECT TO CREATED CHAT
         navigation.navigate('/chat', {...resultRoom})
         }  
      })
   .catch(err => {
      showNotification('oops', 'danger', err)
      })   

}
//GET ROOM By id
export const getRoomByRoomID_action = async(roomid: string) => {
   try {
      const response = await getRoomByRoomId(roomid);
      return response;
   } catch (error) {
      console.log(error);    
   }
}

//FETCH ROOMS WHICH USER CREATED
export const getRooms_action = async(userid: number, dispatch: Dispatch) => {

   try {
      await fetchRooms(userid).then(res => {  
         //@ts-ignore
         dispatch({type: FETCH_ROOMS_ACTION, payload: res.data.rooms})   
      })
   } catch (error) {
      console.log(error);    
   }
}

//DELETE ROOM
export const deletRoom_action = async(id: string)  => {

   try {
      return await deleteRoom(id);
   } catch (error) {
      console.log(error);    
   }
}
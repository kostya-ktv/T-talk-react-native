import { RoomResponseType } from '../store/types';
import { roomIsInStore } from './RoomService';

export const fetchCredentials = (myRooms: Array<RoomResponseType>, credentialsParam: any) => {

  const getSuitableCredentials = () => {
    // < myRooms[myRooms.length - 1]> give forward redirect to created chat
    // roomIsInStore(myRooms, params.id) redirect from Join Buttons of List rooms
    const { ...credentialsStore } =
      roomIsInStore(myRooms, credentialsParam.id) ||
      myRooms[myRooms.length - 1];
    
      const { room_id: id, nickname, name: room } = credentialsStore;
    return { id, nickname, room };
  };
  //MERGING
  if (!credentialsParam.nickname)
    credentialsParam = { ...getSuitableCredentials() };

  return credentialsParam;
};
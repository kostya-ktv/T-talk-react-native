import { FC } from "react";
import { FlatList, View } from "react-native";
import { MessageType } from "../../store/types";
import Message from "../Message/Message";

type Props = {
   messages: Array<MessageType>,
   currentUser: string
}
const ListMessages:FC<Props> = ({messages, currentUser}) => {

   return (
      <FlatList
      inverted contentContainerStyle={{ flexDirection: 'column-reverse' }}
      data={messages}
      //@ts-ignore
      keyExtractor={(item, index) => item.key}
      renderItem={({ item }) => (
         <Message
         message={item} nickname={currentUser}
         />
       )}
      
      />
   )
}

export default ListMessages;
import { StyleSheet, Text, View } from "react-native";
import { MessageType } from "../../store/types";

type Props = {
   message: MessageType,
   nickname: string
}

const Message:React.FC<Props> = ({message, nickname}) => {

   return(
      <>
      <View style = {
         message.sender == nickname ? {...styles.box, alignSelf: 'flex-end'}
         : message.type == 'notification' ? {...styles.box, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0)'}
         : {...styles.box, alignSelf: 'flex-start', backgroundColor: '#E8E9E7'}
      }>
      {message.sender != 'Server' &&
         <View>{message.sender !== nickname && <Text style={styles.sender}>✉️{message.sender}:</Text>}</View>}
         
         {message.sender != 'Server' && <Text style={message.sender == nickname && {textAlign: "right"}}>{message.time}🕖</Text>} 
         
         <Text style={message.sender == nickname && {textAlign: "right"}}>
            {message.message}
         </Text>

      </View>
   </>
   )
}
const styles = StyleSheet.create({
   box: {
      backgroundColor: 'rgb(193, 247, 185)',
      marginHorizontal: 10,
      marginVertical: 4,
      padding: 5,
      maxWidth: '50%',
      minWidth: '30%',
      borderRadius: 8,

   },
   sender: {
      fontSize: 15,
      fontWeight: "bold",
      fontStyle: 'italic'
   }
})

export default Message;
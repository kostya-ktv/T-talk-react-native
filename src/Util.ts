import {showMessage} from "react-native-flash-message";

export const showNotification = (message: string, type: "danger" | "info" | "success" | "warning", description: string) => {
   showMessage({
   message: message,
   type: type,
   position: {top: 80},
   description: description
 })
}
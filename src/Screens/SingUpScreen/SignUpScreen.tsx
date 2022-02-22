import { StyleSheet, View } from "react-native"
import { Button, Input, Text } from "react-native-elements";

const SignUpScreen = () => {
   return(
      <View>
         <Text h3>Signup Screen</Text>
         <Input label="Email"/>
         <Input label="Password" secureTextEntry={true}/>
         <Button title="Sign up"/>
      </View>
   )
}
const styles = StyleSheet.create({

})
export default SignUpScreen;
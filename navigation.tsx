import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import StartScreen from "./src/Screens/StartScreen/StartScreen";
import { GlobalStateType } from "./src/Store/types";
import RoomScreen from "./src/Screens/RoomScreen/RoomScreen";
import FlashMessage from "react-native-flash-message";
import ChatScreen from "./src/Screens/ChatScreen/ChatScreen";

const RootNavigation = () => {
  const Stack = createStackNavigator();
  const {isAuth} = useSelector((state: GlobalStateType) => state.auth);


  
 
  const screenOptions = {
    headerShown: false,
  };

  return (
    <>

        <NavigationContainer>
      { !isAuth ?
         <Stack.Navigator initialRouteName="/" screenOptions={screenOptions}>
            <Stack.Screen name="/" component={StartScreen}/>
         </Stack.Navigator>
        :
         <Stack.Navigator initialRouteName="/" screenOptions={screenOptions}>
            <Stack.Screen name="/" component={RoomScreen}/>
            <Stack.Screen name="/chat" component={ChatScreen}/>
         </Stack.Navigator>
      }
        </NavigationContainer>
        <FlashMessage/>
    </>
  );
}

export default RootNavigation;

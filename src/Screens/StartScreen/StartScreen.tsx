import React, { FC, useState } from "react"
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LoginOverlay from "../../Components/LoginOverlay/LoginOverlay"
//@ts-ignore
import bg from '../../../assets/bgblur.png'

//@ts-ignore
import logo from '../../../assets/logo.png'

const StartScreen:FC = () => {
   const [showMenu, setShowMenu] = useState<boolean>(false);
   return(
      <View style={styles.box}>
       <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
         <View style={styles.card}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setShowMenu(!showMenu)}>
               <Image source={logo} style={{width: 290, height: 70, alignSelf: 'center'}}/>     
            </TouchableOpacity>
            {
               showMenu && 
               <>
                  <LoginOverlay label="🔑 LOGIN" action="login"/>
                  <LoginOverlay label="📀 REGISTRATION" action="signup"/>
               </>
            }
         </View>
         <TouchableOpacity style={styles.copyright}>
            <Text style={styles.cr}>Copyright © Kostya Kotov 2022.</Text>
         </TouchableOpacity>
         </ImageBackground>
      </View>
      
   )
}

const styles = StyleSheet.create({
   box: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    card: {
       backgroundColor: 'white',
       width: '80%',
       alignSelf: 'center',
       borderRadius: 10,
       paddingVertical: 10,
       paddingHorizontal: 20,
    },
    copyright: {
       marginTop: 10,
       padding: 8,
       backgroundColor: 'rgba(255,255,255,0.5)',
       alignSelf: 'center',
    },
    cr: {
       fontSize: 15,
       textTransform: "uppercase"
    }
})

export default StartScreen;
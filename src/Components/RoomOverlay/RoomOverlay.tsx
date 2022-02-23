import React, { useState } from 'react';
import { Overlay} from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RoomForm from '../RoomForm/RoomForm';


type OverlayComponentProps = {
  label: string,
  action: string
};

const RoomOverlay: React.FunctionComponent<OverlayComponentProps> = ({label, action}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={toggleOverlay}>
        <Text>{label}</Text>
      </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <RoomForm label={label} action={action} toggle={toggleOverlay}/>
      </Overlay>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    backgroundColor: '#C9DAD0',
    borderColor: '#BBBBBB',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center'
  },
  box: {
     height: '100%'
 },
 image: {
   height: '100%',
   justifyContent: "center"
 },
});

export default RoomOverlay;
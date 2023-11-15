import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import SQLiteDriver from "../src/driver";

// eslint-disable-next-line react/prop-types
const LevelSelectorButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
      <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  );

const AddHeartButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'pink', padding: 10, borderRadius: 5 }}>
      <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
)



const MainMenu = ({ navigation }) => {

  const addHearts = async () => {
    await SQLiteDriver.addHearts(5);
    const currentHearts = await SQLiteDriver.getCurrentHearts();
    console.log('Current Hearts:', currentHearts);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Main Menu</Text>
      <LevelSelectorButton
        title="Choose Level"
        onPress={() => navigation.navigate('LevelSelector')}
      />
      {/* <AddHeartButton
        title="Add 5 Hearts!"
        onPress={addHearts}
      /> */}
    </View>
  );
};

MainMenu.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

export default MainMenu;

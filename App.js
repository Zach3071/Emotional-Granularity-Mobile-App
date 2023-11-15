/* eslint-disable no-unused-vars */
import { GameEngine } from "react-native-game-engine";
import React, { useRef, useEffect } from "react";
import Constants from "./constants";

import SQLiteDriver from "./src/driver";

//import { Text, View, StyleSheet} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import MainMenu from'./screens/MainMenu';
import LevelSelector from'./screens/LevelSelector';

import GenericLevel from "./levels/GenericLevel";
import LevelStartScreen from "./screens/LevelStartScreen";
import WinScreen from "./screens/WinScreen";
const Stack = createStackNavigator();
// import { preloadImages } from "./levels/imagePreloader";
// import images from "./levels/imagePreloader";

// const dbDriver = new DatabaseDriver();
// console.log("Added driver");
// dbDriver.addHearts(5);
// console.log("Added hearts");


export default function App() {

  // const engine = useRef(null);

  useEffect(() => {

    // preloadImages(images);

    async function setupDatabase() {
      // Initialize (and open) the test database because no path is passed to initializeDatabase.
      await SQLiteDriver.initializeDatabase();

      // To verify, let's fetch and log the current hearts
      const hearts = await SQLiteDriver.getCurrentHearts();
      console.log('Current Hearts:', hearts);
    }

    setupDatabase();
  }, []);

  // useEffect(() => {
  //   preloadImages();
  // }, []);

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />

      {/* turn headershown on for screens to be able to go backwards when testing screens */}
      {/* <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown: false }} /> */}
       <Stack.Screen name="LevelSelector" component={LevelSelector} options={{ headerShown: false }}/> 
       
       <Stack.Screen name="LevelStartScreen" component={LevelStartScreen} options={{ headerShown: false }}/>
 
       <Stack.Screen name="GenericLevel" component={GenericLevel} options={{ headerShown: false }} />

       <Stack.Screen name="WinScreen" component={WinScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
    // <View style={styles.container}>
    //   <GameEngine
    //           ref={engine}
    //           style={{
    //             width: BoardSize,
    //             height: BoardSize,
    //             flex: null,
    //             backgroundColor: "white",
    //           }}
    //         />

    //         <Text>Hello</Text>
    // </View>
  );
 
}
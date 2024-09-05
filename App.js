import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import List from "./src/component/List";
import Player from "./src/component/Player";
import MyTheme from "./src/component/theme/MyTheme"; // Import MyTheme

export default function App() {
  const [isDark, setIsDark] = useState(false); // Initialize with a default value
  const [selectedSong, setSelectedSong] = useState(null); // State for selected song
  const [theme, setTheme] = useState(null); // State for theme color

  const handlePress = () => {
    setIsDark((prevState) => !prevState);
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
  };

  const handleThemeChange = (color) => {
    setTheme(color);
  };

  const handleBack = () => {
    setSelectedSong(null); // Reset selected song to go back to the List view
  };

  const getTextStyle = () => {
    switch (theme) {
      case 'green':
        return MyTheme.greenFont;
      case 'red':
        return MyTheme.redFont;
      case 'blue':
        return MyTheme.blueFont;
      default:
        return {};
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#292a2b' : '#fff' }]}>
      {selectedSong ? (
        <Player song={selectedSong} textStyle={getTextStyle()} onBack={handleBack} />
      ) : (
        <List onSelectSong={handleSelectSong} textStyle={getTextStyle()} />
      )}
      <StatusBar style="auto" />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "red" }]}
          onPress={() => handleThemeChange('red')}
        />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "green" }]}
          onPress={() => handleThemeChange('green')}
        />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "blue" }]}
          onPress={() => handleThemeChange('blue')}
        />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: isDark ? '#333' : '#ccc' }]}
          onPress={handlePress}
        >
          <Text style={styles.emoji}>{isDark ? '☀️' : '🌑'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  emoji: {
    fontSize: 30, // Adjust size to fit well within the button
  },
});

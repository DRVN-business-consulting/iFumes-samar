import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function List({ onSelectSong, textStyle }) {
  const SONGS = [
    { id: 0, name: "Song 1", artist: "Artist 1" },
    { id: 1, name: "Song 2", artist: "Artist 2" },
    { id: 2, name: "Song 3", artist: "Artist 3" },
    { id: 3, name: "Song 4", artist: "Artist 4" },
    { id: 4, name: "Song 5", artist: "Artist 5" },
  ];

  const handlePress = (item) => {
    onSelectSong(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <FlatList
          data={SONGS}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={styles.itemContainer}>
                <Text style={[styles.name, textStyle]}>{item.name}</Text>
                <Text style={[styles.artist, textStyle]}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
  container2: {
    width: 350,
    height: "95%",
    marginTop: 16,
  },
  itemContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10, // Adding margin between items
  },
  name: {
    fontSize: 18,
  },
  artist: {
    fontSize: 14,
    color: "gray",
  },
});

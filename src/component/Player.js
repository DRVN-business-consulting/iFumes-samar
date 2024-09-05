import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

export default function Player({ song, textStyle, onBack }) {
  const [progress] = useState(new Animated.Value(0)); // Initialize Animated.Value
  const [elapsedTime, setElapsedTime] = useState(0); // State for elapsed time

  const duration = 180000; // 3 minutes in milliseconds
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start animation
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Update elapsed time every second
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevTime) => Math.min(prevTime + 1000, duration));
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalRef.current);
  }, [progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={[styles.songName, textStyle]}>{song.name}</Text>
        <Text style={[styles.artistName, textStyle]}>{song.artist}</Text>
        <View style={styles.progressContainer}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  songName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  artistName: {
    fontSize: 18,
    color: "gray",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
  },
  progressContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginTop: 20,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007BFF",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: "gray",
  },
});

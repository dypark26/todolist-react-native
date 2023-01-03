import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function Tabs({ category, setCat }) {
  return (
    <View style={Styles.tabs}>
      <TouchableOpacity
        onPress={() => setCat("javascript")}
        style={{
          ...Styles.button,
          backgroundColor: category === "javascript" ? "#0DF0AC" : "#E4DED5",
        }}
      >
        <Text>javascript</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat("react")}
        style={{
          ...Styles.button,
          backgroundColor: category === "react" ? "#0DF0AC" : "#E4DED5",
        }}
      >
        <Text>React</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat("cordingTest")}
        style={{
          ...Styles.button,
          backgroundColor: category === "cordingTest" ? "#0DF0AC" : "#E4DED5",
        }}
      >
        <Text>Coding Test</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Tabs;

const Styles = StyleSheet.create({
  tabs: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
    borderRadius: 10,
    height: 50,
    backgroundColor: "#E4DED5",
  },
});

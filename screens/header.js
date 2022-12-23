import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

const Header = () => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title={<Text style={styles.text}>News App</Text>} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    backgroundColor: "#83b1cf",
  },
  text: {
    fontSize: 25,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default Header;

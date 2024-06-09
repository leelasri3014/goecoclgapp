import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FooterMenu = () => {
  // hooks
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={styles.iconStyle}
          color={route.name === "Home" && "#023e8a"}
        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
        <FontAwesome5
          name="chart-line"
          style={styles.iconStyle}
          color={route.name === "Stats" && "#023e8a"}
        />
        <Text style={styles.text}>Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Leaderboard")}>
        <FontAwesome5
          name="trophy"
          style={styles.iconStyle}
          color={route.name === "Leaderboard" && "#023e8a"}
        />
        <Text style={styles.text}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" && "#023e8a"}
        />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: 'rgba(128,128,128,0.2)',
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 15,
    padding: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width:342,
  },
  iconStyle: {
    marginBottom: 3,
    fontSize: 24,
    color: "#023e8a",
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    color: '#909090',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0,
    textAlign: 'center',
    width: 60,
  },
});

export default FooterMenu;
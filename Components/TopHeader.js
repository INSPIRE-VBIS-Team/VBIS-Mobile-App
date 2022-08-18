import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Pressable,
  Image,
} from "react-native";
//For Theme
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Style Page Import
import { styles } from "../style/styles";
import { changeSize } from "../redux-store/fontActions";

function TopHeader({ navigation }) {
  // get the current theme & font size

  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);
  // initialize action dispatcher
  const dispatch = useDispatch();

  // define a component mode state
  const [mode, setMode] = useState(theme.mode);
  const [buttonSize, setButtonSize] = useState(fontSize.buttonSize);

  // Update the app Incase the theme mode changes / font size changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);

  useEffect(() => {
    setButtonSize(fontSize.buttonSize);
  }, [fontSize]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logo}>
        <Image
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel="Victoria Brain Injury Society logo"
          style={{ width: 140, height: 50 }}
          source={
            mode == "light"
              ? require("../assets/vbisLogo.png")
              : require("../assets/darkVbisLogo.png")
          }
        />
      </View>

      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Settings"
        accessibilityHint="Go to the settings page"
        style={mode == "light" ? styles.setting_light : styles.setting_dark}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={
            mode == "light"
              ? require("../assets/settings.png")
              : require("../assets/Setting_white.png")
          }
        />
      </Pressable>

      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Tutorial"
        accessibilityHint="Go to the tutorial page"
        style={mode == "light" ? styles.tutorial_light : styles.tutorial_dark}
        color="#f194ff"
        onPress={() => navigation.navigate("Tutorial")}
      >
        <Text
          style={
            [mode == "light" ? styles.buttonText_light : styles.buttonText_dark, {fontSize: buttonSize}]
          }
        >
          Tutorial
        </Text>
      </Pressable>
    </View>
  );
}

export default TopHeader;

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import TopHeader from "../Components/TopHeader";
import Footer from "../Components/Footer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "../style/styles";


function Service({ navigation, route }) {
  // get the current theme

  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);
  // initialize action dispatcher
  const dispatch = useDispatch();

  // define a component mode state
  const [mode, setMode] = useState(theme.mode);
  const [buttonSize, setButtonSize] = useState(fontSize.buttonSize);
  const [subtitleSize, setSubtitleSize] = useState(fontSize.subtitleSize);
  const [bodySize, setBodySize] = useState(fontSize.bodySize);

  // Update the app Incase the theme mode changes / font size changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);

  useEffect(() => {
    setButtonSize(fontSize.buttonSize);
  }, [fontSize]);

  const { Service } = route.params;
  const { Type } = route.params;

  return (
    <View
      style={
        mode == "light" ? styles(bodySize).appContainer_light : styles(bodySize).appContainer_dark
      }
    >
      {/* Top Header(VBIS logo, Settings, Tuitorial)*/}
      <View style={styles(bodySize).headerContainer}>
        <TopHeader navigation={navigation} />
      </View>

      <View style={styles(bodySize).middleContainer}>
        <View>
          {/* Heading*/}
          <Text
            style={[
              mode == "light" ? styles(bodySize).heading_light : styles(bodySize).heading_dark,
              { fontSize: subtitleSize },
            ]}
          >
            {Type}
          </Text>
          <SafeAreaView>
            <ScrollView
              style={styles(bodySize).scrollView}
              contentContainerStyle={styles(bodySize).scrollViewContentContainer}>
              {Service.map((item) => (
                <View
                  key={item.name}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={item.name}
                  accessibilityHint="See the details of this program"
                >
                  <Pressable
                    style={
                      mode == "light"
                        ? styles(bodySize).itemButton_light
                        : styles(bodySize).itemButton_dark
                    }
                    onPress={() =>
                      navigation.navigate("ServiceDescription", {
                        Name: item.name,
                        Description: item.description,
                        Location: item.location,
                        Phone: item.phone,
                      })
                    }
                  >
                    <Text
                      style={[
                        mode == "light"
                          ? styles(item.name.length).buttonText_light
                          : styles(bodySize).buttonText_dark,
                        { fontSize: buttonSize },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
      {/* Footer of the page(Back Button, Home Button)*/}
      <View style={styles(bodySize).bottomContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

export default Service;

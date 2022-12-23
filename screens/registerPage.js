import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterPage = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    try {
      const user_name = data.name;
      const user_email = data.email;
      const user_pw = data.password;

      const vals = { user_name, user_email, user_pw };

      const response = await fetch("http://192.168.1.11:5000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data.registered == true) {
            alert("User registered!", "Please Login!");
            navigation.navigate("LoginPage");
          }
          if (data.registered == false) {
            alert("Email is already registered!");
          }
        });
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    //navigation.navigate('ConfirmEmail');
  };

  const onSignInPress = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.line1}></Text>

          <Text style={styles.textHead}>Create Account</Text>
          <Text style={styles.textSubHead}>Register</Text>
          <CustomInput
            name="name"
            control={control}
            placeholder="Name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Name should be max 24 characters long",
              },
            }}
          />
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />
          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
            }}
          />
          <CustomInput
            name="password-repeat"
            control={control}
            placeholder="Confirm Password"
            secureTextEntry
            rules={{
              validate: (value) => value === pwd || "Password do not match",
            }}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingBottom: 20,
              paddingTop: 15,
              height: "100%",
            }}
          >
            <TouchableOpacity onPress={handleSubmit(onRegisterPressed)}>
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>{"Register"}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.textContainer}>
            <Text style={styles.text}>
              Already have an account?{" "}
              <Text onPress={onSignInPress} style={styles.register}>
                Login
              </Text>
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: "white" },
  root: {
    marginTop: -150,
    alignItems: "center",
    padding: 20,
  },
  line1: {
    backgroundColor: "#83b1cf",
    borderRadius: 100,
    width: 410,
    height: 200,
    marginBottom: 40,
  },
  textHead: {
    fontSize: 45,
    fontFamily: "serif",
    marginBottom: 30,
    textAlign: "center",
  },
  textSubHead: {
    fontSize: 35,
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#47597E",
    marginBottom: 25,
  },
  title: {
    fontSize: 45,
    fontFamily: "serif",
    marginBottom: 40,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  btnContainer: {
    marginTop: 20,
    elevation: 8,
    height: 60,
    width: 170,
    backgroundColor: "#D82148",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "serif",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  textContainer: {
    paddingTop: 10,
    fontFamily: "sans-serif",
    textAlign: "center",
    color: "grey",
  },
  text: { fontSize: 20 },
  register: {
    color: "#808080",
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
  },
});

export default RegisterPage;

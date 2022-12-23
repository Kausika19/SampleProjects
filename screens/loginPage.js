import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";

import CustomInput from "../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

const LoginPage = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const user_email = data.user_email;
      const user_pw = data.user_pw;

      const vals = { user_email, user_pw };

      const response = await fetch("http://192.168.1.11:5000/login/", {
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
          if (data.loggedIn) {
            navigation.navigate("HomePage");
          } else {
            alert("Email or Password Incorrect!");

            this.refs.modal1.open();
          }
        });
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    setLoading(false);
  };

  const onSignUpPress = () => {
    navigation.navigate("RegisterPage");
  };

  return (
    <SafeAreaView style={style.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.root}>
          <Text style={style.line1}></Text>
          <Text style={style.textHead}>Welcome Again</Text>
          <Text style={style.textSubHead}>LOGIN</Text>

          <CustomInput
            name="user_email"
            placeholder="Email"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <CustomInput
            name="user_pw"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: "Password is required",
            }}
          />

          <TouchableOpacity onPress={handleSubmit(onSignInPressed)}>
            <View style={style.btnContainer}>
              <Text style={style.btnText}>
                {loading ? "Loading..." : "LogIn"}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={style.textContainer}>
            <Text style={style.text}>
              Don't have an account?{" "}
              <Text onPress={onSignUpPress} style={style.register}>
                Register Now
              </Text>
            </Text>
          </Text>
          <Text style={style.line2}></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  view: { flex: 1, backgroundColor: "white" },
  root: {
    marginTop: -160,
    alignItems: "center",
    padding: 30,
  },
  line1: {
    backgroundColor: "#83b1cf",
    borderRadius: 100,
    width: 410,
    height: 200,
    marginBottom: 70,
  },
  line2: {
    backgroundColor: "#CFD0D7",
    borderRadius: 100,
    height: 200,
    width: 410,
    marginTop: 90,
  },
  textHead: {
    fontSize: 45,
    fontFamily: "serif",
    marginBottom: 40,
    width: 395,
    textAlign: "center",
  },
  textSubHead: {
    fontSize: 35,
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#47597E",
    marginBottom: 30,
  },
  img: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  btnContainer: {
    marginTop: 20,
    elevation: 8,
    height: 60,
    width: 160,
    backgroundColor: "#11468f",
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
    paddingTop: 50,
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  text: { color: "grey", fontSize: 20 },
  register: {
    color: "#808080",
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default LoginPage;

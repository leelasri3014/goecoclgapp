import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [course, setCourse] = useState("");
  const [stream, setStream] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [startingYear, setStartingYear] = useState("");
  const [endingYear, setEndingYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password || !dob || !phoneNumber || !course || !stream || !registrationNumber || !startingYear || !endingYear) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
        dob,
        phoneNumber,
        course,
        stream,
        registrationNumber,
        startingYear,
        endingYear
      });
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data==> ", { name, email, password, dob, phoneNumber, course, stream, registrationNumber, startingYear, endingYear });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Register</Text>
        <View style={{ marginHorizontal: 20 }}>
          <InputBox inputTitle={"Name"} value={name} setValue={setName} />
          <InputBox inputTitle={"Email"} keyboardType="email-address" autoComplete="email" value={email} setValue={setEmail} />
          <InputBox inputTitle={"Password"} secureTextEntry={true} autoComplete="password" value={password} setValue={setPassword} />
          <InputBox inputTitle={"Date of Birth"} keyboardType="phone-pad" value={dob} setValue={setDob} />
          <InputBox inputTitle={"Phone Number"} keyboardType="phone-pad" value={phoneNumber} setValue={setPhoneNumber} />
          <InputBox inputTitle={"Course"} value={course} setValue={setCourse} />
          <InputBox inputTitle={"Stream"} value={stream} setValue={setStream} />
          <InputBox inputTitle={"Registration Number"} value={registrationNumber} setValue={setRegistrationNumber} />
          <InputBox inputTitle={"Starting Year"} keyboardType="number-pad" value={startingYear} setValue={setStartingYear} />
          <InputBox inputTitle={"Ending Year"} keyboardType="number-pad" value={endingYear} setValue={setEndingYear} />
        </View>
        <SubmitButton btnTitle="Register" loading={loading} handleSubmit={handleSubmit}/>
        <Text style={styles.linkText}>
          Already Registered? <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Login</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#90e0ef",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#023e8a",
    marginBottom: 40,
    bottom: -40,
  },
  linkText: {
    textAlign: "center",
    top: -10,
  },
  link: {
    color: "#023e8a",
  },
});

export default Register;

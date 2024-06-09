import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import * as ImagePicker from 'expo-image-picker';

const SECTIONS = [
  {
    header: 'Preferences',
    icon: 'settings',
    items: [
      { icon: 'user', color: '#fe9400', label: 'Edit Profile', type: 'link' },
      {
        icon: 'lock',
        color: '#007afe',
        label: 'Change Password',
        value: false,
        type: 'link',
      },
      {
        icon: 'bell',
        color: '#007afe',
        label: 'Push Notifications',
        value: true,
        type: 'boolean',
      },
      { icon: 'navigation', color: '#32c759', label: 'Location', value:'true', type: 'boolean' },
      {
        icon: '',
        color: '#007afe',
        label: 'Edit Map Location',
        value: true,
        type: 'link',
      },
    ],
  },
  {
    header: 'Help',
    icon: 'help-circle',
    items: [
      { icon: 'flag', color: '#8e8d91', label: 'Report Bug', type: 'link' },
      { icon: 'mail', color: '#007afe', label: 'Contact Us', type: 'link' },
    ],
  },
  {
    header: 'Content',
    icon: 'align-center',
    items: [
      { icon: 'save', color: '#32c759', label: 'Saved', type: 'link' },
      { icon: 'download', color: '#fd2d54', label: 'Downloads', type: 'link' },
    ],
  },
];

export default function Settings() {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const [image, setImage] = useState(null);
  // Local state for form data
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/auth/update-user', {
        name,
        password,
        email: user.email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: data.updatedUser });
      Alert.alert('Success', data.message);
    } catch (error) {
      Alert.alert('Error', error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => { /* handle onPress */ }}>
            <View style={styles.profileAvatarWrapper}>
            {!image && (
            <TouchableOpacity onPress={pickImage}>
            <FeatherIcon name="camera" size={30} color="#007bff" />
            </TouchableOpacity>
            )}
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileAction}>
            <FeatherIcon color="#fff" name="edit-3" size={15} />
            </View>
            </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileAddress}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "Please Wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>
            {items.map(({ label, icon, type, value, color }, index) => (
              <TouchableOpacity key={label} onPress={() => { /* handle onPress */ }}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: color }]}>
                    <FeatherIcon color="#fff" name={icon} size={18} />
                  </View>
                  <Text style={styles.rowLabel}>{label}</Text>
                  <View style={styles.rowSpacer} />
                  {type === 'boolean' && <Switch value={value} />}
                  {type === 'link' && <FeatherIcon color="#0c0c0c" name="chevron-right" size={22} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <FooterMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontWeight: 'bold',
    width: 70,
    color: 'gray',
  },
  inputBox: {
    width: 250,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: 'black',
    color: 'white',
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtnText: {
    color: '#ffffff',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
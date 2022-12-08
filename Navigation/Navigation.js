import React, { useState, useEffect } from "react";
import { Button, Text, LogBox } from "react-native";
import {
  useNavigation,
  NavigationContainer,
  DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Destination from "./Components/Destination";
import Customlocation from "./Components/Customlocation";
import Scanner from "./Components/Scanner";
import Pass from "./Components/Pass";
import Addconsequence from "./Components/Addconsequence";

import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import QuickSignUp from "./Components/QuickSignUp";
import RegisterClasses from "./Components/RegisterClasses";
import QRCodes from "./Components/QRCodes";
import ClassesTeacher from "./Components/ClassesTeacher";
import ClassesStudent from "./Components/ClassesStudent";
import Availableclasses from "./Components/Availableclassesatyourschool";
import Studentsawaitingconfirmation from "./Components/Studentsawaitingconfirmation";
import Studentsenrolled from "./Components/Studentsenrolled";
import Mainmenustudent from "./Components/MainMenuStudent";
import Mainmenuteacher from "./Components/MainMenuTeacher";
import Passisready from "./Components/Passisready";
import Donewithwork from "./Components/Donewithwork";
import Settingsteacher from "./Components/SettingsTeacher";
import Classsessions from "./Components/Classsessions";
import Bathroomline from "./Components/Lineforbathroom";
import Lineforexclusivephonepass from "./Components/Lineforexclusivephonepass";
import Bathroomlineforteacher from "./Components/Lineforbathroomteacher";
import Donewithworkpass from "./Components/Donewithworkpass";
import Passhistory from "./Components/Passhistory";
import Penaltyhistory from "./Components/Penaltyhistory";
import Linkclasses from "./Components/Linkclasses";
import Passesstudents from "./Components/Passesforstudents";
import Classpasses from "./Components/Passesfromthisclass";

import Getapprovalfromteacher from "./Components/Getapprovalfromteacher";
import Studentconsequences from "./Components/Consequencesforstudents";
import Definitions from "./Components/Definitions";
import Relatedrules from "./Components/Relatedrules";
import Studnetsnotenrolled from "./Components/Studentsnotyetinyourclaass";



const headerStyle = {
  backgroundColor: "#000",
};

LogBox.ignoreAllLogs();

export const Navigation = ({ navigation, route }) => {

const [day, setDay] = useState();

  const AuthStack = createStackNavigator();

  const config = {
    animation: 'timing',
    config: {
      duration: 15,
    }
  }

  const AuthStackScreen = () => (

    <AuthStack.Navigator
    initialRouteName="Mainmenustudent"
      screenOptions={{
        transitionSpec: {
          open: config,
          close: config
        }
      }}
    >

<AuthStack.Screen
        name="Mainmenustudent"
        getComponent={() => require('./Components/MainMenuStudent').default}
        initialParams={{ Donewithworkpass: "" }}
        options={{
          title: "Main Menu",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
    <AuthStack.Screen
        name="SignIn"
        getComponent={() => require('./Components/SignIn').default}
        options={{
          title: "Sign In",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />


      <AuthStack.Screen
        name="Signup"
        getComponent={() => require('./Components/Signup').default}
        options={{
          title: "Sign Up",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

  
  
      <AuthStack.Screen
        name="QuickSignUp"
        getComponent={() => require('./Components/QuickSignUp').default}
        options={{
          title: "Quick Sign Up",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="Studentsawaitingconfirmation"
        getComponent={() => require('./Components/Studentsawaitingconfirmation').default}
        options={{
          title: "Waiting List",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Relatedrules"
        getComponent={() => require('./Components/Relatedrules').default}
        options={{
          title: "Related Rules",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="Studentsnotenrolled"
        getComponent={() => require('./Components/Studentsenrolled').default}
        options={{
          title: "Other Students",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="Classpasses"
        getComponent={() => require('./Components/Passesfromthisclass').default}
        options={{
          title: "Class Passes",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Passesstudents"
        getComponent={() => require('./Components/Passesforstudents').default}
        options={{
          title: "Passes",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />


<AuthStack.Screen
        name="Linkclasses"
        getComponent={() => require('./Components/Linkclasses').default}
        options={{
          title: "Link Classes",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="StudentConsequences"
        getComponent={() => require('./Components/Consequencesforstudents').default}
        options={{
          title: "Consequences",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />


<AuthStack.Screen
        name="Addconsequence"
        getComponent={() => require('./Components/Addconsequence').default}
        options={{
          title: "Behavior Description",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Passhistory"
        getComponent={() => require('./Components/Passhistory').default}
        options={{
          title: "Punctuality",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Penaltyhistory"
        getComponent={() => require('./Components/Penaltyhistory').default}
        options={{
          title: "Penalty History",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />


<AuthStack.Screen
        name="Getapprovalfromteacher"
        getComponent={() => require('./Components/Getapprovalfromteacher').default}
        options={{
          title: "Contract",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      

<AuthStack.Screen
        name="Lineforbathroompass"
        getComponent={() => require('./Components/Lineforbathroom').default}
        options={{
          title: "Line For Bathroom Pass",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Lineforexclusivephonepass"
        getComponent={() => require('./Components/Lineforexclusivephonepass').default}
        options={{
          title: "Line For Phone Break",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Lineforbathroompassteacher"
        getComponent={() => require('./Components/Lineforbathroomteacher').default}
        options={{
          title: "Line For Bathroom Pass",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="Studentsenrolled"
        getComponent={() => require('./Components/Studentsenrolled').default}
        options={{
          title: "Students Enrolled",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />


      <AuthStack.Screen
        name="Settingsteacher"
        getComponent={() => require('./Components/SettingsTeacher').default}
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Definitions"
        getComponent={() => require('./Components/Definitions').default}
        options={{
          title: "Definitions",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

      <AuthStack.Screen
        name="Mainmenuteacher"
        getComponent={() => require('./Components/MainMenuTeacher').default}
        options={{
          title: "Main Menu",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

      <AuthStack.Screen
        name="Passisready"
        getComponent={() => require('./Components/Passisready').default}
        options={{
          title: "Pass is Ready",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />


<AuthStack.Screen
        name="Classsessions"
        getComponent={() => require('./Components/Classsessions').default}
        options={{
          title: "Class Sessions",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Donewithwork"
        getComponent={() => require('./Components/Donewithwork').default}
        options={{
          title: "Done With Work",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

<AuthStack.Screen
        name="Donewithworkpass"
        getComponent={() => require('./Components/Donewithworkpass').default}
        options={{
          title: "Done With Work Pass",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />


      <AuthStack.Screen
        name="RegisterClasses"
        getComponent={() => require('./Components/RegisterClasses').default}
        options={{
          title: "Register Classes",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="ClassesTeacher"
        getComponent={() => require('./Components/ClassesTeacher').default}
        options={{
          title: "Classes",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="ClassesStudent"
        getComponent={() => require('./Components/ClassesStudent').default}
        options={{
          title: "Classes",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="Availableclasses"
        getComponent={() => require('./Components/Availableclassesatyourschool').default}
        options={{
          title: "Available Classes",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="QRCodes"
        getComponent={() => require('./Components/QRCodes').default}
        options={{
          title: "QR Code",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />

      <AuthStack.Screen
        name="Destination"
        getComponent={() => require('./Components/Destination').default}
        options={{
          title: "Destination",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="Customlocation"
        getComponent={() => require('./Components/Customlocation').default}
        options={{
          title: "Custom Location",
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
      <AuthStack.Screen
        name="Scanner"
        getComponent={() => require('./Components/Scanner').default}
        options={{
          title: "Scanner",
          headerTitleAlign: "center",
          headerStyle,
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
          headerTintcolor: "#FFF",
        }}
      />
      <AuthStack.Screen
        name="Pass"
        getComponent={() => require('./Components/Pass').default}
        options={{
          title: "Pass",
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle,
          headerTintcolor: "#FFF",
          headerTitleStyle: {
            fontSize: 17, fontWeight: 'bold',
            color: '#ffffff'
          },
        }}
      />
    </AuthStack.Navigator>
  );
  return (
    <NavigationContainer>
      <AuthStackScreen/>
    </NavigationContainer>
  );
};

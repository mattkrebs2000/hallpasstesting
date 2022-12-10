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
import Mainmenuadmin from "./Components/Mainmenuadmin";
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
import Passesadmin from "./Components/Passesforadmin";

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
        component={Mainmenustudent}
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
        name="Mainmenuadmin"
        component={Mainmenuadmin}
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
        component={SignIn}
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
        component={Signup}
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
        component={QuickSignUp}
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
        component={Studentsawaitingconfirmation}
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
        component={Relatedrules}
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
        component={Studnetsnotenrolled}
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
        name="Passesadmin"
        component={Passesadmin}
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
        name="Classpasses"
        component={Classpasses}
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
        component={Passesstudents}
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
        component={Linkclasses}
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
        component={Studentconsequences}
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
        component={Addconsequence}
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
        component={Passhistory}
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
        component={Penaltyhistory}
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
        component={Getapprovalfromteacher}
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
        component={Bathroomline}
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
        component={Lineforexclusivephonepass}
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
        component={Bathroomlineforteacher}
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
        component={Studentsenrolled}
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
        component={Settingsteacher}
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
        component={Definitions}
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
        component={Mainmenuteacher}
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
        component={Passisready}
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
        component={Classsessions}
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
        component={Donewithwork}
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
        component={Donewithworkpass}
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
        component={RegisterClasses}
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
        component={ClassesTeacher}
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
        component={ClassesStudent}
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
        component={Availableclasses}
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
        component={QRCodes}
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
        component={Destination}
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
        component={Customlocation}
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
        component={Scanner}
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
        component={Pass}
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

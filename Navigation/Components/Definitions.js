import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Button, View, TouchableOpacity, Text, ScrollView, Pressable, LogBox, Switch } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Slider from '@react-native-community/slider';



const Destination = ({ route, navigation }) => {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, id, exclusivephonepasstimelmit, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, lengthofclass,drinkpasslimit, linkedclass
    } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate("Mainmenuteacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,drinkpasslimit:drinkpasslimit, 
                        nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass
                    })}
                >

                    <Text accessibilityLabel="Guest" style={styles.error5}>
                        Main Menu
                    </Text>
                </TouchableOpacity>
            ),
        });


    }, []);


    return (
        <View style={styles.container}>
            <ScrollView>

                <Text style={styles.paragraph19}>{'\n'}{'\n'}{'\n'}Definitions/Explanations{'\n'}{'\n'}___________________</Text>


                <Text style={styles.paragraph99}>{'\n'}'In Good Standing'</Text>
                <Text style={styles.paragraph21}>A student will be said to be 'In Good Standing' at the beginning of every class session. This is meant to indicate that the student is in compliance with the rules of the class. This phrase may appear in 'Main Menu' for Students and in the Students Enrolled screen for Teachers.</Text>


                <Text style={styles.paragraph99}>{'\n'}'In Penalty'</Text>

                <Text style={styles.paragraph21}>A student can be placed "In Penalty" by their teacher if it was determined that the student is not abiding by the rules of the class. Examples of this could be that they are on their phone when they are not supposed to be Or they are talking while the teacher is giving instruction to the class. Teachers can establish their own rules for their classes in "Behaviors to Address" -then select from those rules when placing a kid 'In Penalty.' When a Teacher identifies a student as being 'In Penalty' the App records that time and creates a percent which is their 'In Compliance During Classtime' score. </Text>

                <Text style={styles.paragraph99}>{'\n'}'Over/Under'</Text>

                <Text style={styles.paragraph21}>This is a number attributed to a student's punctuality from returned passes (and tardies) that can be negative or positive. If a student goes on a pass and returns before the pass' time-limit he/she will have that amount of time added to their Over/Under. If a student goes on a pass and returns after the pass' time-limit he/she will have that amount of time subtracted from their Over/Under. This Number shows up in the "Main Menu" screen for students and in "Students Enrolled" for teachers. Due to the consequences for a Negative Over/Under, a student may wish to have his/her Over/Under reset (possibly by serving detention). Teachers could reset their score from "Students Enrolled."</Text>

                <Text style={styles.paragraph99}>{'\n'}'Consequences For Lateness'</Text>

                <Text style={styles.paragraph21}>Note that in the Students Enrolled screen all students will have a setting of either "Consequences For Lateness" or "No Consequences For Lateness." "Consequences for Lateness" comes into play for all students that have a Negative Over/Under score. The "Consequences for Lateness" that this App provides is meant to be a deterrent from being late. Prior to being allowed to go on pass, a student who has a Negative Over/Under score and also "Consequences for Lateness" must first accurately enter into an input box a provided statement. If he/she does this correctly the App will provide access to the rest of the "Pass" process.</Text>

                <Text style={styles.paragraph99}>{'\n'}Text to be Transcribed - if Students Over/Under is between 0 and -10.</Text>

                <Text style={styles.paragraph21}>I will try not to be late this time. This penalty of having to write this can be removed if i serve a detention with the teacher.</Text>

                <Text style={styles.paragraph99}>{'\n'}Example of Text to be Transcribed - if Students Over/Under is at -10 or Lower.</Text>

                <Text style={styles.paragraph21}>I understand that rules are important and they are in place for my benefit. And I understand that one of the rules in this class is that i need to be respectful of the time limits of passes that i am using. So i will try not to be late this time. This penalty of having to write this can be removed if I serve a detention with the teacher.</Text>

                <Text style={styles.paragraph99}>{'\n'}'Bathroom Passes'</Text>
                <Text style={styles.paragraph21}>A 'Bathroom Pass' Begins when a Student Zaps the QRCode in the class he/she is leaving from and ends when that student arrives back at class and zaps the same QR code.</Text>


                <Text style={styles.paragraph99}>{'\n'}'Get Drink of Water'</Text>
                <Text style={styles.paragraph21}>This pass begins when a Student Zaps the QRCode in the class he/she is leaving from and ends when that student arrives back at class and zaps the same QR code.</Text>

                <Text style={styles.paragraph99}>{'\n'}'Non-Bathroom Passes'</Text>
                <Text style={styles.paragraph21}>These are also referred to as "1-Way Hall Passes". As Teachers and Admins create accounts and make their locations accessible by preessing "Turn Incoming Passes On" they make it possible for Students to select these locations as their destinations. When they do this it is assumed that they also have their corresponding QRCode posted at their location. When a student arrives at this destination they should zap the QRCode. This action closes out the pass. </Text>

                <Text style={styles.paragraph99}>{'\n'}'Custom Passes'</Text>
                <Text style={styles.paragraph21}>If a Student does not see the location they are going to on the list of destinations they may type in a different location. In this case it is assumed that there is not a QRCode at the destination and so these passes are not "waiting" to be closed out by a QRCode. Timing for these passes is not recorded and it wiil not affect students Over/Under as it would for the other two kinds of passes.</Text>


                <Text style={styles.paragraph99}>{'\n'}Steps For Getting Started</Text>

                <Text style={styles.paragraph21}>1. Create a Teacher Account{'\n'}{'\n'}2. Change/Save Settings so they are consistent with what is needed.{'\n'}{'\n'}3. Press 'Get Your QR Codes' from Main Menu - Take a Screenshot of your QRCode and post it in rooms that you will be teachiing from. {'\n'}{'\n'}4. Register a Class{'\n'}{'\n'}5. Select the Class you just Registered and Return to the Main Menu.{'\n'}{'\n'}6. Have students download this App onto their phone from the IStore OR Google Play -Sign Up as Students -press "Join A Class" and select the class you are in. {'\n'}{'\n'}7. As soon as students have requested to join you can admit them by visiting 'Admit Students into Active Class' </Text>

                <Text style={styles.paragraph99}>{'\n'}Steps In a Normal Day{'\n'}For A Teacher</Text>

                <Text style={styles.paragraph21}>1. Press -Select A Class{'\n'}{'\n'}2. Select the Class you want to begin{'\n'}{'\n'}3. Press 'Begin This Class'{'\n'}{'\n'}4. When you are Ready to start allowing kids to make passes press 'Turn Outgoing Passes On' from within the Main Menu</Text>

                <Text style={styles.paragraph99}>{'\n'}Steps In a Normal Day{'\n'}For A Student</Text>

                <Text style={styles.paragraph21}>1. When a Pass is Needed - Select from the Main Menu 'Begin Making a Pass.'{'\n'}{'\n'}2. Select Current Class{'\n'}{'\n'}3. Select Destination{'\n'}{'\n'}4. When student is given the Go-Ahead direct the Scanner at the QRCode that the teacher posted in the room{'\n'}{'\n'}5. Student is on Pass now with Pass Details on Screen{'\n'}{'\n'}6. When Student Returns Or Arrives he/she should "Zap Out" to close out the pass.</Text>


                <Text>{'\n'} {'\n'} {'\n'} {'\n'} {'\n'} {'\n'} {'\n'} {'\n'} </Text>

            </ScrollView>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: 2,
        alignItems: "center",
       

    },

    paragraph21: {
        marginLeft: 35,
        fontSize: 17,
        textAlign: 'justify',
        padding: 10,
        color: '#FFF',
        backgroundColor: '#000000',
        marginRight: 25

    },


    paragraph19: {
        margin: 24,
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        fontWeight: "bold"


    },
    paragraph99: {

        fontSize: 19,
        marginLeft: 20,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        fontWeight: "bold",

    },
    error5: {

        backgroundColor: '#000',
        color: "#FFF",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "center",

    },

});
export default Destination; 
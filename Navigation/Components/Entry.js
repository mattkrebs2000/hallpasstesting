import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Button, View, TouchableOpacity, Text, ScrollView, Pressable, LogBox, Switch } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Slider from '@react-native-community/slider';



const Destination = ({ route, navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate("Mainmenuteacher")}
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

                <Text style={styles.paragraph21}>Note that in the Students Enrolled screen all students will have a setting of either "Consequences For Lateness" or "No Consequences For Lateness." "Consequences for Lateness" comes into play for all students that have a Negative Over/Under score. The "Consequences for Lateness" that this App provides is meant to be a deterrent from being late. Prior to being allowed to go on pass, a student who has a Negative Over/Under score and also "Consequences for Lateness" must first accurately enter into an input box a provided statement. If he/she does this correctly the App will provide access to the rest of the "Pass" process. If a students Over/Under is minimal (0 to -10 minutes) the statements that they must transcribe is relatively simple. After -10 minutes, the challenge becomes much more difficult -in that a student must transcribe it in with a unique pattern of lower case and upper case letters (for example every other letter must be Upper Case). This "Consequences For Lateness" feature can be activated/deactivated from the 'Students Enrolled' screen and the Over/Under can also be cleared if for example a student provides a good excuse or serves detention.</Text>

                <Text style={styles.paragraph99}>{'\n'}Text to be Transcribed - if Students Over/Under is between 0 and -5.</Text>

                <Text style={styles.paragraph21}>I will try not to be late this time. This penalty of having to write this can be removed if i serve a detention with the teacher.</Text>


                <Text style={styles.paragraph99}>{'\n'}Example of Text to be Transcribed - if Students Over/Under is at -30 or Lower.</Text>

                <Text style={styles.paragraph21}>i unDERstaND That RULes aRE ImpoRTAnt aND They ARE in pLACe foR MY benEFIt. anD I UndeRSTand THAt onE OF the RULes iN THis cLASs is THAt i nEED to bE REspeCTFul oF THe tiME LimiTS Of paSSEs thAT I am uSINg. so I WIll tRY Not tO BE latE THis tIME. thiS PEnalTY Of haVINg to WRIte tHIS can BE RemoVED if i SERve a DETentION witH THe teACHer.</Text>

                <Text style={styles.paragraph99}>{'\n'}'Break From Work Pass '</Text>
                <Text style={styles.paragraph21}>This is a timed interval during which a student can 'play' on their technology. While a student is on a 'Break From Work Pass' the teachers ability to put a student into the 'In Penalty' category will be disabled. After a student uses a 'Break From Work Pass' one time in a class session it will be disabled from use for the rest of the class. A teacher can disable this feature altogether by setting "Time Limit for Break From Work Pass " to "Inaccessible."</Text>

                <Text style={styles.paragraph99}>{'\n'}'Done With Work Phone Pass'</Text>
                <Text style={styles.paragraph21}>This is a pass that is initiated by the student and confirmed by the teacher when a student is said to have completed their work. When a student is awarded an 'Done With Work Phone Pass' the teachers ability to put a student into the 'In Penalty' category will be disabled. Students will see this Pass option become accessible in each Class session after it is half over if the teacher is making the pass accessible. A teacher can disable this feature altogether by making the 'Done With Work Phone Pass' in Settings false (positioned to the left).</Text>

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
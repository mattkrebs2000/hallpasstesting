import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Dimensions, SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Linkedclasses from './Mapofclassestolink/Mapofclassestolink';
import { Alert } from 'react-native-web';


//get rid of grouptime


const height = Dimensions.get("window").height;

const Destination = ({ route, navigation }) => {
    const {idofcurrentclass, currentsessionid, sessionending, endlastclass, userinformation, school, state, town, role, id, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, drinkpasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid,teacheriscalled,
     email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, drinkpassduration, bathroompassduration, overunder, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, maxstudentsbathroom, linkedclass

    } = route.params;
    

    const [seconddata, setSeconddata] = useState("");
    const [Selectedclass, setSelectedclass] = useState("");
    const [classname, setClassname] = useState();
    const [Idselected, setIdselected] = useState("");
    const [showspinner, setShowspinner] = useState(true);
    

    useEffect(() => {

        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity >
                    <Text accessibilityLabel="Guest" style={styles.error}>
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, []);


    useEffect(() => {
let idselect = Selectedclass.id;
        let classe = Selectedclass.classname; 
        setClassname(classe);
        setIdselected(idselect);
      
    }, [Selectedclass]);

    useEffect(() => {
        if (id && classid) {
            getotherclasses();
        }
    }, []);

    const getotherclasses = () => {

        const g = query(collection(firebase, "classesbeingtaught"), where("teacherid", "==", id), where("id", "!=", classid));
        const docDATAA = getDocs(g)
            .then(function (snapshot) {

                const arrayy = [{ classname: "Do not link", id: "Not Linked" },];

                snapshot.forEach(doc => {
                    arrayy.push(doc.data())
                })
                setSeconddata(arrayy); setShowspinner(false);
            })
        console.log(seconddata, "function 15 HERE IS THE DATA")
    }

    async function Setlink() {
        if (Idselected  && classid) 
        await updateDoc(doc(firebase, "classesbeingtaught", classid), {
           linkto: Idselected
        }).catch((error) => {
            console.log(error); alert(error);
        });

        await updateDoc(doc(firebase, "classesbeingtaught", Idselected), {
            linkto: classid
        }).catch((error) => {
            console.log(error); alert(error);
        });
    }

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                <Text>{'\n'}</Text>
                <TouchableOpacity><Text style={styles.error} onPress={() => refresh()}>Link class with:{'\n'}{coursename}</Text></TouchableOpacity></View>
            <Text>{'\n'}</Text>
            <View style={styles.container2}>
                {seconddata.length > 0 ? <Linkedclasses seconddata={seconddata} id={id} setSelectedclass={setSelectedclass} selectedclass={Selectedclass} classname={classname} idselected ={Idselected}/> : <Text style={styles.text}>   </Text>}
            </View>
            <View style={styles.section3}>

                <View><ActivityIndicator
                    size="large"
                    color="#FFF"
                    animating={showspinner}
                    style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }} /></View>

                {Selectedclass ? (<Text style={styles.paragraph2} onPress={() => Setlink()} >Set This Link </Text>) : (<Text style={styles.paragraph2}>     </Text>)}

                <Text style={styles.paragraph2}>___________________ {'\n'}</Text>
                <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenuteacher", {
                     idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                     email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination,  currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass
       
                })} >Return to Main Menu </Text>
            </View>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({

    largercontainer: {
        height: height,
        backgroundColor: "#000",
        height: "100%"

    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: 2,
    },
    paragraph: {
        margin: 24,
        fontSize: 20,
        textAlign: 'center',
        padding: 20,
        color: '#FFFFFF',
        backgroundColor: '#000000',

    },
    text: {
        color: '#FFFFFF',
        textAlign: "center"

    },
    paragraph2: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",

        justifyContent: "center",
        marginTop: 30,
    },
    container2: {
        height: "35%",
        backgroundColor: "#013469",
        width: "100%",

    },
    container1: {
        height: "10%",
        backgroundColor: '#000',
        width: "100%",
        justifyContent: "center",
        alignItems: "center"

    },
    error: {

        backgroundColor: '#000',
        color: "#FFF",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"

    },
    section3: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
        height: "30%",

    },

});
export default Destination; 
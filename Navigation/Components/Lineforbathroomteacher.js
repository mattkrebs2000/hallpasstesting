import React, { useState, useEffect } from "react";
import Lineforbathroom from './LineBathroomTeacher/Lineforbathroomteacher'

import { SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Pressable } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, orderBy, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";





const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const [userdata, setUserdata] = useState();
    const [userdata2, setUserdata2] = useState();
    const [selectedclass, setSelectedclass] = useState("");

    const [idselected, setIdselected] = useState("");
    const [passid, setPassid] = useState();
    const [placeinline, setPlaceinline] = useState(0);
    const [docdeleted, setDocdeleted] = useState(false);
    const [studentid, setStudentid] = useState("");
    const [totalinline, setTotalinline] = useState();



    //Bathroom Pass Line

    const [showspinner, setShowspinner] = useState(true);
    const [currentmax, setCurrentmax] = useState();
    const [showingline, setShowingline] = useState();


    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, id, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, drinkpasslimit, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom,linkedclass
    } = route.params;


    //realtime updates!!!


    useEffect(() => {
        setShowingline(true);

    }, []);

    useEffect(() => {
        if (showingline === true) {
            getlocationsqrcodes();
        } else {
            getthoseinthebathroom();
        }

    }, [showingline]);

    useEffect(() => {
        let studentidd = selectedclass.id;
        let pass = selectedclass.id;
    
        setStudentid(studentidd);
        setPassid(pass);

        getlocationsqrcodes();

    }, [selectedclass]);

    async function getthoseinthebathroom() {
        console.log("FUNCTION 2 Run");

        const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("destination", "==", "Bathroom"), where("leftclass", ">", 0), where("returned", "==", 0));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {
                const array = []
                snapshot.forEach(doc => {
                    array.push(doc.data())
                })
                setUserdata2(array)
            })
        console.log("DID the people in the Bathroom show up, DID the people in the Bathroom show up")

        setShowspinner(false);
    }

    const letthenextstudentgo = () => {
        console.log(currentmax);
        setCurrentmax(currentmax + 1);
    }

    const reducemaxbathroom = () => {
        if (currentmax > 1) {
            setCurrentmax(currentmax - 1);
        }
    }

    useEffect(() => {
        if (currentmax > -2) {
            updateDoc(doc(firebase, "classesbeingtaught", classid), {
                bathroompassmaxstudents: currentmax
            }).catch((error) => {
                console.log(error); alert(error);
            })
        } else {
            null
        }
    }, [currentmax]);

    useEffect(() => {
        setCurrentmax(maxstudentsbathroom);
    }, []);

    useEffect(() => {
        console.log(currentmax, "This si the currentmax")
    }, [currentmax]);


    const leaveline = () => {
       
if (passid) {
    setShowspinner(true);
    console.log(passid, "This is the PassID")
        try {
            const userDoc = doc(firebase, "passes", passid)
          
            deleteDoc(userDoc)
        } catch (error) {
            alert(error)
        }
        setTimeout(() => {
            setDocdeleted(true);
            setShowspinner(false);
        }, 2000);

    }
    }

    useEffect(() =>

        onSnapshot(doc(firebase, "classesbeingtaught", classid), (doc) => {

            if (doc.data().inusebathroompass <= doc.data().bathroompassmaxstudents) {
                getlocationsqrcodes(); 
                getthoseinthebathroom();
            }
        }
        ), []);

    useEffect(() => {
        setShowspinner(true);
        if (id.length > 3) {
            getlocationsqrcodes();
            getthoseinthebathroom();
        }
    }, []);

    useEffect(() => {
        if ((typeof totalinline != "undefined") && (typeof classid != "undefined")) {  
          makechange();
       }
    }, [totalinline, passid]);

    useEffect(() => {
        if (typeof userdata != "undefined") {  
         setTotalinline(userdata.length)
       }
    }, [userdata]);



const makechange = () => {
    console.log("Is this the last thing to get run?")

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
        totalinlineforbathroom: totalinline
    }).catch((error) => {
        console.log(error); alert(error);
    })

}

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

    async function getlocationsqrcodes() {


        const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("timeleftclass", "==", 0), orderBy("placeinline", "asc"));

        const querySnapshot = await getDocs(q)


            .then(function (snapshot) {
                const array = []
                snapshot.forEach(doc => {

                    array.push(doc.data())
                })
                setUserdata(array)
            })


        setShowspinner(false);

    };

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                {showingline ? <View><Text style={styles.error} onPress={() => setShowingline(false)}>Max Allowed: {currentmax}{'\n'}Line for the Bathroom{'\n'}-Show those In Bathroom-</Text></View> : <View><Text style={styles.error} onPress={() => setShowingline(true)}>Students in Bathroom{'\n'}-Show Line for Bathroom-</Text></View>}
            </View>


            <View style={styles.container2}>
                <Lineforbathroom userdata={userdata} id={id} setSelectedclass={setSelectedclass} selectedclass={selectedclass} idselected={idselected} firstname={firstname} studentid={studentid} lastname={lastname} showingline={showingline} userdata2={userdata2}/>
            </View>

<ScrollView>
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

                <Pressable>
                    <Text style={styles.paragraph24} onPress={() => letthenextstudentgo()}>Increase Total Number of{'\n'}Students Allowed in Bathroom{'\n'}</Text>
                </Pressable>
                {currentmax > 1 ? <Pressable onPress={() => reducemaxbathroom()}>
                    <Text style={styles.paragraph24}>Decrease Total Number of{'\n'}Students Allowed in Bathroom{'\n'}</Text>
                </Pressable> : null}
                {showingline ? <View>
                    <Pressable onPress={() => leaveline()}><Text style={styles.paragraph24}>Remove Student from Line</Text></Pressable>
                </View>:<View><Text style={styles.paragraph24}>   </Text></View>}
                <Text style={styles.paragraph24}>___________________ {'\n'}</Text>

                <Text style={styles.paragraph24} onPress={() => navigation.navigate("Mainmenuteacher", {
                    idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit:drinkpasslimit, 
                    ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                    email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration,drinkpassduration:drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass

                })} >Return to Main Menu </Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

            </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: "#000",
        alignItems: "center",
        width: "100%",

    },
    largercontainer: {
        height: height,
        backgroundColor: "#000",

    },
    container1: {
        height: "15%",
        backgroundColor: '#000',
        width: "100%",
        justifyContent: "center",


    },
    error: {

        backgroundColor: '#000',
        color: "#FFF",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "center",

    },
    container2: {
        height: "30%",
        backgroundColor: "#013469",
        width: "100%",

    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#000000',
        color: "#fff",
        height: "100%",
        textAlign: "center",
        marginTop: "10%",
    },
    Newrow: {
        backgroundColor: '#000000',

        margin: 2,
        textAlign: "center",
        fontSize: 20,
        width: "90%",
        borderColor: "#E43522",
        borderWidth: 4,
        justifyContent: "center",
        color: "#fff",
    },
    Newrowa: {
        backgroundColor: '#000000',
        margin: 4,
        textAlign: "center",
        fontSize: 20,
        borderColor: "#E43522",
        borderWidth: 4,
        justifyContent: "center",
        color: "#fff",
        flex: 1,
    },

    Newrowb: {
        backgroundColor: '#000000',
        margin: 4,
        textAlign: "center",
        fontSize: 20,
        borderColor: "#E43522",
        borderWidth: 4,
        justifyContent: "center",
        color: "#fff",
        flex: .4,
    },

    paragraph2: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000',
        color: "#fff",

        justifyContent: "center",
        marginTop: 30,
    },

    paragraph24: {

        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000',
        color: "#fff",

        justifyContent: "center",
        marginTop: 30,
    },

    paragraph4: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000',
        color: "#fff",
        justifyContent: "center",
        lineHeight: 30,

    },
    section3: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
        height: "55%",

    },


    paragraph6: {
        color: "#fff",
        fontSize: 17,
        marginRight: 7


    },
    textContainer: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20,
    },

});
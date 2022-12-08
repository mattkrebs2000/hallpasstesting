import React, { useState, useEffect } from "react";

import Students from './Mapofstudentsawaitingconfirmation/Mapofstudentsawaitingconfirmation';

import { SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Pressable } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, FieldValue } from "@firebase/firestore";


const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, drinkpasslimit, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, bathroompassduration,  drinkpassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, id, sessionending, maxstudentsbathroom, linkedclass
    } = route.params;
    console.log(idsfromgroup, "Studentsawwaitingconfirmataion.js", classid, "Studentsawwaitingconfirmataion.js");


    const [userdata, setUserdata] = useState([]);
    const [selected, setSelected] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [idselected, setIdselected] = useState("");
    const [idsfromgroup, setIdsfromgroup] = useState();
    const [count, setCount] = useState(0);

    const [showspinner, setShowspinner] = useState(true);
    const [idsofpasses, setIdsofpasses] = useState();



    const endpasses = () => {

        if (sessionending < Date.now()) {
            const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("returned", "==", 0));

            const querySnapshot = getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push({id: doc.data().id, expectedreturn: doc.data().whenlimitwillbereached,endofclasssession: doc.data().endofclasssession })
                    })
                    if (array.length === 0) {
                        console.log("No passes to change")
                    } else {
                        setIdsofpasses(array); console.log(array, "This is the pass ");
                    }
                })
        }

    }
    useEffect(() => {
        if (typeof idsofpasses != "undefined") {
            const t = Date.now();
          
            for (let s = 0; s < idsofpasses.length; s++) {

                const r = new Date(idsofpasses[s].endofclasssession);

                updateDoc(doc(firebase, "passes", idsofpasses[s].id), {

                    returned: idsofpasses[s].endofclasssession,
                    timereturned: r.toLocaleTimeString([], { hour12: true }),
                    returnedbeforetimelimit: idsofpasses[s].expectedreturn > idsofpasses[s].endofclasssession,
                    differenceoverorunderinminutes: (idsofpasses[s].expectedreturn - idsofpasses[s].endofclasssession) / 60000,


                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
        }
    }, [idsofpasses]);


    useEffect(() => {

        setShowspinner(true);

        console.log(selected, "This is the Selected Value")
        setFirstname(selected.localfirstname)
        setLastname(selected.locallastname)
        setIdselected(selected.id)

    }, [selected]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity>
                    <Text accessibilityLabel="Guest" style={styles.error}>
                    </Text>
                </TouchableOpacity>
            ),
        });

}, []);

const ifitshtere = () => {
    if (sessionending < Date.now()) {
        updateDoc(doc(firebase, "classsessions", currentsessionid), {
            status: "Completed"
        })
            .catch(error => {
                console.log(error); alert("2", error);
            })
        endpasses();
    }
}

useEffect(() => {
    refresh3();
}, []);


async function refresh3() {

    if (typeof currentsessionid != "undefined") {
        const docRef = doc(firebase, "classsessions", currentsessionid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            ifitshtere();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        console.log("THIIIIS was NOW RUN")

    }
}


    useEffect(() => {
        getlocationsqrcodes()
    }, []);

useEffect(() =>
onSnapshot(doc(firebase, "classesbeingtaught", classid), (doc) => {
    getlocationsqrcodes()
}
), []);

    async function getlocationsqrcodes() {
        const q = query(collection(firebase, "users"), where("courseawaitingconfirmation", "==", classid));

        const querySnapshot = await getDocs(q)


            .then(function (snapshot) {
                const userids = []
                const array = []
                snapshot.forEach(doc => {
                    // userids.push({ id: doc.data().id, totalcourses: doc.data().totalcourses })

                    userids.push(doc.data().id)

                    array.push(doc.data())
                })
                setIdsfromgroup(userids);
                setUserdata(array);
                setShowspinner(false);
            })

        console.log(idsfromgroup, "here are the ids from the group")

    };


    const enrollingAllstudents = () => {
        const percents = { id: classid, penaltyminutes: 0, overunder: 0, adjustments: 0, level: "Consequences For Lateness" }
        let variable = "";

        idsfromgroup.forEach((item) => {
            console.log(item, "item THIS IS "),

                variable = item,
                console.log(item, "item", variable, "THIS IS WHAT I printed"),

                updateDoc(doc(firebase, "users", variable), {
                    [classid]: percents,
                    courseawaitingconfirmation: "",
                    ["inpenalty" + classid]: false,
                    //   [starttime]: null,
                    //   [stoptime]: null,
                    //   [totaltime]: 0,

                }).catch((error) => {
                    console.log(error); alert(error);
                }),

                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    [variable]: variable,
                }).catch((error) => {
                    console.log(error); alert(error);
                }),

                console.log(variable, "THIS IS WHAT I printed")

        })


    }


    const enrollingstudent = () => {
        const percents = { id: classid, penaltyminutes: 0, overunder: 0, adjustments: 0, level: "Consequences For Lateness" }
        setShowspinner(true);

        updateDoc(doc(firebase, "users", idselected), {
            [classid]: percents

        }).catch((error) => {
            console.log(error); alert(error);
        })

        updateDoc(doc(firebase, "classesbeingtaught", classid), {
            [idselected]: idselected,
        }).catch((error) => {
            console.log(error); alert(error);
        })

        removestudent();


    }

    const removestudent = () => {

        updateDoc(doc(firebase, "users", idselected), {
            courseawaitingconfirmation: ""
        }).catch((error) => {
            console.log(error); alert(error);
        })

        setShowspinner(false);
    }

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                {coursename ? <Text style={styles.error}>{coursename}, Section {section} </Text> :
                    <Text style={styles.error} onPress={() => navigation.navigate("ClassesTeacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, drinkpasslimit:drinkpasslimit, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration,  drinkpassduration:drinkpassduration,otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom:maxstudentsbathroom, linkedclass:linkedclass


                    })}>No Class is "Active"</Text>}
            </View>

            <Pressable style={styles.container2}>

                <Students userdata={userdata} id={id} selected={selected} setSelected={setSelected} idselected={idselected} setIdselected={setIdselected} />

            </Pressable>
            <ScrollView>
                <Pressable style={styles.section5}>
                    {firstname ? <Text style={styles.paragraph2} onPress={() => removestudent()}>Do Not Add Student{'\n'}Remove Student from Waiting List</Text> : <Text style={styles.paragraph2} > {'\n'} </Text>}
                </Pressable>
                <Text>{'\n'}</Text>
                <Pressable style={styles.section5}>
                    {firstname ? <Text style={styles.paragraph2} onPress={() => enrollingstudent()} >Enroll Student</Text> : <Text style={styles.paragraph2} onPress={() => enrollingAllstudents()} >Enroll All Students</Text>}

                </Pressable>
                <Text>{'\n'}</Text>


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

                    {coursename ? <Text style={styles.paragraph2} onPress={() => navigation.navigate("ClassesTeacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, drinkpasslimit:drinkpasslimit, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration,  drinkpassduration:drinkpassduration,otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom:maxstudentsbathroom,linkedclass:linkedclass
                    })} >Switch "Active" Class </Text> : <Text style={styles.paragraph2} onPress={() => navigation.navigate("ClassesTeacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, drinkpasslimit:drinkpasslimit, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration,  drinkpassduration:drinkpassduration,otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom:maxstudentsbathroom, linkedclass:linkedclass
                    })} >Make a Class "Active" </Text>}
                    <Text>{'\n'}</Text>
                    <Text style={styles.paragraph2} onPress={() => navigation.navigate("Studentsenrolled", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit:drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration,  drinkpassduration:drinkpassduration,otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom:maxstudentsbathroom, linkedclass:linkedclass
                    })} >See students enrolled{'\n'}in the "Active" class </Text>



                    <Text></Text>



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
        height: "10%",
        backgroundColor: '#000',
        width: "100%",
        justifyContent: "center",
        alignItems: "center",


    },
    error: {

        backgroundColor: '#000',
        color: "#FFF",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 18,
        fontWeight: 'bold',


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
        backgroundColor: '#000000',
        color: "#fff",

        justifyContent: "center",

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
        height: "50%",



    },
    section5: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
        height: "10%",

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
    paragraph7: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#FFF",

        justifyContent: "center",

    },

});

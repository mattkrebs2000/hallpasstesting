
import React, { useState, useEffect } from "react";
import CryptoES from "crypto-es";
import Results from "./Subcomponents/ResultsContainer";
import StateResults from "./Subcomponents/StateResultsContainer";
import TownResults from "./Subcomponents/TownResultsContainer";
import SignIn from "./SignIn";
import Classes from './MapofClassesTeacher/MapOfClassesTeacher';


import {
    useNavigation,
    NavigationContainer,
    DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Alert, SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";


const height = Dimensions.get("window").height;

export default function ClassesTeacher({ route, navigation }) {

    const { teacheriscalled, idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, id, bathroompasslimit, drinkpasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, email, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, exclusivetime, drinkofwater, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, sessionended, thelastid, consequenceid,
    } = route.params;
    console.log("id", id, selectedclass, coursename, "coursename", classiscurrent, "CLassesTeacher.js", Date.now());

    const [userdata, setUserdata] = useState([]);
    const [classesarray, setClassesarray] = useState([]);
    const [selectedclass, setSelectedclass] = useState("");
    const [coursename, setCoursename] = useState("");
    const [idselected, setIdselected] = useState();
    const [section, setSection] = useState("");
    const [location, setLocation] = useState("");
    const [showspinner, setShowspinner] = useState(true);
    const [classtrue, setClasstrue] = useState(false);
    const [starttime, setStarttime] = useState(0);
    const [usersesssionid, setUsersessionid] = useState();
    ;
    const [deletedall, setDeletedall] = useState();
    const [lengthofclasses, setlengthofclasses] = useState(0);
    const [lengthofclassesforacomputer, setLengthofclassesforacomputer] = useState(0);
    const [day, setDay] = useState("");
    const [endlastclasssubstitute, setEndlastclasssubstitute] = useState();
    const [phonepassduration, setPhonepassduration] = useState();
    const [drinkpassduration, setDrinkpassduration] = useState();
    const [overunder, setOverunder] = useState();
    const [bathroompassduration, setBathroompassduration] = useState();
    const [otherpassduration, setOtherpassduration] = useState();
    const [maxstudentsphonepass, setMaxstudentsphonepass] = useState();
    const [maxstudentsbathroom, setMaxstudentsbathroom] = useState();
    const [donewithworkphonepass, setDonewithworkphonepass] = useState();
    const [classsessionbegun, setClasssessionbegun] = useState();
    const [sessionending, setCurrentending] = useState();

    const [inpenalty, setInpenalty] = useState();
    const [stoptimepenalty, setStoptimepenalty] = useState();
    const [starttimepenalty, setStarttimepenalty] = useState();
    const [totaltimepenalty, setTotaltimepenalty] = useState();
    const [alreadyused, setAlreadyused] = useState();
    const [Shownewsessionbegan, setShownewsessionbegan] = useState();
    const [Newconsequenceid2, setNewconsequenceid2] = useState();
    const [listofclassmembers, setListofclasmembers] = useState();

    const [classisstillgoingon, setClassisstillgoingon] = useState();
    const [idsofpasses, setIdsofpasses] = useState();
    const [linkedclass, setLinkedclass] = useState();

console.log(id, "id", idselected, "idselected");

    const endpasses = () => {

console.log("endpasses is being run", usersesssionid, "endpasses is being run");

        if (sessionending < Date.now()) {
            const q = query(collection(firebase, "passes"), where("classsessionid", "==", usersesssionid), where("returned", "==", 0));

            const querySnapshot = getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push({id: doc.data().id, expectedreturn: doc.data().whenlimitwillbereached, endofclasssession: doc.data().endofclasssession})
                    })
                    if (array.length === 0) {
                        console.log("No passes to change")
                    } else {
                        setIdsofpasses(array);
                        console.log(array, "This is the pass ");
                    }
                })
        }

    }

    useEffect(() => {
        if (typeof idsofpasses != "undefined") {
        const t = Date.now();
       
        for (let s = 0; s < idsofpasses.length; s++) {

            const r = new Date(idsofpasses[s].endofclasssession);

            console.log(idsofpasses[s] ,"this is the object");

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
        setlengthofclasses(lengthofclass);
        setDrinkpassduration(drinkpasslimit);
        setPhonepassduration(exclusivephonepasstimelmit);
        setBathroompassduration(bathroompasslimit);
        setOtherpassduration(nonbathroompasslimit);
        setOverunder(ifnegativeplusminus);

        getlocationsqrcodes();

    }, [bathroompasslimit, nonbathroompasslimit, exclusivephonepasstimelmit, lengthofclass, ifnegativeplusminus]);

    useEffect(() => {
        if (phonepassduration > 0) {
        setMaxstudentsphonepass(50);
        } else {
            setMaxstudentsphonepass(0); 
        }
    }, [phonepassduration]);

    useEffect(() => {
        if (phonepassduration > 0) {
        setMaxstudentsphonepass(50);
        } else {
            setMaxstudentsphonepass(0); 
        }
   
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
        setShownewsessionbegan(false);
        setEndlastclasssubstitute(endlastclass);
    }, []);

    useEffect(() => {
        if (idofcurrentclass) {
            setUsersessionid(idofcurrentclass);
        }
    }, [idofcurrentclass]);

    useEffect(() => {
        if (deletedall === true) {
            getlocationsqrcodes();
            setUserdata([{ classname: "You haven't Registered" }])
        }
    }, [deletedall]);

    const createTwoButtonAlert = () => {

        Alert.alert('Please be aware.', 'This will permanently remove this class along with all of its associated sessions and passes.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete Class', onPress: () => deleteToDo() },
        ]);

    }

    const createTwoButton = () => {


        Alert.alert('Please be aware.', 'This will permanently remove all of your current classes along with their associated sessions and passes.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete Classes', onPress: () => deleteAll() },
        ]);

    }


    const updateallstudentswhohadthisclass = () => {
        console.log("YOU CAN DELETE ALL RECORDS")
    }

    useEffect(() => {
        setStarttime(Date.now());
        dayofweekFinder();
        console.log("THIIS IS WHAT COMES UP?", Date.now())
    }, [idselected, usersesssionid, sessionending]);

    useEffect(() => {
       if (classisstillgoingon === true) {
        setStarttime(sessionending - lengthofclassesforacomputer);
       }
    }, [classisstillgoingon]);

    useEffect(() => {

        setUserdata([]);
        setShowspinner(true);
        updateallstudentswhohadthisclass();
        
    }, [deleteToDo]);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user && id) {

            getlocationsqrcodes();

        } else {
            console.log("idyo", id, "idyo");
        }
    });

    useEffect(() => {
        if (typeof id != "undefined") {
        console.log("THIS IS THE IDddddddddddddd", id);
        getlocationsqrcodes();
        }
    }, [id]);

    useEffect(() => {

        console.log(coursename, "here is the userdataa");

        if (id && coursename) {
            console.log("See if it enters here????????")
            updateDoc(doc(firebase, "users", id), {
                currentclass: coursename,
                currentlocation: location
            }).catch((error) => {
                console.log(error); alert(error);
            })
        } else (null)
    }, [id, coursename]);



    useEffect(() => {
        console.log("It Changed", teacheriscalled, coursename, "coursename","teacheriscalled", " in MainMenuTeacher");
      }, [coursename]);


    async function getlocationsqrcodes() {

console.log("is qrcodes run before this?", id,"it knows the id");

        if (typeof id != "undefined" && userdata.length === 0) {
            const q = query(collection(firebase, "classesbeingtaught"), where("teacherid", "==", id));

            const querySnapshot = await getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                       array.push( doc.data());
                    })
                    if (array.length === 0) {
                        setUserdata([{ classname: "You haven't Registered" }])
                    } else {
                        setUserdata(array);
                    }
                })
            setShowspinner(false);
        }
    };

    //for loop that runs through the courses - the one that has idselected === id should say extra help true. Otherwise extra help false. 



    useEffect(() => {
        console.log(classsessionbegun, "Classsessionbegun")
        if (classsessionbegun) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Mainmenuteacher", { classsessionbegun:classsessionbegun, 
                            idofcurrentclass: idofcurrentclass, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit:drinkpasslimit, nonbathroompasslimit: nonbathroompasslimit,
                            ifnegativeplusminus: ifnegativeplusminus, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, coursename: coursename, section: section, location: location, teacherid: id, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, classid: idselected, currentsessionid: usersesssionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass
                        })}
                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });
        } else {

            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Mainmenuteacher", { classsessionbegun:classsessionbegun, 
                            idofcurrentclass: idofcurrentclass, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,drinkpasslimit:drinkpasslimit, 
                            ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, coursename: coursename, section: section, location: location, teacherid: id, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration,
                            overunder: overunder,
                            otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, classid: idselected, currentsessionid: usersesssionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass
                        })}
                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });

        }

    }, [usersesssionid]);






    useEffect(() => {

        let classe = selectedclass.classname;
        let idselect = selectedclass.id;
        let section = selectedclass.period;
        let usersession = selectedclass.currentsessionid;


        console.log("This is the selected class", selectedclass.id);
        setEndlastclasssubstitute(false);
        setUsersessionid(usersession);
        setLocation(selectedclass.location)
        setCoursename(classe);
        setIdselected(idselect);
        setSection(section);
        setlengthofclasses(selectedclass.lengthofclasses);
        setLengthofclassesforacomputer(selectedclass.
            lengthofclassescomputer);
        setPhonepassduration(selectedclass.phonepassexclusivetime);
        setDrinkpassduration(selectedclass.drinkofwater);
        setLinkedclass(selectedclass.linkto);
        
        setBathroompassduration(selectedclass.timelimitnonbathroompass);
        setOtherpassduration(selectedclass.timelimitnonbathroompass);
        setMaxstudentsbathroom(selectedclass.bathroompassmaxstudents)
        setDonewithworkphonepass(selectedclass.donewithworkphonepassavailable)
        setCurrentending(selectedclass.currentsessionends)
        setInpenalty(selectedclass.inpenalty)
        setStoptimepenalty(selectedclass.stoptime)
        setStarttimepenalty(selectedclass.starttime)
        setTotaltimepenalty(selectedclass.totaltime)
        setAlreadyused(selectedclass.alreadyused)
        setCoursename(classe);
        setClasstrue(!classtrue);



    }, [selectedclass]);

    useEffect(() => {
        console.log(teacheriscalled, coursename, "coursename","teacheriscalled", " in ClassesTeacher")
      }, [teacheriscalled, coursename]);


    useEffect(() => {
        if (sessionending > 1 && starttime > 1 || typeof sessionending === "undefined") {
            if (sessionending > starttime) {
                setClassisstillgoingon(true)
            } else {
                setClassisstillgoingon(false)
            }
        }
    }, [sessionending, starttime]);


    useEffect(() => {
        updatedatabase();
        console.log("HHHHHHHHHHHH", coursename, "Coursename", sessionending, currentsessionid, classisstillgoingon, classiscurrent, Shownewsessionbegan, "HHHHHHHHHHHH");
    }, [section, classtrue, classisstillgoingon]);


    const updatedatabase = () => {
        console.log(idselected, coursename, "Coursename", "This is the IDDD")
        if (idselected) {
            updateDoc(doc(firebase, "users", id), {
                currentclass: idselected,
                currentlocation: location
            }).catch((error) => {
                console.log(error); alert(error);
            })
        }
        console.log(idselected, coursename, "coursename","IDSELECTEDPPPPPPPPP")
    }

    const getidofsession = async () => {

        console.log(usersesssionid, "and HERE IS WHAT IT IS PASSIng");

        const docRef2 = doc(firebase, "classesbeingtaught", idselected);

        const docSnap = await getDoc(docRef2);

        if (docSnap.exists()) {

            setUsersessionid(docSnap.data().currentsessionid);


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        setClasssessionbegun(true);
        setShowspinner(false);
    }

    // Deletes a class and then reruns classes that are still there.

    const deleteToDo = () => {

        deletecourse();
        deleteitssessions();
        deleteitspasses();
        delteitsconsequences();

    };

    const deletecourse = async () => {
        const userDoc = doc(firebase, "classesbeingtaught",
            idselected)
        console.log("HEEEEEEEEYYYYY,", idselected, "HEEEEEEEEEEEEy");

        await deleteDoc(userDoc)

            .then(function () {
                setLocation("")
                setCoursename("");
                setIdselected("");
                setSection("");

            })
    }
    const deleteitssessions = async () => {

        const q = query(collection(firebase, "classsessions"), where("classesbeingtaughtid", "==", idselected));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "classsessions", docs.data().id))
                })
                console.log("Deleted Sessions of class?")
            })
    }
    const deleteitspasses = async () => {
        const s = query(collection(firebase, "passes"), where("classid", "==", idselected));

        const querySnapshot = await getDocs(s)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "passes", docs.data().id))
                })
                console.log("Deleted Sessions of class?")
            })
    }

    const delteitsconsequences = async () => {
        const s = query(collection(firebase, "consequencephoneuse"), where("classid", "==", idselected));

        const querySnapshot = await getDocs(s)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "consequencephoneuse", docs.data().id))
                })
                console.log("Deleted Sessions of class?")
            })
    }





    const deleteAll = () => {

        deleteAllcourses();
        deleteAllsessions();
        deleteAllpasses();
        delteallconsequences();

    };

    const deleteAllcourses = async () => {
        const q = query(collection(firebase, "classesbeingtaught"), where("teacherid", "==", id));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "classesbeingtaught", docs.data().id))
                })
                console.log("Did anything change?")
            })
            .then(function () {
                setUserdata([{ classname: "You haven't Registered" }])

            })

    }

    const deleteAllsessions = async () => {
        const t = query(collection(firebase, "classsessions"), where("teacherid", "==", id));

        const querySnapshot = await getDocs(t)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "classsessions", docs.data().id))
                })
                console.log("Did anything change?")
            })

    }

    const deleteAllpasses = async () => {
        const v = query(collection(firebase, "passes"), where("teacherid", "==", id));

        const querySnapshot = await getDocs(v)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "passes", docs.data().id))
                })
                console.log("Did anything change?")
            })

    }

    const delteallconsequences = async () => {
        const v = query(collection(firebase, "consequencephoneus"), where("teacherid", "==", id));

        const querySnapshot = await getDocs(v)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "consequencephoneus", docs.data().id))
                })
                console.log("Did anything change?")
            })

    }



    const dayofweekFinder = () => {

        let b = new Date();
        switch (b.getDay()) {
            case 1:
                return (
                    setDay("Monday")
                );
            case 2:
                return (
                    setDay("Tuesday")
                );
            case 3:
                return (
                    setDay("Wednesday")
                );
            case 4:
                return (
                    setDay("Thursday")
                );
            case 5:
                return (
                    setDay("Friday")
                );
            case 6:
                return (
                    setDay("Saturday")
                );
            case 0:
                return (

                    setDay("Sunday")

                );
        }
    };


    const beginthisclassendotherone = () => {

        console.log("445 sessionending was this the last to be run");
        const rightnow = Date.now();

        updateDoc(doc(firebase, "classsessions", idofcurrentclass), {
            passesnolongeravailable: rightnow,
            lengthofclass: Math.round((rightnow - starttimeofcurrentclass) / (60000)),
            status: "Completed"
        })
            .catch(error => {
                console.log(error); alert(error);
            })
        priortocreateanewsession();
    }

    async function priortocreateanewsession() {

        setShowspinner(true);

        console.log("REsetting changemade has happende")
        const array = [];
        const array2 = [];

        const q = query(collection(firebase, "users"), where(idselected, '!=', ""));

        const querySnapshot = await getDocs(q)

            .then(async (snapshot1) => {
                snapshot1.forEach(doc => {
                        array2.push(doc.data().id)
                })

            }).then(async () => {
                if (array2.length > 0) {
                    for (let w = 0; w < array2.length; w++) {
                        updateDoc(doc(firebase, "users", array2[w]), {
                            consequenceid: "",
                            exclusivephonepassexpiration: 0,
                            exclusivephonepassused: "", 
                            changemade: false,
                            phonepassawarded: false,
                            temporary: "null",
                            outonbathroompass: false,
                            latetoclass: false,
                            status:"",
                        }).catch((error) => {
                            console.log(error); alert(error);
                        })
                        console.log("HERE IS THT LEST OF THE IDS.")

                    }
                }
            })
                .then(async (snapshot1) => {
                    createanewsession();
                })
    }

    async function createanewsession() {

        console.log("Anew seesssion is starting")

        setShownewsessionbegan(true);

        // Tabulatesumsofpeopleinpenalty();

        console.log("Check1")

        const usersRef = firebase;
        const r = new Date();
        const month = r.getMonth(); + 1;
        const newmonth = month + 1;
        const year = r.getFullYear();
        const date = r.getDate();
        const dayofweek = r.getDay();
        const typicaldate = day + ", " + newmonth + "/" + date + "/" + year;

        if (idselected) {

            console.log("Check2")

            const docRef = await addDoc(collection(firebase, "classsessions"), {

                todaysdate: typicaldate,
                school: school,
                classbeginnumber: starttime,


                // 3600000 = 1 hour. Should change based on a number from settings how long the class is. 

                passesnolongeravailable: starttime + lengthofclassesforacomputer,
                lengthofclass: lengthofclasses,
                classbegin: r.toLocaleTimeString([], { hour12: true, timeStyle: 'short' }),
                classesbeingtaughtid: idselected,
                teacherid: id,
                classname: coursename,
                period: section,
                location: location,
                status: "Happening Now",

            }).then(async (userRec) => {

                setCurrentending(starttime + lengthofclassesforacomputer)

                console.log(Newconsequenceid2, "Check3")


                const user = userRec.id;
                console.log(user, "user was this the last to be run");
                await updateDoc(doc(firebase, "classsessions", user), {
                    id: user
                }).catch((error) => {
                    console.log(error); alert(error);
                });

                await updateDoc(doc(firebase, "classesbeingtaught", idselected), {
                    currentsessionid: user,
                    currentsessionends: starttime + lengthofclassesforacomputer,
                    passesareavailable: false,
                    inuseexclusivephonepass: 0,
                    inusebathroompass: 0,
                    totalinlineforexclusivephone: 0,
                    totalinlineforbathroom: 0,
                    bathroompassmaxstudents: 1

                }).catch((error) => {
                    console.log(error); alert(error);
                });

                console.log("Check4")
                setUsersessionid(user);


            }).then(() =>
                getidofsession()
            )
        }

    }

    const gotosettings = () => {
        navigation.navigate("Settingsteacher", {

            idofcurrentclass: idofcurrentclass, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,drinkpasslimit:drinkpasslimit, 
            ifnegativeplusminus: ifnegativeplusminus,
            ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, coursename: coursename, section: section, location: location, teacherid: id, teacheriscalled: teacheriscalled,
            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime,  drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration,
            overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, classid: idselected, currentsessionid: usersesssionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass

        })
    }

     return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                {coursename ? <View><Text style={styles.error}>Now Active:{'\n'}{coursename} - {section} </Text></View> : <View><Text style={styles.error}>No Class is Active</Text></View>}
            </View>

            <View style={styles.container2}>

                <Classes userdata={userdata} id={id} deleteToDo={deleteToDo} setSelectedclass={setSelectedclass} selectedclass={selectedclass} setCoursename={setCoursename} idselected={idselected} setClasstrue={setClasstrue} classtrue={classtrue} coursename={coursename} />

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

                {userdata.map((item) => item.classname) == "You haven't Registered" ? <Text style={styles.paragraph2}>   </Text> : coursename ? <Text style={styles.paragraph2} onPress={(e) => createTwoButtonAlert()} >Delete Selected Class </Text> : <Text style={styles.paragraph2} onPress={(e) => createTwoButton()}>Delete All Classes </Text>}

                {coursename ? <Text style={styles.paragraph2} onPress={(e) => gotosettings()}>Change Class Settings</Text> : <Text style={styles.paragraph2}>    </Text>}

                <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

                {showspinner === false && coursename && (classisstillgoingon === false) ? <Text style={styles.paragraph2} onPress={() => priortocreateanewsession()} >Begin This Class</Text> : coursename && (classisstillgoingon === true) ? <Text style={styles.paragraph2} onPress={() =>

                    navigation.navigate("Mainmenuteacher", { classsessionbegun:classsessionbegun,
                        idofcurrentclass: idofcurrentclass, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,drinkpasslimit:drinkpasslimit, 
                        ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, coursename: coursename, section: section, location: location, teacherid: id, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime,  drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration,
                        overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, classid: idselected, currentsessionid: usersesssionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass
                    })
                }
                >Enter Class</Text> : coursename && classiscurrent && !Shownewsessionbegan && (nameofcurrentclass != coursename) ? <Text style={styles.paragraph2} onPress={() => beginthisclassendotherone()} >Begin This Class</Text> : !coursename ? <Text style={styles.paragraph2}
                >Select A Course</Text> : <Text style={styles.paragraph2} onPress={() =>

                    navigation.navigate("Mainmenuteacher", { classsessionbegun:classsessionbegun,
                        idofcurrentclass: idofcurrentclass, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,drinkpasslimit:drinkpasslimit, 
                        ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, coursename: coursename, section: section, location: location, teacherid: id, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime,  drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration,
                        overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, classid: idselected, currentsessionid: usersesssionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass
                    })
                }
                >A New Session Has Begun</Text>}
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


    },
    error: {

        backgroundColor: '#000',
        color: "#FFF",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",

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
    error1: {

        backgroundColor: '#000',
        color: "#000",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",

    },
    container2: {
        height: "35%",
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
        height: "100%",

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
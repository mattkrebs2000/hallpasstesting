import React, { useState, useEffect } from "react";
import { Pressable } from 'react-native';
import * as SMS from 'expo-sms';

import Students from './Mapofstudentsenrolled/Mapofstudentsenrolled';

import { Alert, SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Button } from 'react-native';



import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, deleteUser, signInWithEmailAndPassword } from "@firebase/auth";
import { orderBy, limit, onSnapshot, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, FieldValue } from "@firebase/firestore"



const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {
    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, bathroompasslimit, nonbathroompasslimit, drinkpasslimit, ifnegativeplusminus, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled, id,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, bathroompassduration, drinkpassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, newoverunder, newconsequence, linkedclass
    } = route.params;


    const [userdata, setUserdata] = useState([]);
    const [userdata2, setUserdata2] = useState();
    const [consequences, setConsequences] = useState();
    const [selected, setSelected] = useState("");

    const [selected2, setSelected2] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [idselected, setIdselected] = useState("");
    const [idselected2, setIdselected2] = useState("");
    const [count, setCount] = useState(0);
    const [available, setAvailable] = useState(true);
    const [bathroomoccupied, setBathroomoccupied] = useState(false);
    const [destination, setDestination] = useState("");

    const [phonetimestart, setPhonetimestart] = useState(0);
    const [currenttime, setCurrenttime] = useState(0);
    const [tallyphonetimeingoodstanding, setTallyphonetimeingoodstanding] = useState(0);
    const [tallyphonetimenotingoodstanding, setTallyphonetimenotingoodstanding] = useState(0);

    const [showspinner, setShowspinner] = useState(true);

    const [indefinitepenalty, setIndefinitepenalty] = useState();
    const [changehasbeenmade, setChangehasbeenmade] = useState(false);
    const [temporary, setTemporary] = useState();
    const [penaltyminutes, setPenaltyminutes] = useState();
    const [overunderlocal, setOverunderlocal] = useState();
    const [overunder2, setOverunder2] = useState();
    const [adjustments, setAdjustments] = useState();
    const [currentlevel, setCurrentlevel] = useState();
    const [abc, setAbc] = useState();

    const [localstarttime, setLocalstarttime] = useState();
    const [localconsequencepenaltyid, setLocalconsequencepenaltyid] = useState();

    const [newconsequenceid, setNewconsequenceid] = useState();

    const [idsfromthisclass, setIdsfromthisclaass] = useState();

    const [totalclasstime, setTotalclasstime] = useState();
    const [updatecompleted, setUpdatecompleted] = useState();
    const [totalpenaltyinutes, setTotalpenaltyminutes] = useState();
    const [localpercent, setLocalpercent] = useState();
    const [localingoodstanding, setLocalingoodstanding] = useState();
    const [trythispercent, setTrythispercent] = useState();

    const [adjust, setAdjust] = useState();
    const [level, setLevel] = useState();
    const [over, setOver] = useState();

    const [phonepassexpiration, serPhonepassexpiration] = useState();
    const [idsofpasses, setIdsofpasses] = useState();
    const [empty, setEmpty] = useState();
    const [consquenceid, setConsequenceid] = useState();
    const [localcode, setLocalcode] = useState();
    const [studentjustarrivedlate, setstudentjustarrivedlate] = useState();


    const [smsAvailable, setSmsAvailable] = React.useState(false);
    const [phone, setPhone] = useState();
    const [isfirstname, setIsfirstname] = useState(1)



    async function issuewarning() {

        if (typeof localcode != "undefinded") {
            const message = "Hi " + firstname + "! This text is being sent to let you know that you are about to start losing points as a result of your behavior.";
            if (smsAvailable) {
                alert("this is being run")
                await SMS.sendSMSAsync(
                    [phone],
                    message
                );
            } else {
                alert("its not available");
            }
        }
    }

    async function onComposeSms() {

        if (typeof localcode != "undefinded") {
            const message = "Hi " + firstname + "! This is a Mesasage From Your Teacher's Phone. . . You are now in Penalty for not respecting a class rule: " + localcode + ". This negatively impacts your grade.";
            if (smsAvailable) {
                alert("this is being run")
                await SMS.sendSMSAsync(
                    [phone],
                    message
                );
            } else {
                alert("its not available");
            }
        } else {
            const message = "Hi " + firstname + "! This is a Mesasage From Your Teacher's Phone. . . You are now in Penalty for not respecting a class rule. This negatively impacts your grade.";
            if (smsAvailable) {
                alert("this is being run")
                await SMS.sendSMSAsync(
                    [phone],
                    message
                );
            } else {
                alert("its not available");
            }
        }
    }

    React.useEffect(() => {
        SMS.isAvailableAsync().then(setSmsAvailable);
    }, []);

    useEffect(() => {
        console.log("2hello", setSmsAvailable)
    }, [setSmsAvailable]);

    useEffect(() => {
        console.log("1hello", setSmsAvailable)
    }, []);


const rotatingvalues = () => {
if (isfirstname < 3) {
    setIsfirstname(isfirstname + 1) 
} else {
    setIsfirstname(1)  
}
}


    function compare_lname(a, b) {
        console.log(isfirstname, "HERE IS THE NMBER VALUE")
        if (isfirstname === 1) {

        if (typeof a.locallastname != "undefined" && typeof b.locallastname != "undefined") {
            if (a.locallastname.toLowerCase() < b.locallastname.toLowerCase()) {
                return -1;
            }
            if (a.locallastname.toLowerCase() > b.locallastname.toLowerCase()) {
                return 1;
            }
            return 0;
        } else {
            null
        }
    } else {
        if (typeof a.localfirstname != "undefined" && typeof b.localfirstname != "undefined") {
            if (a.localfirstname.toLowerCase() < b.localfirstname.toLowerCase()) {
                return -1;
            }
            if (a.localfirstname.toLowerCase() > b.localfirstname.toLowerCase()) {
                return 1;
            }
            return 0;
      
    }
    }
}

    useEffect(() => {
        if (userdata2) {
            if (isfirstname < 3)
            setUserdata(userdata2.sort(compare_lname))

            else {
                const filteredData = userdata2.filter((person) => {
                    return person.temporary != "null";
                })
                setUserdata(filteredData)
                setIdselected("")
            }
        }
    }, [userdata2]);

    useEffect(() => {
        if (isfirstname > 0) {
           getlocationsqrcodes();
        }
    }, [isfirstname]);


    const endpasses = () => {

        if (sessionending < Date.now()) {
            const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("returned", "==", 0));

            const querySnapshot = getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push({ id: doc.data().id, expectedreturn: doc.data().whenlimitwillbereached, endofclasssession: doc.data().endofclasssession })
                    })
                    if (array.length === 0) {
                        console.log("No passes to change")
                    } else {
                        setIdsofpasses(array);
                    }
                })
        }

    }

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


    useEffect(() => {
        if (typeof idselected != "undefined") {
            console.log(idselected, "HELLLOOOO")
        }
    }, [idselected]);



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

        console.log("1");
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
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate("Mainmenuteacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, totalclasstime: totalclasstime, linkedclass: linkedclass, maxstudentsbathroom: maxstudentsbathroom,
                    })}
                >
                    <Text accessibilityLabel="Guest" style={styles.error5}>
                        Main Menu
                    </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate("Classpasses", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, totalclasstime: totalclasstime, linkedclass: linkedclass, maxstudentsbathroom: maxstudentsbathroom,
                    })}
                >
                    <Text accessibilityLabel="Guest" style={styles.error5}>
                        Passes
                    </Text>
                </TouchableOpacity>
            ),
        });

    }, []);

    useEffect(() => {
        if (typeof newconsequence != "undefined") {
            totalsessiontime();
        }
    }, [newconsequence]);

    useEffect(() => {

        console.log("1WAS THIS RUN--- I wnaant to know")

        if (idselected && (typeof newoverunder != "undefined")) {

            setOver(newoverunder);

            console.log("2WAS THIS RUN--- I wnaant to know")
        }

    }, [newoverunder]);

    useEffect(() => {
        console.log("2WAS THIS RUN--- I wnaant to know")

        if (idselected && over === newoverunder) {

            console.log("3WAS THIS RUN--- I wnaant to know")

            const percents = { id: classid, penaltyminutes: penaltyminutes, overunder: over, adjustments: adjustments, level: abc }

            updateDoc(doc(firebase, "users", idselected), {
                [classid]: percents,

            }).catch((error) => {
                console.log(error); alert(error);
            })

            getadjustment();
            getlocationsqrcodes();
        }
    }, [over]);


    useEffect(() => {
        if (idselected) {
            getadjustment();
            console.log(idselected, "idselected")
        }
    }, [idselected]);

    useEffect(() => {

        if (typeof totalclasstime === "undefined") {

            totalsessiontime();
        }
    }, [totalclasstime]);


    useEffect(() => {
        if (idselected) {
            setOverunder2(overunderlocal + adjustments)
        }
    }, [overunderlocal, adjustments]);



    const getadjustment = () => {

        if (idselected && classid) {

            const docRef = doc(firebase, "users", idselected);

            const docData = getDoc(docRef)

                .then((docSnap) => {
                    let idd = classid;
                    let object = docSnap.data();


                    if (typeof object[idd] != "undefined") {

                        const whatever = object[idd].adjustments;
                        const penaltyminutes = object[idd].penaltyminutes;
                        const ovunder = object[idd].overunder;
                        const level = object[idd].level;
                        setAdjustments(whatever);
                        setPenaltyminutes(penaltyminutes);
                        setOverunderlocal(ovunder);
                        setAbc(level);
                    }

                })
        }
    }

    const adjustlevel = () => {
        if (abc) {
            if (abc === "Consequences For Lateness") {
                setAbc("No Consequences For Lateness");
            }
            else {
                setAbc("Consequences For Lateness")
            }

        }
    }

    useEffect(() => {
        if (idselected) {

            const percents = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderlocal, adjustments: adjustments, level: abc }

            updateDoc(doc(firebase, "users", idselected), {
                [classid]: percents,

            }).catch((error) => {
                console.log(error); alert(error);
            })
        }
        getlocationsqrcodes();
    }, [abc]);

    useEffect(() => {

        let idd = classid;

        let temp = selected.temporary;
        let change = selected.changemade;
        let consequence = selected.consequenceid;
        let idselect = selected.id;
        let fon = selected.phonenumber;

        setPhone(fon)
        setFirstname(selected.localfirstname)
        setLastname(selected.locallastname)
        setPhonetimestart(selected.phonetimestart)
        setTallyphonetimeingoodstanding(selected.tallyphonetimeingoodstanding)
        setTallyphonetimenotingoodstanding(selected.tallyphonetimenotingoodstanding)
        setTemporary(temp)
        setChangehasbeenmade(change)
        setNewconsequenceid(consequence)
        serPhonepassexpiration(selected.exclusivephonepassexpiration)
        setstudentjustarrivedlate(selected.latetoclass)

        setIdselected(idselect)

    }, [selected]);

    useEffect(() => {

        let code = selected2.code;
        let idd = selected2.id;

        setLocalcode(code)
        setIdselected2(idd)

    }, [selected2]);

    useEffect(() => {

        console.log(phone, "Does the phone still retain its spot");

    }, [idselected2]);

    useEffect(() => {
        setShowspinner(true);
        getlocationsqrcodes()
    }, []);

    useEffect(() => {

        if (idselected) {

            getlocationsqrcodes();
            console.log(idselected, "idselected")
        }

    }, [idselected]);


    // This will be a new function to got to recent activity of student where you will be able to take a student off suspension if you want to. But it is not supposed to be Adding a DOc to passes. 

    async function editorcreate2() {
        console.log("4");

        const usersRef = firebase;
        const r = new Date();

        const docRef = await addDoc(collection(firebase, "passes"), {


            firstname: firstname,
            lastname: lastname,
            classid: classid,
            coursename: coursename,
            comingfrom: location,
            teacherid: teacherid,
            school: school,
            teacheriscalled: teacheriscalled,
            leftclass: Date.now(),
            destination: destination,
            timeleftclass: r.toLocaleTimeString([], { hour12: true }),
            linkedclass: linkedclass,

        }).then(async (userRec) => {

            console.log("5")

            const user = userRec.id;
            await updateDoc(doc(firebase, "passes", user), {
                id: user
            }).catch((error) => {
                console.log(error); alert(error);
            });
        }).then(() => {
            console.log("yo yo ma")
        })
            .catch((error) => {
                console.log(error); alert(error);
            });
    }

    useEffect(() => {
        if (destination.length > 1) {
            editorcreate2();
        }
    }, [destination]);


    //update student stats begin - goes to 460

    async function getlocationsqrcodes() {

        const q = query(collection(firebase, "users"), where(classid, '!=', ""));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {
                const array = [];
                const arrayofids = [];
                let idd = classid;

                snapshot.forEach(doc => {
                    let object = doc.data();

                    const adjustment = object[idd].adjustments;
                    const ovunder = object[idd].overunder;
                    const level = object[idd].level;
                    const idofclass = object[idd].id;

                    array.push(doc.data());
                    arrayofids.push({ id: doc.data().id, adjustments: adjustment, level: level, overunder: ovunder, idofclass: idofclass },);
                })
                setUserdata2(array);
                setShowspinner(false);
                setIdsfromthisclaass(arrayofids);
            })
        setLocalpercent(0);

    };


    useEffect(() => {
        if (typeof idsfromthisclass != "undefined") {
            for (let w = 0; w < idsfromthisclass.length; w++) {

                if (idselected === idsfromthisclass[w].id) {
                    setAdjust(idsfromthisclass[w].adjustments);
                    setLevel(idsfromthisclass[w].level);
                    setOver(idsfromthisclass[w].overunder);
                }
            }
        }
    }, [idselected]);


    async function logunauthorizedpass() {

        setstudentjustarrivedlate(true);

        const r = new Date();
        const s = Date.now();

        console.log("20")

        const docRef = await addDoc(collection(firebase, "passes"), {

            firstname: firstname,
            lastname: lastname,
            classid: classid,
            coursename: coursename,
            teacherid: teacherid,
            destination: "Late to Class",
            classbegan: (starttimeofcurrentclass + 300000),
            studentid: idselected,
            school: school,
            teacheriscalled: teacheriscalled,
            timeleftclass: 0,
            timeclassbegan: 0,
            leftclass: (starttimeofcurrentclass + 300000),
            returned: s,
            timereturned: r.toLocaleTimeString([], { hour12: true }),
            classsessionid: currentsessionid,
            whenlimitwillbereached: (starttimeofcurrentclass + 300000),
            // returnedbeforetimelimit: "null",
            differenceoverorunderinminutes: (((starttimeofcurrentclass + 300000) - s) / 60000),
            linkedclass: linkedclass,

        }).then(async (userRec) => {
            let user = userRec.id;
            await updateDoc(doc(firebase, "passes", user), {
                id: user
            }).catch((error) => {
                console.log(error); alert(error);
            });

            await updateDoc(doc(firebase, "users", idselected), {
                latetoclass: true,
                lastmistake: "Late To Class",
                lastmistaketime: Date.now()
            }).catch((error) => {
                console.log(error); alert(error);
            });
        })
            .catch((error) => {
                console.log(error); alert(error);
            });

    }




    async function totalsessiontime() {
        if (classid) {

            const array = [];
            const array2 = [];
            const sum = 0;

            const q = query(collection(firebase, "classsessions"), where("classesbeingtaughtid", "==", classid));

            const querySnapshot = await getDocs(q)

                .then(async (snapshot) => {
                    snapshot.forEach(doc => {
                        let number = doc.data().lengthofclass;
                        if (number > lengthofclasses) {
                            console.log("mistake made");
                            array.push(lengthofclasses);
                        } else {
                            array.push(number);
                            array2.push(Math.round(number / 60000), doc.data().id);
                        }
                    })
                }).then(async () => {

                    array.forEach(obj => {
                        console.log(obj, " SE")
                    });

                    setTotalclasstime(array.reduce((a, b) => a + b, 0));
                })
        }
        setUpdatecompleted(false);
    };

    useEffect(() => {
        if (typeof classid != "undefined") {
            totalsessiontime()
        }
    }, []);

    useEffect(() => {
        if (typeof totalclasstime === "undefined") {
            totalsessiontime()
        }
    }, []);


    async function revisestats() {


        if (classid && idselected) {
            let sum = [];
            let finalnumber = 0;

            const q = query(collection(firebase, "consequencephoneuse"), where("studentid", "==", idselected), where("classid", "==", classid));

            const querySnapshot = await getDocs(q)

                .then(async (snapshot1) => {

                    snapshot1.forEach(doc => {

                        sum.push(doc.data().totaltimeinpenalty);
                    })
                    finalnumber = (sum.reduce((a, b) => a + b, 0));
                    setTrythispercent((sum.reduce((a, b) => a + b, 0)) / totalclasstime);

                })
                .then(async () => {
                    console.log("8")

                    setTotalpenaltyminutes(Math.round((finalnumber / 60000)));

                    setLocalpercent((100 - (Math.floor((finalnumber / totalclasstime) * 100))));

                    const needednumber = (100 - (Math.floor((finalnumber / totalclasstime) * 100)));
                    const quotient = finalnumber / totalclasstime;

                    const percents = { id: classid, penaltyminutes: Math.round((finalnumber / 60000)), overunder: over, adjustments: adjust, level: level }

                    updateDoc(doc(firebase, "users", idselected), {
                        [classid]: percents
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                    getlocationsqrcodes();

                })

            setUpdatecompleted(true);
        }
    }


    useEffect(() => {
        if (updatecompleted === false) {

            if (typeof idsfromthisclass != "undefined" && typeof totalclasstime != "undefined") {
                revisestats();
            }
            setUpdatecompleted(true);
        }
    }, [updatecompleted]);

    // update percent end


    const createTwoButtonAlert = () => {

        Alert.alert('Please be aware.', 'This will remove this student from this claass', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Remove Student from Class', onPress: () => removestudent() },
        ]);

    }


    async function removestudent() {

        if (typeof idselected != "undefined") {

            updateDoc(doc(firebase, "users", idselected), {
                [classid]: ""
            }).catch((error) => {
                console.log(error); alert(error);
            })
            updateDoc(doc(firebase, "classesbeingtaught", classid), {
                [idselected]: ""
            }).catch((error) => {
                console.log(error); alert(error);
            })
                .then((docSnap) => {
                    console.log("removed student")
                })
            getlocationsqrcodes();
        }


    }

    useEffect(() => {
        console.log("9")
        if (count > 0) {

            updateDoc(doc(firebase, "users", idselected), {
                [classid]: "",
                totalcourses: count,
            }).catch((error) => {
                console.log(error); alert(error);
            })

            updateDoc(doc(firebase, "classesbeingtaught", classid), {
                [idselected]: "",
            }).catch((error) => {
                console.log(error); alert(error);
            })

                .then(function (snapshot) {
                    getlocationsqrcodes()
                })
            setIdselected("")
        }
    }, [count]);


    async function showexpectations() {
        console.log("expectations was run!");
        if (teacherid) {
            const q = query(collection(firebase, "Expectations"), where("teacherid", "==", id));

            const querySnapshot = await getDocs(q)

                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push(doc.data())
                    })
                    if (array.length === 0) {
                        indefinitechange()
                    } else {
                        setEmpty(false);
                        setConsequences(array);
                    }

                })
        }

    };

    useEffect(() => {
        if (indefinitepenalty === "false") {
            showexpectations()
        }
    }, [indefinitepenalty]);

    useEffect(() => {
        if (changehasbeenmade === true) {
            setIndefinitepenalty("null");
        }
    }, [changehasbeenmade]);

    async function indefinitechange() {

        setEmpty(true);

        if (typeof localcode != "undefined") {
            if (idselected && (localstarttime < 10 || typeof localstarttime === "undefined")) {

                const nowww = Date.now();
                const r = new Date();
                const month = r.getMonth(); + 1;
                const newmonth = month + 1;
                const year = r.getFullYear();
                const date = r.getDate();

                const typicaldate = newmonth + "/" + date + "/" + year;

                if (indefinitepenalty === "false") {

                    console.log("9")

                    const usersRef = firebase;

                    const docRef = await addDoc(collection(firebase, "consequencephoneuse"), {

                        date: typicaldate,
                        timeeitwasmade: r.toLocaleTimeString([], { hour12: true, timeStyle: 'short' }),
                        studentid: idselected,
                        code: localcode,
                        sessionid: currentsessionid,
                        classid: classid,
                        coursename: coursename,
                        teacherid: id,
                        starttimepenalty: nowww,
                        stoptimepenalty: sessionending,
                        totaltimeinpenalty: ((sessionending) - (nowww)),
                        penaltyminutes: ((sessionending) - (nowww)) / 60000,
                        changemade: true,
                        temporary: "true",
                        linkedclass: linkedclass,

                    }).then(async (userRec) => {

                        setNewconsequenceid(userRec.id);
                        const user = userRec.id;
                        await updateDoc(doc(firebase, "consequencephoneuse", user), {
                            id: user
                        }).catch((error) => {
                            console.log(error); alert(error);
                        });

                        updateDoc(doc(firebase, "users", idselected), {
                            consequenceid: user,
                            temporary: "true",
                            changemade: true,
                            lastmistake: localcode,
                            lastmistaketime: Date.now()
                        }).catch((error) => {
                            console.log(error); alert(error);
                        })
                        setUpdatecompleted(false);
                        setTemporary("true");
                        setChangehasbeenmade(true);
                        setLocalingoodstanding("In Penalty");
                        onComposeSms();
                    })
                }
            }

        } else {
            if (idselected && (localstarttime < 10 || typeof localstarttime === "undefined")) {

                const nowww = Date.now();
                const r = new Date();
                const month = r.getMonth(); + 1;
                const newmonth = month + 1;
                const year = r.getFullYear();
                const date = r.getDate();

                const typicaldate = newmonth + "/" + date + "/" + year;

                if (indefinitepenalty === "false") {

                    console.log("9")

                    const usersRef = firebase;

                    const docRef = await addDoc(collection(firebase, "consequencephoneuse"), {

                        date: typicaldate,
                        timeeitwasmade: r.toLocaleTimeString([], { hour12: true, timeStyle: 'short' }),
                        studentid: idselected,
                        sessionid: currentsessionid,
                        classid: classid,
                        coursename: coursename,
                        teacherid: id,
                        starttimepenalty: nowww,
                        stoptimepenalty: sessionending,
                        totaltimeinpenalty: ((sessionending) - (nowww)),
                        penaltyminutes: ((sessionending) - (nowww)) / 60000,
                        changemade: true,
                        temporary: "true",
                        linkedclass: linkedclass,

                    }).then(async (userRec) => {

                        setNewconsequenceid(userRec.id);
                        const user = userRec.id;
                        await updateDoc(doc(firebase, "consequencephoneuse", user), {
                            id: user
                        }).catch((error) => {
                            console.log(error); alert(error);
                        });

                        updateDoc(doc(firebase, "users", idselected), {
                            consequenceid: user,
                            temporary: "true",
                            changemade: true,
                            lastmistake: "Not Specified",
                            lastmistaketime: Date.now()
                        }).catch((error) => {
                            console.log(error); alert(error);
                        })
                        setUpdatecompleted(false);
                        setTemporary("true");
                        setChangehasbeenmade(true);
                        setLocalingoodstanding("In Penalty");
                        onComposeSms();
                    })




                }
            }
        }
    }


    async function takeoffpenalty1() {

        console.log("1")
        if (idselected) {
            console.log("2")

            const q = query(collection(firebase, "consequencephoneuse"), where("studentid", '==', idselected), orderBy("starttimepenalty", "desc"), limit(1));

            const querySnapshot = await getDocs(q)

                .then(function (snapshot) {

                    snapshot.forEach(doc => {

                        setLocalconsequencepenaltyid(doc.data().id)
                        setLocalstarttime(doc.data().starttimepenalty)
                    })

                })
        }
    }

    useEffect(() => {
        if (localstarttime > 10 && localconsequencepenaltyid.length > 1) {
            takeoffpenalty2();
        }
    }, [localstarttime]);


    async function takeoffpenalty2() {

        console.log("3")

        if (idselected) {

            const nowww = Date.now();
            const r = new Date();
            const month = r.getMonth(); + 1;
            const newmonth = month + 1;
            const year = r.getFullYear();
            const date = r.getDate();
            const typicaldate = newmonth + "/" + date + "/" + year;

            await updateDoc(doc(firebase, "consequencephoneuse", localconsequencepenaltyid), {

                stoptimepenalty: nowww,
                changemade: true,
                totaltimeinpenalty: (nowww - localstarttime),
                penaltyminutes: (nowww - localstarttime) / 60000,

            }).catch((error) => {
                console.log(error); alert(error);
            })

                .then(async () => {

                    revisestats();
                    console.log("12")
                    await updateDoc(doc(firebase, "users", idselected), {
                        consequenceid: localconsequencepenaltyid,
                        temporary: "null",
                        changemade: false
                    }).catch((error) => {
                        console.log(error); alert(error);
                    });
                    setUpdatecompleted(false);
                })

            setChangehasbeenmade(false);
            setIndefinitepenalty("null");
            setTemporary("null");
            setLocalingoodstanding("In Good Standing");
            setLocalstarttime(0);
        }
    }

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1} >
                <Pressable>
                    <Button onPress={onComposeSms} mode="contained" icon="message" title="hello" />
                </Pressable>


                {isfirstname === 1 ? <TouchableOpacity onPress={() => rotatingvalues()} ><Text style={styles.error}>{coursename} ({userdata.length}) -Last Name{'\n'}
                    Total Class Time: {Math.round(totalclasstime)} Min.</Text>
                    {(sessionending > Date.now()) && classiscurrent == true && empty === false ? <Text style={styles.error1}>Classify This Rule Violation</Text> : (sessionending > Date.now()) && classiscurrent == true ? <Text style={styles.error1}>Stats Include This Session</Text> : <Text style={styles.error1}>Class Is Not In Session</Text>}
                </TouchableOpacity> : isfirstname === 2 ? <TouchableOpacity onPress={() => rotatingvalues()} ><Text style={styles.error}>{coursename} ({userdata.length}) -First Name{'\n'}
                    Total Class Time: {Math.round(totalclasstime)} Min.</Text>
                    {(sessionending > Date.now()) && classiscurrent == true && empty === false ? <Text style={styles.error1}>Classify This Rule Violation</Text> : (sessionending > Date.now()) && classiscurrent == true ? <Text style={styles.error1}>Stats Include This Session</Text> : <Text style={styles.error1}>Class Is Not In Session</Text>}
                </TouchableOpacity> :<TouchableOpacity onPress={() => rotatingvalues()} ><Text style={styles.error}>{coursename} ({userdata.length}) - In Penalty{'\n'}
                    Total Class Time: {Math.round(totalclasstime)} Min.</Text>
                    {(sessionending > Date.now()) && classiscurrent == true && empty === false ? <Text style={styles.error1}>Classify This Rule Violation</Text> : (sessionending > Date.now()) && classiscurrent == true ? <Text style={styles.error1}>Stats Include This Session</Text> : <Text style={styles.error1}>Class Is Not In Session</Text>}
                </TouchableOpacity>}
            </View>

            <View style={!idselected ? styles.container23 : empty === false ? styles.container233 : styles.container2}>
                <Students userdata={userdata} id={id} selected={selected} setSelected={setSelected}
                    selected2={selected2} setSelected2={setSelected2}

                    idselected={idselected} setIdselected={setIdselected} changehasbeenmade={changehasbeenmade} temporary={temporary} indefinitepenalty={indefinitepenalty} classid={classid} overunderlocal={overunderlocal} currentlevel={currentlevel} abc={abc} updatecompleted={updatecompleted} totalpenaltyinutes={totalpenaltyinutes} localpercent={localpercent} totalclasstime={totalclasstime} over={over} consequences={consequences} empty={empty} idselected2={idselected2} setIdselected2={setIdselected2} isfirstname={isfirstname}/>
            </View>

            {idselected && empty != false ? <ScrollView style={styles.container3}>

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



                {idselected && empty != false && (sessionending > Date.now()) && classiscurrent == true && coursename ? <View>
                    <Text>{'\n'}</Text>

                    <Pressable style={styles.section5}>
                        {(changehasbeenmade === false) && ((temporary === "null")) ? <Text style={styles.paragraph3} onPress={() => setIndefinitepenalty("false")}>Toggle Status{'\n'}"In Good Standing"/"In Penalty"{'\n'}{'\n'}</Text> : null}

                        {(changehasbeenmade === true && temporary === "true") ? <Text style={styles.paragraph3} onPress={() => takeoffpenalty1()}>This Toggle Status{'\n'}"In Good Standing"/"In Penalty"{'\n'}{'\n'}</Text> : null}
                    </Pressable>


                    <Pressable style={styles.section5}>
                        {idselected && (studentjustarrivedlate === false || typeof studentjustarrivedlate === "undefined") ? <Text style={(starttimeofcurrentclass + 300000) < Date.now() ? styles.paragraph3 : styles.paragraph33} onPress={(starttimeofcurrentclass + 300000) < Date.now() ? () => logunauthorizedpass() : () => console.log("late")}>This Student Just Arrived{'\n'}Late To Class{'\n'}-Press to Record Time-</Text> : (studentjustarrivedlate === true) && idselected ? <Text style={styles.paragraph3}>This student was{'\n'}marked tardy for this session.</Text> : null}
                    </Pressable>


                    {idselected && (temporary === "null") ? <Pressable style={styles.section5}>
                      <Text style={styles.paragraph3} onPress={() => issuewarning()}>{'\n'}{'\n'}Send Text Warning</Text> 
                    </Pressable>: null}

                </View> : null}

                {idselected && empty != false ? <View style={styles.section5}>

                    {idselected && empty != false ? <Text style={styles.paragraph3}>{'\n'}</Text> : null}

                    <Pressable style={styles.section5}>
                        {idselected ? <Text style={styles.paragraph3} onPress={() => adjustlevel()} >Enable/Disble{'\n'}Consequences for Lateness{'\n'}(If Negative Over/Under Rating){'\n'}{'\n'}</Text> : null}
                    </Pressable>


                    <Pressable style={styles.section5}>
                        {idselected ? <Text style={styles.paragraph3} onPress={() => navigation.navigate("Passhistory", {
                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, totalclasstime: totalclasstime, idselected: idselected, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass: linkedclass, maxstudentsbathroom: maxstudentsbathroom,
                        })} >View "Punctuality"{'\n'}Of This Student</Text> : <Text style={styles.paragraph3}></Text>}
                        <Text>{'\n'}</Text>
                    </Pressable>


                    <Pressable style={styles.section5}>
                        {idselected ? <Text style={styles.paragraph3} onPress={() => navigation.navigate("Penaltyhistory", {
                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, totalclasstime: totalclasstime, idselected: idselected, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass: linkedclass, maxstudentsbathroom: maxstudentsbathroom,
                        })} >View "Penalty" History{'\n'}Of This Student</Text> : <Text style={styles.paragraph3}></Text>}
                        <Text>{'\n'}</Text>
                    </Pressable>

                    <Pressable style={styles.section5}>
                        {idselected ? <Text style={styles.paragraph3} onPress={() => createTwoButtonAlert()} >Remove Student{'\n'}From this class</Text> : <Text style={styles.paragraph3} ></Text>}
                        <Text>{'\n'}</Text>
                    </Pressable>
                    <View><Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text></View>

                </View> : null}

            </ScrollView> : null}

            {idselected2 && empty === false ? <View style={styles.container33}><Pressable style={styles.section55}><Text style={styles.paragraph35} onPress={() => indefinitechange()}>Classify it as this.</Text></Pressable></View> : empty === false ? <View style={styles.container33}><Pressable style={styles.section55}><Text style={styles.paragraph35} onPress={() => indefinitechange()}>Don't Categorize Consequence</Text></Pressable></View> : null}



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
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
    },

    error1: {

        backgroundColor: '#000',
        color: "#FFF",
        fontSize: 18,

        textAlign: "center",
        fontStyle: "italic"
    },


    container2: {
        height: "25%",
        backgroundColor: "#013469",
        width: "100%",

    },
    container23: {
        height: "85%",
        backgroundColor: "#013469",
        width: "100%",

    },
    container233: {
        height: "55%",
        backgroundColor: "#013469",
        width: "100%",

    },
    container3: {
        height: "60%",
        backgroundColor: "#000",
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



    },
    paragraph22: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",

    },

    paragraph3: {

        fontSize: 16,
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",
    },

    paragraph33: {

        backgroundColor: '#000',
        color: "#FF0000",
        textDecorationLine: 'line-through',
        fontSize: 16,
        textAlign: "center",
        backgroundColor: '#000000',
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
        height: "30%",
        justifyContent: "flex-start",


    },
    section5: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
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
    container33: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
        marginTop: 20,
        height: "30%",



    },
    section55: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",

        marginBottom: 20,
        justifyContent: "center",
    },

    paragraph35: {

        fontSize: 18,
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",
        fontWeight: 'bold',

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


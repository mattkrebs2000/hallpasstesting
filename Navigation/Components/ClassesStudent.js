import React, { useState, useEffect } from "react";
import Classes from './MapOfClassesStudent/MapOfClassesStudent';

import { SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";





const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const [isready, setIsready] = useState(false);

    const [userdata, setUserdata] = useState([]);
    const [classesarray, setClassesarray] = useState([]);
    const [selectedclass, setSelectedclass] = useState();
    const [coursename, setCoursename] = useState("");
    const [idselected, setIdselected] = useState("");
    const [section, setSection] = useState("");
    const [teacher, setTeacher] = useState("");
    const [youcangetpass, setYoucangetpass] = useState(false);
    const [teacherid, setTeacherid] = useState("");
    const [currentlocation, setCurrrentlocation] = useState("");
    const [ledby, setLedby] = useState("");
    const [exclusivetime, setExclusivetime] = useState(10);
    const [drinkofwater, setDrinkofwater] = useState(5);
    const [bathroomtime, setBathroomtime] = useState(10);

    const [nonbathroomtime, setNonbathroomtime] = useState(10);
    const [maxstudentsonphonepass, setMaxstudentsonphonepass] = useState();
    const [maxstudentsbathroom, setMaxstudentsbathroom] = useState();

    const [endofclasssession, setEndofclasssession] = useState();

    const [overunderstatus, setOverunderstatus] = useState();
    const [nowinpenalty, setNowinpenalty] = useState();
    const [getadjustmentss, setGetadjustments] = useState();

    const [lengthofclasssession, setLengthofclasssession] = useState();


    //Bathroom Pass Line
    const [bathroompassinuse, setBathroominuse] = useState();
    const [totalinlineforbathroom, setTotalinlineforbathroom] = useState(0);


    const [getlevel, setGetlevel] = useState();

    const [donewithworkpass, setDonewithworkpass] = useState(false);
    const [coursesadded, setCoursesadded] = useState(0);
    const [currentsessionid, setCurrentsessionid] = useState("");

    const [showspinner, setShowspinner] = useState(true);

    const [adjustmentandoverunder, setAdjustmentandoverunder] = useState();
    const [linkedclass, setLinkedclass] = useState();
    const [overundernumber, setOverundernumber] = useState();
    const [coursesstudentisin, setCoursesstudentisin] = useState();


    const { userinformation, classid, location, school, town, state, firstname, lastname, id, percent, total2, total3, getadjustments, } = route.params;

    console.log(id, "id", "adjustmentoverunder", firstname, "firstname", " in CLassesStudent.js");


    //realtime updates!!!

    if (idselected) {

        const unsub = onSnapshot(doc(firebase, "classesbeingtaught", idselected), (doc) => {
            setYoucangetpass(doc.data().passesareavailable);
            setEndofclasssession(doc.data().currentsessionends);
        });

    }


    useEffect(() => {

        if (id != "") {
            getlocationsqrcodes();
        }
    }, []);

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


        const array = []
        const array2 = [];
        if (id != "") {
            setShowspinner(true);

            const q = query(collection(firebase, "classesbeingtaught"), where(id, "==", id));

            const querySnapshot = await getDocs(q)

                .then(async (snapshot) => {

                    snapshot.forEach(doc => {
                        array.push(doc.data())
                        array2.push(doc.data())
                    })


                }).then(async () => {
                    setCoursesadded(array.length);
                    setCoursesstudentisin(array2);
                })

            const f = query(collection(firebase, "classesbeingtaught"), where("school", "==", school), where("state", "==", state), where("town", "==", town), where("ledby", "==", "Admin"));

            const docDATAA = await getDocs(f)

                .then(async (snapshot1) => {
                    snapshot1.forEach(doc => {
                        console.log(doc.data(), "Look at what caem up")
                        array.push(doc.data())
                    })

                }).then(async () => {
                    setUserdata(array);

                })
            setShowspinner(false);
        }
    };


    useEffect(() => {
        if (typeof getadjustmentss != 'undefined') {
            console.log(getadjustmentss, "getadjustmentss")
        }
    }, [getadjustmentss]);


    useEffect(() => {

        if (!selectedclass && id) {
            updateDoc(doc(firebase, "users", id), {
                currentclass: ""
            }).catch((error) => {
                console.log(error); alert(error);
            })
        }
    }, [id]);

    useEffect(() => {
        if (typeof selectedclass != "undefined") {
            let classe = selectedclass.classname;
            let idselect = selectedclass.id;
            let section = selectedclass.period;
            let teachername = selectedclass.teacheriscalled;
            let passesarethere = selectedclass.passesareavailable;
            let teacheridd = selectedclass.teacherid;
            let location = selectedclass.location;
            let isitadmin = selectedclass.ledby;
            let drinkofwater = selectedclass.drinkofwater;
            let exclusivetime = selectedclass.phonepassexclusivetime;
            let donewithworkpass = selectedclass.donewithworkphonepassavailable;
            let bathroomtime = selectedclass.timelimitbathroompass;
            let nonbathroomtime = selectedclass.timelimitnonbathroompass;
            let sessionid = selectedclass.currentsessionid;

            let bathroominuse = selectedclass.inusebathroompass;

            let maxstudentsonphonepass = selectedclass.exclusivephonepassmaxstudents;

            let numberinline = selectedclass.totalinlineforbathroom;
            let link = selectedclass.linkto;

            let lengthofsession = selectedclass.lengthofclassescomputer;
            let endofclass = selectedclass.currentsessionends;
            let maxbathroom = selectedclass.bathroompassmaxstudents;

            setLinkedclass(link);
            setBathroominuse(bathroominuse);
            setEndofclasssession(endofclass);
            setLengthofclasssession(lengthofsession);

            setTotalinlineforbathroom(numberinline)

            setCoursename(classe);
            setCurrentsessionid(sessionid);
            setIdselected(idselect);
            setTeacher(teachername);
            setMaxstudentsonphonepass(maxstudentsonphonepass);
            setMaxstudentsbathroom(maxbathroom);

            setYoucangetpass(passesarethere);
            setTeacherid(teacheridd);
            setSection(section);
            setDonewithworkpass(donewithworkpass);
            setLedby(isitadmin);
            setBathroomtime(bathroomtime);
            setNonbathroomtime(nonbathroomtime);
            setExclusivetime(exclusivetime);
            setDrinkofwater(drinkofwater);
            setCurrrentlocation(location);

            getlocationsqrcodes();

        }
    }, [selectedclass]);


    useEffect(() => {
        console.log(getadjustmentss, "getadjustmentss")
        if (isNaN(getadjustmentss) == false) {
            updatedatabase();
            setAdjustmentandoverunder(getadjustmentss);
        }
    }, [getadjustmentss]);



    // const resetaftercalculations = () => {
    //     const percents = {id: classid, percentage: percent, overunder: total2, adjustments: getadjustmentss}

    //   if (id && classid) {
    //         updateDoc(doc(firebase, "users", id), {
    //             [idselected]: percents,
    //         }).catch((error) => {
    //             console.log(error); alert(error);
    //         })
    //       }
    //   }

    const getadjustment = () => {

        if (id && idselected) {

            const docRef = doc(firebase, "users", id);

            const docData = getDoc(docRef)

                .then((docSnap) => {
                    let idd = idselected;
                    let object = docSnap.data();

                    const whatever = (Math.round((object[idd].overunder) * 10)) / 10;
                    const getlevel = object[idd].level;
                    const getpenaltystatus = object.temporary;
                    setOverunderstatus(getlevel);
                    setGetadjustments(whatever);
                    setNowinpenalty(getpenaltystatus)
                    console.log(whatever, "hHERE is a NEW NUMBErrrr")
                })
        }
    }
    useEffect(() => {
        console.log("THiis getadjustments was done")
        getadjustment();
    }, [idselected]);

    const updatedatabase = () => {
        console.log((total3 / 60000), "penaltyminutes", total2, "overunder THIS IW WHERE THE PROBLEM BEGINS")

        // const percents = { id: idselected, penaltyminutes: (total3 / 60000), overunder: total2, adjustments: getadjustmentss, level: overunderstatus }

        if (idselected && currentlocation) {

            updateDoc(doc(firebase, "users", id), {

                currentclass: idselected,
                currentlocation: currentlocation,
                totalcourses: (coursesadded),
                // [idselected]: percents,

            }).catch((error) => {
                console.log(error); alert(error);
            })


            updateDoc(doc(firebase, "classesbeingtaught", idselected), {
                removescanneraddbutton: false
            }).catch((error) => {
                console.log(error); alert(error);
            })
        }
        console.log(userdata.length, coursesadded)
    }

    async function refresh() {

        if (typeof selectedclass != "undefined") {
            const docRef = doc(firebase, "classesbeingtaught", selectedclass.id);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setYoucangetpass(docSnap.data().passesareavailable);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            console.log("THIIIIS was NOW RUN")

        }
    }



    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                {coursename && getadjustmentss < 0 ? <View><Text style={styles.error}>Your Location:{'\n'}{coursename} - {section}{'\n'}You Must Create a Contract First. </Text></View> : coursename ? <View><Text style={styles.error}>Your Location:{'\n'}{coursename} - {section}</Text></View> : <View><Text style={styles.error}>What is your location?</Text></View>}
            </View>


            <View style={styles.container2}>
                <Classes userdata={userdata} id={id} setSelectedclass={setSelectedclass} selectedclass={selectedclass} setCoursename={setCoursename} idselected={idselected} />
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
                <View>
                    {getadjustmentss < 0 && overunderstatus == "Consequences For Lateness" && selectedclass && youcangetpass && endofclasssession > Date.now() ? (<TouchableOpacity onPress={() => navigation.navigate("Getapprovalfromteacher", {
                        userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: idselected, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
                        maxstudentsonphonepass: maxstudentsonphonepass,
                        bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, getadjustmentss: getadjustmentss, adjustmentandoverunder: adjustmentandoverunder, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
                    })} ><Text style={styles.paragraph2}>See pass options. </Text></TouchableOpacity>) : (selectedclass && youcangetpass && endofclasssession > Date.now()) || selectedclass && youcangetpass && ledby == "Admin" ? (<TouchableOpacity onPress={() => navigation.navigate("Destination", {
                        userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: idselected, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
                        maxstudentsonphonepass: maxstudentsonphonepass,
                        bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, getadjustmentss: getadjustmentss, adjustmentandoverunder: adjustmentandoverunder, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass, coursesstudentisin: coursesstudentisin
                    })} ><Text style={styles.paragraph2}>See pass options. </Text></TouchableOpacity>) : selectedclass && youcangetpass === false && endofclasssession > Date.now() ? (<Text style={styles.paragraph2} onPress={() => refresh()} >Passes for this class{'\n'} are not available. {'\n'}{'\n'}You may ask the teacher {'\n'}to make them available.</Text>) : (<Text style={styles.paragraph2} >You have not{'\n'} Selected a Class{'\n'}That is 'In Session'</Text>)}
                </View>

                <Text style={styles.paragraph2}>___________________</Text>

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Mainmenustudent", {
                        userinformation: userinformation,
                        classid: idselected,
                        coursename: coursename,
                        section: section,
                        currentlocation: currentlocation,
                        teacherid: teacherid,
                        school: school,
                        teacher: teacher,
                        town: town, state: state, youcangetpass: youcangetpass, firstname: firstname, lastname: lastname, ledby: ledby, donewithworkpass: donewithworkpass, drinkofwater: drinkofwater, exclusivetime: exclusivetime, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime,
                        currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse,
                        maxstudentsonphonepass: maxstudentsonphonepass, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, getadjustmentss: getadjustmentss, adjustmentandoverunder: adjustmentandoverunder, nowinpenalty: nowinpenalty, maxstudentsbathroom: maxstudentsbathroom, overunderstatus: overunderstatus
                    })}>{idselected ? <Text style={styles.paragraph2}>View Status For This Class </Text> : <Text style={styles.paragraph2}>Return to Main Menu </Text>}</TouchableOpacity>
                </View>

            </View>


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
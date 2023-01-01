import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, BackHandler, TouchableOpacity } from 'react-native';
import RadioButton from './MapOfAvailableClasses/AvailableClasses';
import { auth } from "../Firebase/Config";


import { firebase } from "../Firebase/Config";

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, updateDoc, orderBy, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from "@firebase/firestore";

import { useNavigation } from '@react-navigation/native';



export default function App25r({ route, navigation }) {

    const [data, setData] = useState([]);
    const [idofclass, setIdofclass] = useState();
    const [coursesenrolled, setCoursesenrolled] = useState([]);
    const [updatenumber, setUpdatenumber] = useState();


    const { userinformation, firstname, lastname, teacherid, classid, id, coursename, section, location, school, teacher, town, state, percent, total2, getadjustments, getcurrentdifference, email } = route.params;

    console.log(id, "id", school, "school", state, "state", town, "town", firstname, "firstname", lastname, "lastname", email, "email")

    useEffect(() => {
        setUpdatenumber(Date.now())
    }, []);

    useEffect(() =>
        onSnapshot(doc(firebase, "users", id), (doc) => {
            getcoursesenrolledin();
        }

        ), []);

    useEffect(() => {
        if (typeof id != "undefined") {
            getcoursesenrolledin();
        } else {
            navigation.navigate("SignIn");
        }
    }, []);

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

    async function getcoursesenrolledin() {

        if (typeof id != "undefined") {
            const q = query(collection(firebase, "classesbeingtaught"), where(id, "==", id));

            const querySnapshot = await getDocs(q)


                .then(function (snapshot) {
                    const array = []
                    snapshot.forEach(doc => {
                        array.push(doc.data().id)
                    })
                    setCoursesenrolled(array);

                })
        }
    };

    const getclasses = () => {

        const f = query(collection(firebase, "classesbeingtaught"), where("school", "==", school), where("state", "==", state), where("town", "==", town), where("ledby", "!=", "Admin"));
        const docDATAA = getDocs(f)
            .then(function (snapshot) {
                const array = []
                snapshot.forEach(doc => {
                    if (!coursesenrolled.includes(doc.data().id)) {
                        array.push(doc.data())
                    }
                })
                setData(array)
            })
    }


    useEffect(() => {
        if (typeof school != "undefined" && typeof state != "undefined" && typeof town != "undefined") {
            getclasses();
        } else {
            navigation.navigate("SignIn");
        }
    }, [school, state, town, coursesenrolled]);

    useEffect(() => {
        if (typeof idofclass != "undefined" && idofclass != "") {
            updateDoc(doc(firebase, "users", id), {
                courseawaitingconfirmation: idofclass
            }).catch((error) => {
                console.log(error); alert(error);
            })

            updateDoc(doc(firebase, "classesbeingtaught", idofclass), {
                addingnumber: updatenumber
            }).catch((error) => {
                console.log(error); alert(error);
            })
        }
        setUpdatenumber(Date.now())
    }, [idofclass]);

    return (<View style={styles.container2}>
        <View style={styles.container}>
            <Text style={styles.paragraph6}>Current User:</Text>
            {typeof firstname != "undefined" && typeof lastname != "undefined" ? <Text style={styles.paragraph5}>{firstname} {lastname}</Text> : <Text style={styles.paragraph5}>Guest</Text>}
            <Text style={styles.paragraph}>Request access to available classes </Text>
            <RadioButton data={data} onSelect={(value) => setIdofclass(value)} idofclass={idofclass} />
        </View>

        <View style={styles.section3}>{typeof idofclass != "undefined" ? <Text style={styles.paragraph2}>  Let Your Teacher know {'\n'} You are awaiting entry.</Text> : <Text style={styles.paragraph2}> No Class is Selected</Text>}

            <Text style={styles.paragraph2}>___________________ {'\n'}</Text>
            <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenustudent", {
                userinformation: userinformation, town: town, state: state, school: school, firstname: firstname, lastname: lastname, teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, percent: percent, total2: total2, getcurrentdifference: getcurrentdifference, getadjustments: getadjustments, id: id, email: email
            })} >Return to Main Menu </Text>
        </View>
    </View>

    );
}

const styles = StyleSheet.create({
    paragraph: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: "center",
        backgroundColor: '#000000',
        color: "#FFF",
        height: "20%",
        alignItems: "center",
        padding: 20,

    },
    container: {
        height: "60%",
        backgroundColor: "#013469",


    },
    paragraph2: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000',
        color: "#FFF",
        flex: 2,
        color: "#FFF",

    },
    container2: {
        height: "100%",
        backgroundColor: "#000000",


    },
    paragraph3: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000',
        color: "#FFF",
        height: "10%",
        color: "#FFF",

    },
    paragraph4: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000',
        color: "#FFF",

        color: "#FFF",

    },
    section3: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000',
        color: "#FFF",
        height: "30%",
        color: "#FFF",
        alignContent: "center",
        padding: 20,

    },
    paragraph5: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: "center",
        backgroundColor: '#000000',
        color: "#FFF",
        height: "10%",
        alignItems: "center",



    },
    paragraph6: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: "center",
        backgroundColor: '#000000',
        color: "#FFf",
        height: "13%",
        alignItems: "center",
        paddingTop: 20,


    },


    section4: {
        padding: 10,
        height: "20%"

    },
});

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, View, TouchableOpacity, Text, ScrollView, Pressable, LogBox, ActivityIndicator } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail } from "@firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion, orderBy, limit } from "@firebase/firestore";



const TeacherMainMenu = ({ route, navigation }) => {

  LogBox.ignoreAllLogs();

  const [youcangetincomingpass, setYoucangetincomingpass] = useState(false);
  const [youcangetpassclass, setYoucangetpassclass] = useState();
  const [youcangetincomingpassclass, setYoucangetincomingpassclass] = useState(true);
  const [endtime, setEndtime] = useState();
  const [endlastclass, setEndlastclass] = useState();
  const [thelastid, setthelastid] = useState();

  const [showspinner, setShowspinner] = useState(false);

  const [coursename2, setCoursename2] = useState("");

  const [classiscurrent, setClassiscurrent] = useState();
  const [nameofcurrentclass, setNameofcurrentclass] = useState();
  const [idofcurrentclass, setIdofcurrentclass] = useState();
  const [starttimeofcurrentclass, setStarttimeofcurrentclass] = useState();
  const [getdatedotnow, setDatedotnow] = useState();
  const [arrayforconsequences, setArrayforconsequences] = useState();
  const [totalinlineforbathroomlocal, setTotalinlineforbathroomlocal] = useState();

  const [id, setId] = useState();
  const [school, setSchool] = useState();
  const [state, setState] = useState();
  const [town, setTown] = useState();
  const [role, setRole] = useState();
  const [teacheriscalled, setTeacheriscalled] = useState();
  const [email, setEmail] = useState();

  const [userdata, setUserdata] = useState();
  const [totalinline2, setTotalinline2] = useState();
  const [adminclass, setAdminclass] = useState();



  const { currentsessionid, userinformation, school2, state2, town2, role2, id2, teacheriscalled2, email2, bathroompasslimit, drinkpasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classid, coursename, section, location, teacherid,
    starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, classsessionbegun, linkedclass
  } = route.params;

  console.log(drinkofwater, " Drink of Water ,Main Menu ", id, "this is the id", adminclass, "adminclass");


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email').then((value) => {
        setEmail(value);
      })
      const value2 = await AsyncStorage.getItem('id')
      const value5 = await AsyncStorage.getItem('town')
      const value6 = await AsyncStorage.getItem('school')
      const value7 = await AsyncStorage.getItem('state')
      const value8 = await AsyncStorage.getItem('teacheriscalled')
      const value9 = await AsyncStorage.getItem('role')
      const value10 = await AsyncStorage.getItem('adminclass')

      setAdminclass(value10);

    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [id]);


  useEffect(() => {
    if (typeof id2 != "undefined") {
      setId(id2);
      setSchool(school2);
      setState(state2);
      setTown(town2);
      setRole(role2);
      setTeacheriscalled(teacheriscalled2);
      setEmail(email2);
    }
  }, [id2]);

  useEffect(() => {
    if (typeof id2 != "undefined") {
      setId(id2);
      setSchool(school2);
      setState(state2);
      setTown(town2);
      setRole(role2);
      setTeacheriscalled(teacheriscalled2);

    }
  }, [id2]);

  const resetinfo = () => {
    if (typeof id != "undefined") {

      const docRef = doc(firebase, "users", id);
      const docData = getDoc(docRef)

        .then((docSnap) => {
          setSchool(docSnap.data().school);
          setTown(docSnap.data().town);
          setState(docSnap.data().state);
          setTeacheriscalled(docSnap.data().teacheriscalled);
          setRole(docSnap.data().role);
          setAdminclass(docSnap.data().currentclass);
        })
    } else {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {

        if (user) {
          const uid = user.uid;
          setId(uid);
        } else {
          navigation.navigate("SignIn");
        }
      });
    }

  }

  useEffect(() => {
  
  }, [adminclass]);

  useEffect(() => {
    setYoucangetpassclass(false);
  }, [currentsessionid]);


  async function runthisfunction() {

    const q = query(collection(firebase, "passes"), where("teacherid", "==", id), where("timeleftclass", "==", 0), orderBy("placeinline", "asc"));

    const querySnapshot = await getDocs(q)

      .then(function (snapshot) {
        const array = []
        snapshot.forEach(doc => {

          array.push(doc.data())
        })
        setUserdata(array)
      })
  };


  useEffect(() => {
    if (typeof userdata != "undefined") {
      setTotalinline2(userdata.length)
    }
  }, [userdata]);

  useEffect(() => {
    if ((typeof totalinline2 != "undefined") && (typeof classid != "undefined")) {
      makechange();
    }
  }, [totalinline2]);


  const makechange = () => {
    console.log("Is this the last thing to get run?")

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      totalinlineforbathroom: totalinline2
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }



  const rightnow = Date.now();

  useEffect(() => {
    if (sessionending < rightnow) {
      setClassiscurrent(false);
    }
    else if (sessionending > rightnow) {
      setClassiscurrent(true);
    } else {
      null;
    }
  }, [sessionending]);

  useEffect(() => {
    if (typeof classsessionbegun != "undefined") {
      setYoucangetpassclass(false);
    }
  }, [classsessionbegun]);


  const signoutfunction = () => {
    auth.signOut();
  }

  const deleteaccount = () => {

    Alert.alert('Please be aware.', 'Your account with all of its associated records will be removed from the database at the end of the school session.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Delete Account', onPress: () => console.log("delete this account!") },
    ]);

  }

  useEffect(() => {
    if (getdatedotnow > 0 && sessionending > 0) {
      endsessionprematurely();
    }
  }, [getdatedotnow]);


  const endsessionprematurely = () => {


    console.log(sessionending, getdatedotnow, "sessionending, getdatedotnow", currentsessionid, "currentsessionid")

    if (sessionending < getdatedotnow) {
      console.log(sessionending, rightnow, "sessionending,rightnow")
      setClassiscurrent(false);


      updateDoc(doc(firebase, "classsessions", currentsessionid), {
        status: "Completed"
      })
        .catch(error => {
          console.log(error); alert(error);
        })

    } else {

      setShowspinner(true);

      Alert.alert('Please be aware.', 'This will end the current session.', [
        {
          text: 'Cancel',
          onPress: () => setShowspinner(false),
          style: 'cancel',
        },
        { text: 'End Session', onPress: () => setEndtime(Date.now()) },
      ]);
    }

  }

  useEffect(() => {

    console.log(sessionending, "sessionending",)
    if (currentsessionid) {
      const array = [];

      const q = query(collection(firebase, "consequencephoneuse"), where("sessionid", "==", currentsessionid), where("stoptimepenalty", ">", endtime));

      const querySnapshot = getDocs(q)

        .then(function (snapshot) {

          snapshot.forEach(docs => {
            array.push({ id: docs.data().id, starttime: docs.data().starttimepenalty, studentid: docs.data().studentid });
          })
          setArrayforconsequences(array);
        })
    }
  }, [endtime]);



  useEffect(() => {

    if (typeof arrayforconsequences != "undefined") {

      for (let i = 0; i < arrayforconsequences.length; i++) {
        updateDoc(doc(firebase, "consequencephoneuse", arrayforconsequences[i].id), {
          stoptimepenalty: endtime,
          totaltimeinpenalty: endtime - (arrayforconsequences[i].starttime),
          penaltyminutes: (endtime - (arrayforconsequences[i].starttime)) / 60000,

        }).catch((error) => {
          console.log(error); alert(error);
        })
      }
    }
  }, [arrayforconsequences]);



  useEffect(() => {
    if (coursename) {
      getstatus();
      runthisfunction();
    }
  }, [coursename]);


  useEffect(() => {
    if (currentsessionid) {
      getstatus();
      runthisfunction();
    }
  }, [currentsessionid]);


  async function getstatus() {
    const trythis = collection(firebase, "classsessions");
    const q = query(trythis, where("teacherid", "==", id), where("status", "==", "Happening Now"), orderBy("classbeginnumber", "asc"))
    const querySnapshot = await getDocs(q)
      .then(function (snapshot) {
        const array = [];
        const truefalse = false;
        let noww = Date.now();
        console.log("Step 1, ", Date.now())
        snapshot.forEach(doc => {

          console.log("Step 2, ", doc.data(), doc.data().id, noww, doc.data().passesnolongeravailable, "2 variables")
          if (noww > (doc.data().passesnolongeravailable)) {
            array.push(doc.data().id);
            let truefalse = true;
            console.log(doc.data().id, "TRUE HAPPENED --- class should be over", array);
            //Because class is over should say - "Begin A Class". 
          }
          else if (noww < (doc.data().passesnolongeravailable)) {
            console.log("CLASS IS HAPPENING!!!!!!!!!!!!!!!!")
            setClassiscurrent(true);
            setNameofcurrentclass(doc.data().classname);
            setIdofcurrentclass(doc.data().id);
            setStarttimeofcurrentclass(doc.data().classbeginnumber)
          }

          else { console.log("no documents to update") }
        })


        setthelastid(array);
        setEndlastclass(truefalse);
      })
  };

  useEffect(() => {
    if (thelastid) {

      for (let i = 0; i < thelastid.length; i++) {
        updateDoc(doc(firebase, "classsessions", thelastid[i]), {
          status: "Completed"
        }).catch((error) => {
          console.log(error); alert(error);
        })

      }
    }
  }, [endlastclass]);


  useEffect(() => {
    console.log("ENDING CLASSr ", currentsessionid, thelastid, "+ ", starttime, "starttime", endtime, "endtime");

    const rightnow = Date.now();

    if (endtime > starttime) {
      setClassiscurrent(false);

      updateDoc(doc(firebase, "classsessions", currentsessionid), {
        passesnolongeravailable: endtime,
        lengthofclass: Math.round((endtime - starttime) / (60000)),
        status: "Completed"
      }).then(docRef => {
        console.log("Value of an Existing Document Field has been updated");
        setShowspinner(false);

      })
        .catch(error => {
          console.log(error); alert(error);
        }),
        updateDoc(doc(firebase, "classesbeingtaught", classid), {
          currentsessionends: endtime,
          inusebathroompass: 0,
          inuseexclusivephonepass: 0,
          totalinlineforbathroom: 0,
          totalinlineforexclusivephone: 0,


        }).catch((error) => {
          console.log(error); alert(error);
        }),

        setEndlastclass(true);
    }
  }, [endtime]);

  useEffect(() => {
    console.log(currentsessionid, "get all consequences that need to be reset and update there time thaat passes are no longer accepted. ")
  }, [endtime]);



  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() =>
          console.log("hello")}>
          <Text accessibilityLabel="Guest" style={styles.error}>
          </Text>
        </TouchableOpacity>
      ),
    });

  }, []);



  useEffect(() => {
    console.log(id, "this is the id")
    if (typeof role === "undefined" || role === "" || typeof school === "undefined" || school === "" || typeof state === "undefined" || state === "" || typeof town === "undefined" || town === "" || typeof teacheriscalled === "undefined" || teacheriscalled === "" || typeof id === "undefined" || id === "") {
      resetinfo();
    } else {
      console.log("Everything is cool!")
    }
  }, []);

  useEffect(() => {
    console.log(id, "This is the id");
    if (typeof role === "undefined" || typeof school === "undefined" || typeof state === "undefined" || typeof town === "undefined" || typeof teacheriscalled === "undefined" || teacheriscalled === "" || typeof id === "undefined") {
      resetinfo();
    } else {
      console.log("Everything is cool!")
    }
  }, [teacheriscalled]);

  useEffect(() => {
    console.log(email2, "this is the email2")
    if (email2 != "Mkrebs@rpsk12.org" && email2 != "Mjones@rpsk12.org" && email2 != "Nurse@rpsk12.org") {
      navigation.navigate("SignIn");
      alert("This App is in Development. Direct inquiries to mattkrebsemail@gmail.com.")
    } else {
      console.log("let him in.");
    }
  }, [teacheriscalled]);







  useEffect(() => {
    if (coursename) {
      if (youcangetpassclass) {
        makepassesavailable();
      } else {
        makepassesunavailable();
      }
    }
  }, [youcangetpassclass]);

  useEffect(() => {
    if (coursename) {
      if (youcangetincomingpassclass) {
        makeincomingpassesavailable();
      } else {
        makeincomingpassesunavailable();
      }
    }
  }, [youcangetincomingpassclass]);

  const makepassesavailable = () => {

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      passesareavailable: true,
      currentsessionid: currentsessionid, sessionending: sessionending,
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }

  return (
    <View style={styles.container}>
      {coursename ? <View><Text style={styles.paragraph9}>Now Active: {'\n'}{coursename} - {section} </Text></View> : <View><Text style={styles.paragraph9}>No Class is Active</Text></View>}


      <ScrollView style={styles.scroll}>

        <View style={styles.centerscroll}>

          <View><Text style={styles.paragraph2}>Daily Management {'\n'}</Text></View>

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


         

          {/* <Text>{'\n'}{'\n'}</Text> */}
         

         <View style={styles.button}><Text style={styles.btext} onPress={() => navigation.navigate("Passesadmin", {
            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass, adminclass:adminclass

          })}>Passes From This Class</Text></View>

     <Text>{'\n'}{'\n'}</Text>

          <View><Text style={styles.paragraph2}> ___________________ </Text></View>
          <View><Text style={styles.paragraph2}>Set-Up{'\n'}</Text></View>


          {coursename ? <View style={styles.button}>
            <Text style={styles.btext} onPress={() => navigation.navigate("Studentsnotenrolled", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

            })}>Students Not In This Class</Text></View> : null}
          {coursename ? <Text>{'\n'} {'\n'}</Text> : null}

          {coursename ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("QuickSignUp", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
            })}>Sign Up Phoneless Student</Text></View> : null}

          {coursename ? <Text>{'\n'} {'\n'}</Text> : null}



          {coursename ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("Addconsequence", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
            })}>Behaviors To Address</Text></View> : null}

          {coursename ? <Text>{'\n'} {'\n'}</Text> : null}


          {coursename && (classiscurrent && (Date.now() < sessionending)) ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("Settingsteacher", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

            })}>Settings for the 'Active' Class</Text></View> : <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("Settingsteacher", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

            })}>Settings</Text></View>}
          <Text>{'\n'} {'\n'}</Text>

          <View><Text style={styles.paragraph2}> ___________________ </Text></View>
          <TouchableOpacity onPress={() => signoutfunction()}>
            <Text style={styles.paragraph2}>
              Sign Out
            </Text>
          </TouchableOpacity>

          <View><Text style={styles.paragraph2}> ___________________ </Text></View>
          <TouchableOpacity onPress={() => deleteaccount()}>
            <Text style={styles.paragraph2}>
              Delete Account
            </Text>
          </TouchableOpacity>

          <Text>{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'}{'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} </Text>

        </View>
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
    alignItems: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 40,
    textAlign: 'center',
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    fontWeight: "bold",

  },
  paragraph2: {
    margin: 24,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    fontWeight: "bold"


  },
  paragraph9: {
    margin: 24,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: '#FFF',
    backgroundColor: '#000000',

  },
  text: {
    color: '#FFFFFF',
    textAlign: "center"
  },


  section4: {
    padding: 10,
    height: "20%"

  },
  paragraph4: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000',
    color: "#FFF",

    color: "#FFF",

  },

  scroll: {
    width: "100%",

  },
  centerscroll: {
    alignItems: "center",

  },

  button: {
    width: "90%",
    alignItems: "center",
    textAlign: "center",
    width: "95%",
    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#fff",
    backgroundColor: "#013469",
    borderRadius: 20,
  },

  btext: {
    margin: 10,
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    justifyContent: "center",
    color: "#fff",
  },

});
export default TeacherMainMenu; 
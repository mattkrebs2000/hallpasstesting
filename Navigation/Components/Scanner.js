import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import { auth, firebase } from "../Firebase/Config";

import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, FieldValue } from "@firebase/firestore";

import Pass from "./Pass";
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { sqrt } from 'react-native-reanimated';

// import { useNavigation } from '@react-navigation/native';

const Scanner = ({ route, navigation }) => {

  const { userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, ledby, drinkofwater, exclusivetime, donewithworkpass, currentsessionid, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, id, passid, teacheridforreturn, maxstudentsonphonepass, newlocation, timeallowed, adjustmentandoverunder, total2, getcurrentdifference, day, leftclass2, expectedreturn2, endofclasssession, currentdateend } = route.params;

  //'day' confirms that persoan has already visited pass and is coming back to zap out

  const [leavetimeGlobal, setLeavetimeGlobal] = useState();
  const [returntimeGlobal, setReturntimeGlobal] = useState("");

  const [sound, setSound] = React.useState();
  const [eligible, setEligible] = React.useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const [leftclass, setLeftclass] = useState();
  const [expectedreturn, setExpectedreturn] = useState();

  const [howmanypeople, setHowmanypeople] = useState();
  const [howmanypeople2, setHowmanypeople2] = useState();
  const [takenameoffwaitlist, setTakenameoffwaitlist] = useState();
  const [rightnow, setRightnow] = useState();

  const [ontime, setOntime] = useState();

  const [adjust, setAdjust] = useState();
  const [levell, setLevell] = useState();
  const [overunderr, setOverunderr] = useState();

  const [penaltyminutes, setPenaltyminutes] = useState();

  const [allottedtime, setAllottedtime] = useState();
  const [realtimeleave, setRealtimeleave] = useState();
  const [currentdate, setCurrentdate] = useState();
  const [completed, setCompleted] = useState();
  const [completed2, setCompleted2] = useState();
  const [currenttime, setCurrenttiime] = useState();
  const [giveshortcut, setGiveshortcut] = useState();

  console.log("In Scanner");

  useEffect(() => {

    if (id && classid && typeof day != "undefined") {
      setCurrenttiime(Date.now())
      getadjustment();
      checkDatabaseData2();
      setExpectedreturn(expectedreturn2);

      // if (locationdestination == newlocation) {
      //   setGiveshortcut(true);
      // }
    }
  }, [day, expectedreturn2]);


//IF THERE IS NO SCANNER AND IT WAS A "NEW LOCATION" . . . They can close this pass out whenever they want

  useEffect(() => {
    if ((typeof day != "undefined") && (locationdestination == newlocation)) {

      updateDoc(doc(firebase, "classesbeingtaught", classid), {
        addingnumber: Date.now(),
        removescanneraddbutton: true
      }).catch((error) => {
        console.log(error); alert(error);
      })  
      .then(() => {
      setGiveshortcut(true);
    })
    }
  }, [day]);



  useEffect(() => {

    console.log("14Did it get this far? ");
    setText("Not yet scanned");
    setScanned(false);
  }, [day]);

  const getadjustment = () => {

    console.log("5Did it get this far? ");

    if (id && classid) {
      console.log("6Did it get this far? ");
      const docRef = doc(firebase, "users", id);

      const docData = getDoc(docRef)

        .then((docSnap) => {
          let idd = classid;
          let object = docSnap.data();

          if (typeof object[idd] != "undefined") {

            const whatever = object[idd].adjustments;
            const penaltyminutes = object[idd].penaltyminutes;
            const ovunder = object[idd].overunder;
            const level = object[idd].level;

            setAdjust(whatever);
            setPenaltyminutes(penaltyminutes);
            setOverunderr(ovunder);
            setLevell(level);

          } else {
            setAdjust(0);
            setPenaltyminutes(0);
            setOverunderr(0);
            setLevell("Consequences For Lateness");
          }
        })
    }
  };

  async function checkDatabaseData2() {
    console.log("12Did it get this far? ");

    const docRef = doc(firebase, "classesbeingtaught", classid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setHowmanypeople2(docSnap.data().inusebathroompass)

    } else {
      // doc.data() will be undefined in this case

    }

  };



  useEffect(() => {
    if (currenttime < expectedreturn) {

      console.log("22this was run");
      setOntime(true);

    } else {
      console.log("23this was run");
      setOntime(false);

      updateDoc(doc(firebase, "users", id), {
        lastmistake: "Late On A Pass",
        lastmistaketime: Date.now()
      }).catch((error) => {
        console.log(error); alert(error);
      })
    }
  }, [currenttime]);

  useEffect(() => {

    if (typeof day != "undefined") {
      if (text == teacheridforreturn && scanned) {
        returnfinalizehallpass();
      } else {
        setText('Not yet scanned')
        setScanned(false);
      }

    } else {

      if (leavetimeGlobal) {

        const formatAMPM = () => {
          let hours = leavetimeGlobal.getHours();
          let minutes = leavetimeGlobal.getMinutes();
          let ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes.toString().padStart(2, '0');
          let strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        }

        const p = formatAMPM(leavetimeGlobal);

        setRealtimeleave(p);
        setCurrentdate((leavetimeGlobal.getMonth() + 1) + "/" + leavetimeGlobal.getDate() + "/" + leavetimeGlobal.getFullYear());
      }
    }
  }, [leavetimeGlobal]);


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() =>
          navigation.navigate("Passisready", {
            userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, currentsessionid: currentsessionid, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, passid: passid, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, timeallowed: timeallowed, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, endofclasssession: endofclasssession,
          })}
        >

          <Text accessibilityLabel="Guest" style={styles.error5}>
            Instructions
          </Text>
        </Pressable>
      ),
    });
  }, []);


  useEffect(() => {

    if (locationdestination == "Bathroom") {
      setAllottedtime(bathroomtime);
    } else if (locationdestination == "Get Drink of Water") {
      setAllottedtime(drinkofwater);
    } else {
      setAllottedtime(nonbathroomtime);
    }
  }, []);

  useEffect(() => {

    navigation.setOptions({
      headerLeft: () => (
        <Pressable>
          <Text accessibilityLabel="Guest" style={styles.error}>
          </Text>
        </Pressable>
      ),
    });
  }, []);


  useEffect(() => {
    if (typeof classid != "undefined") {
      checkDatabaseData();
    }
  }, []);

  useEffect(() => {

    if (typeof completed != "undefined" && typeof day == "undefined") {

      navigation.navigate("Pass", {
        teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, teacherid: teacherid, coursename: coursename, Selectedclassdestination: Selectedclassdestination, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse,
        currentsessionid: currentsessionid, id: id, passid: passid, teacheridforreturn: teacheridforreturn, leftclass: leftclass, expectedreturn: expectedreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, timeallowed: timeallowed, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, rightnow: rightnow, currentdate: currentdate, realtimeleave: realtimeleave, endofclasssession: endofclasssession,
      });

    } else if (typeof completed2 != "undefined" && typeof day != "undefined") {
      navigation.navigate("Mainmenustudent", {
        teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, teacherid: teacherid, coursename: coursename, Selectedclassdestination: Selectedclassdestination, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse,
        currentsessionid: currentsessionid, id: id, passid: passid, teacheridforreturn: teacheridforreturn, leftclass: leftclass, expectedreturn: expectedreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, timeallowed: timeallowed, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, rightnow: rightnow, currentdate: currentdate, realtimeleave: realtimeleave, day: day
      });
    } else {
      console.log("nowhere to go")
    }
  }, [completed, completed2]);



  async function checkDatabaseData() {
    console.log("5was this run?")

    const docRef = doc(firebase, "classesbeingtaught", classid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setHowmanypeople(docSnap.data().inusebathroompass);
      setTakenameoffwaitlist(docSnap.data().totalinlineforbathroom);
      setGiveshortcut(docSnap.data().removescanneraddbutton);

      // if (locationdestination != newlocation && (typeof day != "undefined")) {
      //   setGiveshortcut(docSnap.data().removescanneraddbutton);
      // }


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }

  // const navigation = useNavigation();

  //shortcut() to be used in development

  const developmentshortcut = () => {

    var r = new Date();
    var s = Date.now();

    setRightnow(s);
    setLeavetimeGlobal(r);
    setLeftclass(s);

    setScanned(true);

    if (typeof day != "undefined") {
      setText(teacheridforreturn);
    } else {
      setText(teacherid);
    }
  }

  useEffect(() => {
    return sound
      ? () => {

        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Confirm.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

  async function finalizehallpass() {
    setGiveshortcut(false);

    console.log("hallpass ran ?");

    const expected = (rightnow + (allottedtime * 60000))


    if (classid && passid &&
      (locationdestination == newlocation)) {

      await updateDoc(doc(firebase, "passes", passid), {
        leftclass: rightnow,
        timeleftclass: leavetimeGlobal.toLocaleTimeString([], { hour12: true }),
        whenlimitwillbereached: expected,
        placeinline: null,
        passdetailrightnow: rightnow, passdetailcurrentdate: currentdate, passdetailrealtimeleave: realtimeleave
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        addingnumber: Date.now(),
        removescanneraddbutton: false
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "On Newlocation Pass",
      }).catch((error) => {
        console.log(error); alert(error);
      })

        .then(async () => {

          setExpectedreturn(expected);
          setHasPermission(null);
          setText("Not yet scanned");
          setScanned(false);
          setCompleted(true);
        })
    }
    else if (classid && passid &&
      locationdestination == "Bathroom") {

      await updateDoc(doc(firebase, "passes", passid), {

        leftclass: rightnow,
        timeleftclass: leavetimeGlobal.toLocaleTimeString([], { hour12: true }),
        whenlimitwillbereached: expected,
        placeinline: null,
        passdetailrightnow: rightnow, passdetailcurrentdate: currentdate, passdetailrealtimeleave: realtimeleave

      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "On Pass",
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        addingnumber: Date.now(),
        inusebathroompass: howmanypeople + 1,
        totalinlineforbathroom: takenameoffwaitlist - 1,
        removescanneraddbutton: false


      }).catch((error) => {
        console.log(error); alert(error);
      })
        .then(async () => {

          setExpectedreturn((rightnow + (allottedtime * 60000)));
          setHasPermission(null);
          setText("Not yet scanned");
          setScanned(false);
          setCompleted(true);
        })
    }
    else if (classid && passid &&
      locationdestination != "Bathroom") {

      await updateDoc(doc(firebase, "passes", passid), {
        leftclass: rightnow,
        timeleftclass: leavetimeGlobal.toLocaleTimeString([], { hour12: true }),
        whenlimitwillbereached: expected,
        placeinline: null,
        passdetailrightnow: rightnow, passdetailcurrentdate: currentdate, passdetailrealtimeleave: realtimeleave
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        addingnumber: Date.now(),
        removescanneraddbutton: false
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "On Pass",
      }).catch((error) => {
        console.log(error); alert(error);
      })

        .then(async () => {

          setExpectedreturn(expected);
          setHasPermission(null);
          setText("Not yet scanned");
          setScanned(false);
          setCompleted(true);
        })
    } else {

      setExpectedreturn(expected);
      setHasPermission(null);
      setText("Not yet scanned");
      setScanned(false);
      setCompleted(true);

    }
  }

  async function returnfinalizehallpass() {

    setGiveshortcut(false);

    if (Date.now() > endofclasssession) {

      var t = endofclasssession;
      var r = new Date(t);

      if (locationdestination == "Bathroom" && howmanypeople2 < 1) {
        console.log("first if then");

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            addingnumber: Date.now(),
            inusebathroompass: 0,
            removescanneraddbutton: false
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })


      } else if (locationdestination == "Bathroom" && howmanypeople2 > 0) {
        console.log("second if then");

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            addingnumber: Date.now(),
            inusebathroompass: howmanypeople2 - 1,
            removescanneraddbutton: false
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })


      } else if ((Date.now() - (timeallowed * 60000)) < endofclasssession) {

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",
          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            addingnumber: Date.now()
          }).catch((error) => {
            console.log(error); alert(error);
          })
            .then(async () => {

              setHasPermission(null);
              setText("Not yet scanned");
              setScanned(false);
              setCompleted2(true);
            })

      } else {


        var s = leftclass2 + (timeallowed * 60000);
        var w = new Date(s);

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        await updateDoc(doc(firebase, "passes", passid), {
          returned: s,
          timereturned: w.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: true,
          differenceoverorunderinminutes: 0,

        }).catch((error) => {
          console.log(error); alert(error);
        }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            addingnumber: Date.now()
          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }).then(async () => {


            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })

      }
    }
    else {

      var r = new Date();
      var t = Date.now();

      if (locationdestination == "Bathroom" && howmanypeople2 > 0) {
        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            addingnumber: Date.now(),
            inusebathroompass: howmanypeople2 - 1,
            removescanneraddbutton: false,
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);

          })

      } else if (locationdestination == "Bathroom" && howmanypeople2 < 1) {
        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            addingnumber: Date.now(),
            inusebathroompass: 0,
            removescanneraddbutton: false
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);

          })

      }
      else {

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            addingnumber: Date.now()
          }).catch((error) => {
            console.log(error); alert(error);

          }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }).then(async () => {


            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })


      }
    }
  }

  useEffect(() => {

    if (typeof day === "undefined") {
      if (text == teacherid && scanned) {
        console.log("Play SOund Happened");
        finalizehallpass();
      }
      if (teacherid != text && scanned) {

        setText('Not yet scanned');
        setScanned(false);
        alert(teacherid)
      }
    }
  }, [currentdate]);



  // Request Camera Permission


  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const askPermissions = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {

    console.log("1AM I HERE");

    var r = new Date();
    var s = Date.now();

    setRightnow(s);
    setLeavetimeGlobal(r);
    setLeftclass(s);

    setScanned(true);
    setText(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {giveshortcut === true && typeof day === "undefined" ? <View style={styles.container}>

          <View style={styles.barcodebox2}><View><Pressable
            onPress={() => developmentshortcut()}><Text style={styles.maintext11}>Get{'\n'}Pass!</Text></Pressable></View>
          </View>

          <Pressable onPress={() => askPermissions()}><Text style={styles.maintext}>Get Camera</Text></Pressable>

          <Pressable onPress={() => checkDatabaseData()}><Text style={styles.maintext}>Press on{'\n'}Shortcut Above</Text></Pressable>

          <Pressable>
            <Text style={styles.maintext}>passid:{passid}{'\n'}canusebutton: {giveshortcut ? "true" : "false"}{'\n'}hasPermission: {hasPermission ? "true" : "false"}{'\n'}It Read: {text}{'\n'}It expects: {teacheridforreturn}{'\n'}{scanned ? "it scanned" : "it DID NOT scan"}</Text></Pressable>

        </View> : giveshortcut === true && typeof day != "undefined" ? <View style={styles.container}>

          <View style={styles.barcodebox2}><View><Pressable
            onPress={() => developmentshortcut()}><Text style={styles.maintext11}>Return{'\n'}Pass!</Text></Pressable></View>
          </View>

          <Pressable onPress={() => askPermissions()}><Text style={styles.maintext}>Get Camera</Text></Pressable>

          <Pressable onPress={() => checkDatabaseData()}><Text style={styles.maintext}>Press on{'\n'}Shortcut Above</Text></Pressable>

          <Pressable>
            <Text style={styles.maintext}>passid:{passid}{'\n'}canusebutton: {giveshortcut ? "true" : "false"}{'\n'}hasPermission: {hasPermission ? "true" : "false"}{'\n'}It Read: {text}{'\n'}It expects: {teacheridforreturn}{'\n'}{scanned ? "it scanned" : "it DID NOT scan"}</Text></Pressable>

        </View> :


          <View style={styles.container}>

            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 300, width: 350 }} />
              {scanned && <TouchableOpacity onPress={() => setScanned(false)}><Text></Text></TouchableOpacity>}

            </View>

            <Pressable onPress={() => askPermissions()}><Text style={styles.maintext}>Get Camera</Text></Pressable>
            <Pressable onPress={() => checkDatabaseData()}><Text style={styles.maintext}>After Asking Teacher For Help{'\n'}Press Here for Shortcut.</Text></Pressable>


          </View>}


      </ScrollView>
    </View>

  );
}

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: "#fff",
    textAlign: "center"
  },
  maintextred: {
    fontSize: 16,
    margin: 20,
    color: "#ff0000",
    textAlign: "center"
  },
  maintext1: {
    fontSize: 16,
    margin: 20,
    color: "#ff0000"
  },
  maintext11: {
    fontSize: 46,
    margin: 20,
    color: "#ff0000",
    textAlign: "center"
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#E43522',
    marginTop: 50,
  },

  barcodebox2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#FFF',
    marginTop: 50,
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



import React, { useState, useEffect } from "react";
import CryptoES from "crypto-es";
import Results from "./Subcomponents/ResultsContainer";
import StateResults from "./Subcomponents/StateResultsContainer";
import TownResults from "./Subcomponents/TownResultsContainer";
import SignIn from "./SignIn";
import RadioButton from './MapOfRoles/Roles';
import RadioButton2 from './MapOfAnswers/Answers';
import MapOfSchools from './MapOfSchools/MapofSchools';

import {
  useNavigation,
  NavigationContainer,
  DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, Dimensions, Pressable, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';



import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, signOut, deleteUser, signInWithEmailAndPassword } from "@firebase/auth";
import { getDoc, updateDoc, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "@firebase/firestore";
// import { user } from "firebase-functions/v1/auth";


const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

  // const { role} = route.params;

  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [school, setschool] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchingstate, setSearchingstate] = useState(false);
  const [searchingtowns, setSearchingtowns] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [filteredstates, setFilteredstates] = useState([]);
  const [filteredtowns, setFilteredtowns] = useState([]);
  const [filteredposts, setfilteredposts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [townarray, setTownarray] = useState([]);
  const [number, setNumber] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [onlyadmin, setOnlyadmin] = useState([]);
  const [encrypt, setEncrypt] = useState("");
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [newstatearray, setNewstatearray] = useState([]);
  const [newtownarray, setNewtownarray] = useState([]);

  const [localfirstname, setLocalfirstname] = useState("");
  const [locallastname, setLocallastname] = useState("");
  const [currentclass, setCurrentclass] = useState("");
  const [currentlocation, setCurrrentlocation] = useState("");
  const [nameoflocation, setNameoflocation] = useState("")
  const [originalschools, setOriginalschools] = useState([]);
  const [tempschool, setTempschool] = useState("");
  const [penaaltyminutes, setPenaltyminutes] = useState();

  const [listofmadestudents, setListofmadestudents] = useState([])


  const [domain, setDomain] = useState("");
  const [role, setRole] = useState();
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [studentid, setStudentid] = useState("");

  const [selectedschool, setSelectedschool] = useState("");
  const [idselected, setIdselected] = useState("");
  const [showspinner, setShowspinner] = useState(true);

  const [adjustments2, setAdjustments2] = useState();
  const [overunderlocal2, setOverunderlocal2] = useState();
  const [abc2, setAbc2] = useState();
  const [classid2, setClassid2] = useState();
  const [temporary2, setTemporary2] = useState();
  const [emailll, setEmailll] = useState();
  const [teacheriscalled, setTeacheriscalled] = useState();
  const [readynow, setReadynow] = useState();
  const [idsofpasses, setIdsofpasses] = useState();
  const [idsofconsequences, setIdsofconsequences] = useState();
  const [newid, setNewid] = useState();

  const [adminteacherid, setAdminteacherid] = useState();


  const resetform = () => {

    setIdselected("");
    setRole("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLocalfirstname("");
    setLocallastname("");
    setschool("");
    setTown("");
    setState("");
    setFirst("");
    setSecond("");
    setSelectedschool("");
    setTeacheriscalled("");
    setNameoflocation("");
    setValidationMessage("");
  }

  const gotosignin = () => {
    auth.signOut();
    navigation.navigate("SignIn");

  }
  const getrecords1 = () => {

    const q = query(collection(firebase, "passes"), where("studentid", "==", idselected));

    const querySnapshot = getDocs(q)
      .then(function (snapshot) {
        let array = []
        snapshot.forEach(doc => {
          array.push(doc.data().id)
        })
        if (array.length === 0) {
          console.log("No passes to change", classid2, "classid2")
        } else {
          setIdsofpasses(array);
        }
      })

  }

  const getrecords2 = () => {

    const q = query(collection(firebase, "consequencephoneuse"), where("studentid", "==", idselected));

    const querySnapshot = getDocs(q)
      .then(function (snapshot) {
        let array = []
        snapshot.forEach(doc => {
          array.push(doc.data().id)
        })
        if (array.length === 0) {
          console.log("No passes to change")
        } else {
          setIdsofconsequences(array); 
        }
      })

  }

  useEffect(() => {
    if (second === "Yes") {
      getrecords1();
      getrecords2();
    }
  }, [idselected]);

  useEffect(() => {
    if (typeof adminteacherid != "undefined") {
      makeclassforadmin();
    }
  }, [adminteacherid]);


  useEffect(() => {

    console.log("1");
    if (typeof idsofpasses != "undefined" && typeof newid != "undefined") {

      for (let s = 0; s < idsofpasses.length; s++) {

        updateDoc(doc(firebase, "passes", idsofpasses[s]), {
          studentid: newid

        }).catch((error) => {
          console.log(error); alert(error);
        })
      }
    }
  }, [newid, idsofpasses]);

  useEffect(() => {

    console.log("1");
    if (typeof idsofconsequences != "undefined" && typeof newid != "undefined") {

      for (let s = 0; s < idsofconsequences.length; s++) {

        updateDoc(doc(firebase, "consequencephoneuse", idsofconsequences[s]), {
          studentid: newid
        }).catch((error) => {
          console.log(error); alert(error);
        })
      }
    }
  }, [newid, idsofconsequences]);


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

  const data = [
    { value: 'Student' },
    { value: 'Teacher' },
    { value: 'Admin' },
  ];

  const answers = [
    { value: 'Yes' },
    { value: 'No' },
  ];

  useEffect(() => {
    let idselect = selectedschool.id;
    let state = selectedschool.state;
    let school = selectedschool.school;
    let town = selectedschool.town;
    let first = selectedschool.localfirstname;
    let last = selectedschool.locallastname;
    let em = selectedschool.email;

    let classid = selectedschool.classidmadefrom;
    let temp = selectedschool.temporary;

    setIdselected(idselect);
    setEmailll(em);
    setState(state);
    setschool(school);
    setTown(town);
    setLocalfirstname(first);
    setStudentid(idselect);
    setLocallastname(last);
    setClassid2(classid);
    setTemporary2(temp);

  }, [selectedschool]);

  const getdomain = email.substring(email.lastIndexOf("@") + 1);

  useEffect(() => {

    if (getdomain != "rpsk12.org") {
      setDomain(getdomain)
    }
  }, [password]);

  // useEffect(() => {
  //   if (domain.length > 2) {
  //     alert("You must use your Revere Public Schools email address.")
  //     setDomain("");
  //   }
  // }, [domain]);


  const stateArray = [
    {
      "name": "Alabama",
      "abbreviation": "AL"
    },
    {
      "name": "Alaska",
      "abbreviation": "AK"
    },
    {
      "name": "American Samoa",
      "abbreviation": "AS"
    },
    {
      "name": "Arizona",
      "abbreviation": "AZ"
    },
    {
      "name": "Arkansas",
      "abbreviation": "AR"
    },
    {
      "name": "California",
      "abbreviation": "CA"
    },
    {
      "name": "Colorado",
      "abbreviation": "CO"
    },
    {
      "name": "Connecticut",
      "abbreviation": "CT"
    },
    {
      "name": "Delaware",
      "abbreviation": "DE"
    },
    {
      "name": "District Of Columbia",
      "abbreviation": "DC"
    },
    {
      "name": "Federated States Of Micronesia",
      "abbreviation": "FM"
    },
    {
      "name": "Florida",
      "abbreviation": "FL"
    },
    {
      "name": "Georgia",
      "abbreviation": "GA"
    },
    {
      "name": "Guam",
      "abbreviation": "GU"
    },
    {
      "name": "Hawaii",
      "abbreviation": "HI"
    },
    {
      "name": "Idaho",
      "abbreviation": "ID"
    },
    {
      "name": "Illinois",
      "abbreviation": "IL"
    },
    {
      "name": "Indiana",
      "abbreviation": "IN"
    },
    {
      "name": "Iowa",
      "abbreviation": "IA"
    },
    {
      "name": "Kansas",
      "abbreviation": "KS"
    },
    {
      "name": "Kentucky",
      "abbreviation": "KY"
    },
    {
      "name": "Louisiana",
      "abbreviation": "LA"
    },
    {
      "name": "Maine",
      "abbreviation": "ME"
    },
    {
      "name": "Marshall Islands",
      "abbreviation": "MH"
    },
    {
      "name": "Maryland",
      "abbreviation": "MD"
    },
    {
      "name": "Massachusetts",
      "abbreviation": "MA"
    },
    {
      "name": "Michigan",
      "abbreviation": "MI"
    },
    {
      "name": "Minnesota",
      "abbreviation": "MN"
    },
    {
      "name": "Mississippi",
      "abbreviation": "MS"
    },
    {
      "name": "Missouri",
      "abbreviation": "MO"
    },
    {
      "name": "Montana",
      "abbreviation": "MT"
    },
    {
      "name": "Nebraska",
      "abbreviation": "NE"
    },
    {
      "name": "Nevada",
      "abbreviation": "NV"
    },
    {
      "name": "New Hampshire",
      "abbreviation": "NH"
    },
    {
      "name": "New Jersey",
      "abbreviation": "NJ"
    },
    {
      "name": "New Mexico",
      "abbreviation": "NM"
    },
    {
      "name": "New York",
      "abbreviation": "NY"
    },
    {
      "name": "North Carolina",
      "abbreviation": "NC"
    },
    {
      "name": "North Dakota",
      "abbreviation": "ND"
    },
    {
      "name": "Northern Mariana Islands",
      "abbreviation": "MP"
    },
    {
      "name": "Ohio",
      "abbreviation": "OH"
    },
    {
      "name": "Oklahoma",
      "abbreviation": "OK"
    },
    {
      "name": "Oregon",
      "abbreviation": "OR"
    },
    {
      "name": "Palau",
      "abbreviation": "PW"
    },
    {
      "name": "Pennsylvania",
      "abbreviation": "PA"
    },
    {
      "name": "Puerto Rico",
      "abbreviation": "PR"
    },
    {
      "name": "Rhode Island",
      "abbreviation": "RI"
    },
    {
      "name": "South Carolina",
      "abbreviation": "SC"
    },
    {
      "name": "South Dakota",
      "abbreviation": "SD"
    },
    {
      "name": "Tennessee",
      "abbreviation": "TN"
    },
    {
      "name": "Texas",
      "abbreviation": "TX"
    },
    {
      "name": "Utah",
      "abbreviation": "UT"
    },
    {
      "name": "Vermont",
      "abbreviation": "VT"
    },
    {
      "name": "Virgin Islands",
      "abbreviation": "VI"
    },
    {
      "name": "Virginia",
      "abbreviation": "VA"
    },
    {
      "name": "Washington",
      "abbreviation": "WA"
    },
    {
      "name": "West Virginia",
      "abbreviation": "WV"
    },
    {
      "name": "Wisconsin",
      "abbreviation": "WI"
    },
    {
      "name": "Wyoming",
      "abbreviation": "WY"
    }
  ];

  useEffect(() => {
    setEncrypt(CryptoES.AES.encrypt(password, "Your Password").toString());
  }, [password]);


  const validateAndSet = (value, valueToCompare, setValue) => {

    if (value.length > 0 && value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else if (value.length > 0 && value == valueToCompare && (state == "" || town.length == 0 || school.length == 0)) {
      setValidationMessage("All fields must be filled out");
    } else {
      setValidationMessage("Sign Up");
    }

    setValue(value);
  };

  useEffect(() => {
 
    if (password === confirmPassword && (state != "" && town != "" && school != "")) {
      setValidationMessage("Sign Up");
    }
  }, [state, town, school]);

  useEffect(() => {
 
    if (temporary2) {
      getadjustment();
    }
  }, [temporary2, classid2, idselected]);



  const getadjustment = () => {

    if (idselected && classid2) {

      const docRef = doc(firebase, "users", idselected);

      const docData = getDoc(docRef)

        .then((docSnap) => {
          let idd = classid2;
          let object = docSnap.data();

          const whatever = object[idd].adjustments;
          // const percent = object[idd].percentage;
          const penaltyminutes = object[idd].penaltyminutes;
          const ovunder = object[idd].overunder;
          const level = object[idd].level;
          setAdjustments2(whatever);
          setPenaltyminutes(penaltyminutes);
          setOverunderlocal2(ovunder);
          setAbc2(level);
        })
    }

  }

  const auth = getAuth();


  useEffect(() => {
    console.log(abc2, "This is the trigger");
    if (typeof abc2 != "undefined") {


      signInWithEmailAndPassword(auth, emailll, "password")

        .then((userCredential) => {
          const usera = auth.currentUser;

          if (usera.uid === idselected && (usera.email != "mkrebs@rpsk12.org" && usera.email != "Mkrebs@rpsk12.org" && usera.email != "nurse@rpsk12.org"  && usera.email != "Nurse@rpsk12.org")) {

            deleteUser(usera).then(() => {
              // User deleted.
            }).catch((error) => {
              console.log(error, usera.uid, "AN ERROR WAS MADE")
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }, [readynow]);




  useEffect(() => {
    if (idselected ) {
      deleteDoc(doc(firebase, "users", idselected))
    }
    console.log("2The old user Document has just been erased!");

  }, [readynow]);





  const updateStudent = () => {

    console.log(" got run");

    const currennttime = Date.now();

    const percents = { id: classid2, penaltyminutes: penaaltyminutes, overunder: overunderlocal2, adjustments: adjustments2, level: abc2 };

    createUserWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {

        const uid = userCredential.user.uid;

        const data2 = {
          [classid2]: percents,
          phonepassawarded: false,
          exclusivephonepassexpiration: 0,
          exclusivephonepassused: "",
          email: email,
          passwordactual: password,
          phonenumber: phonenumber,
          localfirstname,
          locallastname,
          role: "Student",
          school: school,
          state: state,
          town: town,
          outonbathroompass: false,
          currentclass: "",
          currentlocation: "",
          exclusivephonepassused: "",
          temporary: temporary2,
          id: uid,
          changemade: false,
          status: "",
          timeteacheradded: 0,
          lastmistake:"",
          lastmistaketime:0,
        };

        const usersRef = firebase;

        setDoc(doc(usersRef, "users", uid), data2)

        .then(() => {
          if (admin) {
            alert("You've just created a new school: '" + school)
          } else {
            alert("You've just joined the school: '" + school + "!")
          }
        })

          .then(() => {

            setNewid(uid);

            updateDoc(doc(firebase, "classesbeingtaught", classid2), {
              [uid]: uid
            }).catch((error) => {
              console.log(error); alert(error);
            })

          })
          .then(() => {
            setReadynow(true);
            console.log("1this is where we are?????")
          })
      }) 
      .catch(error => {   
        alert(error.message);
     })
  }


  // const updateStudent = () => {
  //   if (second && studentid && password === confirmPassword && validationMessage === "Sign Up") {

  //       .then((userCredential) => {

  //         const uid = userCredential.user.uid;



  //     updateDoc(doc(firebase, "users", studentid), {
  //           email: email,
  //           password: encrypt,

  //         }).catch((error) => {
  //           console.log(error); alert(error);
  //         });

  //         trytochangeid();

  //       }).then(() => {
  //         navigation.navigate("SignIn");
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   }
  // }


  const signUpStudent = () => {

    console.log("signUP got run");

    if (password === confirmPassword && validationMessage === "Sign Up") {

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const uid = userCredential.user.uid;

          const data2 = {
            id: uid,
            role,
            localfirstname,
            locallastname,
            email,
            phonenumber, 
            password: encrypt,
            passwordactual: password,
            school,
            state,
            town,
            outonbathroompass: false,
            currentclass: "",
            currentlocation: "",
            exclusivephonepassused: "",
            exclusivephonepassexpiration: 0,
            phonepassawarded: false,
            temporary: "null",
            changemade: false,
            status: "",
            lastmistake:"",
            lastmistaketime:0,
            // phonepassavailable:"",
            // imageuri:"",
            // imageisapproved: false,
          };



          const usersRef = firebase;


          setDoc(doc(usersRef, "users", uid), data2)
          
         
            .then(() => {
              if (admin) {
                alert("You've just created a new school: '" + school)
              } else {
                alert("You've just joined the school: '" + school + "!")
              }
            })
            .then(() => {
              const auth = getAuth();

              auth.signOut();

              console.log("2this is where we are?????")
              navigation.navigate("SignIn");
            })
            .catch((error) => {
              alert(error);
            });
        })

        .catch(error => {   
          alert(error.message);
       })

        .catch((error) => {
          setValidationMessage(error.message);
        });

    } else {
      console.log("Passwords do not match!", password, confirmPassword, password, confirmPassword);
    }

  }

  useEffect(() => {
    setschool("");
    setTown("");
    setState("");


    if (todos.length == 0) {
      setShowspinner(true);
      newfunctio();
    }
  }, []);


  useEffect(() => {
    if (school && town && state && second === "Yes") {
      setShowspinner(true);
      newfunctio2();
    }
  }, [second]);


  const newfunctio2 = async () => {
    let temporaryarray = [];
    const usersRef = query(collection(firebase, "users"), where("school", "==", school), where("town", "==", town), where("state", "==", state), where("role", "==", "Student"), where("timeteacheradded", ">", 0));
    const querySnapshot = await getDocs(usersRef)
      .then(function (snapshot) {
        snapshot.forEach((doc) => {
          temporaryarray.push(doc.data())
        });
        setListofmadestudents(temporaryarray);
      })
    setShowspinner(false);
  };


  const newfunctio = async () => {
    let temporaryarray = [];
    const usersRef = query(collection(firebase, "users"), where("role", "==", "Teacher"));
    const querySnapshot = await getDocs(usersRef)
      .then(function (snapshot) {
        snapshot.forEach((doc) => {

          let newData = doc.data();

          if (todos.indexOf(newData.id) === -1) {
            setTodos((arr) => {
              return [...arr, newData];
            });
          } else {

          }
          if (townarray.indexOf(newData.id) === -1) {
            setTownarray((arr) => {
              return [...arr, newData];
            });
          } else {

          }

          if (temporaryarray.includes(newData.school + newData.state + newData.town)) {

            console.log("Repeat")

          } else {
            temporaryarray.push(newData.school + newData.state + newData.town);
            setOriginalschools((arr) => {
              return [...arr, newData];
            });

          }

        });

      })

    setShowspinner(false);

  };





  const twobuttonalertteacher = () => {

    Alert.alert('Welcome!', 'Before you create a class, be sure to go to settings and make the necessary adjustments.', [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);

  }



  const signUpTeacher = () => {

    if (password === confirmPassword && validationMessage === "Sign Up") {

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const uid = userCredential.user.uid;

          const data1 = {
            id: uid,
            role,
            teacheriscalled,
            email,
            password: encrypt,
            school,
            state,
            town,
            bathroominuse: false,
            currentclass,
            currentlocation,
            lengthofclasses: 60,
            bathroompass: 10,
            nonbathroompass: 10,
            phonepass: 10,
            drinkpass: 5,
            maxstudentsphonepass: 40,
            donewithworkphonepassavailable: true,
          };

          const usersRef = firebase;

          setDoc(doc(usersRef, "users", uid), data1)
            .then(() => {

              if (admin) {
                alert("You've just created a new school: '" + school)
              } else {
                twobuttonalertteacher();
              }
            })
            .then(() => {
              const auth = getAuth();

              auth.signOut();
              navigation.navigate("SignIn");
            })
            .catch((error) => {
              alert(error);
            });
        })


        .catch((error) => {
          setValidationMessage(error.message);
        });

    } else {
      console.log("Passwords do not match!", password, confirmPassword)
    }

  }




const signUpAdmin = () => {

    if (password === confirmPassword && validationMessage === "Sign Up") {


      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const usersRef = firebase;

          const uid = userCredential.user.uid;

          const data5 = {
            id: uid,
            role,
            teacheriscalled,
            email,
            password: encrypt,
            currentlocation: nameoflocation,
            school,
            state: state,
            town,
          };
        setDoc(doc(usersRef, "users", uid), data5);
        setAdminteacherid(uid);
     
        })
  }
 else {
  alert("Passwords do not match!")
  }
}
  


  async function makeclassforadmin() {

      const docRef = await addDoc(collection(firebase, "classesbeingtaught"), {
        acceptingincomingstudents: true,
        passesareavailable: true,
        classname: nameoflocation,
        location: nameoflocation,
        school,
        state,
        town,
        teacheriscalled,
        teacherid: adminteacherid,
        ledby: role,
        timelimitnonbathroompass: 10,

      }).then(async (userRec) => {

        const user = userRec.id;
        await updateDoc(doc(firebase, "classesbeingtaught", user), {
          id: user
        }).catch((error) => {
          console.log(error); alert(error);
        });


        await updateDoc(doc(firebase, "users", adminteacherid), {
          currentclass: user,
          adminclass: user
        }).catch((error) => {
          console.log(error); alert(error);
        });

      }).then(() => {

        const auth = getAuth();

        auth.signOut();
        
        navigation.navigate("SignIn")
    
  }).catch((error) => {
    setValidationMessage(error.message);
  });

  }



  const textsearched = (text) => {
    setSearching(true);
    let postss = [];
    for (let i in todos) {
      let match = false;
      let postt = todos[i];
      for (let prop in postt) {

        let lower = JSON.stringify(postt[prop]).toLowerCase();
        if (lower.startsWith(school.toString().toLowerCase(), 1)) {
          match = true;
        }
      }
      if (match === true) {
        if (!postss.includes(postt.id)) {
          postss.push(postt),
            console.log("NNNNN")
        }
      }
    }
    setFiltered(postss);

  }




  const textsearchedtowns = (text) => {
    setSearchingtowns(true);
    let postss = [];
    for (let i in townarray) {
      let match = false;
      let postt = townarray[i];
      for (let prop in postt) {

        let lower = JSON.stringify(postt[prop]).toLowerCase();
        if (lower.startsWith(town.toString().toLowerCase(), 1)) {
          match = true;
        }
      }
      if (match === true) {
        if (!postss.includes(postt.id)) {
          postss.push(postt),
            console.log("HERETOWNS", "LookHEREE", role, state, town, school, first)
        }
      }
    }
    setFilteredtowns(postss);

  }



  const textsearchedstates = () => {
    setSearchingstate(true)

    console.log("an array of states1")
    let postss = [];
    for (let i in stateArray) {
      let match = false;
      let postt = stateArray[i];

      for (let prop in postt) {

        let lower = JSON.stringify(postt[prop]).toLowerCase();
        if (lower.startsWith(state.toString().toLowerCase(), 1)) {
          match = true;
        }
      }
      if (match === true) {
        if (!postss.includes(postt.id)) {
          postss.push(postt),
            console.log("NewStates", postss, "NewStates")
        }
      }
    }
    setFilteredstates(postss);
  }

  useEffect(() => {
    if (school) {
      textsearched(school)
      console.log("this has been input", school)
    }
  }, [school])


  useEffect(() => {
    if (state) {
      textsearchedstates(state)
      console.log("this stae has been input", state)
    }
  }, [state])

  useEffect(() => {
    if (town) {
      textsearchedtowns(town)
      console.log("this stae has been input", town)
    }
  }, [town])

  useEffect(() => {
    if (second) {

      console.log(second, state, town, school, role, localfirstname, locallastname, "second, state, town,  school, role, localfirstname, locallastname")
    }
  }, [locallastname])

  return (

    <SafeAreaView style={styles.largercontainer}>
      <View style={styles.container1}>
        <Text style={styles.error}>{validationMessage}</Text>
      </View>
      {showspinner === false ? <KeyboardAvoidingView
        style={styles.container2}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={80}>

        {!role ? <View style={styles.container7}>
          <View style={styles.subsection1}>
            <Text style={styles.paragraph7}>Select Your Role </Text></View>

          <View style={styles.subsection2}><RadioButton role={role} data={data} onSelect={(value) => setRole(value)} /></View>
        </View> : (role === "Teacher" && first === "") || (role === "Admin" && first === "") ? <View style={styles.container7}>

          <View style={styles.subsection3}>
            <Text style={styles.paragraph8}>Are you the first to sign up{'\n'} from your school? </Text></View>
          <View style={styles.subsection4}><RadioButton2 first={first} answers={answers} onSelect={(value) => setFirst(value)} /></View>
        </View> : (role === "Student" && (state === "" || typeof state === "undefined") && (town === "" || typeof town === "undefined") && (school === "" || typeof school === "undefined")) || (first === "No" && (state === "" || typeof state === "undefined") && (town === "" || typeof town === "undefined") && (school === "" || typeof school === "undefined")) ?

          <View style={styles.container77}>
            <View style={styles.subsection37}><Text style={styles.paragraph8}>Select Your School</Text></View>
            <ScrollView style={styles.subsection47}>
              <MapOfSchools originalschools={originalschools} setSelectedschool={setSelectedschool} idselected={idselected} />
              <Text>{'\n'}</Text>
              <Text>{'\n'}</Text>
              <Text>{'\n'}</Text>
            </ScrollView></View> : state && town && school && role === "Student" && (second === "" || typeof second === "undefined") ? <View style={styles.container7}>

              <View style={styles.subsection3}>
                <Text style={styles.paragraph8}>Did your teacher already{'\n'} Make an account for you?</Text></View>
              <View style={styles.subsection4}><RadioButton2 second={second} answers={answers} onSelect={(value) => setSecond(value)} /></View>
            </View> : state && town && school && role === "Student" && second === "Yes" && typeof locallastname === "undefined" ?

            <View style={styles.container77}>
              <View style={styles.subsection37}><Text style={styles.paragraph8}>Who Are You?</Text></View>
              <ScrollView style={styles.subsection47}>
                <MapOfSchools second={second} listofmadestudents={listofmadestudents} setSelectedschool={setSelectedschool} idselected={idselected} />
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
              </ScrollView></View> : state && town && school && role === "Student" && second === ("No") ? <ScrollView contentContainerStyle={styles.container}>
                
              <TextInput
                  style={styles.Newrow}
                  placeholder='Phone Number'
                  placeholderTextColor="#BEBEBE"
                  value={phonenumber}
                  onChangeText={setPhonenumber}
                  maxLength={10} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Email'
                  placeholderTextColor="#BEBEBE"
                  value={email}
                  onChangeText={setEmail} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Confirm Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder="First Name"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setLocalfirstname(text)}
                  value={localfirstname}
                />
                <TextInput
                  style={styles.Newrow}
                  placeholder="Last Name"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setLocallastname(text)}
                  value={locallastname}
                />

                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
              </ScrollView> : state && town && school && role === "Student" && second === "Yes" && typeof locallastname != "undefined" && typeof localfirstname != "undefined" ? <ScrollView contentContainerStyle={styles.container}>
               
              <TextInput
                  style={styles.Newrow}
                  placeholder='Phone Number'
                  placeholderTextColor="#BEBEBE"
                  value={phonenumber}
                  onChangeText={setPhonenumber}
                  maxLength={10}  />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Email'
                  placeholderTextColor="#BEBEBE"
                  value={email}
                  onChangeText={setEmail} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Confirm Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
              </ScrollView> : role === "Teacher" && first === "Yes" ? <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                  style={styles.Newrow}
                  placeholder='Email'
                  placeholderTextColor="#BEBEBE"
                  value={email}
                  onChangeText={setEmail} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Confirm Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder="How students refer to you"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setTeacheriscalled(text)}
                  value={teacheriscalled}
                />
                <TextInput
                  style={styles.Newrow}
                  placeholder="School"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setschool(text)}
                  value={school}
                />
                <ScrollView style={{ maxHeight: 80 }}>
                  <Results
                    posts={filtered}
                    school={school}
                    setschool={setschool}
                    textsearched={(value) => textsearched(value)}
                    setSearching={setSearching}
                    searching={searching}
                    number={number}
                    setNumber={setNumber}
                    onlyadmin={onlyadmin}
                    setOnlyadmin={setOnlyadmin}
                  />
                </ScrollView>
                <TextInput
                  style={styles.Newrow}
                  placeholder="Town"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setTown(text)}
                  value={town}
                />
                <ScrollView style={{ maxHeight: 80 }}>
                  <TownResults
                    filteredtowns={filteredtowns}
                    town={town}
                    setTown={setTown}
                    textsearchedtowns={(value) => textsearchedtowns(value)}
                    setSearchingtowns={setSearchingtowns}
                    searchingtowns={searchingtowns}
                    newtownarray={newtownarray}
                    setNewtownarray={setNewtownarray}
                  />
                </ScrollView>


                <TextInput
                  style={styles.Newrow}
                  placeholder="State"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setState(text)}
                  value={state}
                />
                <ScrollView style={{ maxHeight: 80 }}>
                  <StateResults
                    filteredstates={filteredstates}
                    state={state}
                    setState={setState}
                    textsearchedstates={(value) => textsearchedstates(value)}
                    setSearchingstate={setSearchingstate}
                    searchingstate={searchingstate}
                    newstatearray={newstatearray}
                    setNewstatearray={setNewstatearray}
                    stateArray={stateArray}
                  />
                </ScrollView>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
              </ScrollView> : role === "Teacher" && state && town && school ? <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                  style={styles.Newrow}
                  placeholder='Email'
                  placeholderTextColor="#BEBEBE"
                  value={email}
                  onChangeText={setEmail} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Confirm Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder="How students refer to you"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setTeacheriscalled(text)}
                  value={teacheriscalled}
                />

                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
              </ScrollView> : role === "Admin" && first === "Yes" ? <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                  style={styles.Newrow}
                  placeholder='Email'
                  placeholderTextColor="#BEBEBE"
                  value={email}
                  onChangeText={setEmail} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Confirm Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder="How students refer to you"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setTeacheriscalled(text)}
                  value={teacheriscalled}
                />

                <TextInput
                  style={styles.Newrow}
                  placeholder="Your Location - Ex: Library, Guidance"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setNameoflocation(text)}
                  value={nameoflocation}
                />
                <TextInput
                  style={styles.Newrow}
                  placeholder="School"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setschool(text)}
                  value={school}
                />
                <ScrollView style={{ maxHeight: 80 }}>
                  <Results
                    posts={filtered}
                    school={school}
                    setschool={setschool}
                    textsearched={(value) => textsearched(value)}
                    setSearching={setSearching}
                    searching={searching}
                    number={number}
                    setNumber={setNumber}
                    onlyadmin={onlyadmin}
                    setOnlyadmin={setOnlyadmin}

                  />
                </ScrollView>
                <TextInput
                  style={styles.Newrow}
                  placeholder="Town"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setTown(text)}
                  value={town}
                />
                <ScrollView style={{ maxHeight: 80 }}>
                  <TownResults
                    filteredtowns={filteredtowns}
                    town={town}
                    setTown={setTown}
                    textsearchedtowns={(value) => textsearchedtowns(value)}
                    setSearchingtowns={setSearchingtowns}
                    searchingtowns={searchingtowns}
                    newtownarray={newtownarray}
                    setNewtownarray={setNewtownarray}
                  />
                </ScrollView>


                <TextInput
                  style={styles.Newrow}
                  placeholder="State"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setState(text)}
                  value={state}
                />
                <ScrollView style={{ maxHeight: 80 }}>
                  <StateResults
                    filteredstates={filteredstates}
                    state={state}
                    setState={setState}
                    textsearchedstates={(value) => textsearchedstates(value)}
                    setSearchingstate={setSearchingstate}
                    searchingstate={searchingstate}
                    newstatearray={newstatearray}
                    setNewstatearray={setNewstatearray}
                    stateArray={stateArray}
                  />
                </ScrollView>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
              </ScrollView> : role === "Admin" && state && town && school ? <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                  style={styles.Newrow}
                  placeholder='Email'
                  placeholderTextColor="#BEBEBE"
                  value={email}
                  onChangeText={setEmail} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Password -Use Lowercase'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder='Confirm Password'
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
                <TextInput
                  style={styles.Newrow}
                  placeholder="How students refer to you"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setTeacheriscalled(text)}
                  value={teacheriscalled}
                />

                <TextInput
                  style={styles.Newrow}
                  placeholder="Your Location - Ex: Library"
                  placeholderTextColor="#BEBEBE"
                  onChangeText={(text) => setNameoflocation(text)}
                  value={nameoflocation}
                />

                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
              </ScrollView> : <View></View>}
      </KeyboardAvoidingView> : <KeyboardAvoidingView
        style={styles.container2}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={80}></KeyboardAvoidingView>}


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

        <TouchableOpacity style={styles.touchable}>
          {role === "Student" && state && second === "Yes" ? <Text style={styles.paragraph22} onPress={updateStudent} >Student Sign Up </Text> : role === "Student" && state ? <Text style={styles.paragraph22} onPress={signUpStudent} >Student Sign Up </Text> : role === "Teacher" && state ? <Text style={styles.paragraph22} onPress={signUpTeacher} >Teacher Sign Up </Text> : role === "Admin" && state ? <Text style={styles.paragraph22} onPress={signUpAdmin} >Admin Sign Up </Text> : <Text style={styles.paragraph2}></Text>}
        </TouchableOpacity>


        <TouchableOpacity style={styles.touchable}>
          {role ? <Text style={styles.paragraph22} onPress={() => resetform()} > Reset </Text> : <Text style={styles.paragraph2}>    </Text>}
        </TouchableOpacity>

        <Text style={styles.paragraph2}>___________________ </Text>
        <Text style={styles.paragraph2}>Already have an account?</Text>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.paragraph22} onPress={() => gotosignin()} >Sign In </Text>
        </TouchableOpacity>


        <Text>{'\n'}</Text></View>



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
    backgroundColor: "#000"
  },
  container1: {
    height: "10%",
    backgroundColor: '#000',
    width: "100%",
    justifyContent: "center",
  },
  container2: {
    height: "45%",
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


  paragraph2: {

    fontSize: 18,
    textAlign: "center",
    backgroundColor: '#000000',
    color: "#fff",
    height: "14%"
  },

  paragraph4: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000',
    color: "#fff",


  },
  section3: {

    fontSize: 18,

    textAlign: 'center',
    backgroundColor: "#000",
    color: "#fff",
    alignContent: "center",
    height: "40%",
    marginTop: 30,

  },

  error: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    color: "#fff",
    height: "100%",
    textAlign: "center",
    marginTop: "10%",
  },
  paragraph6: {
    color: "#fff",
    fontSize: 17,
    marginRight: 7


  },
  paragraph7: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#E43522',
    color: "#FFF",
    alignItems: "center",
    padding: 20,
    justifyContent: "flex-start",
  },

  paragraph8: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#E43522',
    color: "#FFF",
    alignItems: "center",
    padding: 20,
    justifyContent: "flex-start",
  },

  container7: {
    height: "85%",
    backgroundColor: "#000000",
  },
  subsection1: {
    height: "40%",
    backgroundColor: "#000",
  },
  subsection2: {
    height: "100%",
    backgroundColor: "#000",
  },

  subsection3: {
    height: "50%",
    backgroundColor: "#000000",
  },
  subsection4: {
    height: "50%",
    backgroundColor: "#000000",
  },

  container5: {
    height: "35%",

    width: "100%",

  },
  heading: {
    backgroundColor: '#000',
    textAlign: "center",
    fontSize: 23,
    margin: 6,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
    textDecorationLine: 'underline',


  },


  container77: {
    height: "85%",
    backgroundColor: "#000000",
  },
  subsection37: {
    height: "30%",
    backgroundColor: "#000",
  },
  subsection47: {
    height: "100%",
    backgroundColor: "#000",
  },

  Newrow: {
    backgroundColor: '#013469',
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    width: "70%",
    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#fff",
    borderRadius: 10,
  },


  touchable: {
    height: "14%",
    alignItems: "center",
  },

  paragraph22: {
    textAlign: "center",
    fontSize: 18,
    width: "50%",
    justifyContent: "center",
    color: "#fff",


  },

});
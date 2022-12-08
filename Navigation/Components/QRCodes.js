import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, BackHandler, TouchableOpacity, Pressable, ScrollView, ContentContainerstyle} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { orderBy, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from "@firebase/firestore";

import { useNavigation } from '@react-navigation/native';


export default function App25rn({route}) {

  const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, id, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, drinkpasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
    email, starttime, sessionended, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, linkedclass
} = route.params;

  console.log("userinformation now in QRCodes.js", id, "Here",teacherid, "userinformation now in QRCodes.js");


 
 
  
    const [userdata, setUserdata] = useState([]);
    const [idsofpasses, setIdsofpasses] = useState();

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

              const r = new Date(idsofpasses[s].endofclasssession)

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
  
    const navigation = useNavigation();


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


    return (

        <View style={styles.container2}>
          <ScrollView>
         
                <View style={styles.paragraph5}>
                <Text style={styles.paragraph6}>Current User:</Text>
                <Text style={styles.paragraph5}>{auth.currentUser.email}</Text>
                <Text style={styles.paragraph5}>Print & Post In Your Room(s)</Text>
                </View>
              
                <View style={styles.container}>
                <ScrollView>
    
              <View style={styles.textContainer}>
                <View style={styles.centerContainer}>
                  <QRCode value= {id} logoSize={30} size={250}/>
                </View>
              </View>
    </ScrollView>
    
            </View>
            


            <View style={styles.section4}>
         

<Text style={styles.paragraph22} onPress={() => navigation.navigate("Mainmenuteacher", {
    idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,
    ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit:drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
    email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater,  exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration,  bathroompassduration: bathroompassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending,maxstudentsbathroom:maxstudentsbathroom, linkedclass:linkedclass

})} >Return to Main Menu </Text>

<Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
            </View>
         
            </ScrollView>
        </View>
      

    )
}

const styles = StyleSheet.create({
    paragraph: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: "center",
        backgroundColor: '#000000',
        color: "#FFF",
        height: "10%",
        alignItems: "center",
 

    },
    paragraph7: {

        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: "center",
        backgroundColor: '#000000',
        color: "#FFF",
        height: "10%",
        alignItems: "center",
 

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

    paragraph22: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: "center",
      backgroundColor: '#000000',
      color: "#fff",

      justifyContent: "center",
      marginTop: 30,

  },
    container2: {
        height: "100%",
        backgroundColor: "#000",
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
       
        color: "#FFF",
        alignContent: "center",
        padding: 20,

        flex: .1
    },
    paragraph5: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: "center",
        backgroundColor: '#000000',
        color: "#FFF",
        height: "20%",
        alignItems: "center",
        width: "100%"



    },
    paragraph6: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#000000',
        color: "#FFf",
        height: "10%",
       
        paddingTop: 20,


    },
    section4: {
        padding: 10,
        height: "30%",
        flex: 1,

    },
    
      unselected: {
        backgroundColor: '#000000',
        color: "#FFF",
        margin: 5,
        textAlign: "center",
        fontSize: 20,
        width: "100%",
    
    
    
      },
      second: {
        color: "#FFF",
     backgroundColor: "#013469",
        fontSize: 20,
        borderRadius: 10,
        textAlign: "center",
        width: "100%",
    
      },
      container: {
        width: "100%",
        height: 350,
        color: "yellow",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "#E43522",
        backgroundColor: "#FFF"
       
    
    
      },
      text: {
        fontSize: 50,
        color: "#FFF",
        backgroundColor:  '#fff',
        width: "100%",
        textAlign: "center",
        borderColor: "#E43522",
        borderWidth: 3,
    
      },
      textContainer: {
   
        height: 330,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        width: "100%",
       
       
      },
      centerContainer: {
    
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
       
      
      
      },
      rightContainer: {
        flex: .05,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
     backgroundColor: "#013469",
    
        alignItems: "center",
        borderRadius: 100,
        height: 38,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 5, 
      },
    
      leftContainer: {
        flex: .05,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: "center",
      
        height: "100%",
        
      },
    
    
      rowLabelText: {
        color: "#0B1219",
        fontSize: 16.0,
      padding: 20,
        
      },
      rowLabelText2: {
      fontSize: 16.0,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: "center",
      backgroundColor: '#fff',
      color: "#FFF",
      paddingBottom: 50,
      alignItems: "center",
    
      },
    
    
      rowLabelTextr: {
        color: "#0B1219",
        fontSize: 16.0,
        
      },
});
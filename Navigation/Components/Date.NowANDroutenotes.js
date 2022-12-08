


// route.params 

import { Navigation } from "../Navigation";

// const { userinformation, firstname, lastname, classid, location, school, town, state, role, id, teacherid, coursename, teacher, youcangetpass, section, currentlocation, ledby, newlocation, Selectedclassdestination, locationdestination, Email, teacheriscalled, leavetimeGloball, email } = route.params;

//Navigation.navigate

// userinformation:userinformation , firstname:firstname, lastname:lastname, classid:classid, location:location, school:school, town:town, state:state, role:role, id:id, teacherid:teacherid, coursename:coursename, teacher:teacher, youcangetpass:youcangetpass, section:section, currentlocation:currentlocation, ledby:ledby, newlocation:newlocation, Selectedclassdestination:Selectedclassdestination, locationdestination:locationdestination, Email:Email, teacheriscalled:teacheriscalled, leavetimeGlobal:leavetimeGlobal, email:email, 





// const Destination = ({route}) => {

//   const { userinformation } = route.params;
//   console.log("userinformation now in Date.now.js", userinformation , "userinformation now in Date.now.js");


// const [eligible, setEligible] = useState(true);

// const navigation = useNavigation();

// const onSubmitNurse = () => {  
//   setDestinationGlobal("Nurse")
//   setTimeout(() => {
//    navigation.navigate("Scanner")
// }, 100);       
// };


// const onSubmitGuidance = () => {     
//   setDestinationGlobal("Guidance")
//   setTimeout(() => {
//    navigation.navigate("Scanner")
// }, 100);       
// };




// useEffect(() => {
// var r = new Date(); // today
// // 86400000 = 1 
// // 43200000 = 1/2 day
// var s = new Date() + 86400000;

// var s = new Date();
// s.setTime(s.getTime() +  86400000 + 43200000); // tomorrow -- day and 1/2 penalty

// console.log("THIS IS LOCAL TIME", r.toLocaleTimeString([], { hour12: true }), "THIS IS LOCAL TIME");
// console.log(r.getTime(), "This is today's time");
// console.log(s.getTime(), "This is tomorrow's time");
// console.log(s.getTime() - r.getTime(), "this is the difference");
//   console.log("year", r.getFullYear());
//   console.log("month", r.getMonth() + 1);
//   console.log("DayOfWeek", r.getDay(), "where 0 represents sunday");
//   console.log("Date of the month", r.getDate(), "Date of the Month");
//   console.log(r.getMonth()+1, "/",r.getDate(),"/",r.getFullYear());
//   console.log("year", s.getFullYear());
//   console.log("month", s.getMonth() + 1);
//   console.log("DayOfWeek", s.getDay(), "where 0 represents sunday");
//   console.log("Date of the month", s.getDate(), "Date of the Month");
//   console.log(s.getMonth()+1, "/",s.getDate(),"/",s.getFullYear());

//   var a = Date.now();
//   console.log(a);
  
// setTimeout(() => {
//   var b = Date.now();
//   var c = (b-a)/60000;
//   var d = c.toFixed(1);
// console.log(d)
// }, 120000);


//  }, []);





//   return (
//     <View style={styles.container}>
//     <View><Text style={styles.paragraph}>Select Desired Destination</Text></View>
//     <ScrollView>
//     <Text>{'\n'} {'\n'}</Text>
//    {eligible ?  (<Button title="Bathroom"  onPress={() => setDestinationGlobal("Bathroom")} />):(<Button title="You Cannot use the Pass"  onPress={() => navigation.navigate("YourBathroomUse")} />)}
//    <Text>{'\n'} {'\n'}</Text>

//    <Button title="Nurse"  onPress={() => onSubmitNurse()} />
//    <Text>{'\n'} {'\n'}</Text>

//    <Button title="Guidance"  onPress={() => onSubmitGuidance()} />
//    <Text>{'\n'} {'\n'}</Text>

//    <Button title="Other"  onPress={() => navigation.navigate("Customlocation")} />



//  </ScrollView>
//  </View>

//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#000000',
//     padding: 2,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 20,
//     textAlign: 'center',
//     padding: 20,
//     color: '#FFFFFF',
//     backgroundColor:'#000000',

//   },
//   text: {
//     color: '#FFFFFF',
//     textAlign: "center"
    
//   }
// });
// export default Destination; 
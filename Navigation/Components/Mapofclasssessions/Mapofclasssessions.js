import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';


export default function Phonelessstudents({ setCoursename, userdata, deleteToDo, id, idselected, setSelectedclass, selectedclass, setClasstrue, classtrue, lengthofclasses }) {


  const [pickindex, setPickindex] = useState(0);
  const [height, setHeight] = useState();
  const [height2, setHeight2] = useState(0);
  const [num, setNum] = useState();

  useEffect(() => {

    if (height > height2) {
      setHeight2(height)
    } else {
      setHeight2(height2)
    }
  }, [height]);



  useEffect(() => {

    if (typeof num != "undefined") {
      setPickindex(num)
    }
  }, [num]);




  useEffect(() => {
    if (typeof num != "undefined" && typeof height2 != "undefined" && typeof idselected != "undefined") {
      startAnimation();
      console.log(pickindex, height2, userdata.length)
    }
  }, [pickindex, idselected, height2]);


  const startAnimation = () => {
    if (pickindex === 0) {
      scrollview_ref.scrollTo({
        x: 0,
        y: 0,
        animated: true
      });
    } else if (pickindex === 1) {
      scrollview_ref.scrollTo({
        x: 0,
        y: 137.5,
        animated: true
      })
    } else {
      scrollview_ref.scrollTo({
        x: 0,
        y: (pickindex * 137.5),
        animated: true
      })
    }
  };


  const selectHandler = (value, i) => {

    if (value.id != idselected) {

      setSelectedclass(value);
      setNum(i);

    }
    else {
      setSelectedclass("");
    }
  };






  return (

    <ScrollView ref={(ref) => {
      scrollview_ref = ref;
    }}>

      {userdata.map((item, i) => {
        return (
          <View key={i} onLayout={(event) => {
            const layout = event.nativeEvent.layout.y;
            setHeight(layout);
          }}>

            {item.classname === "You haven't Registered" ? <View >
              <Pressable>

                <Text style={styles.unselected}>There are no Sessions{'\n'}Associated with this class.{'\n'}{'\n'}To Create One{'\n'}Return to Main Menu {'\n'}-then select-{'\n'}Begin A New Class

                </Text>
              </Pressable>


            </View> :
              <View >
                <Pressable
                  style={
                    item.id === idselected ? styles.selected : styles.unselected
                  }
                  onPress={() => selectHandler(item, i)}>
                  <Text style={styles.unselected
                  }> Class Number: {userdata.length - i}.{'\n'}{item.status} {'\n'}Began at {item.classbegin}{'\n'}on {item.todaysdate}.{'\n'}{item.lengthofclass > lengthofclasses ? lengthofclasses : item.lengthofclass} minute class.</Text>
                </Pressable>


              </View>}
          </View>
        );
      })}
    </ScrollView>

  );
}


const styles = StyleSheet.create({

  unselected: {
    backgroundColor: '#013469',
    textAlign: "center",
    fontSize: 17,
    margin: 6,
    flex: 1,
    color: "#ffffff",
    borderWidth: 3,
    borderColor: "#013469",
  },
  selected: {
    color: "#fff",
    backgroundColor: "#013469",
    borderWidth: 3,
    borderColor: "#E43522",
    margin: 6,
    fontSize: 20,
    borderRadius: 20,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
    flex: 1
  },

});
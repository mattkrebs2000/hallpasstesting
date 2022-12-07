import React from 'react';
import { ScrollView,View, Text, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ data, onSelect, idofclass }) {

  
// const selectHandler = (value) => {
//     onSelect(value);
//   };

  const selectHandler = (value) => {

    if (value.id != idofclass){

      onSelect(value);
   
    }
    else {
      onSelect("");
    }
  };

  return (
  <ScrollView>
      {data.map((item) => {
        return (
          <View  key={item.id}>
            <View >
          <Pressable
            style={
              item.id === idofclass ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.id)}>
            <Text style ={styles.unselected
            }> Period: {item.period}  {'\n'}Class: {item.classname} {'\n'}Teacher: {item.teacheriscalled}{'\n'} In Room: {item.location}</Text>
          </Pressable>
          </View>
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
import { View, Text,
    Modal,
    Button,
    TouchableOpacity,
    TextInput,
    StyleSheet, } from 'react-native'
import React from 'react'
import MaterialIconsfavorite from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {Picker} from '@react-native-picker/picker';
import {showMessage} from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';

const ViewScreen = ({route}) => {
    // const { passItems } = route.params;
    let passItems = route?.params?.passItems??[];
    console.log('viewww=',passItems)
  return (
    <View style={{flex:1}}>

        <Text style={{fontWeight:'bold',fontSize:20, color:'black', margin:10}}>Categories</Text>

          {/* {catergoriesList} */}
      {passItems.map((item, key) => (
        <View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Text   key={key} style={{flex: 1, fontSize: 20,color:'white',margin:10}}>
              {item.label}
            </Text>


        
            {console.log('subca',item?.subcategorie)}
        
          </View>

          {item?.subcategorie?.map((e,i)=>(
            <View  style={{ margin:10, flexDirection: 'row', justifyContent:'space-between'}}>

          <Text style={{margin:5}}>{e?.label}</Text>

      
          </View>
      ))}
                   
        </View>
      ))}
      
    </View>
  )
}

const styles = StyleSheet.create({
    InputBox: {
      borderWidth: 2,
      borderColor: 'black',
      marginHorizontal: 20,
      marginVertical: 20,
      color: 'black',
    },
    btncolor: {
      backgroundColor: 'blue',
      width: 100,
      borderRadius: 5,
      margin: 20,
      paddingVertical: 10,
    },
    btntxtFont: {
      fontSize: 15,
      color: 'white',
      textAlign: 'center',
    },
  });

export default ViewScreen
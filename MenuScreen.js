import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIconsfavorite from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {Picker} from '@react-native-picker/picker';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';

const MenuScreen = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // {label: 'Spain', value: 'spain'},
    // // {label: 'Madrid', value: 'madrid', parent: 'spain'},
    // {label: 'Barcelona', value: 'barcelona'},
    // {label: 'Italy', value: 'italy'},
    // {label: 'Rome', value: 'rome'},
    // {label: 'Finland', value: 'finland'},
  ]);

  const [seletedItem, setseletedItem] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [actionfor, setactionfor] = useState(null);
  const [userEmail, setEmail] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [subIndex, setIndex] = useState('');

  useFocusEffect(useCallback(() => {}));

  const toggleModal = () => {
    setEmail('');
    setIndex('');
    setModalVisible(!isModalVisible);
  };

  const toggleSubModal = () => {
    setSubModalVisible(!isSubModalVisible);
  };

  const onSubmit = () => {
    if (!userEmail) {
      showMessage({
        message: 'add item',
        type: 'danger',
      });
    } else {
      if (actionfor == 'AddCategorie') {
        const helper = [...items];
        helper.push({label: userEmail, value: userEmail});
        setItems(helper);
      } else {
        const helper = [...items];
        let subhelper = helper[subIndex]?.subcategorie
          ? [...helper[subIndex].subcategorie]
          : [];
        subhelper.push({label: userEmail, value: userEmail});
        helper[subIndex].subcategorie = subhelper;

        // setItems(helper);
        console.log('actionnn=', helper);
      }
    }

    toggleModal();
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
            margin: 10,
          }}>
          Add Categories
        </Text>

        {/* {drowpdown} */}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{marginRight: 30, marginLeft: 10, marginTop: 20, flex: 1}}>
            <Picker
              style={{backgroundColor: 'white'}}
              mode="dropdown"
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedLanguage(itemValue)
                  // console.log('dropdown=', itemValue),
               

                // const selectedhelper = [...seletedItem];
                // selectedhelper.push({label: itemValue, value: itemValue});

                // setseletedItem(selectedhelper);
                // console.log('select=', seletedItem)
              }}>
              <Picker.Item
                key={0}
                label={'Add item'}
                value={null}
                color="gray"
              />
              {items.map((e, i) => (
                <Picker.Item key={i + 1} label={e.label} value={e.value} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() => {
              setactionfor('AddCategorie');
              toggleModal();
            }}>
            <MaterialIconsfavorite
              name="add"
              size={20}
              color="black"
              style={{marginTop: 30, marginRight: 30}}
            />
          </TouchableOpacity>
        </View>

        {/* {alert} */}
        <Modal visible={isModalVisible} transparent={true}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                height: '40%',
                width: '75%',
                borderWidth: 5,
                borderColor: 'green',
              }}>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                {actionfor}
              </Text>

              {actionfor == 'AddSubCategorie' ? (
                <Text style={{fontSize: 20, marginLeft: 20, color: 'black'}}>
                  {items[subIndex]?.label}
                </Text>
              ) : (
                ''
              )}

              <TextInput
                placeholder="Item Name"
                onChangeText={userEmail => {
                  setEmail(userEmail);
                }}
                value={userEmail}
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.InputBox}></TextInput>

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    onSubmit();
                  }}
                  style={styles.btncolor}>
                  <Text style={styles.btntxtFont}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setactionfor(null);
                    toggleModal();
                  }}
                  style={styles.btncolor}>
                  <Text style={styles.btntxtFont}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* <View style={{flexDirection: 'row', flex: 1}}> */}

        {/* {catergoriesList} */}
        {items.map((item, key) => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Text
                key={key}
                style={{flex: 1, fontSize: 20, color: 'white', margin: 10}}>
                {item.label}
              </Text>

              {console.log('subca', item?.subcategorie)}


              {/* {delete} */}
              <TouchableOpacity
                  style={{marginRight: 15,marginBottom:10}}
                  onPress={() => {
                    const subitem = [...items];
                  
                    
                    // let subRemove = subitem[key]? [...subitem[key]]: [];
                    // console.log("dele=",subitem[key] );
                    subitem.splice(key, 1);

                    // subitem[key] = subRemove;
                    setItems(subitem);
                  }}>
                  <MaterialIconsfavorite
                    name="minimize"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>


              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  setactionfor('AddSubCategorie'), toggleModal(), setIndex(key);
                }}>
                <MaterialIconsfavorite name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {item?.subcategorie?.map((e, i) => (
              <View
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{margin: 5}}>{e?.label}</Text>

                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                    const subitem = [...items];
                    let subRemove = subitem[key].subcategorie
                      ? [...subitem[key]?.subcategorie]
                      : [];
                    // delete subRemove[i]
                    subRemove.splice(i, 1);

                    subitem[key].subcategorie = subRemove;
                    setItems(subitem);
                  }}>
                  <MaterialIconsfavorite
                    name="minimize"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        {/* </View> */}
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          console.log('con', items);
          navigation.navigate('ViewScreen', {passItems: items});
        }}
        style={[
          {
            width: '100%',
            backgroundColor: 'blue',
            marginVertical: 10,
            borderRadius: 5,
            paddingVertical: 10,
          },
        ]}>
        <Text style={styles.btntxtFont}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    margin: 10,
    paddingVertical: 10,
  },
  btntxtFont: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default MenuScreen;

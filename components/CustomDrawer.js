import * as React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent = ({navigation}) => {

    const informationOfAuthor = () => {
        Alert.alert('Version 2.0', 'Application made in React Native by Patryk Lach', [
            { text: 'OK', onPress: () => console.log(new Date().toISOString().split('T')[0]) },
        ]);
    }

    return (
        <DrawerContentScrollView>
            <DrawerItem
                label="Notes"
                icon={() => <MaterialIcons name="sticky-note-2" size={30} color="black" />}
                onPress={() => navigation.navigate('ListOfNotes')}
                style={{backgroundColor: "#F2CBBB"}}
                labelStyle={style.drawerItem}
            />
            <DrawerItem
                label="Add note"
                icon={() => <MaterialIcons name="note-add" size={30} color="black" />}
                onPress={() => navigation.navigate('AddingNoteScreen')}
                style={{backgroundColor: "#8ac6d1"}}
                labelStyle={style.drawerItem}
            />
            <DrawerItem
                label="Add category"
                icon={() => <MaterialIcons name="add-box" size={30} color="black" />}
                onPress={() => navigation.navigate('AddingCategoryScreen')}
                style={{backgroundColor: "#B7ADED"}}
                labelStyle={style.drawerItem}
            />
            <DrawerItem
                label="Info"
                icon={() => <MaterialIcons name="info" size={30} color="black" />}
                onPress={() => informationOfAuthor()}
                style={{backgroundColor: "#bbded6"}}
                labelStyle={style.drawerItem}
            />
        </DrawerContentScrollView>
    );
}

const style = StyleSheet.create({
    drawerItem: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 9
    }
})

export default CustomDrawerContent
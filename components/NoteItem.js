import * as React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import { MaterialIcons } from '@expo/vector-icons';

const NoteItem = ({bg}) => {
    return (
        <View style={{...style.body, backgroundColor: bg}}>
            <Text style={style.dateText}>date</Text>
        </View>
    );
}

const style = StyleSheet.create({
    body: {
        margin: 4,
        borderRadius: 16
    },
    dateText: {
        textAlign: 'right'
    }
})

export default NoteItem
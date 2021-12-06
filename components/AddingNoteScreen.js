import * as React from 'react';
import {Image, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";

const AddingNoteScreen = () => {

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')

    return(
        <LinearGradient
            style={style.background}
            colors={['#8ac6d1','#e2e2e2']}
        >
            <View style={style.content}>
                <TextInput
                    style={style.title}
                    underlineColorAndroid="#262626"
                    placeholder="Type title..."
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                    style={style.note}
                    underlineColorAndroid="#262626"
                    placeholder="Type your note..."
                    onChangeText={(text) => setNote(text)}
                />
                <TouchableOpacity
                    onPress={() => console.log("wrr")}
                    style={style.button}
                >
                    <Text style={style.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    background: {
        backgroundColor: '#4530b2',
        flex: 1,
    },
    content: {
        padding: 36
    },
    title: {
        padding: 16,
        fontSize: 24
    },
    note: {
        marginVertical: 48,
        padding: 16,
        fontSize: 24,
    },
    button: {
        borderWidth: 2,
        borderColor: '#262626',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20
    }
})
export default  AddingNoteScreen
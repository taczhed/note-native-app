import * as React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';

const AddingNoteScreen = () => {

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')

    const makeID = (length) => {
        let result = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const matchDate = () => {
        const month = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        return `${d.getDay()} ${month[d.getMonth()]}`;
    }

    const saveNote = async (title, text) => {
        const keys = await SecureStore.getItemAsync("keys")
        const key = makeID(6)
        const date = matchDate()
        if (keys === null) await SecureStore.setItemAsync("keys", key)
        else await SecureStore.setItemAsync("keys", `${keys}|${key}`)
        await SecureStore.setItemAsync(key, `${title}|${text}|${date}`)

        ToastAndroid.showWithGravity(
            'Note saved!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

    }

    useEffect(() => {

    })

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
                    onPress={() => saveNote(title, note)}
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
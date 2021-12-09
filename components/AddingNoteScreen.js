import * as React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import {useIsFocused} from "@react-navigation/native";

const AddingNoteScreen = ({navigation}) => {

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [categoriesArray, setCategoriesArray] = useState([])
    const [currentCategory, setCurrentCategory] = useState('')

    const isFocused = useIsFocused()

    const makeID = (length) => {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength))
        return result
    }

    const matchDate = () => {
        const month = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date()
        return `${d.getDate()} ${month[d.getMonth()]}`;
    }

    const generateColor = () => {
        const random = Math.floor(Math.random() * 5)
        const bgArray = ['#aacdc5', '#79b5c0', '#C5F6FA', '#FCE6A9', '#A7DB8C']
        return bgArray[random]
    }

    const saveNote = async (title, text) => {
        const keys = await SecureStore.getItemAsync("keys")
        const key = makeID(6)
        const date = matchDate()
        const color = generateColor()
        if (keys === null) await SecureStore.setItemAsync("keys", key)
        else await SecureStore.setItemAsync("keys", `${keys}|${key}`)
        await SecureStore.setItemAsync(key, `${title}|${text}|${date}|${currentCategory}|${color}`)
        await ToastAndroid.showWithGravity('Note saved!', ToastAndroid.SHORT, ToastAndroid.CENTER)
        await navigation.navigate('ListOfNotes')
    }

    const fetchCategories = async () => {
        let categories = await SecureStore.getItemAsync("categories")
        if (categories !== null) {
            categories = categories.split('|')
            categories = categories.filter(key => key !== "")
            console.log(categories)
            setCategoriesArray(categories)
            setCurrentCategory(categories[0])
        }
    }

    useEffect(async () => {
        await fetchCategories()
    }, [isFocused])

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
                <Text style={{fontSize: 16, marginBottom: 12, fontWeight: 'bold'}}>Select category:</Text>
                <View
                    style={style.select}
                >
                    <Picker
                        selectedValue={currentCategory}
                        onValueChange={value => setCurrentCategory(value)}
                    >
                        {categoriesArray.map((category, i) => (
                            <Picker.Item
                                key={i}
                                label={category}
                                value={category}
                            />
                        ))}
                    </Picker>
                </View>

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
    },
    select: {
        marginBottom: 26,
        borderWidth: 2,
        borderColor: '#262626',
    }
})
export default  AddingNoteScreen
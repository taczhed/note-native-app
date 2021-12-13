import * as React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import {useIsFocused} from "@react-navigation/native";

const EditingNoteScreen = ({navigation, route}) => {

    const [title, setTitle] = useState('')
    const [storeKey, setStoreKey] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('')

    const [categoriesArray, setCategoriesArray] = useState([])

    const isFocused = useIsFocused()

    const updateValues = () => {
        setTitle(route.params.title)
        setStoreKey(route.params.storeKey)
        setText(route.params.text)
        setCategory(route.params.category)
    }

    const editNote = async () => {
        await SecureStore.setItemAsync(storeKey, `${title}|${text}|${route.params.date}|${category}|${route.params.color}`)
        await ToastAndroid.showWithGravity('Note edited!', ToastAndroid.SHORT, ToastAndroid.CENTER)
        await navigation.navigate('ListOfNotes')
    }

    const fetchCategories = async () => {
        let categories = await SecureStore.getItemAsync("categories")
        if (categories !== null) {
            categories = categories.split('|')
            categories = categories.filter(key => key !== "")
            setCategoriesArray(categories)
        }
    }

    useEffect(async () => {
        await fetchCategories()
        await updateValues()
    }, [isFocused])

    return(
        <LinearGradient
            style={style.background}
            colors={['#f5d80c','#e2e2e2']}
        >
            <View style={style.content}>
                <TextInput
                    style={style.title}
                    underlineColorAndroid="#262626"
                    placeholder="Type title..."
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                    style={style.note}
                    underlineColorAndroid="#262626"
                    placeholder="Type your note..."
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
                <Text style={{fontSize: 16, marginBottom: 12, fontWeight: 'bold'}}>Select current category:</Text>
                <View
                    style={style.select}
                >
                    <Picker
                        selectedValue={category}
                        onValueChange={value => setCategory(value)}
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
                    onPress={() => editNote()}
                    style={style.button}
                >
                    <Text style={style.buttonText}>Save edits</Text>
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
export default EditingNoteScreen
import * as React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent = (routes) => {
    return (
        <DrawerContentScrollView {...routes}>

            <DrawerItemList
                {...routes}
            />

            <DrawerItem
                label="Info"
                icon={() => <MaterialIcons name="info" size={30} color="black" />}
                onPress={() => console.log("test")}
                style={styles.drawerItem}
                labelStyle={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    padding: 6
                }}
            />

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerItem: {
        padding: 6,
        backgroundColor: '#bbded6'
    }
})

export default CustomDrawerContent
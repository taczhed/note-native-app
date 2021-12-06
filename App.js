import * as React from 'react';
import { Image, StyleSheet, ViewText, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import ListOfNotes from "./components/ListOfNotes";
import AddingNoteScreen from "./components/AddingNoteScreen";
import CustomDrawer from "./components/CustomDrawer";
import { MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

//colors scheme
// nude #fae3d9
// pink #ffb6b9
// mint #bbded6
// ocean #8ac6d1
// bg #e2e6e8

export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator
            drawerContent={(routes) => <CustomDrawer {...routes} />}
            screenOptions={{
                drawerStyle: {
                    width: 264,
                },
            }}
        >
          <Drawer.Screen
              name="ListOfNotes"
              component={ListOfNotes}
              options={{
                  title: 'Notes',
                  headerStyle: {
                      backgroundColor: '#fae3d9',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
                  drawerIcon: () => <MaterialIcons name="sticky-note-2" size={30} color="black" />,
                  drawerItemStyle: {
                      backgroundColor: '#fae3d9',
                      padding: 6
                  },
                  drawerLabelStyle: {
                      fontWeight: 'bold',
                      fontSize: 20,
                      padding: 6
                  }
              }}
          />
          <Drawer.Screen
              name="AddingNoteScreen"
              component={AddingNoteScreen}
              options={{
                  title: 'Add Note',
                  headerStyle: {
                      backgroundColor: '#8ac6d1',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
                  drawerIcon: () => <MaterialIcons name="note-add" size={30} color="black" />,
                  drawerItemStyle: {
                      backgroundColor: '#8ac6d1',
                      padding: 6
                  },
                  drawerLabelStyle: {
                      fontWeight: 'bold',
                      fontSize: 20,
                      padding: 6
                  }
              }}
            />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<HomeScreen />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'space-around',
		textAlign: 'center',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
});

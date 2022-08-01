import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppStyles from '../stylesheets/globalStyles';
import AppButton from '../components/AppButton';
import { Text, Divider } from '@react-native-material/core';
import { useState } from 'react';
import {
	useFonts,
	OpenSans_700Bold,
	OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';
import AppListItem from '../components/AppListItem';

function HomeScreen() {
	const [loading, setLoading] = useState({
		Sarazen: false,
		Skip: false,
	});

	let [fontsLoaded] = useFonts({
		OpenSans_700Bold,
		OpenSans_400Regular,
	});

	const [lastChecked, setLastChecked] = useState({ sarazen: '', skip: '' });

	const [sarazenEnvironments, setSarazenEnvironments] = useState([
		{
			title: 'alpha',
			status: 0,
			isLoading: false,
			url: 'http://alpha-sarazen.golfbreaks.com/en-gb',
		},
		{
			title: 'beta',
			status: 0,
			isLoading: false,
			url: 'https://beta-sarazen.golfbreaks.com/en-gb',
		},
		{
			title: 'staging',
			status: 0,
			isLoading: false,
			url: 'https://www.golfbreaks.com/en-us/events/',
		},
		{
			title: 'production',
			status: 0,
			isLoading: false,
			url: 'https://golfbreaks.com/en-gb',
		},
	]);

	const [skipEnvironments, setSkipEnvironments] = useState([
		{
			title: 'alpha',
			status: 0,
			isLoading: false,
			url: 'http://alpha-skip.golfbreaks.com/en-gb',
		},
		{
			title: 'beta',
			status: 0,
			isLoading: false,
			url: 'https://beta-skip.golfbreaks.com/en-gb',
		},
		{
			title: 'staging',
			status: 0,
			isLoading: false,
			url: 'https://www.staging-skip.golfbreaks.com/en-gb',
		},
		{
			title: 'production',
			status: 0,
			isLoading: false,
			url: 'https://my.golfbreaks.com/en-gb',
		},
	]);

	const checkStatus = async website => {
		if (website === 'Sarazen') {
			setLastChecked({
				...lastChecked,
				sarazen: `${new Date().toLocaleDateString()} ${new Date().toTimeString()}`,
			});
			sarazenEnvironments.forEach((val, index) => {
				let environmentArray = [...sarazenEnvironments];
				environmentArray[index].isLoading = true;
				setSarazenEnvironments(environmentArray);

				const fetchURL = async () => {
					try {
						let res = await fetch(val.url);

						if (res) {
							environmentArray[index].status = res?.status;
						}
					} catch (error) {
						console.log(error);
					}
					environmentArray[index].isLoading = false;
					setSarazenEnvironments(environmentArray);
				};

				fetchURL();
			});
		} else {
			setLastChecked({
				...lastChecked,
				skip: `${new Date().toLocaleDateString()} ${new Date().toTimeString()}`,
			});
			skipEnvironments.forEach((val, index) => {
				let environmentArray = [...skipEnvironments];
				environmentArray[index].isLoading = true;
				setSkipEnvironments(environmentArray);

				const fetchURL = async () => {
					try {
						let res = await fetch(val.url);

						if (res) {
							environmentArray[index].status = res?.status;
						}
					} catch (error) {
						console.log(error);
					}
					environmentArray[index].isLoading = false;
					setSkipEnvironments(environmentArray);
				};

				fetchURL();
			});
		}
	};

	if (!fontsLoaded) {
		return <></>;
	}

	return (
		<View style={{ width: '90%' }}>
			<Text
				variant='h3'
				style={[
					styles.textCenter,
					{ marginBottom: 25, fontFamily: 'OpenSans_700Bold' },
				]}
			>
				Sarazen
			</Text>
			<Text
				variant='body1'
				style={{
					fontFamily: 'OpenSans_400Regular',
					marginBottom: AppStyles.spacing.s2,
				}}
			>
				{/* TODO: Grab date here dyanmically */}
				Last checked: {lastChecked?.sarazen}
			</Text>
			<AppButton
				primary
				label='Check status'
				size='large'
				onPress={() => checkStatus('Sarazen')}
				loading={loading.Sarazen}
			/>
			{sarazenEnvironments.map((env, index) => (
				<AppListItem
					key={`${env.title}_${index}`}
					title={env.title}
					isDown={env.status > 399 && env.status < 501}
					loading={env.isLoading}
					status={env.status}
				/>
			))}

			<Text
				variant='h3'
				style={[
					styles.textCenter,
					styles.openSans,
					{
						marginTop: AppStyles.spacing.s3,
						marginBottom: AppStyles.spacing.s3,
						fontFamily: 'OpenSans_700Bold',
					},
				]}
			>
				Skip
			</Text>
			<Text
				variant='body1'
				style={{
					fontFamily: 'OpenSans_400Regular',
					marginBottom: AppStyles.spacing.s2,
				}}
			>
				Last checked: {lastChecked?.sarazen}
			</Text>
			<AppButton
				primary
				label='Check status'
				size='large'
				onPress={() => checkStatus('Skip')}
				loading={loading.Skip}
			/>
			{skipEnvironments.map((env, index) => (
				<AppListItem
					key={`${env.title}_${index}`}
					title={env.title}
					isDown={env.status > 399 && env.status < 501}
					status={env.status}
					loading={env.isLoading}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	textCenter: {
		textAlign: 'center',
	},

	openSans: {
		fontFamily: fonts.osBold,
	},
});

export default HomeScreen;

import { ListItem, ActivityIndicator, Text } from '@react-native-material/core';
import AppStyles from '../stylesheets/globalStyles';
import {
	useFonts,
	OpenSans_700Bold,
	OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';
import { StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const AppListItem = ({ title, isDown, loading, status }) => {
	let [fontsLoaded] = useFonts({
		OpenSans_700Bold,
		OpenSans_400Regular,
	});

	const styles = StyleSheet.create({});

	if (!fontsLoaded) {
		return <></>;
	}

	return (
		<ListItem
			title={title}
			trailing={props =>
				loading ? (
					<ActivityIndicator color={AppStyles.colours.primary} />
				) : (
					<>
						<Icon
							name={isDown ? 'close' : 'check'}
							{...props}
							color={
								isDown
									? AppStyles.colours.error
									: AppStyles.colours.primary
							}
						/>
						{isDown && (
							<Text
								variant='caption'
								style={{ color: AppStyles.colours.error }}
							>
								{status}
							</Text>
						)}
					</>
				)
			}
			style={{ color: 'black', textTransform: 'capitalize' }}
		/>
	);
};
export default AppListItem;

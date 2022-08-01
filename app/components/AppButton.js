import { Button } from '@react-native-material/core';
import AppStyles from '../stylesheets/globalStyles';
import {
	useFonts,
	OpenSans_700Bold,
	OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';

const AppButton = ({
	disabled = false,
	error = false,
	href,
	label,
	lightPrimary = false,
	loading = false,
	onPress,
	outline = false,
	primary = true,
	secondary = false,
}) => {
	let [fontsLoaded] = useFonts({
		OpenSans_700Bold,
		OpenSans_400Regular,
	});

	const mode = primary
		? 'primary'
		: secondary
		? 'secondary'
		: lightPrimary
		? 'primaryLight'
		: error
		? 'error'
		: 'default';

	if (!fontsLoaded) {
		return <></>;
	}

	return (
		<Button
			href={href || ''}
			style={{ fontFamily: 'OpenSans_700Bold' }}
			disabled={disabled}
			variant={outline ? 'outlined' : 'contained'}
			disableElevation
			color={AppStyles.colours[mode]}
			onPress={onPress}
			title={!loading ? label : ''}
			loading={loading}
			tintColor='white'
		></Button>
	);
};
export default AppButton;

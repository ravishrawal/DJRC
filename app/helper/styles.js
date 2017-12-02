import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    roundedCorners: {
        borderRadius: 5,
        borderWidth: 5,
    },
    shadow: {
        shadowColor: '#ccc',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
    },
});

export default commonStyles;

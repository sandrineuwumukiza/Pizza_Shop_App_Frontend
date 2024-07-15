import { Image, StyleSheet, Text, View } from "react-native"
import { Images } from "../constants/images"


export const Header = () => {
    return(
<View>
    <View>
    <Image source={Images.Frie} style={styles.firstIcon}/>
    </View>
<View>
    <Image source={Images.Alcohol} style={styles.profile}/>
</View>
<View>
<Ionicons name="search-outline" size={24} color="#000" style={styles.icon} /> 
</View>
</View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
containerIcon:{
    backgroundColor: "white",
    height:44,
    width:44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems:'center'
},
firsIcon:{
    height: 28,
    width:28,
},
profile:{
    height:44,
    width: 44,
    borderRadius: 22
}
})
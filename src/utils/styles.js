import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({

  BodyH: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#484d50',
  },

  BodyC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#484d50',
    paddingTop: 100,
  },

  Heading: {
    marginTop: 30,
    fontSize: 30,
    color: '#fff',
  },

  TextDeg: {
    color: '#fff',
    position: 'absolute',
    textAlign: 'center'
  },

  TextC: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },

  TextH: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },

  TextCT: {
    color: '#fff',
    // marginBottom: ,
  },

  Touchzin: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%",
    height: 50,
    backgroundColor: '#222222',
    borderRadius: 5,
  },

  infoContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 0,
  },

  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    width: '100%',
    height: 300,
    zIndex: 10,
    
  },

});

export default styles;
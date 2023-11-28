import React, { useState, useEffect } from 'react';
import { Image, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styles from '../utils/styles';

const { height, width } = Dimensions.get('window');

export default CompassScr = ({ navigation }) => {

    // CONSTS PARA O MAPA e BÚSSOLA

    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);
    const [location, setLocation] = useState(null);

    // USEEFECT PARA O MAPA

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Não tem permissão');
                return;
            }

            let info = await Location.getCurrentPositionAsync({});
            console.log(info);
            setLocation(info);
        })();
    }, []);

    // USEEFFECT PARA A BÚSSOLA

    useEffect(() => {
        toggle();
        return () => {
            unsubscribe();
        };
    }, []);

    const toggle = () => {
        if (subscription) {
            unsubscribe();
        } else {
            subscribe();
        }
    };

    const subscribe = () => {
        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer(angle(data));
            })
        );
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const angle = (magnetometer) => {
        let angle = 0;
        if (magnetometer) {
            let { x, y, z } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(angle);
    };

    const direction = (degree) => {

        if (degree >= 22.5 && degree < 67.5) {           
            return 'NORDESTE';
        }
        else if (degree >= 67.5 && degree < 112.5) {
            return 'LESTE';
        }
        else if (degree >= 112.5 && degree < 157.5) {
            return 'SUDESTE';
        }
        else if (degree >= 157.5 && degree < 202.5) {
            return 'SUL';
        }
        else if (degree >= 202.5 && degree < 247.5) {
            return 'SUDOESTE';
        }
        else if (degree >= 247.5 && degree < 292.5) {
            return 'OESTE';
        }
        else if (degree >= 292.5 && degree < 337.5) {
            return 'NOROESTE';
        }
        else {
            return 'NORTE';
        }
    };

    const degree = (magnetometer) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    return (

        <ScrollView>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#484d50',
            paddingTop: 100,

        }}>

            <Text style={styles.TextC}>Esta é a nossa página de bússola.</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={styles.Touchzin}
            >
                <Text style={styles.TextCT}>Voltar para a Home</Text>
            </TouchableOpacity>

            <Text style={styles.Heading}>
                {direction(degree(magnetometer))}
            </Text>

            <Grid>
                <Row style={{ alignItems: 'center' }} size={.6}>
                    <Col style={{ alignItems: 'center' }}>
                        <Text
                            style={
                                {
                                    color: '#fff',
                                    // fontSize: height / 26,
                                    fontWeight: 'bold'
                                }
                            }>
                            {direction(degree(magnetometer))}
                        </Text>
                    </Col>
                </Row>

                <Row style={{ alignItems: 'center' }} size={.1}>
                    <Col style={{ alignItems: 'center' }}>
                        <View style={
                            {
                                position: 'absolute',
                                width: width,
                                alignItems: 'center',
                                top: 0
                            }
                        }>
                            <Image source={require('../assets/compass_pointer.png')} style={
                                {
                                    height: height / 26,
                                    resizeMode: 'contain'
                                }
                            } />
                        </View>
                    </Col>
                </Row>

                <Row style={{ alignItems: 'center' }} size={0.7}>
                    <Text style={styles.TextDeg}>
                        {degree(magnetometer)}°
                    </Text>

                    <Col style={{ alignItems: 'center' }}>

                        <Image source={require("../assets/compass_bg.png")} style={
                            {
                                height: width - 80,
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                                transform: [{ rotate: 360 - magnetometer + 'deg' }]
                            }
                        } />
                    </Col>
                </Row>
            </Grid>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    Latitude: {location?.coords.latitude}, Longitude: {location?.coords.longitude}
                </Text>
            </View>
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="My Location"
                        description="This is where I am"
                    />
                </MapView>
            )}
        </View>
        </ScrollView>
    );
}
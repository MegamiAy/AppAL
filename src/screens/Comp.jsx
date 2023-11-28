import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styles from '../utils/styles';

const { height, width } = Dimensions.get('window');

export default CompassScr = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [background, setBackground] = useState('#484d50');
    const [directionName, setDirectionName] = useState('NORTE');
    const [magnetometer, setMagnetometer] = useState(0);
    const magnetometerRef = useRef(null);

    useEffect(() => {
        const setupSensors = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Não tem permissão');
                return;
            }

            let info = await Location.getCurrentPositionAsync({});
            console.log(info);
            setLocation(info);

            if (!magnetometerRef.current) {
                magnetometerRef.current = Magnetometer.addListener((data) => {
                    setMagnetometer(angle(data));
                    updateDirection(angle(data));
                });
                Magnetometer.setUpdateInterval(100);
            }
        };

        setupSensors();

        return () => {
            if (magnetometerRef.current) {
                magnetometerRef.current.remove();
                magnetometerRef.current = null;
            }
        };
    }, []);

    const angle = (magnetometer) => {
        let angle = 0;
        if (magnetometer) {
            let { x, y, z } = magnetometer;
            angle = Math.atan2(x, y) * (180 / Math.PI);
            angle = angle >= 0 ? angle : 360 + angle;
        }
        return Math.round(angle);
    };

    const updateDirection = (degree) => {
        let color = '#484d50';
        let name = 'NORTE';

        if (degree >= 22.5 && degree < 67.5) {
            name = 'NORDESTE';
            color = '#9A7D0A';
        } else if (degree >= 67.5 && degree < 112.5) {
            name = 'LESTE';
            color = '#922B21';
        } else if (degree >= 112.5 && degree < 157.5) {
            name = 'SUDESTE';
            color = '#148F77';
        } else if (degree >= 157.5 && degree < 202.5) {
            name = 'SUL';
            color = '#2E4053';
        } else if (degree >= 202.5 && degree < 247.5) {
            name = 'SUDOESTE';
            color = '#2874A6';
        } else if (degree >= 247.5 && degree < 292.5) {
            name = 'OESTE';
            color = '#6C3483';
        } else if (degree >= 292.5 && degree < 337.5) {
            name = 'NOROESTE';
            color = '#935116';
        }

        setBackground(color);
        setDirectionName(name);
    };

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: background,
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
                    {directionName}
                </Text>

                <Grid>
                    <Row style={{ alignItems: 'center' }} size={.6}>
                        <Col style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>
                                {directionName}
                            </Text>
                        </Col>
                    </Row>

                    <Row style={{ alignItems: 'center' }} size={.1}>
                        <Col style={{ alignItems: 'center' }}>
                            <View style={{
                                position: 'absolute',
                                width: width,
                                alignItems: 'center',
                                top: 0
                            }}>
                                <Image source={require('../assets/compass_pointer.png')} style={{
                                    height: height / 26,
                                    resizeMode: 'contain'
                                }} />
                            </View>
                        </Col>
                    </Row>

                    <Row style={{ alignItems: 'center' }} size={0.7}>
                        <Text style={styles.TextDeg}>
                            {magnetometer}°
                        </Text>

                        <Col style={{ alignItems: 'center' }}>
                            <Image source={require("../assets/compass_bg.png")} style={{
                                height: width - 80,
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                                transform: [{ rotate: 360 - magnetometer + 'deg' }]
                            }} />
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

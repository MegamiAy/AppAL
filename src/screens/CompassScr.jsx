import React, { useState, useEffect } from 'react';
import { Image, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Magnetometer } from 'expo-sensors';
import MapView, { Marker } from 'react-native-maps';
import styles from '../utils/styles';

const { height, width } = Dimensions.get('window');

export default CompassScr = ({ navigation }) => {

    // CONSTS PARA O MAPA e BÚSSOLA
    
    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);

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

    // DIREÇÕES DA BÚSSOLA (NORTE, SUL, LESTE, OESTE, NORDESTE, SUDESTE, SUDOESTE, NOROESTE)

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#484d50' }}>

                <Text >Esta é a nossa página de bússola.</Text>

                <TouchableOpacity 
                onPress={() => navigation.navigate("Home")}>
                    <Text>Voltar para a Home</Text>
                </TouchableOpacity>

                <Text style={styles.Heading}>{direction(degree(magnetometer))}</Text>

                <Grid>
                    <Row style={{ alignItems: 'center' }} size={.9}>
                        <Col style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: height / 26,
                                    fontWeight: 'bold'
                                }}>
                                {direction(degree(magnetometer))}
                            </Text>
                        </Col>
                    </Row>

                    <Row style={{ alignItems: 'center' }} size={.1}>
                        <Col style={{ alignItems: 'center' }}>
                            <View style={{ position: 'absolute', width: width, alignItems: 'center', top: 0 }}>
                                <Image source={require('../assets/compass_pointer.png')} style={{
                                    height: height / 26,
                                    resizeMode: 'contain'
                                }} />
                            </View>
                        </Col>
                    </Row>

                    <Row style={{ alignItems: 'center' }} size={2}>
                        <Text style={{
                            color: '#fff',
                            fontSize: height / 27,
                            width: width,
                            position: 'absolute',
                            textAlign: 'center'
                        }}>
                            {degree(magnetometer)}°
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
            </View>
        );
    }
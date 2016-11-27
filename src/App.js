import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import firebase from 'firebase';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        // Initialize Firebase
        firebase.initializeApp({
            apiKey: 'AIzaSyCe16Rmy1Va5Jax-FVhm0ymotfaVG47_3w',
            authDomain: 'auth-75dd9.firebaseapp.com',
            databaseURL: 'https://auth-75dd9.firebaseio.com',
            storageBucket: 'auth-75dd9.appspot.com',
            messagingSenderId: '1018056475482'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => {
                            firebase.auth().signOut();
                        }}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return (
                    <LoginForm/>
                );
            default:
                return (
                    <CardSection>
                        <Spinner/>
                    </CardSection>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;

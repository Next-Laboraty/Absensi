import React, { Component } from 'react'
import { Text, View, TextInput,StyleSheet } from 'react-native'
import io from "socket.io-client";

export default class ChatManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatMessage: "",
            chatMessages: []
        };
    }
    submitChatMessage() {
        this.socket.emit('chat message', this.state.chatMessage);
        this.setState({ chatMessage: '' });
    }
    componentDidMount() {
        this.socket = io("http://127.0.0.1:3000");
        this.socket.on("chat message", msg => {
            this.setState({
                chatMessages: [...this.state.chatMessages, msg]
            });
        })
    }
    render() {
        const chatMessages = this.state.chatMessages.map(chatMessage => (
            <Text style={{ borderWidth: 2, top: 500 }}>{chatMessage}</Text>
        ));

        return (
            <View style={styles.container}>
                {chatMessages}
                <TextInput
                    style={{ height: 40, borderWidth: 2, top: 600 }}
                    autoCorrect={false}
                    value={this.state.chatMessage}
                    onSubmitEditing={() => this.submitChatMessage()}
                    onChangeText={chatMessage => {
                        this.setState({ chatMessage });
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      height: 400,
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi, good morning. I want to confirm your order, that the motorbike is available on time 🙏', sender: 'them' },
    { id: '2', text: 'Ok, thank you for the confirmation', sender: 'me' },
    { id: '3', text: "If there's any question, feel free to ask us anytime.", sender: 'them' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input.trim(), sender: 'me' }]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Prajal Motor</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        renderItem={({ item }) => (
          <View style={[styles.bubbleWrapper, item.sender === 'me' ? styles.meWrapper : styles.themWrapper]}>
            <View style={[styles.bubble, item.sender === 'me' ? styles.meBubble : styles.themBubble]}>
              <Text style={[styles.bubbleText, item.sender === 'me' ? styles.meText : styles.themText]}>
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Write a message..." value={input} onChangeText={setInput} onSubmitEditing={sendMessage} />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1ECE2' },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16342A',
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
  },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  chatContainer: { padding: 16 },
  bubbleWrapper: { marginBottom: 10 },
  meWrapper: { alignItems: 'flex-end' },
  themWrapper: { alignItems: 'flex-start' },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16 },
  meBubble: { backgroundColor: '#16342A', borderBottomRightRadius: 4 },
  themBubble: { backgroundColor: '#FFFCF6', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#E4DDCC' },
  bubbleText: { fontSize: 13, lineHeight: 18 },
  meText: { color: '#fff' },
  themText: { color: '#1B2A22' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFFCF6', borderTopWidth: 1, borderTopColor: '#E4DDCC' },
  input: { flex: 1, backgroundColor: '#F1ECE2', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10, fontSize: 13, color: '#1B2A22' },
  sendButton: { backgroundColor: '#16342A', width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  sendText: { color: '#fff', fontSize: 16 },
});

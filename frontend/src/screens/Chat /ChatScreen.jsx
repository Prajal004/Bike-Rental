import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../styles/theme';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi, good morning. I want to confirm your order, that the motorbike is available on time 🙏', sender: 'them' },
    { id: '2', text: 'Ok, thank you for the confirmation', sender: 'me' },
    { id: '3', text: "If there's any question, feel free to ask us anytime.", sender: 'them' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input.trim(), sender: 'me' }]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.bubbleWrapper, item.sender === 'me' ? styles.meWrapper : styles.themWrapper]}>
      <View style={[styles.bubble, item.sender === 'me' ? styles.meBubble : styles.themBubble]}>
        <Text style={[styles.bubbleText, item.sender === 'me' ? styles.meText : styles.themText]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prajal Motor</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          placeholderTextColor={COLORS.inkSoft}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.stone },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.pine,
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  chatContainer: { padding: 16, paddingBottom: 20 },
  bubbleWrapper: { marginBottom: 10 },
  meWrapper: { alignItems: 'flex-end' },
  themWrapper: { alignItems: 'flex-start' },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  meBubble: {
    backgroundColor: COLORS.pine,
    borderBottomRightRadius: 4,
  },
  themBubble: {
    backgroundColor: COLORS.paper,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  bubbleText: { fontSize: 13, lineHeight: 18 },
  meText: { color: '#fff' },
  themText: { color: COLORS.ink },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.paper,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.stone,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.ink,
  },
  sendButton: {
    backgroundColor: COLORS.pine,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
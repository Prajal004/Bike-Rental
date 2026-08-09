import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) {
      alert('Please write a comment');
      return;
    }
    onSubmit?.({ rating, comment });
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rating</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, star <= rating && styles.starFilled]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: COLORS.white, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  stars: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  star: { fontSize: 32, color: COLORS.starEmpty },
  starFilled: { color: COLORS.star },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, minHeight: 80, textAlignVertical: 'top', marginBottom: 12 },
  button: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});

export default ReviewForm;

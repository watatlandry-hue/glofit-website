import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Body, Muted, PrimaryButton } from '@/components/ui';
import { chatMessages, fitpals } from '@/data/mock';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';
import type { ChatMessage } from '@/types';

export default function ChatConversation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);

  const pal = useMemo(
    () => fitpals.find((p) => p.id === id) ?? fitpals[0],
    [id]
  );

  const send = () => {
    if (!draft.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        kind: 'text',
        author: 'me',
        authorEmoji: '😊',
        text: draft.trim(),
        time,
      },
    ]);
    setDraft('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={{ color: colors.text, fontSize: 22 }}>‹</Text>
          </Pressable>
          <View style={[styles.avatar, { backgroundColor: pal.bgColor }]}>
            <Text style={{ fontSize: 22 }}>{pal.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{pal.name}</Text>
            <Body size={11} color={colors.green}>
              ● En ligne · {pal.distanceKm} km
            </Body>
          </View>
          <Text style={{ fontSize: 20 }}>📍</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => <MessageBubble message={item} />}
        />

        {/* Input */}
        <View style={styles.inputBar}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Message…"
            placeholderTextColor={colors.textDim}
            style={styles.input}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable onPress={send} style={styles.sendBtn}>
            <Text style={{ fontSize: 16 }}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const me = message.author === 'me';

  if (message.kind === 'invite') {
    return (
      <View style={[styles.msgRow]}>
        <View style={styles.msgAvatar}>
          <Text style={{ fontSize: 14 }}>{message.authorEmoji}</Text>
        </View>
        <View style={{ maxWidth: '85%' }}>
          <View style={styles.invite}>
            <Text style={styles.inviteTitle}>{message.title}</Text>
            <Muted size={11} style={{ marginTop: 6, marginBottom: 10 }}>
              {message.details}
            </Muted>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <PrimaryButton
                title="✓ Accepter"
                variant="small"
                style={{ flex: 1 }}
              />
              <PrimaryButton
                title="✗ Décliner"
                variant="small"
                color={colors.card2}
                textColor={colors.textDim}
                style={{ flex: 1 }}
              />
            </View>
          </View>
          <Muted size={10} style={{ marginTop: 4, alignSelf: 'flex-end' }}>
            {message.time}
          </Muted>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.msgRow, me && styles.msgRowMe]}>
      <View style={styles.msgAvatar}>
        <Text style={{ fontSize: 14 }}>{message.authorEmoji}</Text>
      </View>
      <View style={{ maxWidth: '80%' }}>
        <View style={[styles.bubble, me ? styles.bubbleMe : styles.bubbleThem]}>
          <Text style={[styles.bubbleText, me && { color: colors.lime }]}>
            {message.text}
          </Text>
        </View>
        <Muted size={10} style={{ marginTop: 4, alignSelf: 'flex-end' }}>
          {message.time}
        </Muted>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.text,
  },
  msgRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  msgRowMe: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 16,
  },
  bubbleThem: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: 'rgba(200,241,53,0.15)',
    borderColor: 'rgba(200,241,53,0.2)',
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  invite: {
    backgroundColor: 'rgba(26,42,10,1)',
    borderWidth: 1,
    borderColor: 'rgba(200,241,53,0.3)',
    borderRadius: 16,
    padding: 14,
  },
  inviteTitle: {
    fontFamily: fonts.display,
    fontSize: 13,
    color: colors.text,
  },
  inputBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 13,
  },
  sendBtn: {
    width: 38,
    height: 38,
    backgroundColor: colors.lime,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

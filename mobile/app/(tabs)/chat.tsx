import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { Body, Muted } from '@/components/ui';
import { fitpals } from '@/data/mock';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export default function ChatListScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }} edges={['top']}>
      <ScreenHeader title="Messages" accent="💬" subtitle="Tes conversations FitPal" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        {fitpals.map((pal, i) => (
          <Pressable
            key={pal.id}
            style={styles.item}
            onPress={() => router.push(`/chat/${pal.id}`)}
          >
            <View style={[styles.avatar, { backgroundColor: pal.bgColor }]}>
              <Text style={{ fontSize: 22 }}>{pal.emoji}</Text>
              <View
                style={[
                  styles.onlineBadge,
                  pal.online === 'away' && { backgroundColor: colors.orange },
                ]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.name}>{pal.name}</Text>
                <Muted size={11}>{i === 0 ? '14:26' : i === 1 ? 'Hier' : 'Lun'}</Muted>
              </View>
              <Body size={12} color={colors.textDim} style={{ marginTop: 4 }}>
                {i === 0
                  ? 'Parfait ! Demain 7h ça te va ? 🏃‍♂️'
                  : i === 1
                  ? 'On se voit à la salle ?'
                  : 'Merci pour la session 🙏'}
              </Body>
            </View>
            {i === 0 && <View style={styles.unread} />}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.dark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.text,
  },
  unread: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.lime,
  },
});

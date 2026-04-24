import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

function TabIcon({
  icon,
  label,
  focused,
}: {
  icon: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.item, { opacity: focused ? 1 : 0.5 }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.label, { color: focused ? colors.lime : colors.textDim }]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label="Accueil" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="fitmap"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📍" label="FitMap" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📋" label="Plan" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏆" label="Coach" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="💬" label="Chat" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'rgba(15,15,15,0.95)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 72,
    paddingTop: 8,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 60,
  },
  icon: { fontSize: 22 },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
  },
});

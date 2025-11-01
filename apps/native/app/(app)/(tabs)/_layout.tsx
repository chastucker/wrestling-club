import { Tabs } from 'expo-router';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useUserRole } from '@/hooks/useUserRole';
import { getTabsForRole } from '@/lib/navigation';

export default function TabLayout() {
  const { activeRole } = useUserRole();
  const tabs = getTabsForRole(activeRole);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0f52ba',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
        },
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Feather name={tab.icon as any} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

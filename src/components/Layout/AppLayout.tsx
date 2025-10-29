'use client';

import { ReactNode, useState, useEffect } from 'react';
import { AppShell, Burger, Group, Title, Avatar, Menu, UnstyledButton, Text, rem, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconBriefcase,
  IconMap2,
  IconBell,
  IconSettings,
  IconLogout,
  IconUser,
  IconChevronDown,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { loadProfile } from '@/lib/userStore';
import { Logo } from './Logo';
import Sidebar from './Sidebar';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const [user, setUser] = useState(() => loadProfile());
  const [unreadNotifications] = useState(3);

  const handleNavigateToProfile = () => {
    router.push('/profile');
    notifications.show({
      title: 'Opening Profile',
      message: 'Navigating to your profile page',
      color: 'blue',
      icon: <IconUser size={18} />,
    });
  };

  useEffect(() => {
    const onUpdate = (e: any) => {
      if (e && e.detail) setUser(e.detail);
    };

    window.addEventListener('joborbit:profileUpdated', onUpdate as EventListener);
    return () => window.removeEventListener('joborbit:profileUpdated', onUpdate as EventListener);
  }, []);

  const handleNavigateToSettings = () => {
    router.push('/settings');
    notifications.show({
      title: 'Opening Settings',
      message: 'Customize your JobOrbit experience',
      color: 'cyan',
      icon: <IconSettings size={18} />,
    });
  };

  const handleNavigateToNotifications = () => {
    router.push('/notifications');
  };

  const handleLogout = () => {
    notifications.show({
      title: 'Logged Out Successfully',
      message: 'See you soon! Your session has been ended.',
      color: 'red',
      icon: <IconLogout size={18} />,
    });
    
    // Simulate logout delay
    setTimeout(() => {
      // In a real app, you would clear tokens, reset state, etc.
      router.push('/');
    }, 1500);
  };

  return (
    <AppShell
      className={styles.layout}
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Group gap="xs">
                <Logo />
                <Title order={3} style={{ background: 'linear-gradient(135deg, #0080ff 0%, #ff63a1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  JOBORBIT
                </Title>
              </Group>
            </motion.div>
          </Group>

          <Group>
            <Menu shadow="md" width={250} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className={styles.userButton}>
                  <Group gap="sm">
                    <div style={{ position: 'relative' }}>
                      <Avatar color="primary" radius="xl">
                        {user.name.split(' ').map((n) => n[0]).join('')}
                      </Avatar>
                      {unreadNotifications > 0 && (
                        <Badge
                          size="xs"
                          variant="filled"
                          color="red"
                          style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            padding: '0 6px',
                            minWidth: 20,
                          }}
                        >
                          {unreadNotifications}
                        </Badge>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500} c="white">
                        {user.name}
                      </Text>
                      <Text size="xs" c="gray.5">
                        {user.role}
                      </Text>
                    </div>
                    <IconChevronDown size={16} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown
                style={{
                  background: 'rgba(30, 40, 55, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Menu.Label>
                  <Group gap="xs">
                    <Avatar size="sm" color="primary" radius="xl">
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <div>
                      <Text size="xs" fw={600} c="white">
                        {user.name}
                      </Text>
                      <Text size="xs" c="gray.5">
                        {user.email}
                      </Text>
                    </div>
                  </Group>
                </Menu.Label>
                <Menu.Divider />
                <Menu.Label c="gray.5">Account</Menu.Label>
                <Menu.Item
                  leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleNavigateToProfile}
                >
                  <Text c="white">Profile</Text>
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleNavigateToSettings}
                >
                  <Text c="white">Settings</Text>
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconBell style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleNavigateToNotifications}
                  rightSection={
                    unreadNotifications > 0 ? (
                      <Badge size="xs" variant="filled" color="red">
                        {unreadNotifications}
                      </Badge>
                    ) : null
                  }
                >
                  <Text c="white">Notifications</Text>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </AppShell.Main>
    </AppShell>
  );
}

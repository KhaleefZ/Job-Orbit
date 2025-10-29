'use client';

import { Container, Title, Text, Card, Stack, Group, Badge, Button, Tabs, ScrollArea, ActionIcon, Avatar } from '@mantine/core';
import { IconBell, IconBriefcase, IconMessage, IconStar, IconCheck, IconTrash, IconSettings } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { loadNotifications, saveNotifications } from '@/lib/userStore';

interface Notification {
  id: string;
  type: 'job' | 'message' | 'system' | 'application';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
  action?: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [notificationsList, setNotificationsList] = useState<Notification[]>(() => loadNotifications());

  useEffect(() => {
    const onUpdate = (e: any) => {
      if (e && e.detail) setNotificationsList(e.detail);
    };
    window.addEventListener('joborbit:notificationsUpdated', onUpdate as EventListener);
    return () => window.removeEventListener('joborbit:notificationsUpdated', onUpdate as EventListener);
  }, []);

  const handleMarkAsRead = (id: string) => {
    const updated = notificationsList.map(notif => notif.id === id ? { ...notif, read: true } : notif);
    setNotificationsList(updated);
    saveNotifications(updated);
    notifications.show({
      message: 'Notification marked as read',
      color: 'blue',
    });
  };

  const handleMarkAllAsRead = () => {
    const updated = notificationsList.map(notif => ({ ...notif, read: true }));
    setNotificationsList(updated);
    saveNotifications(updated);
    notifications.show({
      title: 'All notifications marked as read',
      message: 'You\'re all caught up!',
      color: 'teal',
      icon: <IconCheck size={18} />,
    });
  };

  const handleDelete = (id: string) => {
    const updated = notificationsList.filter(notif => notif.id !== id);
    setNotificationsList(updated);
    saveNotifications(updated);
    notifications.show({
      message: 'Notification deleted',
      color: 'red',
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.action) {
      handleMarkAsRead(notification.id);
      router.push(notification.action);
    }
  };

  const filterNotifications = (type?: string) => {
    if (!type || type === 'all') return notificationsList;
    return notificationsList.filter(notif => notif.type === type);
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        background: notification.read ? 'rgba(45, 55, 72, 0.4)' : 'rgba(45, 55, 72, 0.7)',
        backdropFilter: 'blur(20px)',
        border: notification.read ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 128, 255, 0.3)',
        cursor: notification.action ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
      }}
      onClick={() => handleNotificationClick(notification)}
    >
      <Group justify="space-between" wrap="nowrap">
        <Group gap="md" style={{ flex: 1 }}>
          <Avatar color={notification.color} radius="xl" size="lg">
            <notification.icon size={24} />
          </Avatar>
          <div style={{ flex: 1 }}>
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={600} c="white">
                {notification.title}
              </Text>
              {!notification.read && (
                <Badge size="xs" color="blue" variant="filled">
                  New
                </Badge>
              )}
            </Group>
            <Text size="sm" c="gray.4" mb="xs">
              {notification.description}
            </Text>
            <Text size="xs" c="gray.5">
              {notification.time}
            </Text>
          </div>
        </Group>
        <Group gap="xs">
          {!notification.read && (
            <ActionIcon
              variant="light"
              color="blue"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsRead(notification.id);
              }}
            >
              <IconCheck size={18} />
            </ActionIcon>
          )}
          <ActionIcon
            variant="light"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(notification.id);
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );

  return (
    <Container size="xl" py="xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={1} mb="xs" c="white">
              <Group gap="xs">
                <IconBell size={36} stroke={2} color="var(--mantine-color-primary-6)" />
                Notifications
              </Group>
            </Title>
            <Text c="gray.4" size="lg">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
            </Text>
          </div>
          <Group gap="md">
            <Button
              variant="light"
              leftSection={<IconCheck size={18} />}
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All as Read
            </Button>
            <Button
              variant="light"
              leftSection={<IconSettings size={18} />}
              onClick={() => router.push('/settings')}
            >
              Settings
            </Button>
          </Group>
        </Group>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card
          shadow="md"
          padding="xl"
          radius="md"
          style={{
            background: 'rgba(45, 55, 72, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List mb="lg">
              <Tabs.Tab value="all">
                All
                {notificationsList.length > 0 && (
                  <Badge size="xs" ml="xs" variant="filled">
                    {notificationsList.length}
                  </Badge>
                )}
              </Tabs.Tab>
              <Tabs.Tab value="job" leftSection={<IconBriefcase size={16} />}>
                Jobs
                {filterNotifications('job').length > 0 && (
                  <Badge size="xs" ml="xs" variant="filled">
                    {filterNotifications('job').length}
                  </Badge>
                )}
              </Tabs.Tab>
              <Tabs.Tab value="message" leftSection={<IconMessage size={16} />}>
                Messages
                {filterNotifications('message').length > 0 && (
                  <Badge size="xs" ml="xs" variant="filled">
                    {filterNotifications('message').length}
                  </Badge>
                )}
              </Tabs.Tab>
              <Tabs.Tab value="application" leftSection={<IconStar size={16} />}>
                Applications
                {filterNotifications('application').length > 0 && (
                  <Badge size="xs" ml="xs" variant="filled">
                    {filterNotifications('application').length}
                  </Badge>
                )}
              </Tabs.Tab>
              <Tabs.Tab value="system" leftSection={<IconCheck size={16} />}>
                System
                {filterNotifications('system').length > 0 && (
                  <Badge size="xs" ml="xs" variant="filled">
                    {filterNotifications('system').length}
                  </Badge>
                )}
              </Tabs.Tab>
            </Tabs.List>

            <ScrollArea h={600}>
              <Stack gap="md">
                {filterNotifications(activeTab || 'all').length === 0 ? (
                  <Card
                    padding="xl"
                    style={{
                      background: 'rgba(45, 55, 72, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Stack align="center" gap="md" py="xl">
                      <IconBell size={48} color="var(--mantine-color-gray-6)" />
                      <Text size="lg" c="gray.5" ta="center">
                        No notifications in this category
                      </Text>
                    </Stack>
                  </Card>
                ) : (
                  filterNotifications(activeTab || 'all').map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <NotificationCard notification={notification} />
                    </motion.div>
                  ))
                )}
              </Stack>
            </ScrollArea>
          </Tabs>
        </Card>
      </motion.div>
    </Container>
  );
}

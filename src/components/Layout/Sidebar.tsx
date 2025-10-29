'use client';

import { useState } from 'react';
import { NavLink, Stack, Text } from '@mantine/core';
import {
  IconDashboard,
  IconBriefcase,
  IconMap2,
  IconUsers,
  IconChartBar,
  IconBookmark,
  IconMessage,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';

const navItems = [
  { icon: IconDashboard, label: 'Mission Control', href: '/' },
  { icon: IconBriefcase, label: 'Job Search', href: '/jobs' },
  { icon: IconMap2, label: 'Career Map', href: '/career-map' },
  { icon: IconBookmark, label: 'Saved Jobs', href: '/saved' },
  { icon: IconChartBar, label: 'Analytics', href: '/analytics' },
  { icon: IconUsers, label: 'Mentors', href: '/mentors' },
  { icon: IconMessage, label: 'Messages', href: '/messages' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <Stack gap="xs">
      <Text size="xs" fw={700} tt="uppercase" c="gray.5" px="md" mb="xs">
        Navigation
      </Text>
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          leftSection={<item.icon size={20} stroke={1.5} />}
          active={router.pathname === item.href}
          className={styles.navLink}
          variant="subtle"
        />
      ))}
    </Stack>
  );
}

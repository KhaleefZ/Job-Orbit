'use client';

import { Card, Stack, Button, Group } from '@mantine/core';
import { IconSearch, IconMap2, IconUsers, IconFileText } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const actions = [
  { icon: IconSearch, label: 'Search Jobs', href: '/jobs', color: 'blue' },
  { icon: IconMap2, label: 'Career Map', href: '/career-map', color: 'grape' },
  { icon: IconUsers, label: 'Find Mentors', href: '/mentors', color: 'teal' },
  { icon: IconFileText, label: 'Update Resume', href: '/profile', color: 'orange' },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <Card shadow="md" padding="xl" radius="md" style={{ 
      height: '100%',
      background: 'rgba(45, 55, 72, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }}>
      <Stack gap="md">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="light"
              color={action.color}
              size="md"
              fullWidth
              leftSection={<action.icon size={20} />}
              onClick={() => router.push(action.href)}
            >
              {action.label}
            </Button>
          </motion.div>
        ))}
      </Stack>
    </Card>
  );
}

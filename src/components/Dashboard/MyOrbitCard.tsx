'use client';

import { Card, Title, Text, Badge, Group, Progress, Stack, Button, rem, Modal, TextInput, Textarea } from '@mantine/core';
import { IconRocket, IconTarget, IconTrendingUp, IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { loadCareerGoals, saveCareerGoals } from '@/lib/userStore';
import styles from './MyOrbitCard.module.css';

export default function MyOrbitCard() {
  const [opened, { open, close }] = useDisclosure(false);
  const [targetRole, setTargetRole] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');

  const currentStatus = {
    role: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    targetRole: 'Lead Frontend Architect',
    progress: 68,
    activeApplications: 5,
    interviews: 2,
  };

  useEffect(() => {
    // Load existing career goals
    const goals = loadCareerGoals();
    if (goals && goals.length > 0) {
      const latest = goals[0];
      setTargetRole(latest.title || '');
      setTargetCompany(latest.company || '');
      setTimeline(latest.timeline || '');
      setNotes(latest.notes || '');
    }
  }, []);

  const handleSaveGoals = () => {
    if (!targetRole.trim()) {
      notifications.show({
        title: 'Missing Information',
        message: 'Please enter your target role',
        color: 'orange',
      });
      return;
    }

    const newGoal = {
      id: `goal-${Date.now()}`,
      title: targetRole,
      company: targetCompany,
      timeline: timeline,
      notes: notes,
      createdAt: new Date().toISOString(),
      type: 'manual',
    };

    const existing = loadCareerGoals();
    // Update or add the goal
    const updated = [newGoal, ...existing.filter((g: any) => g.type !== 'manual')];
    saveCareerGoals(updated);

    notifications.show({
      title: 'Career Goals Updated!',
      message: 'Your career goals have been saved successfully',
      color: 'teal',
      icon: <IconCheck size={18} />,
    });

    close();
  };

  return (
    <>
      <Card shadow="md" padding="xl" radius="md" className={styles.card}>
      <Group justify="space-between" mb="md">
        <Title order={2} c="white">
          <Group gap="xs">
            <IconRocket size={28} stroke={2} color="var(--mantine-color-primary-6)" />
            My Orbit
          </Group>
        </Title>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: 'primary', to: 'accent', deg: 135 }}
        >
          Active Mission
        </Badge>
      </Group>

      <Stack gap="lg">
        <div>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="gray.5">
              Current Position
            </Text>
            <IconTrendingUp size={16} color="var(--mantine-color-teal-6)" />
          </Group>
          <Text size="lg" fw={600} c="white">
            {currentStatus.role}
          </Text>
          <Text size="sm" c="gray.5">
            {currentStatus.company}
          </Text>
        </div>

        <div>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="gray.5">
              Target Position
            </Text>
            <IconTarget size={16} color="var(--mantine-color-primary-6)" />
          </Group>
          <Text size="lg" fw={600} c="white">
            {currentStatus.targetRole}
          </Text>
          <Group mt="xs">
            <Text size="sm" c="gray.5">
              Progress to goal
            </Text>
            <Text size="sm" fw={600} c="primary">
              {currentStatus.progress}%
            </Text>
          </Group>
          <Progress value={currentStatus.progress} size="lg" radius="xl" mt="xs" animated />
        </div>

        <Group grow>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card shadow="sm" padding="md" radius="md" withBorder className={styles.statCard}>
              <Text size="xl" fw={700} ta="center" c="primary">
                {currentStatus.activeApplications}
              </Text>
              <Text size="xs" c="gray.6" ta="center">
                Active Applications
              </Text>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card shadow="sm" padding="md" radius="md" withBorder className={styles.statCard}>
              <Text size="xl" fw={700} ta="center" c="accent">
                {currentStatus.interviews}
              </Text>
              <Text size="xs" c="gray.6" ta="center">
                Scheduled Interviews
              </Text>
            </Card>
          </motion.div>
        </Group>

        <Button
          size="md"
          variant="gradient"
          gradient={{ from: 'primary', to: 'accent', deg: 135 }}
          fullWidth
          leftSection={<IconTarget size={18} />}
          onClick={open}
        >
          Update Career Goals
        </Button>
      </Stack>
    </Card>

    <Modal
      opened={opened}
      onClose={close}
      title={
        <Group gap="xs">
          <IconTarget size={24} color="var(--mantine-color-primary-6)" />
          <Text size="xl" fw={700} c="white">Update Career Goals</Text>
        </Group>
      }
      size="lg"
      styles={{
        content: {
          background: 'rgba(30, 40, 55, 0.98)',
          backdropFilter: 'blur(20px)',
        },
        header: {
          background: 'transparent',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Stack gap="md">
        <TextInput
          label="Target Role"
          placeholder="e.g., Lead Frontend Architect"
          value={targetRole}
          onChange={(e) => setTargetRole(e.currentTarget.value)}
          required
          styles={{
            label: { color: 'white' },
            input: { color: 'white' },
          }}
        />

        <TextInput
          label="Target Company (Optional)"
          placeholder="e.g., Google, Microsoft, or Any Top Tech Company"
          value={targetCompany}
          onChange={(e) => setTargetCompany(e.currentTarget.value)}
          styles={{
            label: { color: 'white' },
            input: { color: 'white' },
          }}
        />

        <TextInput
          label="Timeline (Optional)"
          placeholder="e.g., Within 1 year, 6-12 months"
          value={timeline}
          onChange={(e) => setTimeline(e.currentTarget.value)}
          styles={{
            label: { color: 'white' },
            input: { color: 'white' },
          }}
        />

        <Textarea
          label="Notes (Optional)"
          placeholder="Any additional notes about your career goals..."
          minRows={3}
          value={notes}
          onChange={(e) => setNotes(e.currentTarget.value)}
          styles={{
            label: { color: 'white' },
            input: { color: 'white' },
          }}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: 'primary', to: 'accent', deg: 135 }}
            onClick={handleSaveGoals}
          >
            Save Goals
          </Button>
        </Group>
      </Stack>
    </Modal>
    </>
  );
}

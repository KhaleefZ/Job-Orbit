'use client';

import { useState } from 'react';
import { Container, Title, Text, Button, Group, Modal } from '@mantine/core';
import { IconMap2, IconMaximize } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import CareerMapVisualization from '@/components/CareerMap/CareerMapVisualization';

export default function CareerMapPage() {
  const [fullScreen, setFullScreen] = useState(false);

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
                <IconMap2 size={36} stroke={2} color="var(--mantine-color-primary-6)" />
                Career Trajectory Map
              </Group>
            </Title>
            <Text c="gray.4" size="lg">
              Visualize your career path and explore new opportunities
            </Text>
          </div>
          <Button
            size="md"
            variant="gradient"
            gradient={{ from: 'primary', to: 'accent', deg: 135 }}
            leftSection={<IconMaximize size={18} />}
            onClick={() => setFullScreen(true)}
          >
            Full Screen View
          </Button>
        </Group>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CareerMapVisualization />
      </motion.div>

      <Modal
        opened={fullScreen}
        onClose={() => setFullScreen(false)}
        fullScreen
        title={
          <Title order={2}>
            <Group gap="xs">
              <IconMap2 size={28} />
              Career Trajectory Map
            </Group>
          </Title>
        }
      >
        <CareerMapVisualization />
      </Modal>
    </Container>
  );
}

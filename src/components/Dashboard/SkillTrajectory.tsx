'use client';

import { Card, Title, Group, Progress, Text, Badge, Stack } from '@mantine/core';
import { IconChartBar, IconTrendingUp, IconTarget } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 90, status: 'proficient', color: 'blue' },
  { name: 'TypeScript', level: 85, status: 'proficient', color: 'cyan' },
  { name: 'Next.js', level: 75, status: 'intermediate', color: 'teal' },
  { name: 'System Design', level: 60, status: 'developing', color: 'grape' },
  { name: 'Leadership', level: 45, status: 'learning', color: 'orange' },
];

export default function SkillTrajectory() {
  return (
    <Card shadow="md" padding="xl" radius="md" style={{
      background: 'rgba(45, 55, 72, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }}>
      <Title order={2} mb="lg" c="white">
        <Group gap="xs">
          <IconChartBar size={28} stroke={2} color="var(--mantine-color-primary-6)" />
          Skill Trajectory
        </Group>
      </Title>

      <Stack gap="md">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Group justify="space-between" mb="xs">
              <Group gap="xs">
                <Text size="sm" fw={600} c="white">
                  {skill.name}
                </Text>
                <Badge size="xs" variant="dot" color={skill.color}>
                  {skill.status}
                </Badge>
              </Group>
              <Text size="sm" fw={600} c={skill.color}>
                {skill.level}%
              </Text>
            </Group>
            <Progress
              value={skill.level}
              color={skill.color}
              size="md"
              radius="xl"
              animated
            />
          </motion.div>
        ))}

        <Group mt="md" justify="space-between">
          <Badge
            leftSection={<IconTrendingUp size={14} />}
            size="lg"
            variant="light"
            color="teal"
          >
            3 Skills Improving
          </Badge>
          <Badge
            leftSection={<IconTarget size={14} />}
            size="lg"
            variant="light"
            color="orange"
          >
            2 Skills To Develop
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
}

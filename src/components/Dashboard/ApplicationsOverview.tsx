'use client';

import { Card, Title, Group, Stack, Badge, Text, Timeline, Button } from '@mantine/core';
import { IconClipboardList, IconCheck, IconClock, IconEye, IconStar } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Application } from '@/types';

const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    job: {
      id: '1',
      title: 'Lead Frontend Architect',
      company: 'InnovateTech',
      location: 'San Francisco, CA',
      salary: { min: 150000, max: 200000, currency: 'USD' },
      type: 'full-time',
      remote: true,
      description: '',
      requirements: [],
      skills: [],
      postedDate: new Date(),
    },
    status: 'interview',
    appliedDate: new Date('2025-10-10'),
    lastUpdated: new Date('2025-10-15'),
  },
  {
    id: '2',
    jobId: '2',
    job: {
      id: '2',
      title: 'Senior React Developer',
      company: 'TechFlow Inc',
      location: 'Remote',
      salary: { min: 130000, max: 170000, currency: 'USD' },
      type: 'full-time',
      remote: true,
      description: '',
      requirements: [],
      skills: [],
      postedDate: new Date(),
    },
    status: 'under-review',
    appliedDate: new Date('2025-10-12'),
    lastUpdated: new Date('2025-10-14'),
  },
  {
    id: '3',
    jobId: '3',
    job: {
      id: '3',
      title: 'Frontend Engineering Manager',
      company: 'DataSystems Pro',
      location: 'New York, NY',
      salary: { min: 160000, max: 210000, currency: 'USD' },
      type: 'full-time',
      remote: false,
      description: '',
      requirements: [],
      skills: [],
      postedDate: new Date(),
    },
    status: 'submitted',
    appliedDate: new Date('2025-10-14'),
    lastUpdated: new Date('2025-10-14'),
  },
];

const statusConfig = {
  interview: { color: 'green', icon: IconStar, label: 'Interview Scheduled' },
  'under-review': { color: 'blue', icon: IconEye, label: 'Under Review' },
  submitted: { color: 'gray', icon: IconClock, label: 'Submitted' },
  offered: { color: 'teal', icon: IconCheck, label: 'Offer Received' },
  rejected: { color: 'red', icon: IconCheck, label: 'Rejected' },
  draft: { color: 'gray', icon: IconClock, label: 'Draft' },
};

export default function ApplicationsOverview() {
  const router = useRouter();
  return (
    <Card shadow="md" padding="xl" radius="md" style={{
      background: 'rgba(45, 55, 72, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }}>
      <Group justify="space-between" mb="lg">
        <Title order={2} c="white">
          <Group gap="xs">
            <IconClipboardList size={28} stroke={2} color="var(--mantine-color-primary-6)" />
            Active Applications
          </Group>
        </Title>
        <Badge size="lg" variant="filled" color="primary">
          {mockApplications.length}
        </Badge>
      </Group>

      <Timeline active={mockApplications.length} bulletSize={24} lineWidth={2}>
        {mockApplications.map((app) => {
          const config = statusConfig[app.status];
          const Icon = config.icon;
          
          return (
            <Timeline.Item
              key={app.id}
              bullet={<Icon size={12} />}
              title={app.job.title}
              color={config.color}
            >
              <Text size="sm" c="gray.5">
                {app.job.company}
              </Text>
              <Badge size="sm" variant="light" color={config.color} mt="xs">
                {config.label}
              </Badge>
              <Text size="xs" c="gray.6" mt="xs">
                Applied {app.appliedDate.toLocaleDateString()}
              </Text>
            </Timeline.Item>
          );
        })}
      </Timeline>

      <Button 
        variant="light" 
        fullWidth 
        mt="lg"
        onClick={() => router.push('/applications')}
      >
        View All Applications
      </Button>
    </Card>
  );
}

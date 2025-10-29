'use client';

import { Card, Title, Group, ScrollArea, Badge, Text, Button, Avatar, Modal } from '@mantine/core';
import { IconBriefcase, IconMapPin, IconCurrencyRupee, IconArrowRight } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { motion } from 'framer-motion';
import { Job } from '@/types';
import styles from './RecommendedJobs.module.css';
import { mockJobs } from '@/data/mockJobs';
import { useState } from 'react';
import JobDetails from '@/components/Jobs/JobDetails';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { saveApplication } from '@/lib/userStore';

function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={styles.jobCard}
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.card}>
        <Group justify="space-between" mb="md">
          <Avatar
            size="lg"
            radius="md"
            color="primary"
            variant="light"
          >
            {job.company.charAt(0)}
          </Avatar>
          <Badge
            size="lg"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 135 }}
          >
            {job.matchScore}% Match
          </Badge>
        </Group>

        <Title order={4} mb="xs" c="white">
          {job.title}
        </Title>
        <Text size="sm" fw={600} c="gray.5" mb="md">
          {job.company}
        </Text>

        <Group gap="xs" mb="md">
          <Badge leftSection={<IconMapPin size={12} />} variant="light" color="gray">
            {job.location}
          </Badge>
          {job.remote && (
            <Badge variant="light" color="blue">
              Remote
            </Badge>
          )}
        </Group>

        <Group gap="xs" mb="md">
          <IconCurrencyRupee size={16} color="var(--mantine-color-green-6)" />
          <Text size="sm" c="gray.5">
            ₹{(job.salary.min / 100000).toFixed(1)}L - ₹{(job.salary.max / 100000).toFixed(1)}L
          </Text>
        </Group>

        <Group gap="xs" mb="md">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} size="sm" variant="dot">
              {skill}
            </Badge>
          ))}
        </Group>

        <Button
          variant="light"
          fullWidth
          rightSection={<IconArrowRight size={16} />}
          onClick={onClick}
        >
          View Details
        </Button>
      </Card>
    </motion.div>
  );
}

export default function RecommendedJobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    openDetails();
  };

  const handleApply = (job: Job) => {
    try {
      // Save application to localStorage
      const application = {
        id: Date.now().toString(),
        jobId: job.id,
        job: job,
        status: 'submitted' as const,
        appliedDate: new Date(),
        lastUpdated: new Date(),
      };
      
      saveApplication(application);
      
      // Show success notification
      notifications.show({
        title: 'Application Submitted!',
        message: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
        color: 'green',
        autoClose: 5000,
      });
      
      closeDetails();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to submit application. Please try again.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Card shadow="md" padding="xl" radius="md" style={{
        background: 'rgba(45, 55, 72, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}>
        <Group justify="space-between" mb="lg">
          <Title order={2} c="white">
            <Group gap="xs">
              <IconBriefcase size={28} stroke={2} color="var(--mantine-color-primary-6)" />
              Recommended Opportunities
            </Group>
          </Title>
          <Button variant="subtle" size="sm" rightSection={<IconArrowRight size={16} />}>
            View All
          </Button>
        </Group>

        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
          slideGap="md"
          align="start"
          slidesToScroll={1}
          withControls
          withIndicators
        >
          {mockJobs.slice(0, 6).map((job) => (
            <Carousel.Slide key={job.id}>
              <JobCard job={job} onClick={() => handleViewDetails(job)} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card>

      <Modal
        opened={detailsOpened}
        onClose={closeDetails}
        title={<Text size="xl" fw={700} c="white">Job Details</Text>}
        size="xl"
        styles={{
          content: {
            background: 'rgba(30, 40, 55, 0.95)',
            backdropFilter: 'blur(20px)',
          },
          header: {
            background: 'transparent',
          },
        }}
      >
        {selectedJob && (
          <JobDetails 
            job={selectedJob} 
            onApply={handleApply}
            onClose={closeDetails}
          />
        )}
      </Modal>
    </>
  );
}

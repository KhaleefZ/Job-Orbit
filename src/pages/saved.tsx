'use client';

import { Container, Title, Text, Stack, Card, Group, Badge, Button, ScrollArea, Modal } from '@mantine/core';
import { IconBookmark, IconBriefcase, IconTrash } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Job } from '@/types';
import { mockJobs } from '@/data/mockJobs';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { loadApplications, saveApplications, pushNotification } from '@/lib/userStore';
import JobDetails from '@/components/Jobs/JobDetails';
import { useDisclosure } from '@mantine/hooks';

export default function SavedJobsPage() {
  const [savedJobs] = useState<Job[]>(mockJobs.slice(0, 8));
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    openDetails();
  };

  const handleApply = (job: Job) => {
    closeDetails();
    // Handle apply logic
    const apps = loadApplications();
    const newApp = {
      id: `${Date.now()}`,
      jobId: job.id,
      title: job.title,
      company: job.company,
      appliedAt: new Date().toISOString(),
      status: 'Applied',
    };
    apps.unshift(newApp);
    saveApplications(apps);

    // push a notification
    pushNotification({
      id: `${Date.now()}`,
      type: 'application',
      title: `Applied to ${job.title}`,
      description: `Your application to ${job.company} has been submitted.`,
      time: 'Just now',
      read: false,
      icon: IconBriefcase,
      color: 'green',
      action: '/jobs',
    });

    notifications.show({
      title: 'Application Submitted',
      message: `You applied to ${job.title} at ${job.company}`,
      color: 'teal',
    });
  };

  return (
    <>
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
                <IconBookmark size={36} stroke={2} color="var(--mantine-color-primary-6)" />
                Saved Jobs
              </Group>
            </Title>
            <Text c="gray.4" size="lg">
              Jobs you've bookmarked for later
            </Text>
          </div>
          <Badge size="xl" variant="filled" color="primary">
            {savedJobs.length} Saved
          </Badge>
        </Group>
      </motion.div>

      <ScrollArea h={700}>
        <Stack gap="md">
          {savedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{
                background: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}>
                <Group justify="space-between" mb="sm">
                  <div style={{ flex: 1 }}>
                    <Group justify="space-between" mb="xs">
                      <Text size="lg" fw={700} c="white">
                        {job.title}
                      </Text>
                      {job.matchScore && (
                        <Badge
                          size="lg"
                          variant="gradient"
                          gradient={{ from: 'teal', to: 'lime', deg: 135 }}
                        >
                          {job.matchScore}% Match
                        </Badge>
                      )}
                    </Group>
                    <Text size="md" c="gray.5" mb="md">
                      {job.company} • {job.location}
                    </Text>
                    <Group gap="xs">
                      {job.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} size="sm" variant="dot">
                          {skill}
                        </Badge>
                      ))}
                    </Group>
                  </div>
                  <Group gap="xs">
                    <Button variant="light" onClick={() => handleViewDetails(job)}>
                      View Details
                    </Button>
                    <Button variant="subtle" color="red" leftSection={<IconTrash size={16} />}>
                      Remove
                    </Button>
                  </Group>
                </Group>
              </Card>
            </motion.div>
          ))}
        </Stack>
      </ScrollArea>

      <Modal
        opened={detailsOpened}
        onClose={closeDetails}
        title={<Text size="xl" fw={700} c="white">Job Details</Text>}
        size="xl"
        withCloseButton={true}
        styles={{
          content: {
            background: 'rgba(30, 40, 55, 0.95)',
            backdropFilter: 'blur(20px)',
          },
          header: {
            background: 'transparent',
          },
          body: {
            maxHeight: '70vh',
            overflowY: 'auto',
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
      </Container>
    </>
  );
}

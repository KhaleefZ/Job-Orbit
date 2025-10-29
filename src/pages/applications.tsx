'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Badge, Group, Stack, Timeline, Button, Modal, Select } from '@mantine/core';
import { IconClipboardList, IconCheck, IconClock, IconEye, IconStar, IconX } from '@tabler/icons-react';
import { loadApplications, saveApplications } from '@/lib/userStore';
import { Application } from '@/types';
import JobDetails from '@/components/Jobs/JobDetails';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

const statusConfig = {
  interview: { color: 'green', icon: IconStar, label: 'Interview Scheduled' },
  'under-review': { color: 'blue', icon: IconEye, label: 'Under Review' },
  submitted: { color: 'gray', icon: IconClock, label: 'Submitted' },
  offered: { color: 'teal', icon: IconCheck, label: 'Offer Received' },
  rejected: { color: 'red', icon: IconX, label: 'Rejected' },
  draft: { color: 'gray', icon: IconClock, label: 'Draft' },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);

  useEffect(() => {
    setApplications(loadApplications());

    const handleUpdate = () => {
      setApplications(loadApplications());
    };

    window.addEventListener('joborbit:applicationsUpdated', handleUpdate);
    return () => window.removeEventListener('joborbit:applicationsUpdated', handleUpdate);
  }, []);

  const handleStatusChange = (appId: string, newStatus: Application['status']) => {
    const updated = applications.map(app =>
      app.id === appId
        ? { ...app, status: newStatus, lastUpdated: new Date() }
        : app
    );
    setApplications(updated);
    saveApplications(updated);
    
    notifications.show({
      title: 'Status Updated',
      message: 'Application status has been updated successfully.',
      color: 'blue',
      autoClose: 3000,
    });
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    openDetails();
  };

  const handleWithdraw = (appId: string) => {
    const updated = applications.filter(app => app.id !== appId);
    setApplications(updated);
    saveApplications(updated);
    
    notifications.show({
      title: 'Application Withdrawn',
      message: 'Your application has been withdrawn.',
      color: 'yellow',
      autoClose: 3000,
    });
  };

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1} c="white" mb="xs">
            My Applications
          </Title>
          <Text c="gray.5" size="lg">
            Track all your job applications in one place
          </Text>
        </div>
        <Badge size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
          {applications.length} Active Applications
        </Badge>
      </Group>

      {applications.length === 0 ? (
        <Card
          shadow="lg"
          padding="xl"
          radius="md"
          style={{
            background: 'rgba(45, 55, 72, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <IconClipboardList size={64} color="gray" style={{ margin: '0 auto 1rem' }} />
          <Title order={3} c="white" mb="xs">
            No Applications Yet
          </Title>
          <Text c="gray.5">
            Start applying to jobs to see them tracked here.
          </Text>
        </Card>
      ) : (
        <Stack gap="lg">
          {applications.map((app) => {
            const config = statusConfig[app.status];
            const StatusIcon = config.icon;

            return (
              <Card
                key={app.id}
                shadow="lg"
                padding="xl"
                radius="md"
                style={{
                  background: 'rgba(45, 55, 72, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Group justify="space-between" align="flex-start" mb="md">
                  <div style={{ flex: 1 }}>
                    <Group gap="md" mb="xs">
                      <Title order={3} c="white">
                        {app.job.title}
                      </Title>
                      <Badge
                        size="lg"
                        color={config.color}
                        leftSection={<StatusIcon size={14} />}
                      >
                        {config.label}
                      </Badge>
                    </Group>
                    <Text size="lg" c="gray.4" fw={500}>
                      {app.job.company}
                    </Text>
                    <Text size="sm" c="gray.5" mt="xs">
                      Applied on {app.appliedDate.toLocaleDateString()} • Last updated {app.lastUpdated.toLocaleDateString()}
                    </Text>
                  </div>

                  <Group gap="xs">
                    <Button
                      variant="light"
                      color="blue"
                      onClick={() => handleViewDetails(app)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      onClick={() => handleWithdraw(app.id)}
                    >
                      Withdraw
                    </Button>
                  </Group>
                </Group>

                <Group gap="md" mt="md">
                  <Select
                    label="Update Status"
                    value={app.status}
                    onChange={(value) => value && handleStatusChange(app.id, value as Application['status'])}
                    data={[
                      { value: 'submitted', label: 'Submitted' },
                      { value: 'under-review', label: 'Under Review' },
                      { value: 'interview', label: 'Interview Scheduled' },
                      { value: 'offered', label: 'Offer Received' },
                      { value: 'rejected', label: 'Rejected' },
                    ]}
                    style={{ width: '250px' }}
                  />
                </Group>

                {app.notes && (
                  <Card
                    mt="md"
                    padding="md"
                    style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Text size="sm" fw={500} c="gray.4" mb="xs">
                      Notes:
                    </Text>
                    <Text size="sm" c="gray.5">
                      {app.notes}
                    </Text>
                  </Card>
                )}
              </Card>
            );
          })}
        </Stack>
      )}

      {/* Job Details Modal */}
      <Modal
        opened={detailsOpened}
        onClose={closeDetails}
        size="xl"
        title={selectedApplication?.job.title}
        styles={{
          content: {
            background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(45, 55, 72, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          header: {
            background: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          },
          title: {
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600,
          },
          close: {
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
          },
          body: {
            maxHeight: '70vh',
            overflowY: 'auto',
          },
        }}
      >
        {selectedApplication && (
          <JobDetails
            job={selectedApplication.job}
            onApply={() => {}}
            onClose={closeDetails}
          />
        )}
      </Modal>
    </Container>
  );
}

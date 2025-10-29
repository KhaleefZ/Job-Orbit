'use client';

import { Card, Title, Text, Badge, Group, Button, Stack, Divider, ScrollArea, Drawer, List, ThemeIcon, ActionIcon } from '@mantine/core';
import { IconMapPin, IconCurrencyRupee, IconBriefcase, IconX, IconBuilding, IconUsers, IconCalendar, IconWorld, IconStar, IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Job } from '@/types';
import styles from './JobDetails.module.css';

interface JobDetailsProps {
  job: Job;
  onApply: (job: Job) => void;
  onClose: () => void;
}

export default function JobDetails({ job, onApply, onClose }: JobDetailsProps) {
  const [companyDrawerOpened, { open: openCompanyDrawer, close: closeCompanyDrawer }] = useDisclosure(false);

  return (
    <>
      <Card shadow="lg" padding="xl" radius="md" className={styles.stickyCard}>
      <Group justify="space-between" align="flex-start" mb="md">
        <Title order={2} c="white">
          {job.title}
        </Title>
        <ActionIcon 
          variant="subtle" 
          color="gray" 
          size="lg"
          onClick={onClose}
          aria-label="Close job details"
        >
          <IconX size={20} />
        </ActionIcon>
      </Group>
      <Stack gap="lg">
        <div>
          <Text size="xl" fw={600} mb="xs" c="white">
            {job.company}
          </Text>
          <Group gap="md">
            <Group gap="xs">
              <IconMapPin size={18} />
              <Text size="sm" c="gray.5">{job.location}</Text>
            </Group>
            {job.remote && (
              <Badge variant="light" color="blue">
                Remote
              </Badge>
            )}
          </Group>
        </div>

        <Group gap="md">
          <Group gap="xs">
            <IconCurrencyRupee size={18} color="var(--mantine-color-green-6)" />
            <Text size="sm" c="gray.5">
              ₹{(job.salary.min / 100000).toFixed(1)}L - ₹{(job.salary.max / 100000).toFixed(1)}L / year
            </Text>
          </Group>
          <Group gap="xs">
            <IconBriefcase size={18} />
            <Text size="sm" tt="capitalize" c="gray.5">
              {job.type.replace('-', ' ')}
            </Text>
          </Group>
        </Group>

        {job.matchScore && (
          <Badge
            size="xl"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 135 }}
          >
            {job.matchScore}% Match
          </Badge>
        )}

        <Divider />

        <Stack gap="lg">
          <div>
            <Title order={4} mb="sm" c="white">
              Job Description
            </Title>
            <Text size="sm" style={{ whiteSpace: 'pre-line' }} c="gray.4">
              {job.description || 'We are looking for a talented professional to join our team and help us build amazing products. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.'}
            </Text>
          </div>

          <div>
            <Title order={4} mb="sm" c="white">
              Requirements
            </Title>
            <Stack gap="xs">
              {job.requirements.map((req, index) => (
                <Text key={index} size="sm" c="gray.4">
                  • {req}
                </Text>
              ))}
            </Stack>
          </div>

          <div>
            <Title order={4} mb="sm" c="white">
              Required Skills
            </Title>
            <Group gap="xs">
              {job.skills.map((skill) => (
                <Badge key={skill} size="lg" variant="light">
                  {skill}
                </Badge>
              ))}
            </Group>
          </div>
        </Stack>

        <Divider />

        <Group grow>
          <Button
            size="md"
            variant="light"
            color="cyan"
            leftSection={<IconBuilding size={18} />}
            onClick={openCompanyDrawer}
          >
            About Company
          </Button>
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: 'primary', to: 'accent', deg: 135 }}
            onClick={() => onApply(job)}
          >
            Apply Now
          </Button>
        </Group>
      </Stack>
    </Card>

    <Drawer
      opened={companyDrawerOpened}
      onClose={closeCompanyDrawer}
      title={
        <Group gap="xs">
          <IconBuilding size={24} color="var(--mantine-color-cyan-6)" />
          <Text size="xl" fw={700} c="white">About {job.company}</Text>
        </Group>
      }
      position="right"
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
        body: {
          padding: '1.5rem',
        },
      }}
    >
      <ScrollArea h="calc(100vh - 120px)">
        <Stack gap="xl">
          {/* Company Overview */}
          <div>
            <Title order={4} c="white" mb="md">
              Company Overview
            </Title>
            <Text size="sm" c="gray.4" style={{ lineHeight: 1.7 }}>
              {job.companyInfo?.about || `${job.company} is a leading technology company focused on innovation and delivering exceptional products. We're committed to creating a positive impact through cutting-edge solutions and fostering a culture of excellence.`}
            </Text>
          </div>

          <Divider />

          {/* Company Details */}
          <div>
            <Title order={4} c="white" mb="md">
              Company Information
            </Title>
            <Stack gap="md">
              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="blue">
                  <IconBuilding size={18} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="gray.5">Industry</Text>
                  <Text size="sm" fw={600} c="white">
                    {job.companyInfo?.industry || 'Technology & Software'}
                  </Text>
                </div>
              </Group>

              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="teal">
                  <IconUsers size={18} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="gray.5">Company Size</Text>
                  <Text size="sm" fw={600} c="white">
                    {job.companyInfo?.employees || '500-1000 employees'}
                  </Text>
                </div>
              </Group>

              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="grape">
                  <IconCalendar size={18} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="gray.5">Founded</Text>
                  <Text size="sm" fw={600} c="white">
                    {job.companyInfo?.founded || '2015'}
                  </Text>
                </div>
              </Group>

              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="orange">
                  <IconWorld size={18} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="gray.5">Headquarters</Text>
                  <Text size="sm" fw={600} c="white">
                    {job.companyInfo?.headquarters || job.location}
                  </Text>
                </div>
              </Group>
            </Stack>
          </div>

          <Divider />

          {/* Culture */}
          <div>
            <Title order={4} c="white" mb="md">
              Company Culture
            </Title>
            <List
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl" variant="light" color="cyan">
                  <IconStar size={12} />
                </ThemeIcon>
              }
            >
              {(job.companyInfo?.culture || [
                'Innovation-driven environment',
                'Work-life balance focus',
                'Continuous learning opportunities',
                'Collaborative team culture',
                'Diversity and inclusion',
              ]).map((item, index) => (
                <List.Item key={index}>
                  <Text size="sm" c="gray.4">{item}</Text>
                </List.Item>
              ))}
            </List>
          </div>

          <Divider />

          {/* Benefits */}
          <div>
            <Title order={4} c="white" mb="md">
              Employee Benefits
            </Title>
            <List
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl" variant="light" color="green">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {(job.companyInfo?.benefits || [
                'Health insurance coverage',
                'Flexible working hours',
                'Remote work options',
                'Learning & development budget',
                'Performance bonuses',
                'Stock options',
                'Paid time off',
                'Team building activities',
              ]).map((benefit, index) => (
                <List.Item key={index}>
                  <Text size="sm" c="gray.4">{benefit}</Text>
                </List.Item>
              ))}
            </List>
          </div>

          {job.companyInfo?.techStack && job.companyInfo.techStack.length > 0 && (
            <>
              <Divider />
              <div>
                <Title order={4} c="white" mb="md">
                  Tech Stack
                </Title>
                <Group gap="xs">
                  {job.companyInfo.techStack.map((tech) => (
                    <Badge key={tech} size="lg" variant="light" color="blue">
                      {tech}
                    </Badge>
                  ))}
                </Group>
              </div>
            </>
          )}

          {job.companyInfo?.website && (
            <>
              <Divider />
              <Button
                component="a"
                href={job.companyInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                color="cyan"
                fullWidth
                leftSection={<IconWorld size={18} />}
              >
                Visit Company Website
              </Button>
            </>
          )}
        </Stack>
      </ScrollArea>
    </Drawer>
    </>
  );
}

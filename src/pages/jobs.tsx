'use client';

import { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Grid,
  Button,
  Group,
  Drawer,
  TextInput,
  Select,
  RangeSlider,
  MultiSelect,
  Switch,
  Stack,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import JobsList from '@/components/Jobs/JobsList';
import JobDetails from '@/components/Jobs/JobDetails';
import ApplicationForm from '@/components/Jobs/ApplicationForm';
import { Job } from '@/types';

export default function JobsPage() {
  const [filterOpened, { open: openFilters, close: closeFilters }] = useDisclosure(false);
  const [applicationOpened, { open: openApplication, close: closeApplication }] = useDisclosure(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50000, 200000]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skillsOptions = [
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Python',
    'Java',
    'System Design',
    'Leadership',
    'AWS',
    'Docker',
  ];

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    openApplication();
  };

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
              Job Search
            </Title>
            <Text c="gray.4" size="lg">
              Find your next career opportunity
            </Text>
          </div>
          <Button
            leftSection={<IconFilter size={18} />}
            variant="light"
            size="md"
            onClick={openFilters}
          >
            Filters
          </Button>
        </Group>

        <TextInput
          placeholder="Search jobs, companies, or keywords..."
          size="lg"
          mb="xl"
          leftSection={<IconSearch size={20} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </motion.div>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: selectedJob ? 5 : 12 }}>
          <JobsList
            onJobSelect={handleJobSelect}
            onApply={handleApply}
            searchQuery={searchQuery}
            filters={{
              location,
              jobType,
              salaryRange,
              remoteOnly,
              skills: selectedSkills,
            }}
          />
        </Grid.Col>

        {selectedJob && (
          <Grid.Col span={{ base: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <JobDetails
                job={selectedJob}
                onApply={handleApply}
                onClose={() => setSelectedJob(null)}
              />
            </motion.div>
          </Grid.Col>
        )}
      </Grid>

      {/* Advanced Filter Drawer */}
      <Drawer
        opened={filterOpened}
        onClose={closeFilters}
        title="Advanced Filters"
        position="right"
        size="md"
        styles={{
          content: {
            background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(45, 55, 72, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          header: {
            background: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '1rem',
          },
          title: {
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 600,
          },
          close: {
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
          },
          body: {
            padding: '1.5rem',
          },
        }}
      >
        <Stack gap="lg">
          <TextInput
            label="Location"
            placeholder="Enter city or state"
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
            styles={{
              label: { color: 'white', fontWeight: 500 },
              input: { 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                '&::placeholder': { color: 'rgba(255, 255, 255, 0.4)' }
              }
            }}
          />

          <Select
            label="Job Type"
            placeholder="Select job type"
            value={jobType}
            onChange={setJobType}
            data={[
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'contract', label: 'Contract' },
              { value: 'freelance', label: 'Freelance' },
            ]}
            clearable
            styles={{
              label: { color: 'white', fontWeight: 500 },
              input: { 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
              }
            }}
          />

          <div>
            <Text size="sm" fw={500} mb="xs" c="white">
              Salary Range: ₹{(salaryRange[0] / 1000).toFixed(0)}K - ₹{(salaryRange[1] / 1000).toFixed(0)}K
            </Text>
            <RangeSlider
              min={30000}
              max={300000}
              step={10000}
              value={salaryRange}
              onChange={setSalaryRange}
              marks={[
                { value: 50000, label: '₹50K' },
                { value: 150000, label: '₹150K' },
                { value: 250000, label: '₹250K' },
              ]}
              styles={{
                markLabel: { color: 'white' }
              }}
            />
          </div>

          <MultiSelect
            label="Skills"
            placeholder="Select required skills"
            data={skillsOptions}
            value={selectedSkills}
            onChange={setSelectedSkills}
            searchable
            styles={{
              label: { color: 'white', fontWeight: 500 },
              input: { 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
              },
              pill: {
                backgroundColor: 'rgba(0, 128, 255, 0.2)',
                border: '1px solid rgba(0, 128, 255, 0.4)',
              }
            }}
          />

          <Switch
            label="Remote positions only"
            checked={remoteOnly}
            onChange={(event) => setRemoteOnly(event.currentTarget.checked)}
            styles={{
              label: { color: 'white', fontWeight: 500 }
            }}
          />

          <Divider />

          <Group justify="space-between">
            <Button variant="subtle" onClick={() => {
              setLocation('');
              setJobType(null);
              setSalaryRange([50000, 200000]);
              setRemoteOnly(false);
              setSelectedSkills([]);
            }}>
              Clear All
            </Button>
            <Button onClick={closeFilters}>
              Apply Filters
            </Button>
          </Group>
        </Stack>
      </Drawer>

      {/* Application Form Drawer */}
      <Drawer
        opened={applicationOpened}
        onClose={closeApplication}
        title="Apply for Position"
        position="right"
        size="lg"
        styles={{
          content: {
            background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(45, 55, 72, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          header: {
            background: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '1rem',
          },
          title: {
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 600,
          },
          close: {
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
          },
          body: {
            padding: '1.5rem',
          },
        }}
      >
        {selectedJob && (
          <ApplicationForm
            job={selectedJob}
            onClose={closeApplication}
          />
        )}
      </Drawer>
    </Container>
  );
}

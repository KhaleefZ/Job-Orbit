'use client';

import { Card, Stack, Badge, Text, Group, Button, ScrollArea, Divider } from '@mantine/core';
import { IconMapPin, IconCurrencyRupee, IconBriefcase } from '@tabler/icons-react';
import { Job } from '@/types';
import { motion } from 'framer-motion';
import styles from './JobsList.module.css';
import { mockJobs } from '@/data/mockJobs';

interface JobsListProps {
  onJobSelect: (job: Job) => void;
  onApply: (job: Job) => void;
  searchQuery: string;
  filters: any;
}

function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.jobCard}
        onClick={onClick}
      >
        <Group justify="space-between" mb="sm">
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

        <Text size="md" c="gray.4" mb="md">
          {job.company}
        </Text>

        <Stack gap="xs" mb="md">
          <Group gap="xs">
            <IconMapPin size={16} color="var(--mantine-color-gray-5)" />
            <Text size="sm" c="gray.5">
              {job.location}
            </Text>
            {job.remote && (
              <Badge size="sm" variant="light" color="blue">
                Remote
              </Badge>
            )}
          </Group>

          <Group gap="xs">
            <IconCurrencyRupee size={16} color="var(--mantine-color-green-5)" />
            <Text size="sm" c="gray.5">
              ₹{(job.salary.min / 100000).toFixed(1)}L - ₹{(job.salary.max / 100000).toFixed(1)}L
            </Text>
          </Group>

          <Group gap="xs">
            <IconBriefcase size={16} color="var(--mantine-color-gray-5)" />
            <Text size="sm" c="gray.5" tt="capitalize">
              {job.type.replace('-', ' ')}
            </Text>
          </Group>
        </Stack>

        <Group gap="xs">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} size="sm" variant="dot">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge size="sm" variant="light">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </Group>
      </Card>
    </motion.div>
  );
}

export default function JobsList({ onJobSelect, onApply, searchQuery, filters }: JobsListProps) {
  // Apply all filters to the jobs
  const filteredJobs = mockJobs.filter((job) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      if (!job.location.toLowerCase().includes(locationQuery)) {
        return false;
      }
    }

    // Job type filter
    if (filters.jobType && job.type !== filters.jobType) {
      return false;
    }

    // Salary range filter
    if (filters.salaryRange) {
      const [minSalary, maxSalary] = filters.salaryRange;
      // Check if job salary overlaps with filter range
      if (job.salary.max < minSalary || job.salary.min > maxSalary) {
        return false;
      }
    }

    // Remote only filter
    if (filters.remoteOnly && !job.remote) {
      return false;
    }

    // Skills filter - job must have at least one of the selected skills
    if (filters.skills && filters.skills.length > 0) {
      const hasRequiredSkill = filters.skills.some((filterSkill: string) =>
        job.skills.some(jobSkill => 
          jobSkill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      );
      if (!hasRequiredSkill) {
        return false;
      }
    }

    return true;
  });

  return (
    <ScrollArea h={700}>
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="sm" c="gray.5">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </Text>
        </Group>

        {filteredJobs.length === 0 ? (
          <Card
            shadow="sm"
            padding="xl"
            radius="md"
            style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
            }}
          >
            <Text c="white" size="lg" fw={500} mb="xs">
              No jobs found
            </Text>
            <Text c="gray.5" size="sm">
              Try adjusting your filters or search query
            </Text>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onJobSelect(job)}
            />
          ))
        )}
      </Stack>
    </ScrollArea>
  );
}

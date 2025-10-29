'use client';

import { useState } from 'react';
import {
  Stack,
  TextInput,
  Textarea,
  FileInput,
  Button,
  Group,
  Text,
  Stepper,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUpload, IconCheck } from '@tabler/icons-react';
import { Job } from '@/types';

interface ApplicationFormProps {
  job: Job;
  onClose: () => void;
}

export default function ApplicationForm({ job, onClose }: ApplicationFormProps) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: '',
      resume: null,
      coverLetter: '',
      yearsOfExperience: '',
      availableStartDate: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          fullName: values.fullName.length < 2 ? 'Name must have at least 2 characters' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          phone: values.phone.length < 10 ? 'Invalid phone number' : null,
        };
      }

      if (active === 1) {
        return {
          resume: values.resume ? null : 'Resume is required',
          coverLetter: values.coverLetter.length < 50 ? 'Cover letter must be at least 50 characters' : null,
        };
      }

      return {};
    },
  });

  const nextStep = () => {
    const validation = form.validate();
    if (!validation.hasErrors) {
      setActive((current) => (current < 2 ? current + 1 : current));
    }
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      notifications.show({
        title: 'Application Submitted!',
        message: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
        color: 'teal',
        icon: <IconCheck size={18} />,
      });
      onClose();
    }, 2000);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg" style={{
        background: 'rgba(45, 55, 72, 0.6)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}>
        <div>
          <Text size="xl" fw={700} mb="xs" c="white">
            Apply for {job.title}
          </Text>
          <Text size="md" c="gray.5">
            {job.company}
          </Text>
        </div>

        <Stepper active={active} onStepClick={setActive} styles={{
          stepIcon: {
            borderColor: 'rgba(0, 128, 255, 0.5)',
            backgroundColor: 'transparent',
            color: 'white',
            '&[data-completed]': {
              backgroundColor: '#0080ff',
              borderColor: '#0080ff',
            },
            '&[data-progress]': {
              borderColor: '#0080ff',
            },
          },
          stepLabel: { color: 'white', fontWeight: 600 },
          stepDescription: { color: 'rgba(255, 255, 255, 0.7)' },
          separator: { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
        }}>
          <Stepper.Step label="Personal Info" description="Basic information">
            <Stack gap="md" mt="lg">
              <TextInput
                label="Full Name"
                placeholder="Your full name"
                {...form.getInputProps('fullName')}
                required
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
              <TextInput
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
                required
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
              <TextInput
                label="Phone Number"
                placeholder="Your phone number"
                {...form.getInputProps('phone')}
                required
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
            </Stack>
          </Stepper.Step>
          <Stepper.Step label="Experience" description="Your professional background">
            <Stack gap="md" mt="lg">
              <TextInput
                label="LinkedIn Profile"
                placeholder="https://linkedin.com/in/..."
                {...form.getInputProps('linkedin')}
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
              <TextInput
                label="Portfolio/Website"
                placeholder="https://your-portfolio.com"
                {...form.getInputProps('portfolio')}
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
                label="Years of Experience"
                placeholder="Select your experience level"
                data={['0-1 years', '2-4 years', '5-7 years', '8+ years']}
                {...form.getInputProps('yearsOfExperience')}
                styles={{
                  label: { color: 'white', fontWeight: 500 },
                  input: { 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                  }
                }}
              />
              <TextInput
                label="Available Start Date"
                placeholder="e.g., Immediately, 2 weeks"
                {...form.getInputProps('availableStartDate')}
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
            </Stack>
          </Stepper.Step>
          <Stepper.Step label="Documents" description="Resume and cover letter">
            <Stack gap="md" mt="lg">
              <FileInput
                label="Resume/CV"
                placeholder="Upload your resume"
                leftSection={<IconUpload size={14} />}
                {...form.getInputProps('resume')}
                required
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
              <Textarea
                label="Cover Letter"
                placeholder="Why are you a great fit for this role?"
                autosize
                minRows={4}
                {...form.getInputProps('coverLetter')}
                required
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
            </Stack>
          </Stepper.Step>
          <Stepper.Completed>
            <Stack align="center" mt="xl">
              <IconCheck size={60} color="teal" />
              <Text fw={500} size="lg">
                Review and Submit
              </Text>
              <Text c="dimmed" size="sm">
                Please review your information before submitting.
              </Text>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active > 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active < 2 && <Button onClick={nextStep}>Next step</Button>}
          {active === 2 && (
            <Button
              color="teal"
              onClick={handleSubmit}
              loading={loading}
              leftSection={<IconCheck size={16} />}
            >
              Submit Application
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
}

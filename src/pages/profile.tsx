'use client';

import { Container, Title, Text, Card, Stack, Group, FileInput, Button, TextInput, Textarea, Avatar, Badge, Progress, Divider } from '@mantine/core';
import { IconUpload, IconFileText, IconUser, IconMail, IconPhone, IconBriefcase, IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { loadProfile, saveProfile } from '@/lib/userStore';
import { useForm } from '@mantine/form';

export default function ProfilePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const stored = loadProfile();

  const form = useForm({
    initialValues: {
      name: stored.name || '',
      email: stored.email || '',
      phone: stored.phone || '',
      bio: stored.bio || '',
    },

    validate: {
      name: (value) => (value.length < 3 ? 'Name must be at least 3 characters' : null),
      email: (value) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value && !/^\+?\d{7,15}$/.test(value) ? 'Invalid phone number' : null),
    },
  });

  const displayName = form.values.name || stored.name || 'Your User';

  const handleResumeUpload = () => {
    if (!resumeFile) {
      notifications.show({
        title: 'No file selected',
        message: 'Please select a resume file to upload',
        color: 'orange',
      });
      return;
    }

    notifications.show({
      title: 'Resume Updated!',
      message: 'Your resume has been uploaded successfully',
      color: 'teal',
      icon: <IconCheck size={18} />,
    });
    setResumeFile(null);
  };

  const handleSaveProfile = (values?: any) => {
    const vals = values || form.values;
    // perform final validation
    const valid = form.validate();
    if (valid.hasErrors) return;

    saveProfile({ name: vals.name, email: vals.email, phone: vals.phone, bio: vals.bio, role: 'Full Stack Developer' });

    notifications.show({
      title: 'Profile Saved!',
      message: 'Your profile information has been updated successfully',
      color: 'teal',
      icon: <IconCheck size={18} />,
    });
  };

  useEffect(() => {
    // update form when storage changes externally
    const onUpdate = (e: any) => {
      if (e && e.detail) {
        form.setValues({ name: e.detail.name || '', email: e.detail.email || '', phone: e.detail.phone || '', bio: e.detail.bio || '' });
      }
    };
    window.addEventListener('joborbit:profileUpdated', onUpdate as EventListener);
    return () => window.removeEventListener('joborbit:profileUpdated', onUpdate as EventListener);
  }, []);

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
                <IconUser size={36} stroke={2} color="var(--mantine-color-primary-6)" />
                My Profile
              </Group>
            </Title>
            <Text c="gray.4" size="lg">
              Manage your profile and resume
            </Text>
          </div>
        </Group>
      </motion.div>

      <Stack gap="lg">
        {/* Profile Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card 
            shadow="md" 
            padding="xl" 
            radius="md"
            style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            <Group mb="xl">
              <Avatar size={120} radius="xl" color="primary">
                {displayName.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text size="xl" fw={700} c="white" mb="xs">
                  {displayName}
                </Text>
                <Text size="md" c="gray.4" mb="sm">
                  Full Stack Developer
                </Text>
                <Group gap="xs">
                  <Badge size="lg" variant="light" color="teal">
                    Active
                  </Badge>
                  <Badge size="lg" variant="light" color="blue">
                    Open to Opportunities
                  </Badge>
                </Group>
              </div>
            </Group>

            <Divider mb="xl" />

            <Stack gap="md">
              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                leftSection={<IconUser size={16} />}
                {...form.getInputProps('name')}
                styles={{
                  input: { color: 'white' },
                  label: { color: 'white' }
                }}
              />

              <TextInput
                label="Email Address"
                placeholder="your.email@example.com"
                leftSection={<IconMail size={16} />}
                {...form.getInputProps('email')}
                styles={{
                  input: { color: 'white' },
                  label: { color: 'white' }
                }}
              />

              <TextInput
                label="Phone Number"
                placeholder="+91 XXXXX XXXXX"
                leftSection={<IconPhone size={16} />}
                {...form.getInputProps('phone')}
                styles={{
                  input: { color: 'white' },
                  label: { color: 'white' }
                }}
              />

              <Textarea
                label="Bio"
                placeholder="Tell us about yourself..."
                leftSection={<IconBriefcase size={16} />}
                minRows={4}
                {...form.getInputProps('bio')}
                styles={{
                  input: { color: 'white' },
                  label: { color: 'white' }
                }}
              />

              <Button
                variant="gradient"
                gradient={{ from: 'primary', to: 'accent', deg: 135 }}
                size="md"
                onClick={() => handleSaveProfile()}
              >
                Save Profile
              </Button>
            </Stack>
          </Card>
        </motion.div>

        {/* Resume Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card 
            shadow="md" 
            padding="xl" 
            radius="md"
            style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            <Group mb="xl">
              <IconFileText size={32} color="var(--mantine-color-orange-6)" />
              <div>
                <Text size="xl" fw={700} c="white">
                  Resume Management
                </Text>
                <Text size="sm" c="gray.4">
                  Upload or update your resume (PDF, DOC, DOCX - Max 5MB)
                </Text>
              </div>
            </Group>

            <Stack gap="md">
              <FileInput
                label="Upload Resume"
                placeholder="Click to select your resume"
                leftSection={<IconUpload size={16} />}
                accept=".pdf,.doc,.docx"
                value={resumeFile}
                onChange={setResumeFile}
                styles={{
                  input: { color: 'white' },
                  label: { color: 'white' }
                }}
              />

              {resumeFile && (
                <Card 
                  padding="md" 
                  radius="md"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <Group justify="space-between">
                    <Group gap="sm">
                      <IconFileText size={24} color="var(--mantine-color-blue-6)" />
                      <div>
                        <Text size="sm" fw={600} c="white">
                          {resumeFile.name}
                        </Text>
                        <Text size="xs" c="gray.5">
                          {(resumeFile.size / 1024).toFixed(2)} KB
                        </Text>
                      </div>
                    </Group>
                    <Badge color="blue" variant="light">
                      Ready to upload
                    </Badge>
                  </Group>
                </Card>
              )}

              <Button
                variant="light"
                color="orange"
                size="lg"
                leftSection={<IconUpload size={18} />}
                onClick={handleResumeUpload}
                disabled={!resumeFile}
                fullWidth
              >
                Update Resume
              </Button>

              <Divider label="Current Resume" labelPosition="center" />

              <Card 
                padding="lg" 
                radius="md"
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                }}
              >
                <Group justify="space-between" mb="md">
                  <Group gap="sm">
                    <IconFileText size={28} color="var(--mantine-color-teal-6)" />
                    <div>
                      <Text size="md" fw={600} c="white">
                        resume_khaleef_2024.pdf
                      </Text>
                      <Text size="xs" c="gray.5">
                        Uploaded on Dec 15, 2024
                      </Text>
                    </div>
                  </Group>
                  <Badge color="teal" variant="filled" leftSection={<IconCheck size={14} />}>
                    Active
                  </Badge>
                </Group>

                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="gray.4">
                      Profile Completeness
                    </Text>
                    <Text size="sm" fw={600} c="teal">
                      85%
                    </Text>
                  </Group>
                  <Progress value={85} color="teal" size="md" radius="xl" />
                </Stack>
              </Card>

              <Group gap="sm">
                <Button variant="outline" color="blue" flex={1}>
                  View Resume
                </Button>
                <Button variant="outline" color="red" flex={1}>
                  Delete Resume
                </Button>
              </Group>
            </Stack>
          </Card>
        </motion.div>

        {/* Skills & Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card 
            shadow="md" 
            padding="xl" 
            radius="md"
            style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            <Text size="xl" fw={700} c="white" mb="md">
              Skills & Expertise
            </Text>
            <Group gap="xs">
              {['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'AWS', 'Docker', 'System Design'].map(skill => (
                <Badge key={skill} size="lg" variant="light" color="blue">
                  {skill}
                </Badge>
              ))}
            </Group>
          </Card>
        </motion.div>
      </Stack>
    </Container>
  );
}

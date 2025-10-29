'use client';

import { Container, Title, Text, Card, SimpleGrid, Badge, Avatar, Group, Button, Stack, Textarea, Divider, List } from '@mantine/core';
import { IconMessage, IconCoffee, IconUser, IconBriefcase } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

const mentors = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechGiant Inc',
    expertise: ['System Design', 'Leadership', 'Career Growth'],
    avatar: null,
    bio: '15+ years of experience in software engineering and leadership. Passionate about mentoring and helping engineers grow their careers.',
    yearsExp: '15+ years',
  },
  {
    id: '2',
    name: 'Michael Roberts',
    role: 'Senior Architect',
    company: 'CloudSystems',
    expertise: ['Architecture', 'Microservices', 'AWS'],
    avatar: null,
    bio: 'Cloud architecture specialist with deep expertise in building scalable distributed systems. Former Google and Amazon engineer.',
    yearsExp: '12+ years',
  },
  {
    id: '3',
    name: 'Emma Watson',
    role: 'Engineering Manager',
    company: 'StartupXYZ',
    expertise: ['Team Management', 'Agile', 'React'],
    avatar: null,
    bio: 'Engineering leader focused on building high-performing teams. Expert in Agile methodologies and modern frontend technologies.',
    yearsExp: '10+ years',
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    role: 'Principal Engineer',
    company: 'Microsoft',
    expertise: ['Distributed Systems', 'Performance', 'Scalability'],
    avatar: null,
    bio: 'Principal Engineer at Microsoft with expertise in building large-scale distributed systems. Mentor for aspiring architects.',
    yearsExp: '18+ years',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    role: 'Tech Lead',
    company: 'Meta',
    expertise: ['React', 'GraphQL', 'Mobile Development'],
    avatar: null,
    bio: 'Tech Lead at Meta working on cutting-edge frontend technologies. Passionate about teaching and open-source contribution.',
    yearsExp: '9+ years',
  },
  {
    id: '6',
    name: 'David Park',
    role: 'CTO',
    company: 'InnovateLabs',
    expertise: ['Entrepreneurship', 'Product Strategy', 'AI/ML'],
    avatar: null,
    bio: 'Serial entrepreneur and CTO with multiple successful startups. Expert in product development and AI/ML applications.',
    yearsExp: '20+ years',
  },
  {
    id: '7',
    name: 'Priya Sharma',
    role: 'Staff Engineer',
    company: 'Google',
    expertise: ['Backend Development', 'System Design', 'Python'],
    avatar: null,
    bio: 'Staff Engineer at Google specializing in backend systems and infrastructure. Active mentor in various tech communities.',
    yearsExp: '11+ years',
  },
  {
    id: '8',
    name: 'James Wilson',
    role: 'Director of Engineering',
    company: 'Netflix',
    expertise: ['Engineering Leadership', 'DevOps', 'Cloud Infrastructure'],
    avatar: null,
    bio: 'Director of Engineering at Netflix, leading teams building streaming infrastructure. Expert in DevOps and cloud technologies.',
    yearsExp: '16+ years',
  },
  {
    id: '9',
    name: 'Anita Desai',
    role: 'Senior Product Manager',
    company: 'Salesforce',
    expertise: ['Product Management', 'User Research', 'Strategy'],
    avatar: null,
    bio: 'Senior PM at Salesforce with background in engineering. Helps engineers transition to product management roles.',
    yearsExp: '13+ years',
  },
  {
    id: '10',
    name: 'Carlos Rodriguez',
    role: 'DevOps Engineer',
    company: 'AWS',
    expertise: ['Kubernetes', 'CI/CD', 'Infrastructure'],
    avatar: null,
    bio: 'DevOps expert at AWS specializing in Kubernetes and cloud-native technologies. Regular speaker at tech conferences.',
    yearsExp: '8+ years',
  },
  {
    id: '11',
    name: 'Maya Thompson',
    role: 'Security Architect',
    company: 'Cisco',
    expertise: ['Cybersecurity', 'Compliance', 'Risk Management'],
    avatar: null,
    bio: 'Security Architect with extensive experience in enterprise security. Passionate about secure software development practices.',
    yearsExp: '14+ years',
  },
  {
    id: '12',
    name: 'Ahmed Hassan',
    role: 'Data Science Lead',
    company: 'Uber',
    expertise: ['Machine Learning', 'Data Engineering', 'Analytics'],
    avatar: null,
    bio: 'Data Science Lead at Uber working on ML models for routing and pricing. Mentor for aspiring data scientists.',
    yearsExp: '10+ years',
  },
  {
    id: '13',
    name: 'Sophie Martin',
    role: 'UX Engineering Manager',
    company: 'Adobe',
    expertise: ['UX Design', 'Frontend', 'Accessibility'],
    avatar: null,
    bio: 'UX Engineering Manager at Adobe bridging design and development. Expert in accessible and user-friendly interfaces.',
    yearsExp: '12+ years',
  },
];

export default function MentorsPage() {
  const openDetailsModal = (mentor: typeof mentors[0]) => {
    modals.open({
      title: (
        <Group gap="sm">
          <Avatar size={50} radius="xl" color="primary">
            {mentor.name.split(' ').map((n) => n[0]).join('')}
          </Avatar>
          <div>
            <Text size="lg" fw={700} c="white">
              {mentor.name}
            </Text>
            <Text size="sm" c="gray.5">
              {mentor.role} at {mentor.company}
            </Text>
          </div>
        </Group>
      ),
      size: 'lg',
      styles: {
        content: {
          background: 'rgba(30, 40, 55, 0.98)',
          backdropFilter: 'blur(20px)',
        },
        header: {
          background: 'transparent',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
      children: (
        <Stack gap="lg" mt="md">
          <div>
            <Group gap="xs" mb="sm">
              <IconUser size={20} color="var(--mantine-color-blue-6)" />
              <Text size="sm" fw={600} c="white">About</Text>
            </Group>
            <Text size="sm" c="gray.4" style={{ lineHeight: 1.7 }}>
              {mentor.bio}
            </Text>
          </div>

          <Divider />

          <div>
            <Group gap="xs" mb="sm">
              <IconBriefcase size={20} color="var(--mantine-color-teal-6)" />
              <Text size="sm" fw={600} c="white">Experience</Text>
            </Group>
            <Text size="sm" c="gray.4">
              {mentor.yearsExp} of professional experience
            </Text>
          </div>

          <Divider />

          <div>
            <Text size="sm" fw={600} c="white" mb="sm">Areas of Expertise</Text>
            <Group gap="xs">
              {mentor.expertise.map((skill) => (
                <Badge key={skill} size="lg" variant="light" color="blue">
                  {skill}
                </Badge>
              ))}
            </Group>
          </div>

          <Divider />

          <Group grow mt="md">
            <Button
              variant="light"
              color="blue"
              leftSection={<IconMessage size={18} />}
              onClick={() => {
                modals.closeAll();
                openMessageModal(mentor);
              }}
            >
              Send Message
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'primary', to: 'accent', deg: 135 }}
              leftSection={<IconCoffee size={18} />}
              onClick={() => {
                modals.closeAll();
                openContactModal(mentor);
              }}
            >
              Request Coffee Chat
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  const openContactModal = (mentor: typeof mentors[0]) => {
    modals.open({
      title: `Request a Virtual Coffee Chat with ${mentor.name}`,
      children: (
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Send a message to {mentor.name} to request a coffee chat session and discuss your career goals.
          </Text>
          <Textarea
            label="Your Message"
            placeholder="Hi! I'd love to connect and learn from your experience..."
            minRows={4}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => modals.closeAll()}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'primary', to: 'accent', deg: 135 }}
              onClick={() => {
                notifications.show({
                  title: 'Request Sent!',
                  message: `Your coffee chat request has been sent to ${mentor.name}`,
                  color: 'teal',
                });
                modals.closeAll();
              }}
            >
              Send Request
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  const openMessageModal = (mentor: typeof mentors[0]) => {
    modals.open({
      title: `Send Message to ${mentor.name}`,
      children: (
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Connect with {mentor.name} for career guidance and mentorship.
          </Text>
          <Textarea
            label="Subject"
            placeholder="Career guidance needed..."
            mb="sm"
          />
          <Textarea
            label="Your Message"
            placeholder="Write your message here..."
            minRows={6}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => modals.closeAll()}>
              Cancel
            </Button>
            <Button
              variant="filled"
              color="blue"
              onClick={() => {
                notifications.show({
                  title: 'Message Sent!',
                  message: `Your message has been sent to ${mentor.name}`,
                  color: 'blue',
                });
                modals.closeAll();
              }}
            >
              Send Message
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <Container size="xl" py="xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title order={1} mb="xs" c="white">
          Find a Mentor
        </Title>
        <Text c="gray.4" size="lg" mb="xl">
          Connect with experienced professionals for guidance
        </Text>
      </motion.div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {mentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card shadow="md" padding="xl" radius="md" withBorder style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
              <Stack align="center" gap="md">
                <Avatar size={100} radius="xl" color="primary">
                  {mentor.name.split(' ').map((n) => n[0]).join('')}
                </Avatar>
                
                <div style={{ textAlign: 'center' }}>
                  <Text size="lg" fw={700} c="white">
                    {mentor.name}
                  </Text>
                  <Text size="sm" c="gray.5">
                    {mentor.role}
                  </Text>
                  <Text size="sm" c="gray.5">
                    {mentor.company}
                  </Text>
                </div>

                <Group gap="xs" justify="center">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="light" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </Group>

                <Stack gap="xs" style={{ width: '100%' }}>
                  <Button
                    variant="light"
                    color="cyan"
                    leftSection={<IconUser size={16} />}
                    fullWidth
                    onClick={() => openDetailsModal(mentor)}
                  >
                    View Details
                  </Button>
                  <Group gap="sm" grow style={{ width: '100%' }}>
                    <Button
                      variant="light"
                      leftSection={<IconMessage size={16} />}
                      onClick={() => openMessageModal(mentor)}
                    >
                      Message
                    </Button>
                    <Button
                      variant="gradient"
                      gradient={{ from: 'primary', to: 'accent', deg: 135 }}
                      leftSection={<IconCoffee size={16} />}
                      onClick={() => openContactModal(mentor)}
                    >
                      Coffee Chat
                    </Button>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>
    </Container>
  );
}

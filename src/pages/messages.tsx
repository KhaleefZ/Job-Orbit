'use client';

import { Container, Title, Text, Stack, Card, Group, Badge, Avatar, ScrollArea, Divider, TextInput, Textarea, Button, Modal, Paper } from '@mantine/core';
import { IconMessage, IconSearch, IconSend } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

const conversations = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechGiant Inc',
    lastMessage: 'That sounds great! Let\'s schedule a call for next week.',
    timestamp: '2 hours ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'InnovateTech Recruiting',
    role: 'Recruitment Team',
    company: 'InnovateTech',
    lastMessage: 'Thank you for your application. We\'d like to schedule an interview.',
    timestamp: '1 day ago',
    unread: 1,
  },
  {
    id: '3',
    name: 'Michael Roberts',
    role: 'Senior Architect',
    company: 'CloudSystems',
    lastMessage: 'I reviewed your portfolio, very impressive work!',
    timestamp: '3 days ago',
    unread: 0,
  },
  {
    id: '4',
    name: 'TechFlow HR Team',
    role: 'Human Resources',
    company: 'TechFlow India',
    lastMessage: 'We would love to discuss the Senior React Developer position with you.',
    timestamp: '5 hours ago',
    unread: 3,
  },
  {
    id: '5',
    name: 'Emma Watson',
    role: 'Engineering Manager',
    company: 'StartupXYZ',
    lastMessage: 'Your technical assessment was excellent. Let\'s move to the next round.',
    timestamp: '1 day ago',
    unread: 1,
  },
  {
    id: '6',
    name: 'David Park',
    role: 'CTO',
    company: 'InnovateLabs',
    lastMessage: 'I\'d like to offer you a mentorship opportunity.',
    timestamp: '2 days ago',
    unread: 0,
  },
  {
    id: '7',
    name: 'Google Careers',
    role: 'Talent Acquisition',
    company: 'Google',
    lastMessage: 'Your profile matches our requirements for Staff Engineer position.',
    timestamp: '3 days ago',
    unread: 2,
  },
  {
    id: '8',
    name: 'Priya Sharma',
    role: 'Staff Engineer',
    company: 'Google',
    lastMessage: 'Happy to help you prepare for the system design interview!',
    timestamp: '4 days ago',
    unread: 0,
  },
  {
    id: '9',
    name: 'Microsoft Recruiting',
    role: 'Recruitment',
    company: 'Microsoft',
    lastMessage: 'We have an exciting opportunity in Azure team.',
    timestamp: '5 days ago',
    unread: 1,
  },
  {
    id: '10',
    name: 'James Wilson',
    role: 'Director of Engineering',
    company: 'Netflix',
    lastMessage: 'Great conversation! Let me introduce you to the team.',
    timestamp: '1 week ago',
    unread: 0,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<typeof conversations[0] | null>(null);
  const [chatOpened, { open: openChat, close: closeChat }] = useDisclosure(false);
  const [messageText, setMessageText] = useState('');

  const handleConversationClick = (conv: typeof conversations[0]) => {
    setSelectedConversation(conv);
    openChat();
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      notifications.show({
        title: 'Message Sent!',
        message: `Your message has been sent to ${selectedConversation.name}`,
        color: 'teal',
      });
      setMessageText('');
    }
  };

  return (
    <>
      <Container size="xl" py="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title order={1} mb="xs" c="white">
            <Group gap="xs">
              <IconMessage size={36} stroke={2} color="var(--mantine-color-primary-6)" />
              Messages
            </Group>
          </Title>
          <Text c="gray.4" size="lg" mb="xl">
            Your conversations with recruiters and mentors
          </Text>
        </motion.div>

        <ScrollArea h={600}>
          <Stack gap="md">
            {conversations.map((conv, index) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ 
                    cursor: 'pointer',
                    background: 'rgba(45, 55, 72, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                  }}
                  onClick={() => handleConversationClick(conv)}
                >
                  <Group>
                    <Avatar size={60} radius="xl" color="primary">
                      {conv.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Group justify="space-between" mb="xs">
                        <div>
                          <Text size="md" fw={600} c="white">
                            {conv.name}
                          </Text>
                          <Text size="xs" c="gray.5">
                            {conv.role} • {conv.company}
                          </Text>
                        </div>
                        <Group gap="xs">
                          {conv.unread > 0 && (
                            <Badge size="lg" variant="filled" color="primary" circle>
                              {conv.unread}
                            </Badge>
                          )}
                          <Text size="xs" c="gray.6">
                            {conv.timestamp}
                          </Text>
                        </Group>
                      </Group>
                      <Text size="sm" c="gray.5" lineClamp={1}>
                        {conv.lastMessage}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </ScrollArea>

      <Modal
        opened={chatOpened}
        onClose={closeChat}
        title={
          selectedConversation && (
            <Group gap="sm">
              <Avatar size={40} radius="xl" color="primary">
                {selectedConversation.name.split(' ').map((n) => n[0]).join('')}
              </Avatar>
              <div>
                <Text size="md" fw={600} c="white">
                  {selectedConversation.name}
                </Text>
                <Text size="xs" c="gray.5">
                  {selectedConversation.role} • {selectedConversation.company}
                </Text>
              </div>
            </Group>
          )
        }
        size="lg"
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
        {selectedConversation && (
          <Stack gap="md">
            <ScrollArea h={400} style={{ 
              background: 'rgba(45, 55, 72, 0.4)',
              borderRadius: '8px',
              padding: '1rem'
            }}>
              <Stack gap="md">
                <Paper p="md" radius="md" style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  marginLeft: 'auto',
                  maxWidth: '70%'
                }}>
                  <Text size="sm" c="white">
                    Hi! I'd love to discuss the opportunity.
                  </Text>
                  <Text size="xs" c="gray.5" mt="xs">
                    2 days ago
                  </Text>
                </Paper>

                <Paper p="md" radius="md" style={{
                  background: 'rgba(45, 55, 72, 0.8)',
                  marginRight: 'auto',
                  maxWidth: '70%'
                }}>
                  <Text size="sm" c="white">
                    {selectedConversation.lastMessage}
                  </Text>
                  <Text size="xs" c="gray.5" mt="xs">
                    {selectedConversation.timestamp}
                  </Text>
                </Paper>
              </Stack>
            </ScrollArea>

            <Group gap="xs" align="flex-end">
              <Textarea
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.currentTarget.value)}
                minRows={2}
                style={{ flex: 1 }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                leftSection={<IconSend size={16} />}
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                Send
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
      </Container>
    </>
  );
}

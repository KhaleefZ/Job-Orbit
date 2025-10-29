'use client';

import { Container, Title, Text, Card, Stack, Group, Switch, Select, Button, Divider, SegmentedControl, ColorSwatch, Slider } from '@mantine/core';
import { IconSettings, IconBell, IconPalette, IconShield, IconDatabase, IconLanguage, IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { loadSettings, saveSettings } from '@/lib/userStore';

export default function SettingsPage() {
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [messageNotifications, setMessageNotifications] = useState(true);

  // Appearance Settings
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState('en');

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Data Settings
  const [autoSave, setAutoSave] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  useEffect(() => {
    const s = loadSettings();
    if (s) {
      setEmailNotifications(!!s.emailNotifications);
      setPushNotifications(!!s.pushNotifications);
      setJobAlerts(!!s.jobAlerts);
      setWeeklyDigest(!!s.weeklyDigest);
      setMessageNotifications(!!s.messageNotifications);
      setTheme(s.theme || 'dark');
      setFontSize(s.fontSize || 16);
      setLanguage(s.language || 'en');
      setProfileVisibility(s.profileVisibility || 'public');
      setShowEmail(!!s.showEmail);
      setShowPhone(!!s.showPhone);
      setAutoSave(!!s.autoSave);
      setDataCollection(!!s.dataCollection);
    }
  }, []);

  const handleSaveSettings = () => {
    const settings = {
      emailNotifications,
      pushNotifications,
      jobAlerts,
      weeklyDigest,
      messageNotifications,
      theme,
      fontSize,
      language,
      profileVisibility,
      showEmail,
      showPhone,
      autoSave,
      dataCollection,
    };
    saveSettings(settings);
    notifications.show({
      title: 'Settings Saved!',
      message: 'Your preferences have been updated successfully',
      color: 'teal',
      icon: <IconCheck size={18} />,
    });
  };

  const handleResetSettings = () => {
    // Reset to defaults
    setEmailNotifications(true);
    setPushNotifications(true);
    setJobAlerts(true);
    setWeeklyDigest(false);
    setMessageNotifications(true);
    setTheme('dark');
    setFontSize(16);
    setLanguage('en');
    setProfileVisibility('public');
    setShowEmail(false);
    setShowPhone(false);
    setAutoSave(true);
    setDataCollection(true);

    notifications.show({
      title: 'Settings Reset',
      message: 'All settings have been restored to defaults',
      color: 'blue',
    });
    // persist defaults
    saveSettings({});
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
              <Group gap="xs">
                <IconSettings size={36} stroke={2} color="var(--mantine-color-primary-6)" />
                Settings
              </Group>
            </Title>
            <Text c="gray.4" size="lg">
              Customize your JobOrbit experience
            </Text>
          </div>
        </Group>
      </motion.div>

      <Stack gap="lg">
        {/* Notification Settings */}
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
            <Group mb="lg">
              <IconBell size={24} color="var(--mantine-color-blue-6)" />
              <Title order={3} c="white">Notification Preferences</Title>
            </Group>
            
            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Email Notifications</Text>
                  <Text size="xs" c="gray.5">Receive updates via email</Text>
                </div>
                <Switch
                  checked={emailNotifications}
                  onChange={(event) => setEmailNotifications(event.currentTarget.checked)}
                  color="teal"
                  size="md"
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Push Notifications</Text>
                  <Text size="xs" c="gray.5">Receive browser notifications</Text>
                </div>
                <Switch
                  checked={pushNotifications}
                  onChange={(event) => setPushNotifications(event.currentTarget.checked)}
                  color="teal"
                  size="md"
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Job Alerts</Text>
                  <Text size="xs" c="gray.5">Get notified about matching jobs</Text>
                </div>
                <Switch
                  checked={jobAlerts}
                  onChange={(event) => setJobAlerts(event.currentTarget.checked)}
                  color="teal"
                  size="md"
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Weekly Digest</Text>
                  <Text size="xs" c="gray.5">Summary of activities and opportunities</Text>
                </div>
                <Switch
                  checked={weeklyDigest}
                  onChange={(event) => setWeeklyDigest(event.currentTarget.checked)}
                  color="teal"
                  size="md"
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Message Notifications</Text>
                  <Text size="xs" c="gray.5">Alerts for new messages from mentors</Text>
                </div>
                <Switch
                  checked={messageNotifications}
                  onChange={(event) => setMessageNotifications(event.currentTarget.checked)}
                  color="teal"
                  size="md"
                />
              </Group>
            </Stack>
          </Card>
        </motion.div>

        {/* Appearance Settings */}
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
            <Group mb="lg">
              <IconPalette size={24} color="var(--mantine-color-pink-6)" />
              <Title order={3} c="white">Appearance</Title>
            </Group>
            
            <Stack gap="md">
              <div>
                <Text size="sm" fw={500} c="white" mb="xs">Theme</Text>
                <SegmentedControl
                  value={theme}
                  onChange={setTheme}
                  data={[
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'Auto', value: 'auto' },
                  ]}
                  fullWidth
                />
              </div>

              <div>
                <Text size="sm" fw={500} c="white" mb="xs">Font Size: {fontSize}px</Text>
                <Slider
                  value={fontSize}
                  onChange={setFontSize}
                  min={12}
                  max={20}
                  step={1}
                  marks={[
                    { value: 12, label: 'Small' },
                    { value: 16, label: 'Medium' },
                    { value: 20, label: 'Large' },
                  ]}
                  color="blue"
                />
              </div>

              <div>
                <Text size="sm" fw={500} c="white" mb="xs">Language</Text>
                <Select
                  value={language}
                  onChange={(value) => setLanguage(value || 'en')}
                  data={[
                    { value: 'en', label: '🇬🇧 English' },
                    { value: 'hi', label: '🇮🇳 हिंदी (Hindi)' },
                    { value: 'ta', label: '🇮🇳 தமிழ் (Tamil)' },
                    { value: 'te', label: '🇮🇳 తెలుగు (Telugu)' },
                    { value: 'kn', label: '🇮🇳 ಕನ್ನಡ (Kannada)' },
                  ]}
                  leftSection={<IconLanguage size={18} />}
                />
              </div>
            </Stack>
          </Card>
        </motion.div>

        {/* Privacy Settings */}
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
            <Group mb="lg">
              <IconShield size={24} color="var(--mantine-color-green-6)" />
              <Title order={3} c="white">Privacy & Security</Title>
            </Group>
            
            <Stack gap="md">
              <div>
                <Text size="sm" fw={500} c="white" mb="xs">Profile Visibility</Text>
                <SegmentedControl
                  value={profileVisibility}
                  onChange={setProfileVisibility}
                  data={[
                    { label: '🌐 Public', value: 'public' },
                    { label: '👥 Connections', value: 'connections' },
                    { label: '🔒 Private', value: 'private' },
                  ]}
                  fullWidth
                />
              </div>

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Show Email Address</Text>
                  <Text size="xs" c="gray.5">Make your email visible on profile</Text>
                </div>
                <Switch
                  checked={showEmail}
                  onChange={(event) => setShowEmail(event.currentTarget.checked)}
                  color="green"
                  size="md"
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Show Phone Number</Text>
                  <Text size="xs" c="gray.5">Make your phone visible on profile</Text>
                </div>
                <Switch
                  checked={showPhone}
                  onChange={(event) => setShowPhone(event.currentTarget.checked)}
                  color="green"
                  size="md"
                />
              </Group>
            </Stack>
          </Card>
        </motion.div>

        {/* Data & Storage Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
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
            <Group mb="lg">
              <IconDatabase size={24} color="var(--mantine-color-orange-6)" />
              <Title order={3} c="white">Data & Storage</Title>
            </Group>
            
            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Auto-save Preferences</Text>
                  <Text size="xs" c="gray.5">Automatically save your changes</Text>
                </div>
                <Switch
                  checked={autoSave}
                  onChange={(event) => setAutoSave(event.currentTarget.checked)}
                  color="orange"
                  size="md"
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Usage Analytics</Text>
                  <Text size="xs" c="gray.5">Help us improve JobOrbit</Text>
                </div>
                <Switch
                  checked={dataCollection}
                  onChange={(event) => setDataCollection(event.currentTarget.checked)}
                  color="orange"
                  size="md"
                />
              </Group>

              <Divider my="sm" />

              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500} c="white">Storage Used</Text>
                  <Text size="xs" c="gray.5">15 MB of 1 GB</Text>
                </div>
                <Button variant="light" size="xs" color="orange">
                  Clear Cache
                </Button>
              </Group>
            </Stack>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Group justify="flex-end" gap="md">
            <Button
              variant="light"
              size="lg"
              onClick={handleResetSettings}
            >
              Reset to Defaults
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 135 }}
              size="lg"
              onClick={handleSaveSettings}
            >
              Save Changes
            </Button>
          </Group>
        </motion.div>
      </Stack>
    </Container>
  );
}

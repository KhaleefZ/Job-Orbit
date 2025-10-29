'use client';

import { Container, Title, Text, Card, SimpleGrid, Stack, Progress, Group, Badge, Grid } from '@mantine/core';
import { IconTrendingUp, IconUsers, IconBriefcase, IconTarget, IconChartBar, IconActivity } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, FunnelChart, Funnel, LabelList } from 'recharts';

const applicationData = [
  { month: 'Jan', applications: 5, interviews: 1, offers: 0 },
  { month: 'Feb', applications: 8, interviews: 3, offers: 1 },
  { month: 'Mar', applications: 12, interviews: 5, offers: 2 },
  { month: 'Apr', applications: 15, interviews: 6, offers: 2 },
  { month: 'May', applications: 10, interviews: 4, offers: 1 },
];

const applicationStatusData = [
  { name: 'Applied', value: 50, color: '#0080ff' },
  { name: 'Under Review', value: 19, color: '#51cf66' },
  { name: 'Interview', value: 12, color: '#ff63a1' },
  { name: 'Offered', value: 6, color: '#ffd93d' },
  { name: 'Rejected', value: 13, color: '#868e96' },
];

const skillsData = [
  { skill: 'React', level: 95, fullMark: 100 },
  { skill: 'TypeScript', level: 90, fullMark: 100 },
  { skill: 'Node.js', level: 80, fullMark: 100 },
  { skill: 'System Design', level: 75, fullMark: 100 },
  { skill: 'Leadership', level: 70, fullMark: 100 },
  { skill: 'Cloud (AWS)', level: 65, fullMark: 100 },
];

const funnelData = [
  { name: 'Job Views', value: 245, fill: '#0080ff' },
  { name: 'Applications', value: 50, fill: '#51cf66' },
  { name: 'Interviews', value: 19, fill: '#ff63a1' },
  { name: 'Offers', value: 6, fill: '#ffd93d' },
];

const jobTypeData = [
  { type: 'Full-Time', count: 35 },
  { type: 'Contract', count: 8 },
  { type: 'Remote', count: 28 },
  { type: 'Hybrid', count: 15 },
];

const stats = [
  { title: 'Total Applications', value: 50, icon: IconBriefcase, color: 'blue', change: '+12%' },
  { title: 'Interview Rate', value: 38, icon: IconUsers, color: 'teal', change: '+8%' },
  { title: 'Offer Rate', value: 12, icon: IconTarget, color: 'green', change: '+15%' },
  { title: 'Profile Views', value: 245, icon: IconTrendingUp, color: 'grape', change: '+25%' },
];

export default function AnalyticsPage() {
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
                <IconChartBar size={36} stroke={2} color="var(--mantine-color-primary-6)" />
                Career Analytics Dashboard
              </Group>
            </Title>
            <Text c="gray.4" size="lg">
              Track your job search progress with detailed insights and metrics
            </Text>
          </div>
          <Badge size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 135 }}>
            <Group gap="xs">
              <IconActivity size={18} />
              <Text>Live Data</Text>
            </Group>
          </Badge>
        </Group>
      </motion.div>

      {/* Stats Grid */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
              <Stack gap="sm">
                <Group justify="space-between">
                  <stat.icon size={32} color={`var(--mantine-color-${stat.color}-6)`} />
                  <Badge size="lg" variant="light" color={stat.color}>
                    {stat.change}
                  </Badge>
                </Group>
                <div>
                  <Text size="xl" fw={700} c="white">
                    {stat.value}
                  </Text>
                  <Text size="sm" c="gray.5">
                    {stat.title}
                  </Text>
                </div>
                <Progress value={stat.value} color={stat.color} size="sm" />
              </Stack>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Charts Grid */}
      <Grid gutter="lg">
        {/* Application Activity Chart - Full Width */}
        <Grid.Col span={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card shadow="md" padding="xl" radius="md" style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
              <Title order={3} mb="lg" c="white">
                Application Activity Timeline
              </Title>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={applicationData}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0080ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0080ff" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#51cf66" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#51cf66" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff63a1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff63a1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 40, 55, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="applications" stroke="#0080ff" fillOpacity={1} fill="url(#colorApps)" />
                  <Area type="monotone" dataKey="interviews" stroke="#51cf66" fillOpacity={1} fill="url(#colorInterviews)" />
                  <Area type="monotone" dataKey="offers" stroke="#ff63a1" fillOpacity={1} fill="url(#colorOffers)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid.Col>

        {/* Application Status Pie Chart */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card shadow="md" padding="xl" radius="md" style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              height: '100%',
            }}>
              <Title order={3} mb="lg" c="white">
                Application Status Distribution
              </Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 40, 55, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid.Col>

        {/* Skills Radar Chart */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card shadow="md" padding="xl" radius="md" style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              height: '100%',
            }}>
              <Title order={3} mb="lg" c="white">
                Skills Assessment
              </Title>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="skill" stroke="#fff" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#fff" />
                  <Radar name="Skill Level" dataKey="level" stroke="#0080ff" fill="#0080ff" fillOpacity={0.6} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 40, 55, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid.Col>

        {/* Job Type Bar Chart */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card shadow="md" padding="xl" radius="md" style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              height: '100%',
            }}>
              <Title order={3} mb="lg" c="white">
                Job Type Preferences
              </Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="type" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 40, 55, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="count" fill="#0080ff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid.Col>

        {/* Application Funnel */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card shadow="md" padding="xl" radius="md" style={{
              background: 'rgba(45, 55, 72, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              height: '100%',
            }}>
              <Title order={3} mb="lg" c="white">
                Application Conversion Funnel
              </Title>
              <ResponsiveContainer width="100%" height={300}>
                <FunnelChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 40, 55, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList position="right" fill="#fff" stroke="none" dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

'use client';

import { Grid, Container, Title, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import MyOrbitCard from '@/components/Dashboard/MyOrbitCard';
import RecommendedJobs from '@/components/Dashboard/RecommendedJobs';
import SkillTrajectory from '@/components/Dashboard/SkillTrajectory';
import ApplicationsOverview from '@/components/Dashboard/ApplicationsOverview';
import QuickActions from '@/components/Dashboard/QuickActions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title order={1} mb="xs" c="white">
          Mission Control
        </Title>
        <Text c="gray.4" size="lg" mb="xl">
          Welcome back! Here's your career overview at a glance.
        </Text>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <motion.div variants={itemVariants}>
              <MyOrbitCard />
            </motion.div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <motion.div variants={itemVariants}>
              <QuickActions />
            </motion.div>
          </Grid.Col>

          <Grid.Col span={12}>
            <motion.div variants={itemVariants}>
              <RecommendedJobs />
            </motion.div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div variants={itemVariants}>
              <SkillTrajectory />
            </motion.div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div variants={itemVariants}>
              <ApplicationsOverview />
            </motion.div>
          </Grid.Col>
        </Grid>
      </motion.div>
    </Container>
  );
}

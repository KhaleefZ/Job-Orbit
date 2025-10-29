'use client';

import { useCallback, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { loadCareerGoals, saveCareerGoals, pushNotification } from '@/lib/userStore';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, Badge, Text, Group, Stack, Button, Modal, Title, Divider, ScrollArea } from '@mantine/core';
import { IconTarget, IconCheck, IconClock, IconStar, IconBriefcase, IconMapPin, IconCurrencyRupee } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import styles from './CareerMapVisualization.module.css';

// Mock job data for career nodes
const careerJobs = {
  '1': {
    title: 'Junior Developer',
    company: 'StartupXYZ',
    location: 'Bangalore, Karnataka',
    salary: '₹4L - ₹8L / year',
    description: 'Entry-level position focusing on building foundational development skills.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
    requirements: ['0-2 years experience', 'Basic programming knowledge', 'Willingness to learn'],
  },
  '2': {
    title: 'Frontend Developer',
    company: 'TechCorp India',
    location: 'Bangalore, Karnataka',
    salary: '₹8L - ₹15L / year',
    description: 'Build modern web applications using React and TypeScript.',
    skills: ['React', 'TypeScript', 'Redux', 'CSS-in-JS'],
    requirements: ['2-4 years experience', 'Strong React knowledge', 'Component architecture skills'],
  },
  '3': {
    title: 'Senior Frontend Developer',
    company: 'InnovateTech',
    location: 'Bangalore, Karnataka',
    salary: '₹15L - ₹25L / year',
    description: 'Lead frontend projects and mentor junior developers.',
    skills: ['React', 'Next.js', 'Architecture', 'Mentoring', 'Performance Optimization'],
    requirements: ['5+ years experience', 'Leadership skills', 'Advanced React patterns'],
  },
  '4': {
    title: 'Lead Frontend Architect',
    company: 'InnovateTech Solutions',
    location: 'Bangalore, Karnataka',
    salary: '₹25L - ₹40L / year',
    description: 'Design and implement scalable frontend architectures for enterprise applications.',
    skills: ['System Design', 'Leadership', 'Architecture', 'Strategy', 'Microservices'],
    requirements: ['8+ years experience', 'Expert in React and TypeScript', 'Strong System Design skills'],
  },
  '5': {
    title: 'Engineering Manager',
    company: 'CloudTech Global',
    location: 'Bangalore, Karnataka',
    salary: '₹30L - ₹50L / year',
    description: 'Lead and manage engineering teams to deliver high-quality software products.',
    skills: ['Leadership', 'Team Management', 'Strategy', 'Communication', 'Agile'],
    requirements: ['8+ years experience', 'Proven leadership record', 'Strategic thinking'],
  },
  '6': {
    title: 'System Design Specialist',
    company: 'TechFlow India',
    location: 'Bangalore, Karnataka',
    salary: '₹20L - ₹35L / year',
    description: 'Focus on designing scalable and performant systems.',
    skills: ['Architecture', 'Scalability', 'Performance', 'Cloud Services'],
    requirements: ['6+ years experience', 'Deep system design knowledge', 'Cloud platform expertise'],
  },
  '7': {
    title: 'Technical Lead',
    company: 'DataSystems Inc',
    location: 'Bangalore, Karnataka',
    salary: '₹20L - ₹35L / year',
    description: 'Lead technical teams and drive engineering excellence.',
    skills: ['Communication', 'Mentoring', 'Strategy', 'Technical Leadership'],
    requirements: ['6+ years experience', 'Strong leadership', 'Excellent communication'],
  },
};

// Custom Node Component
function CustomNode({ data }: any) {
  const getNodeStyle = () => {
    switch (data.status) {
      case 'completed':
        return {
          background: 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)',
          border: '3px solid #2f9e44',
          boxShadow: '0 4px 15px rgba(81, 207, 102, 0.3)',
        };
      case 'current':
        return {
          background: 'linear-gradient(135deg, #0080ff 0%, #0066cc 100%)',
          border: '3px solid #0052a3',
          boxShadow: '0 0 25px rgba(0, 128, 255, 0.6)',
          animation: 'pulse 2s ease-in-out infinite',
        };
      case 'target':
        return {
          background: 'linear-gradient(135deg, #ff63a1 0%, #e6598f 100%)',
          border: '3px solid #cc4f7d',
          boxShadow: '0 0 25px rgba(255, 99, 161, 0.6)',
          animation: 'pulse 2s ease-in-out infinite',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #868e96 0%, #495057 100%)',
          border: '2px solid #343a40',
          opacity: 0.85,
        };
    }
  };

  const getIcon = () => {
    switch (data.status) {
      case 'completed':
        return <IconCheck size={20} color="white" />;
      case 'current':
        return <IconClock size={20} color="white" />;
      case 'target':
        return <IconTarget size={20} color="white" />;
      default:
        return <IconStar size={20} color="white" />;
    }
  };

  return (
    <div
      className={styles.customNode}
      style={getNodeStyle()}
      onClick={() => data.onClick && data.onClick(data.nodeId)}
    >
      <Group gap="xs" wrap="nowrap">
        {getIcon()}
        <div>
          <Text size="sm" fw={700} c="white" style={{ textAlign: 'center', lineHeight: 1.2 }}>
            {data.label}
          </Text>
          {data.timeline && (
            <Text size="xs" c="rgba(255,255,255,0.8)" style={{ textAlign: 'center' }}>
              {data.timeline}
            </Text>
          )}
        </div>
      </Group>
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};


const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 400, y: 50 },
    data: {
      label: 'Junior Developer',
      status: 'completed',
      timeline: '2018-2020',
      nodeId: '1',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 180 },
    data: {
      label: 'Frontend Developer',
      status: 'completed',
      timeline: '2020-2022',
      nodeId: '2',
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 310 },
    data: {
      label: 'Senior Frontend Developer',
      status: 'current',
      timeline: '2022-Present',
      nodeId: '3',
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 250, y: 480 },
    data: {
      label: 'Lead Frontend Architect',
      status: 'target',
      timeline: 'Within 1 year',
      nodeId: '4',
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 550, y: 480 },
    data: {
      label: 'Engineering Manager',
      status: 'potential',
      timeline: 'Within 1-2 years',
      nodeId: '5',
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 150, y: 310 },
    data: {
      label: 'System Design Specialist',
      status: 'potential',
      timeline: 'Skill Development',
      nodeId: '6',
    },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 650, y: 310 },
    data: {
      label: 'Technical Lead',
      status: 'potential',
      timeline: 'Leadership Track',
      nodeId: '7',
    },
  },
  {
    id: '8',
    type: 'custom',
    position: { x: 100, y: 650 },
    data: {
      label: 'Principal Engineer',
      status: 'potential',
      timeline: '3-5 years',
      nodeId: '4',
    },
  },
  {
    id: '9',
    type: 'custom',
    position: { x: 700, y: 650 },
    data: {
      label: 'VP of Engineering',
      status: 'potential',
      timeline: '5+ years',
      nodeId: '5',
    },
  },
  {
    id: '10',
    type: 'custom',
    position: { x: 400, y: 650 },
    data: {
      label: 'Tech Startup Founder',
      status: 'potential',
      timeline: 'Alternative Path',
      nodeId: '5',
    },
  },
];

const initialEdges: Edge[] = [
  // Completed path edges
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: false, 
    style: { stroke: '#51cf66', strokeWidth: 5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#51cf66', width: 25, height: 25 },
    label: '✓ Completed',
    labelStyle: { fill: '#51cf66', fontWeight: 700, fontSize: 14 },
    labelBgStyle: { fill: 'rgba(81, 207, 102, 0.2)', fillOpacity: 0.9 },
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: false, 
    style: { stroke: '#51cf66', strokeWidth: 5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#51cf66', width: 25, height: 25 },
    label: '✓ Completed',
    labelStyle: { fill: '#51cf66', fontWeight: 700, fontSize: 14 },
    labelBgStyle: { fill: 'rgba(81, 207, 102, 0.2)', fillOpacity: 0.9 },
  },

  // Primary target paths
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4', 
    animated: true, 
    style: { stroke: '#ff63a1', strokeWidth: 5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff63a1', width: 25, height: 25 },
    label: '🎯 Primary Goal',
    labelStyle: { fill: '#ff63a1', fontWeight: 700, fontSize: 14 },
    labelBgStyle: { fill: 'rgba(255, 99, 161, 0.2)', fillOpacity: 0.9 },
  },
  { 
    id: 'e3-5', 
    source: '3', 
    target: '5', 
    animated: true, 
    style: { stroke: '#ffd93d', strokeWidth: 4, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ffd93d', width: 22, height: 22 },
    label: '⚡ Alternative Path',
    labelStyle: { fill: '#ffd93d', fontWeight: 600, fontSize: 13 },
    labelBgStyle: { fill: 'rgba(255, 217, 61, 0.2)', fillOpacity: 0.8 },
  },

  // Skill development paths
  { 
    id: 'e3-6', 
    source: '3', 
    target: '6', 
    animated: true, 
    style: { stroke: '#0080ff', strokeWidth: 3, strokeDasharray: '8,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#0080ff', width: 20, height: 20 },
    label: '📚 Skill Path',
    labelStyle: { fill: '#0080ff', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'rgba(0, 128, 255, 0.15)', fillOpacity: 0.8 },
  },
  { 
    id: 'e3-7', 
    source: '3', 
    target: '7', 
    animated: true, 
    style: { stroke: '#0080ff', strokeWidth: 3, strokeDasharray: '8,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#0080ff', width: 20, height: 20 },
    label: '👥 Leadership Path',
    labelStyle: { fill: '#0080ff', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'rgba(0, 128, 255, 0.15)', fillOpacity: 0.8 },
  },

  // Intermediate to advanced paths
  { 
    id: 'e6-4', 
    source: '6', 
    target: '4', 
    animated: true, 
    style: { stroke: '#a78bfa', strokeWidth: 3, strokeDasharray: '5,3' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#a78bfa', width: 20, height: 20 },
    label: '🔧 Technical Expertise',
    labelStyle: { fill: '#a78bfa', fontWeight: 500, fontSize: 11 },
  },
  { 
    id: 'e7-5', 
    source: '7', 
    target: '5', 
    animated: true, 
    style: { stroke: '#a78bfa', strokeWidth: 3, strokeDasharray: '5,3' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#a78bfa', width: 20, height: 20 },
    label: '💼 Management Track',
    labelStyle: { fill: '#a78bfa', fontWeight: 500, fontSize: 11 },
  },

  // Advanced career paths
  { 
    id: 'e4-8', 
    source: '4', 
    target: '8', 
    animated: true, 
    style: { stroke: '#fb923c', strokeWidth: 4, strokeDasharray: '10,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#fb923c', width: 22, height: 22 },
    label: '🚀 Senior IC Track',
    labelStyle: { fill: '#fb923c', fontWeight: 600, fontSize: 12 },
  },
  { 
    id: 'e5-9', 
    source: '5', 
    target: '9', 
    animated: true, 
    style: { stroke: '#fb923c', strokeWidth: 4, strokeDasharray: '10,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#fb923c', width: 22, height: 22 },
    label: '👑 Executive Track',
    labelStyle: { fill: '#fb923c', fontWeight: 600, fontSize: 12 },
  },

  // Alternative entrepreneurship path
  { 
    id: 'e4-10', 
    source: '4', 
    target: '10', 
    animated: true, 
    style: { stroke: '#10b981', strokeWidth: 3, strokeDasharray: '3,3' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981', width: 20, height: 20 },
    label: '💡 Entrepreneurship',
    labelStyle: { fill: '#10b981', fontWeight: 500, fontSize: 11 },
  },
  { 
    id: 'e5-10', 
    source: '5', 
    target: '10', 
    animated: true, 
    style: { stroke: '#10b981', strokeWidth: 3, strokeDasharray: '3,3' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981', width: 20, height: 20 },
    label: '🎯 Startup Path',
    labelStyle: { fill: '#10b981', fontWeight: 500, fontSize: 11 },
  },

  // Cross connections for flexibility
  { 
    id: 'e6-8', 
    source: '6', 
    target: '8', 
    animated: false, 
    style: { stroke: '#64748b', strokeWidth: 2, strokeDasharray: '2,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 18, height: 18 },
  },
  { 
    id: 'e7-9', 
    source: '7', 
    target: '9', 
    animated: false, 
    style: { stroke: '#64748b', strokeWidth: 2, strokeDasharray: '2,4' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 18, height: 18 },
  },
  { 
    id: 'e2-6', 
    source: '2', 
    target: '6', 
    animated: false, 
    style: { stroke: '#64748b', strokeWidth: 2, strokeDasharray: '2,2', opacity: 0.4 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 15, height: 15 },
  },
  { 
    id: 'e2-7', 
    source: '2', 
    target: '7', 
    animated: false, 
    style: { stroke: '#64748b', strokeWidth: 2, strokeDasharray: '2,2', opacity: 0.4 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 15, height: 15 },
  },
];

export default function CareerMapVisualization() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    open();
  }, [open]);

  // Update nodes with onClick handler
  const nodesWithHandlers = nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      onClick: handleNodeClick,
    },
  }));

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  const selectedJob = selectedNodeId ? careerJobs[selectedNodeId as keyof typeof careerJobs] : null;

  return (
    <>
      <Card shadow="lg" padding={0} radius="md" style={{ height: '800px', overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className={styles.reactFlow}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <Panel position="top-left">
            <Card shadow="sm" padding="md" radius="md" style={{ 
              background: 'rgba(255, 255, 255, 0.97)', 
              maxWidth: '280px',
              backdropFilter: 'blur(10px)',
            }}>
              <Stack gap="xs">
                <Text size="md" fw={700} mb="sm" c="dark">🗺️ Career Roadmap Guide</Text>
                
                <div>
                  <Text size="xs" fw={600} c="dimmed" mb="xs">Node Status</Text>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)', boxShadow: '0 2px 8px rgba(81, 207, 102, 0.4)' }} />
                      <Text size="xs" fw={600}>Completed</Text>
                    </Group>
                    <Group gap="xs">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #0080ff 0%, #0066cc 100%)', boxShadow: '0 0 14px rgba(0, 128, 255, 0.7)' }} />
                      <Text size="xs" fw={600}>Current Position</Text>
                    </Group>
                    <Group gap="xs">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #ff63a1 0%, #e6598f 100%)', boxShadow: '0 0 14px rgba(255, 99, 161, 0.7)' }} />
                      <Text size="xs" fw={600}>Primary Target</Text>
                    </Group>
                    <Group gap="xs">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #868e96 0%, #495057 100%)', opacity: 0.85 }} />
                      <Text size="xs" fw={600}>Potential Path</Text>
                    </Group>
                  </Stack>
                </div>

                <Divider my="xs" />

                <div>
                  <Text size="xs" fw={600} c="dimmed" mb="xs">Path Types</Text>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <div style={{ width: 30, height: 3, background: '#ff63a1', borderRadius: 2 }} />
                      <Text size="xs">🎯 Primary Goal</Text>
                    </Group>
                    <Group gap="xs">
                      <div style={{ width: 30, height: 3, background: '#ffd93d', borderRadius: 2, backgroundImage: 'repeating-linear-gradient(90deg, #ffd93d, #ffd93d 5px, transparent 5px, transparent 10px)' }} />
                      <Text size="xs">⚡ Alternative</Text>
                    </Group>
                    <Group gap="xs">
                      <div style={{ width: 30, height: 3, background: '#0080ff', borderRadius: 2, backgroundImage: 'repeating-linear-gradient(90deg, #0080ff, #0080ff 8px, transparent 8px, transparent 12px)' }} />
                      <Text size="xs">📚 Skill Development</Text>
                    </Group>
                    <Group gap="xs">
                      <div style={{ width: 30, height: 3, background: '#fb923c', borderRadius: 2, backgroundImage: 'repeating-linear-gradient(90deg, #fb923c, #fb923c 10px, transparent 10px, transparent 15px)' }} />
                      <Text size="xs">🚀 Advanced Track</Text>
                    </Group>
                    <Group gap="xs">
                      <div style={{ width: 30, height: 3, background: '#10b981', borderRadius: 2, backgroundImage: 'repeating-linear-gradient(90deg, #10b981, #10b981 3px, transparent 3px, transparent 6px)' }} />
                      <Text size="xs">💡 Entrepreneurship</Text>
                    </Group>
                  </Stack>
                </div>

                <Divider my="xs" />
                
                <Text size="xs" c="dimmed" style={{ fontStyle: 'italic', lineHeight: 1.4 }}>
                  💡 Click any node to view role details and save as career goal
                </Text>
              </Stack>
            </Card>
          </Panel>
        </ReactFlow>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group gap="xs">
            <IconBriefcase size={24} color="var(--mantine-color-primary-6)" />
            <Text size="xl" fw={700}>Career Position Details</Text>
          </Group>
        }
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
        }}
      >
        {selectedJob && (
          <ScrollArea h={500}>
            <Stack gap="lg">
              <div>
                <Title order={2} c="white" mb="xs">
                  {selectedJob.title}
                </Title>
                <Text size="lg" c="gray.5" mb="md">
                  {selectedJob.company}
                </Text>
                <Group gap="md" mb="md">
                  <Group gap="xs">
                    <IconMapPin size={18} color="var(--mantine-color-blue-6)" />
                    <Text size="sm" c="gray.4">{selectedJob.location}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconCurrencyRupee size={18} color="var(--mantine-color-green-6)" />
                    <Text size="sm" c="gray.4">{selectedJob.salary}</Text>
                  </Group>
                </Group>
              </div>

              <Divider />

              <div>
                <Title order={4} c="white" mb="sm">
                  Job Description
                </Title>
                <Text size="sm" c="gray.4" style={{ lineHeight: 1.6 }}>
                  {selectedJob.description}
                </Text>
              </div>

              <div>
                <Title order={4} c="white" mb="sm">
                  Requirements
                </Title>
                <Stack gap="xs">
                  {selectedJob.requirements.map((req, index) => (
                    <Text key={index} size="sm" c="gray.4">
                      • {req}
                    </Text>
                  ))}
                </Stack>
              </div>

              <div>
                <Title order={4} c="white" mb="sm">
                  Required Skills
                </Title>
                <Group gap="xs">
                  {selectedJob.skills.map((skill) => (
                    <Badge key={skill} size="lg" variant="light" color="blue">
                      {skill}
                    </Badge>
                  ))}
                </Group>
              </div>

              <Divider />

              <Group grow>
                <Button
                  size="md"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 135 }}
                >
                  View Similar Jobs
                </Button>
                <Button
                  size="md"
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'orange', deg: 135 }}
                  onClick={() => {
                    if (!selectedJob || !selectedNodeId) return;

                    try {
                      const existing = loadCareerGoals();
                      const already = existing.find((g: any) => g.nodeId === selectedNodeId);
                      if (already) {
                        notifications.show({
                          title: 'Already Saved',
                          message: `${selectedJob.title} is already in your career goals`,
                          color: 'yellow',
                        });
                        return;
                      }

                      const newGoal = {
                        nodeId: selectedNodeId,
                        title: selectedJob.title,
                        company: selectedJob.company,
                        addedAt: new Date().toISOString(),
                      };

                      const updated = [newGoal, ...existing];
                      saveCareerGoals(updated);

                      // Push a user notification (stored) and show immediate toast
                      pushNotification({
                        id: `goal-${selectedNodeId}-${Date.now()}`,
                        title: 'Career Goal Saved',
                        message: `${selectedJob.title} has been added to your career goals.`,
                        createdAt: new Date().toISOString(),
                        read: false,
                      });

                      notifications.show({
                        title: 'Saved!',
                        message: `${selectedJob.title} saved to your Career Goals`,
                        color: 'teal',
                      });
                    } catch (err) {
                      console.error('Failed to save career goal', err);
                      notifications.show({
                        title: 'Error',
                        message: 'Could not save career goal. Try again.',
                        color: 'red',
                      });
                    }
                  }}
                >
                  Save Career Goal
                </Button>
              </Group>
            </Stack>
          </ScrollArea>
        )}
      </Modal>
    </>
  );
}

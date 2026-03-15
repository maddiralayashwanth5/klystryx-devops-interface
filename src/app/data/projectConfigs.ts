// Project-specific configurations for different dashboard states
export interface ProjectConfig {
  name: string;
  deploymentHealth: number;
  activeDeployments: number;
  aiFixQueue: number;
  successRate: number;
  repositories: Array<{
    id: number;
    name: string;
    status: 'success' | 'warning' | 'error';
    deploymentReady: boolean;
    lastDeploy: string;
  }>;
  aiSuggestions: Array<{
    id: number;
    title: string;
    description: string;
    type: 'success' | 'performance' | 'security';
    confidence?: number;
  }>;
  pipelineStatus: {
    stage: string;
    progress: number;
    eta: string;
  };
}

export const projectConfigs: Record<string, ProjectConfig> = {
  'api-gateway-v2': {
    name: 'api-gateway-v2',
    deploymentHealth: 94,
    activeDeployments: 7,
    aiFixQueue: 12,
    successRate: 97.4,
    repositories: [
      {
        id: 1,
        name: 'api-gateway-v2',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '2m ago',
      },
      {
        id: 2,
        name: 'frontend-dashboard',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '15m ago',
      },
      {
        id: 3,
        name: 'auth-service',
        status: 'warning',
        deploymentReady: true,
        lastDeploy: '1h ago',
      },
    ],
    aiSuggestions: [
      {
        id: 1,
        title: 'Optimize database queries',
        description: 'Detected N+1 query pattern in user authentication flow',
        type: 'performance',
        confidence: 94,
      },
      {
        id: 2,
        title: 'Update dependency: express',
        description: 'Security patch available for express@4.18.2 → 4.19.0',
        type: 'security',
        confidence: 98,
      },
      {
        id: 3,
        title: 'Reduce bundle size',
        description: 'Removed unused imports, reducing bundle by 120KB',
        type: 'success',
      },
    ],
    pipelineStatus: {
      stage: 'Deployment',
      progress: 68,
      eta: '2m 16s',
    },
  },
  'frontend-app': {
    name: 'frontend-app',
    deploymentHealth: 88,
    activeDeployments: 3,
    aiFixQueue: 8,
    successRate: 95.2,
    repositories: [
      {
        id: 1,
        name: 'frontend-app',
        status: 'warning',
        deploymentReady: true,
        lastDeploy: '5m ago',
      },
      {
        id: 2,
        name: 'ui-components',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '20m ago',
      },
      {
        id: 3,
        name: 'design-system',
        status: 'error',
        deploymentReady: false,
        lastDeploy: '3h ago',
      },
    ],
    aiSuggestions: [
      {
        id: 1,
        title: 'Optimize React re-renders',
        description: 'Detected unnecessary re-renders in Dashboard component',
        type: 'performance',
        confidence: 91,
      },
      {
        id: 2,
        title: 'Fix accessibility issues',
        description: '5 ARIA violations found in navigation menu',
        type: 'security',
        confidence: 87,
      },
      {
        id: 3,
        title: 'Code splitting applied',
        description: 'Successfully split routes, improved initial load by 45%',
        type: 'success',
      },
      {
        id: 4,
        title: 'Lazy load images',
        description: 'Add lazy loading to product gallery images',
        type: 'performance',
        confidence: 89,
      },
    ],
    pipelineStatus: {
      stage: 'Build',
      progress: 42,
      eta: '3m 45s',
    },
  },
  'auth-service': {
    name: 'auth-service',
    deploymentHealth: 76,
    activeDeployments: 2,
    aiFixQueue: 18,
    successRate: 89.8,
    repositories: [
      {
        id: 1,
        name: 'auth-service',
        status: 'error',
        deploymentReady: false,
        lastDeploy: '2h ago',
      },
      {
        id: 2,
        name: 'oauth-provider',
        status: 'warning',
        deploymentReady: true,
        lastDeploy: '45m ago',
      },
      {
        id: 3,
        name: 'session-manager',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '10m ago',
      },
    ],
    aiSuggestions: [
      {
        id: 1,
        title: 'Critical: Fix JWT validation',
        description: 'JWT signature verification bypass detected in token refresh',
        type: 'security',
        confidence: 99,
      },
      {
        id: 2,
        title: 'Memory leak in session store',
        description: 'Redis connection pool not properly released',
        type: 'performance',
        confidence: 96,
      },
      {
        id: 3,
        title: 'Rate limiting bypass',
        description: 'Login endpoint vulnerable to brute force attacks',
        type: 'security',
        confidence: 93,
      },
      {
        id: 4,
        title: 'Update bcrypt version',
        description: 'Upgrade to bcrypt@5.1.1 for improved security',
        type: 'security',
        confidence: 97,
      },
    ],
    pipelineStatus: {
      stage: 'Fix Suggestions',
      progress: 28,
      eta: '5m 12s',
    },
  },
  'data-pipeline': {
    name: 'data-pipeline',
    deploymentHealth: 98,
    activeDeployments: 5,
    aiFixQueue: 4,
    successRate: 99.1,
    repositories: [
      {
        id: 1,
        name: 'data-pipeline',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '30m ago',
      },
      {
        id: 2,
        name: 'etl-workers',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '1h ago',
      },
      {
        id: 3,
        name: 'data-validator',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '25m ago',
      },
    ],
    aiSuggestions: [
      {
        id: 1,
        title: 'Optimize batch processing',
        description: 'Increase batch size for 15% throughput improvement',
        type: 'performance',
        confidence: 92,
      },
      {
        id: 2,
        title: 'All checks passed',
        description: 'No issues detected in latest deployment',
        type: 'success',
      },
    ],
    pipelineStatus: {
      stage: 'Health Check',
      progress: 95,
      eta: '45s',
    },
  },
  'ml-service': {
    name: 'ml-service',
    deploymentHealth: 82,
    activeDeployments: 4,
    aiFixQueue: 15,
    successRate: 92.6,
    repositories: [
      {
        id: 1,
        name: 'ml-service',
        status: 'warning',
        deploymentReady: true,
        lastDeploy: '1h ago',
      },
      {
        id: 2,
        name: 'model-training',
        status: 'success',
        deploymentReady: true,
        lastDeploy: '3h ago',
      },
      {
        id: 3,
        name: 'inference-api',
        status: 'warning',
        deploymentReady: true,
        lastDeploy: '2h ago',
      },
    ],
    aiSuggestions: [
      {
        id: 1,
        title: 'Model inference optimization',
        description: 'Reduce model latency by 30% with quantization',
        type: 'performance',
        confidence: 88,
      },
      {
        id: 2,
        title: 'GPU memory optimization',
        description: 'Batch size can be increased to utilize full GPU capacity',
        type: 'performance',
        confidence: 85,
      },
      {
        id: 3,
        title: 'Update TensorFlow version',
        description: 'TensorFlow 2.15.0 available with performance improvements',
        type: 'security',
        confidence: 90,
      },
    ],
    pipelineStatus: {
      stage: 'Containerization',
      progress: 55,
      eta: '4m 30s',
    },
  },
};

export const getProjectConfig = (projectName: string): ProjectConfig => {
  return projectConfigs[projectName] || projectConfigs['api-gateway-v2'];
};

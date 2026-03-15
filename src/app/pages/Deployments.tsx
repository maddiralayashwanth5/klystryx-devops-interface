import {
  Rocket,
  CheckCircle,
  Clock,
  AlertCircle,
  FileSearch,
  Settings,
  Package,
  Container,
  Play,
  Activity,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const pipelineStages = [
  {
    id: 1,
    name: 'Code Detection',
    icon: FileSearch,
    status: 'completed',
    duration: '12s',
    description: 'Repository analyzed',
  },
  {
    id: 2,
    name: 'Analysis',
    icon: Settings,
    status: 'completed',
    duration: '28s',
    description: 'Dependencies scanned',
  },
  {
    id: 3,
    name: 'Fix Suggestions',
    icon: Activity,
    status: 'completed',
    duration: '15s',
    description: '2 fixes applied',
  },
  {
    id: 4,
    name: 'Build',
    icon: Package,
    status: 'in-progress',
    duration: '45s',
    description: 'Compiling assets',
  },
  {
    id: 5,
    name: 'Containerization',
    icon: Container,
    status: 'pending',
    duration: '-',
    description: 'Waiting',
  },
  {
    id: 6,
    name: 'Deployment',
    icon: Rocket,
    status: 'pending',
    duration: '-',
    description: 'Waiting',
  },
  {
    id: 7,
    name: 'Health Check',
    icon: CheckCircle,
    status: 'pending',
    duration: '-',
    description: 'Waiting',
  },
];

const deploymentHistory = [
  {
    id: 1,
    service: 'api-gateway-v2',
    version: 'v2.4.1',
    environment: 'production',
    status: 'success',
    duration: '2m 14s',
    time: '2 min ago',
    deployer: 'John Doe',
  },
  {
    id: 2,
    service: 'frontend-dashboard',
    version: 'v1.8.3',
    environment: 'staging',
    status: 'in-progress',
    duration: '1m 45s',
    time: '5 min ago',
    deployer: 'Jane Smith',
  },
  {
    id: 3,
    service: 'auth-service',
    version: 'v3.2.0',
    environment: 'production',
    status: 'success',
    duration: '1m 52s',
    time: '12 min ago',
    deployer: 'Mike Johnson',
  },
  {
    id: 4,
    service: 'payment-processor',
    version: 'v1.5.2',
    environment: 'production',
    status: 'failed',
    duration: '0m 45s',
    time: '18 min ago',
    deployer: 'Sarah Wilson',
  },
  {
    id: 5,
    service: 'data-pipeline',
    version: 'v2.1.0',
    environment: 'production',
    status: 'success',
    duration: '3m 28s',
    time: '24 min ago',
    deployer: 'John Doe',
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-[#10b981]',
    bgColor: 'bg-[#10b981]/10',
    borderColor: 'border-[#10b981]/20',
  },
  'in-progress': {
    icon: Play,
    color: 'text-[#3b82f6]',
    bgColor: 'bg-[#3b82f6]/10',
    borderColor: 'border-[#3b82f6]/20',
  },
  pending: {
    icon: Clock,
    color: 'text-[#94a3b8]',
    bgColor: 'bg-[#1e1e2e]',
    borderColor: 'border-[#1e1e2e]',
  },
  failed: {
    icon: AlertCircle,
    color: 'text-[#ef4444]',
    bgColor: 'bg-[#ef4444]/10',
    borderColor: 'border-[#ef4444]/20',
  },
  success: {
    icon: CheckCircle,
    color: 'text-[#10b981]',
    bgColor: 'bg-[#10b981]/10',
    borderColor: 'border-[#10b981]/20',
  },
};

export function Deployments() {
  const [activeDeployment, setActiveDeployment] = useState({
    service: 'api-gateway-v2',
    version: 'v2.4.1',
    environment: 'production',
    status: 'in-progress',
    duration: '45s',
    time: '2 min ago',
    deployer: 'John Doe',
  });

  const handleCancelDeployment = () => {
    toast.error('Deployment cancelled');
    setActiveDeployment({
      service: 'api-gateway-v2',
      version: 'v2.4.1',
      environment: 'production',
      status: 'failed',
      duration: '0m 45s',
      time: '2 min ago',
      deployer: 'John Doe',
    });
  };

  const handleRetryDeployment = () => {
    toast.success('Deployment retried');
    setActiveDeployment({
      service: 'api-gateway-v2',
      version: 'v2.4.1',
      environment: 'production',
      status: 'in-progress',
      duration: '45s',
      time: '2 min ago',
      deployer: 'John Doe',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Deployment Pipeline
        </h1>
        <p className="text-slate-300 mt-1">
          Visual deployment stages and real-time progress tracking
        </p>
      </div>

      {/* Active Pipeline */}
      <Card className="p-8 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Active Deployment</h2>
            <p className="text-sm text-slate-300 mt-1">api-gateway-v2 → Production</p>
          </div>
          <Badge className="bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20 px-4 py-2">
            In Progress
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="mb-16">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-200 font-medium">Overall Progress</span>
            <span className="text-[#3b82f6] font-semibold">57%</span>
          </div>
          <Progress value={57} className="h-3 bg-[#1e1e2e]" />
          <div className="flex justify-between text-xs text-slate-300 mt-2">
            <span>4 of 7 stages completed</span>
            <span>Estimated: 2m remaining</span>
          </div>
        </div>

        {/* Pipeline stages */}
        <div className="relative pt-8">
          <div className="flex items-center justify-between">
            {pipelineStages.map((stage, index) => {
              const config = statusConfig[stage.status];
              const Icon = stage.icon;
              const StatusIcon = config.icon;
              const isLastStage = index === pipelineStages.length - 1;
              
              // Determine arrow color based on current and next stage status
              const nextStage = pipelineStages[index + 1];
              const arrowColor = stage.status === 'completed' 
                ? 'bg-gradient-to-r from-[#10b981] to-[#3b82f6]' 
                : stage.status === 'in-progress' && nextStage
                ? 'bg-gradient-to-r from-[#3b82f6] to-[#1e1e2e]'
                : 'bg-[#1e1e2e]';

              return (
                <div key={stage.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center mb-3 transition-all ${
                        stage.status === 'in-progress' ? 'animate-pulse' : ''
                      }`}
                    >
                      <Icon className={`w-7 h-7 ${config.color}`} />
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-semibold mb-1 text-white">{stage.name}</div>
                      <div className="text-xs text-slate-300 mb-2">{stage.description}</div>
                      <div className="flex items-center justify-center gap-1">
                        <StatusIcon className={`w-3 h-3 ${config.color}`} />
                        <span className={`text-xs font-medium ${config.color}`}>{stage.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between stages */}
                  {!isLastStage && (
                    <div className="flex-1 flex items-center px-2 -mt-16">
                      <div className="relative w-full h-2 flex items-center">
                        <div className={`h-1 flex-1 ${arrowColor} transition-all duration-500`} />
                        <div 
                          className={`w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-transparent ${
                            stage.status === 'completed' 
                              ? 'border-l-[#3b82f6]' 
                              : stage.status === 'in-progress'
                              ? 'border-l-[#3b82f6]'
                              : 'border-l-[#1e1e2e]'
                          } transition-all duration-500`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            className="bg-[#1e1e2e] border-[#1e1e2e] text-[#a855f7] hover:bg-[#a855f7]/10"
            onClick={handleCancelDeployment}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Deployment
          </Button>
          <Button
            variant="outline"
            className="bg-[#1e1e2e] border-[#1e1e2e] text-[#a855f7] hover:bg-[#a855f7]/10"
            onClick={handleRetryDeployment}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry Deployment
          </Button>
        </div>
      </Card>

      {/* Deployment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Total Deployments</div>
          <div className="text-2xl font-semibold mt-1">1,247</div>
          <div className="text-xs text-[#10b981] mt-1">+12% this week</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Success Rate</div>
          <div className="text-2xl font-semibold mt-1 text-[#10b981]">98.7%</div>
          <div className="text-xs text-[#10b981] mt-1">+1.2% improvement</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Avg Deploy Time</div>
          <div className="text-2xl font-semibold mt-1">2m 14s</div>
          <div className="text-xs text-[#06b6d4] mt-1">-18s faster</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Active Now</div>
          <div className="text-2xl font-semibold mt-1 text-[#3b82f6]">3</div>
          <div className="text-xs text-slate-400 mt-1">2 queued</div>
        </Card>
      </div>

      {/* Deployment History */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <h2 className="text-xl font-semibold mb-6">Deployment History</h2>

        <div className="space-y-3">
          {deploymentHistory.map((deployment) => {
            const config = statusConfig[deployment.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={deployment.id}
                className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} hover:border-[#a855f7]/30 transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <StatusIcon
                      className={`w-6 h-6 ${config.color} ${
                        deployment.status === 'in-progress' ? 'animate-pulse' : ''
                      }`}
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{deployment.service}</h3>
                        <Badge
                          variant="outline"
                          className="border-[#a855f7]/20 text-[#a855f7] text-xs"
                        >
                          {deployment.version}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                        <span>{deployment.environment}</span>
                        <span>•</span>
                        <span>Deployed by {deployment.deployer}</span>
                        <span>•</span>
                        <span>{deployment.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium">{deployment.duration}</div>
                      <div className={`text-xs ${config.color}`}>
                        {deployment.status === 'in-progress'
                          ? 'Deploying...'
                          : deployment.status}
                      </div>
                    </div>
                  </div>
                </div>

                {deployment.status === 'in-progress' && (
                  <div className="mt-3">
                    <Progress value={68} className="h-1.5 bg-[#1e1e2e]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
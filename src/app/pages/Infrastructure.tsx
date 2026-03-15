import { Server, Database, Container, Globe, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

const nodes = [
  {
    id: 1,
    name: 'API Gateway',
    type: 'service',
    status: 'healthy',
    instances: 3,
    cpu: 45,
    memory: 62,
    connections: [2, 3, 4],
  },
  {
    id: 2,
    name: 'Auth Service',
    type: 'service',
    status: 'healthy',
    instances: 2,
    cpu: 32,
    memory: 48,
    connections: [5],
  },
  {
    id: 3,
    name: 'Payment Service',
    type: 'service',
    status: 'warning',
    instances: 2,
    cpu: 78,
    memory: 84,
    connections: [6],
  },
  {
    id: 4,
    name: 'Data Service',
    type: 'service',
    status: 'healthy',
    instances: 4,
    cpu: 56,
    memory: 71,
    connections: [7],
  },
  {
    id: 5,
    name: 'User DB',
    type: 'database',
    status: 'healthy',
    instances: 1,
    cpu: 42,
    memory: 68,
    connections: [],
  },
  {
    id: 6,
    name: 'Payment DB',
    type: 'database',
    status: 'healthy',
    instances: 1,
    cpu: 58,
    memory: 72,
    connections: [],
  },
  {
    id: 7,
    name: 'Analytics DB',
    type: 'database',
    status: 'healthy',
    instances: 1,
    cpu: 65,
    memory: 80,
    connections: [],
  },
  {
    id: 8,
    name: 'Load Balancer',
    type: 'network',
    status: 'healthy',
    instances: 2,
    cpu: 28,
    memory: 35,
    connections: [1],
  },
];

const containers = [
  {
    name: 'api-gateway-prod-1',
    image: 'api-gateway:v2.4.1',
    status: 'running',
    uptime: '12d 8h',
    cpu: 42,
    memory: 512,
  },
  {
    name: 'api-gateway-prod-2',
    image: 'api-gateway:v2.4.1',
    status: 'running',
    uptime: '12d 8h',
    cpu: 48,
    memory: 487,
  },
  {
    name: 'api-gateway-prod-3',
    image: 'api-gateway:v2.4.1',
    status: 'running',
    uptime: '12d 8h',
    cpu: 45,
    memory: 498,
  },
  {
    name: 'auth-service-prod-1',
    image: 'auth-service:v3.2.0',
    status: 'running',
    uptime: '8d 14h',
    cpu: 28,
    memory: 384,
  },
  {
    name: 'auth-service-prod-2',
    image: 'auth-service:v3.2.0',
    status: 'running',
    uptime: '8d 14h',
    cpu: 35,
    memory: 401,
  },
  {
    name: 'payment-service-prod-1',
    image: 'payment-service:v1.5.2',
    status: 'warning',
    uptime: '5d 2h',
    cpu: 82,
    memory: 768,
  },
];

const statusConfig = {
  healthy: {
    color: 'text-[#10b981]',
    bgColor: 'bg-[#10b981]/10',
    borderColor: 'border-[#10b981]/20',
    dotColor: 'bg-[#10b981]',
  },
  warning: {
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/10',
    borderColor: 'border-[#f59e0b]/20',
    dotColor: 'bg-[#f59e0b]',
  },
  error: {
    color: 'text-[#ef4444]',
    bgColor: 'bg-[#ef4444]/10',
    borderColor: 'border-[#ef4444]/20',
    dotColor: 'bg-[#ef4444]',
  },
  running: {
    color: 'text-[#10b981]',
    bgColor: 'bg-[#10b981]/10',
    borderColor: 'border-[#10b981]/20',
  },
};

const typeConfig = {
  service: { icon: Server, color: 'text-[#a855f7]', bgColor: 'bg-[#a855f7]/10' },
  database: { icon: Database, color: 'text-[#3b82f6]', bgColor: 'bg-[#3b82f6]/10' },
  network: { icon: Globe, color: 'text-[#06b6d4]', bgColor: 'bg-[#06b6d4]/10' },
  container: { icon: Container, color: 'text-[#10b981]', bgColor: 'bg-[#10b981]/10' },
};

export function Infrastructure() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Infrastructure
        </h1>
        <p className="text-slate-400 mt-1">
          Visual representation of services and dependencies
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <Server className="w-8 h-8 text-[#a855f7]" />
            <div>
              <div className="text-2xl font-semibold">24</div>
              <div className="text-sm text-slate-400">Services</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <Container className="w-8 h-8 text-[#3b82f6]" />
            <div>
              <div className="text-2xl font-semibold">156</div>
              <div className="text-sm text-slate-400">Containers</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-[#06b6d4]" />
            <div>
              <div className="text-2xl font-semibold">8</div>
              <div className="text-sm text-slate-400">Databases</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-[#10b981]" />
            <div>
              <div className="text-2xl font-semibold">4</div>
              <div className="text-sm text-slate-400">Networks</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Infrastructure Graph */}
      <Card className="p-8 bg-[#13131a] border-[#1e1e2e]">
        <h2 className="text-xl font-semibold mb-6 relative z-10">Service Dependencies</h2>

        <div className="relative min-h-[600px] bg-[#0a0a0f] rounded-lg border border-[#1e1e2e] p-8">
          {/* Nodes arranged in layers */}
          <div className="relative">
            {/* Layer 1: Load Balancer */}
            <div className="flex justify-center mb-16">
              <NodeCard node={nodes[7]} />
            </div>

            {/* Layer 2: Services */}
            <div className="grid grid-cols-3 gap-8 mb-16">
              <NodeCard node={nodes[0]} />
              <NodeCard node={nodes[1]} />
              <NodeCard node={nodes[2]} />
            </div>

            {/* Layer 3: Databases */}
            <div className="grid grid-cols-3 gap-8">
              <NodeCard node={nodes[4]} />
              <NodeCard node={nodes[5]} />
              <NodeCard node={nodes[6]} />
            </div>
          </div>
        </div>
      </Card>

      {/* Container List */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <h2 className="text-xl font-semibold mb-6">Running Containers</h2>

        <div className="space-y-3">
          {containers.map((container, index) => {
            const config = statusConfig[container.status];

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} hover:border-[#a855f7]/30 transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Container className={`w-6 h-6 ${config.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{container.name}</h3>
                        <Badge
                          variant="outline"
                          className={`${config.color} ${config.borderColor} text-xs`}
                        >
                          {container.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                        <span>{container.image}</span>
                        <span>•</span>
                        <span>Uptime: {container.uptime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm">
                        <Cpu className="w-4 h-4 text-slate-400" />
                        <span>{container.cpu}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm">
                        <MemoryStick className="w-4 h-4 text-slate-400" />
                        <span>{container.memory}MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-[#3b82f6]" />
            <h3 className="font-semibold">CPU Usage</h3>
          </div>
          <div className="text-3xl font-bold mb-2">64%</div>
          <Progress value={64} className="h-2 bg-[#1e1e2e] mb-2" />
          <p className="text-xs text-slate-400">156 of 244 vCPUs in use</p>
        </Card>

        <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3 mb-4">
            <MemoryStick className="w-6 h-6 text-[#a855f7]" />
            <h3 className="font-semibold">Memory</h3>
          </div>
          <div className="text-3xl font-bold mb-2">78%</div>
          <Progress value={78} className="h-2 bg-[#1e1e2e] mb-2" />
          <p className="text-xs text-slate-400">624 GB of 800 GB allocated</p>
        </Card>

        <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="w-6 h-6 text-[#06b6d4]" />
            <h3 className="font-semibold">Storage</h3>
          </div>
          <div className="text-3xl font-bold mb-2">45%</div>
          <Progress value={45} className="h-2 bg-[#1e1e2e] mb-2" />
          <p className="text-xs text-slate-400">2.7 TB of 6 TB used</p>
        </Card>
      </div>
    </div>
  );
}

function NodeCard({ node }: { node: typeof nodes[0] }) {
  const statusCfg = statusConfig[node.status];
  const typeCfg = typeConfig[node.type];
  const Icon = typeCfg.icon;

  return (
    <div
      className={`p-4 rounded-lg border ${statusCfg.bgColor} ${statusCfg.borderColor} hover:border-[#a855f7]/30 transition-all cursor-pointer`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded ${typeCfg.bgColor}`}>
          <Icon className={`w-5 h-5 ${typeCfg.color}`} />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{node.name}</div>
          <div className="text-xs text-slate-400">{node.instances} instances</div>
        </div>
        <div className={`w-2 h-2 rounded-full ${statusCfg.dotColor}`} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">CPU</span>
          <span className={node.cpu > 70 ? 'text-[#f59e0b]' : 'text-slate-300'}>
            {node.cpu}%
          </span>
        </div>
        <Progress value={node.cpu} className="h-1 bg-[#1e1e2e]" />
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Memory</span>
          <span className={node.memory > 80 ? 'text-[#f59e0b]' : 'text-slate-300'}>
            {node.memory}%
          </span>
        </div>
        <Progress value={node.memory} className="h-1 bg-[#1e1e2e]" />
      </div>
    </div>
  );
}

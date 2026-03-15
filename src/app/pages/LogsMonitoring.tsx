import { Terminal, Activity, AlertCircle, Info, CheckCircle, Filter } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

const logs = [
  {
    timestamp: '2026-03-06 14:32:18',
    level: 'info',
    service: 'api-gateway',
    message: 'Successfully connected to database pool',
  },
  {
    timestamp: '2026-03-06 14:32:22',
    level: 'info',
    service: 'api-gateway',
    message: 'Server listening on port 3000',
  },
  {
    timestamp: '2026-03-06 14:32:45',
    level: 'info',
    service: 'auth-service',
    message: 'JWT token validated for user: john.doe@example.com',
  },
  {
    timestamp: '2026-03-06 14:33:12',
    level: 'warning',
    service: 'payment-service',
    message: 'High memory usage detected: 84% of allocated memory in use',
  },
  {
    timestamp: '2026-03-06 14:33:28',
    level: 'error',
    service: 'payment-service',
    message: 'Failed to process payment: Connection timeout to payment gateway',
  },
  {
    timestamp: '2026-03-06 14:33:45',
    level: 'info',
    service: 'api-gateway',
    message: 'Request processed: GET /api/users/profile - 200 OK (24ms)',
  },
  {
    timestamp: '2026-03-06 14:34:02',
    level: 'info',
    service: 'data-pipeline',
    message: 'ETL job completed: processed 12,456 records in 2.3s',
  },
  {
    timestamp: '2026-03-06 14:34:18',
    level: 'warning',
    service: 'api-gateway',
    message: 'Rate limit approaching for IP: 192.168.1.45 (85% of quota)',
  },
  {
    timestamp: '2026-03-06 14:34:35',
    level: 'info',
    service: 'auth-service',
    message: 'User session refreshed: session_id=abc123xyz',
  },
  {
    timestamp: '2026-03-06 14:34:52',
    level: 'success',
    service: 'deployment',
    message: 'Deployment completed successfully: api-gateway-v2.4.1',
  },
];

const metrics = [
  { service: 'api-gateway', requests: 12456, errors: 23, avgLatency: 45 },
  { service: 'auth-service', requests: 8932, errors: 12, avgLatency: 32 },
  { service: 'payment-service', requests: 4521, errors: 87, avgLatency: 128 },
  { service: 'data-pipeline', requests: 2341, errors: 5, avgLatency: 234 },
];

const logLevelConfig = {
  info: {
    icon: Info,
    color: 'text-[#3b82f6]',
    bgColor: 'bg-[#3b82f6]/10',
    borderColor: 'border-[#3b82f6]/20',
  },
  warning: {
    icon: AlertCircle,
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/10',
    borderColor: 'border-[#f59e0b]/20',
  },
  error: {
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

export function LogsMonitoring() {
  const [filteredLogs, setFilteredLogs] = useState(logs);

  const handleFilter = () => {
    toast.info('Opening log filter options...');
  };

  const handleClearLogs = () => {
    setFilteredLogs([]);
    toast.success('Logs cleared');
    setTimeout(() => {
      setFilteredLogs(logs);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Logs & Monitoring
        </h1>
        <p className="text-slate-400 mt-1">
          Real-time logs and infrastructure monitoring
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Total Requests</div>
          <div className="text-2xl font-semibold mt-1">28,250</div>
          <div className="text-xs text-[#10b981] mt-1">Last hour</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Error Rate</div>
          <div className="text-2xl font-semibold mt-1 text-[#ef4444]">0.45%</div>
          <div className="text-xs text-slate-400 mt-1">127 errors</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Avg Latency</div>
          <div className="text-2xl font-semibold mt-1">78ms</div>
          <div className="text-xs text-[#10b981] mt-1">-12ms improvement</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Active Services</div>
          <div className="text-2xl font-semibold mt-1 text-[#10b981]">24</div>
          <div className="text-xs text-slate-400 mt-1">All healthy</div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="bg-[#13131a] border border-[#1e1e2e]">
          <TabsTrigger value="logs" className="data-[state=active]:bg-[#a855f7]/10 data-[state=active]:text-[#a855f7]">
            <Terminal className="w-4 h-4 mr-2" />
            Live Logs
          </TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-[#3b82f6]/10 data-[state=active]:text-[#3b82f6]">
            <Activity className="w-4 h-4 mr-2" />
            Metrics
          </TabsTrigger>
        </TabsList>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-[#a855f7]" />
                <h2 className="text-xl font-semibold">Real-Time Deployment Logs</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleFilter}
                  variant="outline"
                  size="sm"
                  className="border-[#1e1e2e] text-slate-400"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button
                  onClick={handleClearLogs}
                  variant="outline"
                  size="sm"
                  className="border-[#1e1e2e] text-slate-400"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Console */}
            <div className="bg-[#0a0a0f] rounded-lg border border-[#1e1e2e] p-4 font-mono text-sm max-h-[600px] overflow-y-auto">
              <div className="space-y-1">
                {filteredLogs.map((log, index) => {
                  const config = logLevelConfig[log.level];
                  const Icon = config.icon;

                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-2 rounded hover:bg-[#1e1e2e] transition-colors ${
                        log.level === 'error' ? 'bg-[#ef4444]/5' : ''
                      }`}
                    >
                      <span className="text-slate-500 text-xs whitespace-nowrap">
                        {log.timestamp}
                      </span>
                      <Icon className={`w-4 h-4 ${config.color} mt-0.5`} />
                      <Badge
                        variant="outline"
                        className={`${config.color} ${config.borderColor} text-xs uppercase`}
                      >
                        {log.level}
                      </Badge>
                      <span className="text-[#a855f7] text-xs">[{log.service}]</span>
                      <span className="text-slate-300 text-xs flex-1">{log.message}</span>
                    </div>
                  );
                })}
              </div>

              {/* Live indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>Live streaming...</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-[#3b82f6]" />
              <h2 className="text-xl font-semibold">Service Metrics</h2>
            </div>

            <div className="space-y-4">
              {metrics.map((metric, index) => {
                const errorRate = ((metric.errors / metric.requests) * 100).toFixed(2);
                const isHighError = parseFloat(errorRate) > 1;

                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] hover:border-[#a855f7]/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{metric.service}</h3>
                      <Badge
                        variant="outline"
                        className={`${
                          isHighError
                            ? 'border-[#ef4444]/20 text-[#ef4444]'
                            : 'border-[#10b981]/20 text-[#10b981]'
                        }`}
                      >
                        {isHighError ? 'High Error Rate' : 'Healthy'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Total Requests</div>
                        <div className="text-2xl font-semibold">
                          {metric.requests.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Errors</div>
                        <div
                          className={`text-2xl font-semibold ${
                            isHighError ? 'text-[#ef4444]' : 'text-[#10b981]'
                          }`}
                        >
                          {metric.errors}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">({errorRate}%)</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Avg Latency</div>
                        <div className="text-2xl font-semibold">{metric.avgLatency}ms</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Infrastructure Status */}
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h2 className="text-xl font-semibold mb-6">Infrastructure Status</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Database Connections</span>
                  <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">
                    Healthy
                  </Badge>
                </div>
                <div className="text-xl font-semibold">142 / 200</div>
                <div className="text-xs text-slate-400 mt-1">Active connections</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Cache Hit Rate</span>
                  <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">
                    Excellent
                  </Badge>
                </div>
                <div className="text-xl font-semibold">94.7%</div>
                <div className="text-xs text-slate-400 mt-1">Last hour</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Queue Length</span>
                  <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">
                    Normal
                  </Badge>
                </div>
                <div className="text-xl font-semibold">23</div>
                <div className="text-xs text-slate-400 mt-1">Pending jobs</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Network Throughput</span>
                  <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">
                    Optimal
                  </Badge>
                </div>
                <div className="text-xl font-semibold">245 MB/s</div>
                <div className="text-xs text-slate-400 mt-1">Average</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState, useEffect } from 'react';
import {
  Activity,
  GitBranch,
  Rocket,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Play,
  Code2,
  Zap,
  Eye,
  ThumbsUp,
  X,
  Plus,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import { getProjectConfig, type ProjectConfig } from '../data/projectConfigs';
import { useSearchParams } from 'react-router';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const deploymentData = [
  { time: '00:00', deployments: 12 },
  { time: '04:00', deployments: 8 },
  { time: '08:00', deployments: 24 },
  { time: '12:00', deployments: 32 },
  { time: '16:00', deployments: 28 },
  { time: '20:00', deployments: 18 },
];

const repositories = [
  {
    id: 1,
    name: 'ecommerce-app',
    tech: 'Next.js',
    lastCommit: '3h ago',
    readiness: 92,
    status: 'ready',
  },
  {
    id: 2,
    name: 'blog-platform',
    tech: 'React',
    lastCommit: '5h ago',
    readiness: 84,
    status: 'ready',
  },
  {
    id: 3,
    name: 'analytics-service',
    tech: 'Node.js',
    lastCommit: '14 ago',
    readiness: 76,
    status: 'warning',
  },
  {
    id: 4,
    name: 'payment-gateway',
    tech: 'Python',
    lastCommit: '2d ago',
    readiness: 95,
    status: 'ready',
  },
];

const aiSuggestions = [
  {
    id: 1,
    title: 'Optimize API Response',
    confidence: 95,
    type: 'success',
    time: '2h ago',
  },
  {
    id: 2,
    title: 'Fix 3 Security Issues',
    confidence: 87,
    type: 'warning',
    time: '4h ago',
  },
  {
    id: 3,
    title: 'Update Dependencies',
    confidence: 92,
    type: 'info',
    time: '6h ago',
  },
  {
    id: 4,
    title: 'Invoicing',
    confidence: null,
    type: 'success',
    time: '6 hr ago',
  },
];

const pipelineStages = [
  { id: 1, name: 'Detection', icon: CheckCircle, status: 'completed' },
  { id: 2, name: 'Analysis', icon: CheckCircle, status: 'completed' },
  { id: 3, name: 'AI Fix', icon: Zap, status: 'completed' },
  { id: 4, name: 'Build', icon: Code2, status: 'in-progress' },
  { id: 5, name: 'Container', icon: Activity, status: 'pending' },
  { id: 6, name: 'Deploy', icon: Rocket, status: 'pending' },
  { id: 7, name: 'Health Check', icon: CheckCircle, status: 'pending' },
];

const codeBeforeAfter = {
  before: `function getData() {
  .then(res ->
    res.json())
}`,
  after: `async function getData() {
  try {
    const res = await
      fetch(url, { cache: 'no-store' })
    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
}`,
};

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const currentProject = searchParams.get('project') || 'api-gateway-v2';
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>(getProjectConfig(currentProject));
  
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [showCodeDiff, setShowCodeDiff] = useState(false);
  const [deployingRepo, setDeployingRepo] = useState<number | null>(null);
  const [appliedFix, setAppliedFix] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<number>>(new Set());

  // Update project config when URL parameter changes
  useEffect(() => {
    const newConfig = getProjectConfig(currentProject);
    setProjectConfig(newConfig);
    setAppliedSuggestions(new Set()); // Reset applied suggestions
  }, [currentProject]);

  const handleDeploy = (repoId: number) => {
    const repo = projectConfig.repositories.find(r => r.id === repoId);
    setDeployingRepo(repoId);
    toast.loading(`Deploying ${repo?.name}...`);
    setTimeout(() => {
      setDeployingRepo(null);
      toast.success(`${repo?.name} deployed successfully!`);
    }, 3000);
  };

  const handleApplyFix = () => {
    setAppliedFix(true);
    toast.success('AI fix applied successfully!');
    setTimeout(() => {
      setAppliedFix(false);
      setShowCodeDiff(false);
    }, 1500);
  };

  const handleViewChanges = () => {
    toast.info('Opening detailed change view...');
    setShowCodeDiff(true);
  };

  const handleAddRepo = () => {
    toast.success('Opening repository connection dialog...');
  };

  const handleApplySuggestion = (suggestionId: number, title: string) => {
    setAppliedSuggestions(prev => new Set(prev).add(suggestionId));
    toast.success(`Applied: ${title}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          AI-powered deployment automation and monitoring
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Deployment Health */}
        <Card className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#10b981]/30 transition-all">
          <div className="text-sm text-slate-400 mb-4">Deployment Health</div>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#1e1e2e"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56 * (projectConfig.deploymentHealth / 100)} ${2 * Math.PI * 56}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#10b981]">{projectConfig.deploymentHealth}%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#10b981]">
            <CheckCircle className="w-4 h-4" />
            <span>All Systems Operational</span>
          </div>
        </Card>

        {/* Active Deployments */}
        <Card className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-all">
          <div className="text-sm text-slate-400 mb-4">Active Deployments</div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-4xl font-bold">{projectConfig.activeDeployments}</div>
            <div className="flex items-center gap-1 text-[#10b981] text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Running</span>
            </div>
          </div>
          <div className="space-y-1 mt-4">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Progress</span>
              <span className="text-[#3b82f6]">{projectConfig.pipelineStatus.progress}%</span>
            </div>
            <Progress value={projectConfig.pipelineStatus.progress} className="h-1.5 bg-[#1e1e2e]" />
          </div>
        </Card>

        {/* AI Fix Queue */}
        <Card className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#a855f7]/30 transition-all">
          <div className="text-sm text-slate-400 mb-4">AI Fix Queue</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-[#f59e0b]">{projectConfig.aiFixQueue}</span>
              <span className="text-xs text-[#f59e0b]">Pending</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Auto-Fixes</span>
              <span className="text-[#10b981]">{Math.floor(projectConfig.aiFixQueue * 0.67)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Manual Review</span>
              <span className="text-[#f59e0b]">{Math.ceil(projectConfig.aiFixQueue * 0.33)}</span>
            </div>
          </div>
        </Card>

        {/* Success Rate */}
        <Card className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#10b981]/30 transition-all">
          <div className="text-sm text-slate-400 mb-4">Success Rate</div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-4xl font-bold text-[#10b981]">{projectConfig.successRate}%</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#10b981] mt-2">
            <TrendingUp className="w-4 h-4" />
            <span>+{(projectConfig.successRate - 85).toFixed(1)}% this week</span>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={deploymentData}>
                <Line
                  type="monotone"
                  dataKey="deployments"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Deployment Pipeline & Code Diff */}
        <div className="lg:col-span-2 space-y-6">
          {/* Deployment Pipeline */}
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h3 className="text-lg font-semibold mb-6">Deployment Pipeline</h3>
            
            <div className="relative mb-6">
              <div className="flex items-center">
                {pipelineStages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isLastStage = index === pipelineStages.length - 1;
                  
                  return (
                    <div key={stage.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                            stage.status === 'completed'
                              ? 'bg-[#10b981]/10 border-[#10b981] text-[#10b981]'
                              : stage.status === 'in-progress'
                              ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6] animate-pulse'
                              : 'bg-[#1e1e2e] border-[#1e1e2e] text-slate-500'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs mt-2 text-slate-400 text-center">{stage.name}</span>
                      </div>
                      
                      {!isLastStage && (
                        <div className="flex-1 flex items-center px-2 -mt-6">
                          <div className="relative w-full h-2 flex items-center">
                            <div 
                              className={`h-0.5 flex-1 ${
                                stage.status === 'completed'
                                  ? 'bg-gradient-to-r from-[#10b981] to-[#3b82f6]'
                                  : 'bg-[#1e1e2e]'
                              } transition-all duration-500`}
                            />
                            <div 
                              className={`w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent ${
                                stage.status === 'completed'
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

            <div className="flex items-center justify-between pt-4 border-t border-[#1e1e2e]">
              <div className="text-sm text-slate-400">
                Deploying to Production • <span className="text-[#3b82f6]">68%</span>
              </div>
              <div className="text-sm text-slate-400">ETA: 2m 14s</div>
            </div>
            <Progress value={68} className="h-2 bg-[#1e1e2e] mt-3" />
          </Card>

          {/* AI Code Diff */}
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Code Diff</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCodeDiff(true)}
                className="text-[#a855f7] hover:text-[#a855f7] hover:bg-[#a855f7]/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Full Diff
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                  <span className="text-xs text-slate-400 uppercase">Before</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                    {codeBeforeAfter.before}
                  </pre>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-xs text-slate-400 uppercase">After</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0a0f] border border-[#10b981]/20">
                  <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                    {codeBeforeAfter.after}
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4 pt-4 border-t border-[#1e1e2e]">
              <Button
                onClick={handleApplyFix}
                className="flex-1 bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
                disabled={appliedFix}
              >
                {appliedFix ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Applied
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Apply Fix
                  </>
                )}
              </Button>
              <Button
                onClick={handleViewChanges}
                variant="outline"
                className="border-[#1e1e2e] hover:bg-[#1e1e2e]"
              >
                View Changes
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Code Readiness & AI Suggestions */}
        <div className="space-y-6">
          {/* Code Readiness */}
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h3 className="text-lg font-semibold mb-4">Code Readiness</h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#1e1e2e"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70 * 0.91} ${2 * Math.PI * 70}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-transparent">
                      91%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">
                Ready to Deploy
              </Badge>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Dependencies', value: 100 },
                { label: 'Security', value: 100 },
                { label: 'Performance', value: 100 },
                { label: 'Build Config', value: 100 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    <span className="text-slate-300">{item.label}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-[#10b981]" />
                </div>
              ))}
            </div>
          </Card>

          {/* AI Suggestions */}
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
            
            <div className="space-y-3">
              {projectConfig.aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`p-3 rounded-lg border transition-all hover:border-[#a855f7]/30 cursor-pointer ${
                    suggestion.type === 'success'
                      ? 'bg-[#10b981]/5 border-[#10b981]/20'
                      : suggestion.type === 'performance'
                      ? 'bg-[#3b82f6]/5 border-[#3b82f6]/20'
                      : 'bg-[#f59e0b]/5 border-[#f59e0b]/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <AlertCircle
                        className={`w-4 h-4 ${
                          suggestion.type === 'success'
                            ? 'text-[#10b981]'
                            : suggestion.type === 'performance'
                            ? 'text-[#3b82f6]'
                            : 'text-[#f59e0b]'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{suggestion.title}</div>
                        <div className="text-xs text-slate-400 mt-1">{suggestion.description}</div>
                        {suggestion.confidence && (
                          <div className="text-xs text-slate-500 mt-1">
                            Confidence: {suggestion.confidence}%
                          </div>
                        )}
                      </div>
                    </div>
                    {suggestion.confidence && !appliedSuggestions.has(suggestion.id) && (
                      <Badge
                        onClick={() => handleApplySuggestion(suggestion.id, suggestion.title)}
                        variant="outline"
                        className={`${
                          suggestion.type === 'success'
                            ? 'border-[#10b981]/20 text-[#10b981]'
                            : 'border-[#a855f7]/20 text-[#a855f7]'
                        } text-xs cursor-pointer hover:bg-[#a855f7]/10`}
                      >
                        Apply
                      </Badge>
                    )}
                    {suggestion.confidence && appliedSuggestions.has(suggestion.id) && (
                      <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Applied
                      </Badge>
                    )}
                    {!suggestion.confidence && (
                      <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20 text-xs">
                        Success
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Repositories Section */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Repositories</h3>
          <Button
            onClick={handleAddRepo}
            variant="outline"
            size="sm"
            className="border-[#a855f7]/30 text-[#a855f7] hover:bg-[#a855f7]/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Repo
          </Button>
        </div>

        <div className="space-y-3">
          {projectConfig.repositories.map((repo) => (
            <div
              key={repo.id}
              className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] hover:border-[#a855f7]/30 transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    repo.status === 'success'
                      ? 'bg-[#10b981]/10 text-[#10b981]'
                      : repo.status === 'warning'
                      ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                      : 'bg-[#ef4444]/10 text-[#ef4444]'
                  }`}
                >
                  {repo.status === 'success' && <CheckCircle className="w-6 h-6" />}
                  {repo.status === 'warning' && <AlertCircle className="w-6 h-6" />}
                  {repo.status === 'error' && <X className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{repo.name}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>{repo.deploymentReady ? 'Ready' : 'Not Ready'}</span>
                    <span>•</span>
                    <span>Last: {repo.lastDeploy}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleDeploy(repo.id)}
                disabled={deployingRepo === repo.id}
                className={`${
                  deployingRepo === repo.id
                    ? 'bg-[#3b82f6] hover:bg-[#3b82f6]'
                    : 'bg-[#a855f7] hover:bg-[#a855f7]/90'
                } text-white`}
              >
                {deployingRepo === repo.id ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Deploy
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Code Diff Modal */}
      <Dialog open={showCodeDiff} onOpenChange={setShowCodeDiff}>
        <DialogContent className="max-w-4xl bg-[#13131a] border-[#1e1e2e]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">AI Code Diff - Full View</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <span className="text-sm text-slate-400 uppercase font-medium">Before</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] h-64 overflow-auto">
                <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                  {codeBeforeAfter.before}
                </pre>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="text-sm text-slate-400 uppercase font-medium">
                  After (AI Suggested)
                </span>
              </div>
              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#10b981]/20 h-64 overflow-auto">
                <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                  {codeBeforeAfter.after}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#1e1e2e]">
            <div className="text-sm text-slate-400">
              Confidence: <span className="text-[#a855f7] font-medium">95%</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCodeDiff(false)}
                className="border-[#1e1e2e] hover:bg-[#1e1e2e]"
              >
                Close
              </Button>
              <Button
                onClick={handleApplyFix}
                className="bg-[#10b981] hover:bg-[#10b981]/90 text-white"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Apply Fix
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

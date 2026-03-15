import { GitBranch, Star, GitCommit, Users, Calendar, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const repositories = [
  {
    id: 1,
    name: 'api-gateway-v2',
    description: 'Core API gateway for microservices architecture',
    language: 'TypeScript',
    languageColor: '#3b82f6',
    framework: 'Express.js',
    stars: 145,
    commits: 892,
    contributors: 12,
    lastUpdated: '2 hours ago',
    status: 'healthy',
    deploymentReady: true,
  },
  {
    id: 2,
    name: 'frontend-dashboard',
    description: 'React-based admin dashboard for monitoring and analytics',
    language: 'TypeScript',
    languageColor: '#3b82f6',
    framework: 'React + Vite',
    stars: 98,
    commits: 654,
    contributors: 8,
    lastUpdated: '4 hours ago',
    status: 'healthy',
    deploymentReady: true,
  },
  {
    id: 3,
    name: 'auth-service',
    description: 'OAuth2 and JWT authentication microservice',
    language: 'Go',
    languageColor: '#06b6d4',
    framework: 'Gin',
    stars: 76,
    commits: 432,
    contributors: 6,
    lastUpdated: '6 hours ago',
    status: 'warning',
    deploymentReady: false,
  },
  {
    id: 4,
    name: 'data-pipeline',
    description: 'ETL pipeline for data processing and analytics',
    language: 'Python',
    languageColor: '#f59e0b',
    framework: 'Apache Airflow',
    stars: 54,
    commits: 321,
    contributors: 5,
    lastUpdated: '1 day ago',
    status: 'healthy',
    deploymentReady: true,
  },
  {
    id: 5,
    name: 'ml-service',
    description: 'Machine learning inference service',
    language: 'Python',
    languageColor: '#f59e0b',
    framework: 'FastAPI + TensorFlow',
    stars: 42,
    commits: 287,
    contributors: 4,
    lastUpdated: '2 days ago',
    status: 'healthy',
    deploymentReady: true,
  },
  {
    id: 6,
    name: 'payment-processor',
    description: 'Payment gateway integration service',
    language: 'Java',
    languageColor: '#ef4444',
    framework: 'Spring Boot',
    stars: 38,
    commits: 256,
    contributors: 7,
    lastUpdated: '3 days ago',
    status: 'error',
    deploymentReady: false,
  },
];

export function Repositories() {
  const [open, setOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');

  const handleAnalyze = (repoName: string) => {
    toast.success(`Analyzing ${repoName}...`);
  };

  const handleOpenExternal = (repoName: string) => {
    toast.info(`Opening ${repoName} in external view...`);
  };

  const handleConnectRepo = () => {
    if (!repoUrl.trim()) {
      toast.error('Please enter a repository URL');
      return;
    }
    toast.success(`Connecting repository: ${repoUrl}`);
    setRepoUrl('');
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
            Repositories
          </h1>
          <p className="text-slate-400 mt-1">Manage and monitor your code repositories</p>
        </div>
        <Button className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white" onClick={() => setOpen(true)}>
          <GitBranch className="w-4 h-4 mr-2" />
          Connect Repository
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Total Repositories</div>
          <div className="text-2xl font-semibold mt-1">24</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Active Contributors</div>
          <div className="text-2xl font-semibold mt-1">42</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Commits This Week</div>
          <div className="text-2xl font-semibold mt-1">1,247</div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="text-sm text-slate-400">Deployment Ready</div>
          <div className="text-2xl font-semibold mt-1 text-[#10b981]">18</div>
        </Card>
      </div>

      {/* Repository List */}
      <div className="grid grid-cols-1 gap-4">
        {repositories.map((repo) => (
          <Card
            key={repo.id}
            className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#a855f7]/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{repo.name}</h3>
                  <Badge
                    variant="outline"
                    className={`${
                      repo.status === 'healthy'
                        ? 'border-[#10b981]/20 text-[#10b981]'
                        : repo.status === 'warning'
                        ? 'border-[#f59e0b]/20 text-[#f59e0b]'
                        : 'border-[#ef4444]/20 text-[#ef4444]'
                    }`}
                  >
                    {repo.status}
                  </Badge>
                  {repo.deploymentReady && (
                    <Badge variant="outline" className="border-[#a855f7]/20 text-[#a855f7]">
                      Deployment Ready
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-400 mt-2">{repo.description}</p>

                {/* Tech Stack */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span className="text-sm text-slate-300">{repo.language}</span>
                  </div>
                  <Badge variant="outline" className="border-[#1e1e2e] text-slate-400">
                    {repo.framework}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Star className="w-4 h-4" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <GitCommit className="w-4 h-4" />
                    <span>{repo.commits} commits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{repo.contributors} contributors</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>Updated {repo.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAnalyze(repo.name)}
                  variant="outline"
                  size="sm"
                  className="border-[#1e1e2e] hover:border-[#a855f7]/30"
                >
                  Analyze
                </Button>
                <Button
                  onClick={() => handleOpenExternal(repo.name)}
                  variant="outline"
                  size="sm"
                  className="border-[#1e1e2e] hover:border-[#3b82f6]/30"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Connect Repository Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Repository</DialogTitle>
            <DialogDescription>
              Enter the URL of the repository you want to connect.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="url">Repository URL</Label>
              <Input
                id="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
              onClick={handleConnectRepo}
            >
              Connect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
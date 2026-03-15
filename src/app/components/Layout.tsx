import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  GitBranch,
  FileSearch,
  CheckCircle,
  Sparkles,
  Rocket,
  Server,
  Activity,
  Settings as SettingsIcon,
  Search,
  Bell,
  ChevronDown,
  Circle,
  LogOut,
  User,
} from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Repositories', path: '/repositories', icon: GitBranch },
  { name: 'Code Analysis', path: '/code-analysis', icon: FileSearch },
  { name: 'Deployment Readiness', path: '/deployment-readiness', icon: CheckCircle },
  { name: 'AI Fix Engine', path: '/ai-fix-engine', icon: Sparkles },
  { name: 'Deployments', path: '/deployments', icon: Rocket },
  { name: 'Infrastructure', path: '/infrastructure', icon: Server },
  { name: 'Logs & Monitoring', path: '/logs-monitoring', icon: Activity },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

const workspaces = ['Production', 'Staging', 'Development', 'Testing'];
const projects = ['api-gateway-v2', 'frontend-app', 'auth-service', 'data-pipeline', 'ml-service'];

const stages = [
  'Code Detection',
  'Analysis',
  'Fix Suggestions',
  'Build',
  'Containerization',
  'Deployment',
  'Health Check'
];

const repositories = [
  { id: 1, name: 'api-gateway-v2', branch: 'main', status: 'active' },
  { id: 2, name: 'frontend-app', branch: 'main', status: 'active' },
  { id: 3, name: 'auth-service', branch: 'develop', status: 'active' },
  { id: 4, name: 'data-pipeline', branch: 'main', status: 'inactive' },
  { id: 5, name: 'ml-service', branch: 'feature/model-v2', status: 'active' },
  { id: 6, name: 'payment-service', branch: 'main', status: 'active' },
  { id: 7, name: 'notification-service', branch: 'main', status: 'inactive' },
];

const notifications = [
  { id: 1, title: 'Deployment Successful', message: 'api-gateway-v2 deployed to production', time: '5m ago', type: 'success' },
  { id: 2, title: 'Security Alert', message: '3 vulnerabilities detected in auth-service', time: '15m ago', type: 'warning' },
  { id: 3, title: 'Build Failed', message: 'frontend-app build failed on staging', time: '1h ago', type: 'error' },
  { id: 4, title: 'Code Review', message: 'New PR requires your review', time: '2h ago', type: 'info' },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedWorkspace, setSelectedWorkspace] = useState('Production');
  const [selectedProject, setSelectedProject] = useState('api-gateway-v2');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(4);
  
  // Stage and Repository state variables
  const [selectedStage, setSelectedStage] = useState('Build');
  const [selectedRepository, setSelectedRepository] = useState(repositories[0]);
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [showRepositoryDropdown, setShowRepositoryDropdown] = useState(false);
  const [showRepositoryDialog, setShowRepositoryDialog] = useState(false);

  const handleWorkspaceChange = (workspace: string) => {
    setSelectedWorkspace(workspace);
    toast.success(`Switched to ${workspace} workspace`);
  };

  const handleProjectChange = (project: string) => {
    setSelectedProject(project);
    toast.success(`Switched to ${project} project`);
    // Navigate to dashboard with project parameter
    if (location.pathname === '/') {
      window.location.href = `/?project=${project}`;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
    setUnreadNotifications(0);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    setShowUserMenu(false);
    // In a real app, this would clear auth tokens and redirect to login
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleStageChange = (stage: string) => {
    setSelectedStage(stage);
    setShowStageDropdown(false);
    toast.info(`Viewing ${stage} stage`);
  };

  const handleRepositoryChange = (repository: typeof repositories[0]) => {
    setSelectedRepository(repository);
    setShowRepositoryDropdown(false);
    setShowRepositoryDialog(false);
    toast.success(`Switched to ${repository.name} (${repository.branch})`);
  };

  const handleOpenRepositoryDialog = () => {
    setShowRepositoryDialog(true);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a0a0f] border-r border-[#1e1e2e] flex flex-col">
        {/* Title */}
        <div className="p-6 border-b border-[#1e1e2e]">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#a855f7] bg-clip-text text-transparent">
            Klystryx
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#1e1e2e]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-[#1e1e2e]">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#13131a] border border-[#1e1e2e]">
            <Circle className="w-2 h-2 text-[#10b981] fill-[#10b981]" />
            <div className="flex-1">
              <div className="text-xs text-slate-400">System Status</div>
              <div className="text-sm font-medium text-[#10b981]">All Systems Operational</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <div className="h-16 bg-[#0a0a0f] border-b border-[#1e1e2e] flex items-center justify-between px-6">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Workspace selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#13131a] border border-[#1e1e2e] cursor-pointer hover:border-[#a855f7]/30 transition-colors">
                  <span className="text-sm">{selectedWorkspace}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#13131a] border-[#1e1e2e]">
                <DropdownMenuLabel className="text-slate-200">Select Workspace</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#1e1e2e]" />
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace}
                    onClick={() => handleWorkspaceChange(workspace)}
                    className="cursor-pointer hover:bg-[#1e1e2e] text-slate-100 focus:text-white"
                  >
                    {workspace}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Project selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#13131a] border border-[#1e1e2e] cursor-pointer hover:border-[#3b82f6]/30 transition-colors">
                  <span className="text-sm">{selectedProject}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#13131a] border-[#1e1e2e]">
                <DropdownMenuLabel className="text-slate-200">Select Project</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#1e1e2e]" />
                {projects.map((project) => (
                  <DropdownMenuItem
                    key={project}
                    onClick={() => handleProjectChange(project)}
                    className="cursor-pointer hover:bg-[#1e1e2e] text-slate-100 focus:text-white"
                  >
                    {project}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories, deployments..."
                className="pl-10 bg-[#13131a] border-[#1e1e2e] focus:border-[#a855f7]/30 text-sm"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Deployment status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
              <Circle className="w-2 h-2 text-[#10b981] fill-[#10b981] animate-pulse" />
              <span className="text-xs text-[#10b981] font-medium">3 Active Deployments</span>
            </div>

            {/* Notifications */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg hover:bg-[#1e1e2e] transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-400" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#a855f7] text-white text-xs border-0">
                  {unreadNotifications}
                </Badge>
              )}
            </button>

            {/* User profile */}
            <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-[#1e1e2e] cursor-pointer transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-[#a855f7] to-[#3b82f6] text-white text-sm">
                      T
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium">Test</div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#13131a] border-[#1e1e2e] w-56">
                <DropdownMenuLabel className="text-slate-200">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#1e1e2e]" />
                <DropdownMenuItem 
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile-settings');
                  }}
                  className="cursor-pointer hover:bg-[#1e1e2e] text-slate-100 focus:text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/preferences');
                  }}
                  className="cursor-pointer hover:bg-[#1e1e2e] text-slate-100 focus:text-white"
                >
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#1e1e2e]" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-[#1e1e2e] text-red-400 focus:text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="bg-[#13131a] border-[#1e1e2e] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-all ${
                  notification.type === 'success'
                    ? 'bg-[#10b981]/5 border-[#10b981]/20'
                    : notification.type === 'warning'
                    ? 'bg-[#f59e0b]/5 border-[#f59e0b]/20'
                    : notification.type === 'error'
                    ? 'bg-[#ef4444]/5 border-[#ef4444]/20'
                    : 'bg-[#3b82f6]/5 border-[#3b82f6]/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{notification.title}</div>
                    <div className="text-xs text-slate-300 mt-1">{notification.message}</div>
                    <div className="text-xs text-slate-400 mt-2">{notification.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Repository Dialog */}
      <Dialog open={showRepositoryDialog} onOpenChange={setShowRepositoryDialog}>
        <DialogContent className="bg-[#13131a] border-[#1e1e2e] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Select Repository</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => handleRepositoryChange(repo)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedRepository.id === repo.id
                    ? 'bg-[#a855f7]/10 border-[#a855f7]/30'
                    : 'bg-[#0a0a0f] border-[#1e1e2e] hover:border-[#a855f7]/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-5 h-5 text-[#a855f7]" />
                      <div>
                        <div className="text-sm font-semibold text-white">{repo.name}</div>
                        <div className="text-xs text-slate-300 mt-1">Branch: {repo.branch}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${
                        repo.status === 'active'
                          ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20'
                          : 'bg-[#94a3b8]/10 text-[#94a3b8] border-[#94a3b8]/20'
                      }`}
                    >
                      {repo.status}
                    </Badge>
                    {selectedRepository.id === repo.id && (
                      <CheckCircle className="w-5 h-5 text-[#a855f7]" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
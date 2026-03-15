import { Sparkles, ThumbsUp, ThumbsDown, Eye, FileCode, Zap, History, Check, X, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';

const suggestedFixes = [
  {
    id: 1,
    issue: 'Hardcoded API key detected',
    severity: 'high',
    description:
      'API key found in test configuration. This poses a security risk if committed to version control.',
    file: 'src/config/test.config.ts',
    line: 8,
    confidence: 98,
    suggestedFix: {
      before: `export const config = {
  apiKey: 'sk-test-1234567890abcdef',
  environment: 'test'
};`,
      after: `export const config = {
  apiKey: process.env.TEST_API_KEY || '',
  environment: 'test'
};`,
    },
    impact: 'Moves API key to environment variable, preventing exposure in source code',
  },
  {
    id: 2,
    issue: 'CORS configuration too permissive',
    severity: 'medium',
    description:
      'CORS is configured to allow all origins in production, which could lead to security vulnerabilities.',
    file: 'src/middleware/cors.ts',
    line: 15,
    confidence: 95,
    suggestedFix: {
      before: `app.use(cors({
  origin: '*',
  credentials: true
}));`,
      after: `app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  credentials: true
}));`,
    },
    impact: 'Restricts CORS to specified origins from environment configuration',
  },
  {
    id: 3,
    issue: 'Unused imports detected',
    severity: 'low',
    description: 'Multiple unused imports found in authentication middleware, affecting bundle size.',
    file: 'src/auth/middleware.ts',
    line: 12,
    confidence: 100,
    suggestedFix: {
      before: `import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/User';
import { logger } from '../utils/logger';
import { cache } from '../utils/cache';`,
      after: `import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/User';`,
    },
    impact: 'Removes unused imports, reducing bundle size by ~2.3KB',
  },
  {
    id: 4,
    issue: 'Environment variable missing',
    severity: 'medium',
    description: 'DATABASE_POOL_SIZE is used in code but not documented in .env.example file.',
    file: '.env.example',
    line: null,
    confidence: 92,
    suggestedFix: {
      before: `DATABASE_URL=postgresql://localhost:5432/mydb
DATABASE_SSL=true
API_PORT=3000`,
      after: `DATABASE_URL=postgresql://localhost:5432/mydb
DATABASE_SSL=true
DATABASE_POOL_SIZE=20
API_PORT=3000`,
    },
    impact: 'Documents required environment variable for database connection pooling',
  },
  {
    id: 5,
    issue: 'Large bundle size',
    severity: 'low',
    description: 'Main bundle exceeds recommended size. Consider implementing code splitting.',
    file: 'vite.config.ts',
    line: null,
    confidence: 88,
    suggestedFix: {
      before: `export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});`,
      after: `export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router']
        }
      }
    }
  }
});`,
    },
    impact: 'Splits vendor libraries into separate chunk, reducing initial load time',
  },
];

// Historical corrections log
const correctionsHistory = [
  {
    id: 101,
    issue: 'Async/await error handling',
    file: 'src/utils/api.ts',
    line: 24,
    severity: 'high',
    status: 'applied',
    timestamp: '2024-03-14T10:23:00Z',
    appliedBy: 'John Doe',
    confidence: 97,
    suggestedFix: {
      before: `async function fetchData() {
  const response = await fetch(url);
  return response.json();
}`,
      after: `async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fetch failed');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}`,
    },
    impact: 'Added proper error handling and response validation',
  },
  {
    id: 102,
    issue: 'SQL injection vulnerability',
    file: 'src/database/queries.ts',
    line: 45,
    severity: 'high',
    status: 'applied',
    timestamp: '2024-03-14T09:15:00Z',
    appliedBy: 'Sarah Smith',
    confidence: 99,
    suggestedFix: {
      before: `const query = \`SELECT * FROM users WHERE id = \${userId}\`;
db.execute(query);`,
      after: `const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [userId]);`,
    },
    impact: 'Prevented SQL injection by using parameterized queries',
  },
  {
    id: 103,
    issue: 'Memory leak in useEffect',
    file: 'src/components/Dashboard.tsx',
    line: 67,
    severity: 'medium',
    status: 'applied',
    timestamp: '2024-03-13T16:42:00Z',
    appliedBy: 'Mike Johnson',
    confidence: 94,
    suggestedFix: {
      before: `useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);
});`,
      after: `useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);
  
  return () => clearInterval(interval);
}, []);`,
    },
    impact: 'Added cleanup function to prevent memory leaks',
  },
  {
    id: 104,
    issue: 'Inefficient array filtering',
    file: 'src/utils/helpers.ts',
    line: 12,
    severity: 'low',
    status: 'applied',
    timestamp: '2024-03-13T14:20:00Z',
    appliedBy: 'Emily Davis',
    confidence: 91,
    suggestedFix: {
      before: `const active = items.filter(item => item.active);
const inactive = items.filter(item => !item.active);`,
      after: `const { active, inactive } = items.reduce(
  (acc, item) => {
    item.active ? acc.active.push(item) : acc.inactive.push(item);
    return acc;
  },
  { active: [], inactive: [] }
);`,
    },
    impact: 'Reduced time complexity from O(2n) to O(n)',
  },
  {
    id: 105,
    issue: 'Missing TypeScript types',
    file: 'src/services/auth.ts',
    line: 8,
    severity: 'medium',
    status: 'applied',
    timestamp: '2024-03-12T11:30:00Z',
    appliedBy: 'John Doe',
    confidence: 88,
    suggestedFix: {
      before: `function authenticate(credentials) {
  return api.post('/auth/login', credentials);
}`,
      after: `interface Credentials {
  email: string;
  password: string;
}

function authenticate(credentials: Credentials): Promise<AuthResponse> {
  return api.post('/auth/login', credentials);
}`,
    },
    impact: 'Added type safety and improved IDE autocomplete',
  },
  {
    id: 106,
    issue: 'Hardcoded credentials',
    file: 'src/config/database.ts',
    line: 5,
    severity: 'high',
    status: 'ignored',
    timestamp: '2024-03-12T09:15:00Z',
    appliedBy: 'Sarah Smith',
    confidence: 100,
    suggestedFix: {
      before: `const dbConfig = {
  host: 'localhost',
  user: 'admin',
  password: 'admin123',
  database: 'myapp'
};`,
      after: `const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || ''
};`,
    },
    impact: 'Moved credentials to environment variables for security',
  },
  {
    id: 107,
    issue: 'Unused CSS classes',
    file: 'src/styles/components.css',
    line: 234,
    severity: 'low',
    status: 'applied',
    timestamp: '2024-03-11T15:45:00Z',
    appliedBy: 'Mike Johnson',
    confidence: 85,
    suggestedFix: {
      before: `.legacy-button { /* 45 lines of unused CSS */ }
.old-modal { /* 32 lines of unused CSS */ }
.deprecated-card { /* 28 lines of unused CSS */ }`,
      after: `/* Removed 105 lines of unused CSS */`,
    },
    impact: 'Reduced CSS bundle size by 3.2KB',
  },
  {
    id: 108,
    issue: 'Console.log in production',
    file: 'src/components/Form.tsx',
    line: 89,
    severity: 'low',
    status: 'applied',
    timestamp: '2024-03-11T13:22:00Z',
    appliedBy: 'Emily Davis',
    confidence: 100,
    suggestedFix: {
      before: `const handleSubmit = (data) => {
  console.log('Form data:', data);
  api.submit(data);
};`,
      after: `const handleSubmit = (data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Form data:', data);
  }
  api.submit(data);
};`,
    },
    impact: 'Prevented debug logs from appearing in production',
  },
  {
    id: 109,
    issue: 'Race condition in state update',
    file: 'src/hooks/useCounter.ts',
    line: 15,
    severity: 'medium',
    status: 'applied',
    timestamp: '2024-03-10T10:10:00Z',
    appliedBy: 'John Doe',
    confidence: 93,
    suggestedFix: {
      before: `const increment = () => {
  setCount(count + 1);
};`,
      after: `const increment = () => {
  setCount(prevCount => prevCount + 1);
};`,
    },
    impact: 'Fixed race condition by using functional state update',
  },
  {
    id: 110,
    issue: 'Missing alt text on images',
    file: 'src/components/Gallery.tsx',
    line: 42,
    severity: 'medium',
    status: 'ignored',
    timestamp: '2024-03-10T08:30:00Z',
    appliedBy: 'Sarah Smith',
    confidence: 100,
    suggestedFix: {
      before: `<img src={item.url} />`,
      after: `<img src={item.url} alt={item.description || 'Gallery image'} />`,
    },
    impact: 'Improved accessibility for screen readers',
  },
];

const severityConfig = {
  high: {
    color: 'text-[#ef4444]',
    bgColor: 'bg-[#ef4444]/10',
    borderColor: 'border-[#ef4444]/20',
  },
  medium: {
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/10',
    borderColor: 'border-[#f59e0b]/20',
  },
  low: {
    color: 'text-[#06b6d4]',
    bgColor: 'bg-[#06b6d4]/10',
    borderColor: 'border-[#06b6d4]/20',
  },
};

export function AIFixEngine() {
  const [selectedFix, setSelectedFix] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all', 'applied', 'ignored'
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [showDiffDialog, setShowDiffDialog] = useState(false);
  const [currentDiff, setCurrentDiff] = useState(null);
  const [ignoredFixes, setIgnoredFixes] = useState<Set<number>>(new Set());

  const handleViewDiff = (fix: any) => {
    setCurrentDiff(fix);
    setShowDiffDialog(true);
    toast.info('Opening detailed diff view...');
  };

  const handleIgnoreFix = (fixId: number, fixTitle: string) => {
    setIgnoredFixes(prev => new Set(prev).add(fixId));
    toast.warning(`Ignored: ${fixTitle}`);
  };

  const handleRunAnalysis = () => {
    toast.loading('Running new AI analysis...');
    setTimeout(() => {
      toast.success('Analysis complete! Found 3 new issues.');
    }, 2000);
  };

  const filteredHistory = correctionsHistory.filter((item) => {
    if (historyFilter === 'all') return true;
    return item.status === historyFilter;
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          AI Fix Engine
        </h1>
        <p className="text-slate-400 mt-1">
          AI-powered code fixes and optimization suggestions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#a855f7]" />
            <div>
              <div className="text-2xl font-semibold">{suggestedFixes.length}</div>
              <div className="text-sm text-slate-400">Fixes Available</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-[#f59e0b]" />
            <div>
              <div className="text-2xl font-semibold">2</div>
              <div className="text-sm text-slate-400">High Priority</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <ThumbsUp className="w-8 h-8 text-[#10b981]" />
            <div>
              <div className="text-2xl font-semibold">94%</div>
              <div className="text-sm text-slate-400">Avg Confidence</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-[#13131a] border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <FileCode className="w-8 h-8 text-[#3b82f6]" />
            <div>
              <div className="text-2xl font-semibold">8</div>
              <div className="text-sm text-slate-400">Files Affected</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Suggested Fixes */}
      <div className="space-y-4">
        {suggestedFixes.map((fix) => {
          const config = severityConfig[fix.severity];

          return (
            <Card
              key={fix.id}
              className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#a855f7]/30 transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-[#a855f7]" />
                      <h3 className="text-lg font-semibold">{fix.issue}</h3>
                      <Badge
                        variant="outline"
                        className={`${config.color} ${config.borderColor}`}
                      >
                        {fix.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{fix.description}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#a855f7]">{fix.confidence}%</div>
                    <div className="text-xs text-slate-400 mt-1">Confidence</div>
                  </div>
                </div>

                {/* File info */}
                <div className="flex items-center gap-4 text-sm">
                  <code className="bg-[#0a0a0f] px-3 py-1.5 rounded border border-[#1e1e2e] text-slate-300">
                    {fix.file}
                  </code>
                  {fix.line && <span className="text-slate-400">Line {fix.line}</span>}
                </div>

                {/* Code diff */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Before */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                      <span className="text-xs text-slate-400 uppercase tracking-wider">
                        Before
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                      <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                        {fix.suggestedFix.before}
                      </pre>
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      <span className="text-xs text-slate-400 uppercase tracking-wider">
                        After (Suggested)
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#10b981]/20">
                      <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                        {fix.suggestedFix.after}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Impact */}
                <div className="p-4 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[#a855f7] mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-[#a855f7] mb-1">Impact</div>
                      <div className="text-sm text-slate-300">{fix.impact}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    className="bg-[#10b981] hover:bg-[#10b981]/90 text-white"
                    onClick={() => {
                      setSelectedFix(fix);
                      toast.success('Fix accepted!');
                    }}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Accept Fix
                  </Button>
                  <Button
                    onClick={() => handleViewDiff(fix)}
                    variant="outline"
                    className="border-[#3b82f6]/30 text-[#3b82f6] hover:bg-[#3b82f6]/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Diff
                  </Button>
                  <Button
                    onClick={() => handleIgnoreFix(fix.id, fix.issue)}
                    variant="outline"
                    className="border-[#1e1e2e] text-slate-400 hover:bg-[#1e1e2e]"
                    disabled={ignoredFixes.has(fix.id)}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    {ignoredFixes.has(fix.id) ? 'Ignored' : 'Ignore'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bottom info */}
      <Card className="p-6 bg-gradient-to-br from-[#13131a] to-[#1e1e2e] border-[#a855f7]/30">
        <div className="flex items-center gap-4">
          <Sparkles className="w-12 h-12 text-[#a855f7]" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">AI-Powered Analysis</h3>
            <p className="text-sm text-slate-400 mt-1">
              Our AI engine continuously analyzes your code for potential issues, security
              vulnerabilities, and optimization opportunities. Fixes are generated based on best
              practices and your project's context.
            </p>
          </div>
          <Button 
            onClick={handleRunAnalysis}
            className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
          >
            Run New Analysis
          </Button>
        </div>
      </Card>

      {/* Dialog for accepted fix */}
      {selectedFix && (
        <Dialog open={true} onOpenChange={() => setSelectedFix(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Accepted Fix</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#a855f7]" />
                <h3 className="text-lg font-semibold">{selectedFix.issue}</h3>
                <Badge
                  variant="outline"
                  className={`${severityConfig[selectedFix.severity].color} ${severityConfig[selectedFix.severity].borderColor}`}
                >
                  {selectedFix.severity}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">{selectedFix.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <code className="bg-[#0a0a0f] px-3 py-1.5 rounded border border-[#1e1e2e] text-slate-300">
                  {selectedFix.file}
                </code>
                {selectedFix.line && <span className="text-slate-400">Line {selectedFix.line}</span>}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Before */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">
                      Before
                    </span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                      {selectedFix.suggestedFix.before}
                    </pre>
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">
                      After (Suggested)
                    </span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#10b981]/20">
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                      {selectedFix.suggestedFix.after}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-[#a855f7] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#a855f7] mb-1">Impact</div>
                    <div className="text-sm text-slate-300">{selectedFix.impact}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* History */}
      <Card className="p-6 bg-gradient-to-br from-[#13131a] to-[#1e1e2e] border-[#a855f7]/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <History className="w-12 h-12 text-[#a855f7]" />
            <div>
              <h3 className="text-lg font-semibold">Corrections History</h3>
              <p className="text-sm text-slate-400 mt-1">
                View {correctionsHistory.length} past AI corrections with detailed logs
              </p>
            </div>
          </div>
          <Button
            className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="w-4 h-4 mr-2" />
            {showHistory ? 'Hide History' : 'View Full Log'}
          </Button>
        </div>

        {showHistory && (
          <div className="flex items-center gap-2 pt-4 border-t border-[#1e1e2e]">
            <span className="text-sm text-slate-400 mr-2">Filter:</span>
            <Button
              size="sm"
              variant={historyFilter === 'all' ? 'default' : 'outline'}
              className={
                historyFilter === 'all'
                  ? 'bg-[#a855f7] hover:bg-[#a855f7]/90 text-white'
                  : 'border-[#a855f7]/30 text-[#a855f7] hover:bg-[#a855f7]/10'
              }
              onClick={() => setHistoryFilter('all')}
            >
              All ({correctionsHistory.length})
            </Button>
            <Button
              size="sm"
              variant={historyFilter === 'applied' ? 'default' : 'outline'}
              className={
                historyFilter === 'applied'
                  ? 'bg-[#10b981] hover:bg-[#10b981]/90 text-white'
                  : 'border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/10'
              }
              onClick={() => setHistoryFilter('applied')}
            >
              <Check className="w-3 h-3 mr-1" />
              Applied ({correctionsHistory.filter((h) => h.status === 'applied').length})
            </Button>
            <Button
              size="sm"
              variant={historyFilter === 'ignored' ? 'default' : 'outline'}
              className={
                historyFilter === 'ignored'
                  ? 'bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white'
                  : 'border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/10'
              }
              onClick={() => setHistoryFilter('ignored')}
            >
              <X className="w-3 h-3 mr-1" />
              Ignored ({correctionsHistory.filter((h) => h.status === 'ignored').length})
            </Button>
          </div>
        )}
      </Card>

      {/* History Details */}
      {showHistory && (
        <div className="space-y-4">
          {filteredHistory.map((item) => {
            const config = severityConfig[item.severity];

            return (
              <Card
                key={item.id}
                className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#a855f7]/30 transition-all"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-5 h-5 text-[#a855f7]" />
                        <h3 className="text-lg font-semibold">{item.issue}</h3>
                        <Badge
                          variant="outline"
                          className={`${config.color} ${config.borderColor}`}
                        >
                          {item.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#a855f7]">{item.confidence}%</div>
                      <div className="text-xs text-slate-400 mt-1">Confidence</div>
                    </div>
                  </div>

                  {/* File info */}
                  <div className="flex items-center gap-4 text-sm">
                    <code className="bg-[#0a0a0f] px-3 py-1.5 rounded border border-[#1e1e2e] text-slate-300">
                      {item.file}
                    </code>
                    {item.line && <span className="text-slate-400">Line {item.line}</span>}
                    <span className="text-slate-400">•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-400">{formatDate(item.timestamp)}</span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">
                      {item.status === 'applied' ? 'Applied by' : 'Ignored by'} {item.appliedBy}
                    </span>
                    <Badge
                      className={
                        item.status === 'applied'
                          ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20'
                          : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'
                      }
                    >
                      {item.status === 'applied' ? 'Applied' : 'Ignored'}
                    </Badge>
                  </div>

                  {/* Code diff */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Before */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                        <span className="text-xs text-slate-400 uppercase tracking-wider">
                          Before
                        </span>
                      </div>
                      <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                        <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                          {item.suggestedFix.before}
                        </pre>
                      </div>
                    </div>

                    {/* After */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span className="text-xs text-slate-400 uppercase tracking-wider">
                          After (Suggested)
                        </span>
                      </div>
                      <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#10b981]/20">
                        <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                          {item.suggestedFix.after}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="p-4 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-[#a855f7] mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-[#a855f7] mb-1">Impact</div>
                        <div className="text-sm text-slate-300">{item.impact}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      className="bg-[#10b981] hover:bg-[#10b981]/90 text-white"
                      onClick={() => {
                        setSelectedHistoryItem(item);
                        toast.success('Fix accepted!');
                      }}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Accept Fix
                    </Button>
                    <Button
                      onClick={() => handleViewDiff(item)}
                      variant="outline"
                      className="border-[#3b82f6]/30 text-[#3b82f6] hover:bg-[#3b82f6]/10"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Diff
                    </Button>
                    <Button
                      onClick={() => toast.info('This fix has already been processed')}
                      variant="outline"
                      className="border-[#1e1e2e] text-slate-400 hover:bg-[#1e1e2e]"
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Ignore
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog for accepted history item */}
      {selectedHistoryItem && (
        <Dialog open={true} onOpenChange={() => setSelectedHistoryItem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Accepted Fix</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#a855f7]" />
                <h3 className="text-lg font-semibold">{selectedHistoryItem.issue}</h3>
                <Badge
                  variant="outline"
                  className={`${severityConfig[selectedHistoryItem.severity].color} ${severityConfig[selectedHistoryItem.severity].borderColor}`}
                >
                  {selectedHistoryItem.severity}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">{selectedHistoryItem.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <code className="bg-[#0a0a0f] px-3 py-1.5 rounded border border-[#1e1e2e] text-slate-300">
                  {selectedHistoryItem.file}
                </code>
                {selectedHistoryItem.line && <span className="text-slate-400">Line {selectedHistoryItem.line}</span>}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Before */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">
                      Before
                    </span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                      {selectedHistoryItem.suggestedFix.before}
                    </pre>
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">
                      After (Suggested)
                    </span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#10b981]/20">
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                      {selectedHistoryItem.suggestedFix.after}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-[#a855f7] mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#a855f7] mb-1">Impact</div>
                    <div className="text-sm text-slate-300">{selectedHistoryItem.impact}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
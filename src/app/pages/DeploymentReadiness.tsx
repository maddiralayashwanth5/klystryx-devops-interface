import { CheckCircle, AlertTriangle, XCircle, Info, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

const readinessReport = {
  overallScore: 94,
  repository: 'api-gateway-v2',
  branch: 'main',
  lastAnalysis: '5 minutes ago',
  categories: [
    {
      name: 'Code Health',
      score: 96,
      status: 'excellent',
      issues: [
        {
          severity: 'low',
          title: 'Unused imports detected',
          description: '3 unused imports found in authentication module',
          file: 'src/auth/middleware.ts',
          line: 12,
        },
      ],
    },
    {
      name: 'Configuration',
      score: 92,
      status: 'good',
      issues: [
        {
          severity: 'medium',
          title: 'Environment variable missing',
          description: 'DATABASE_POOL_SIZE not defined in .env.example',
          file: '.env.example',
          line: null,
        },
      ],
    },
    {
      name: 'Dependencies',
      score: 97,
      status: 'excellent',
      issues: [
        {
          severity: 'low',
          title: 'Minor version update available',
          description: 'dotenv can be updated from 16.3.1 to 16.4.1',
          file: 'package.json',
          line: 24,
        },
      ],
    },
    {
      name: 'Runtime Errors',
      score: 98,
      status: 'excellent',
      issues: [],
    },
    {
      name: 'Security',
      score: 89,
      status: 'good',
      issues: [
        {
          severity: 'high',
          title: 'Hardcoded API key detected',
          description: 'API key found in test configuration file',
          file: 'src/config/test.config.ts',
          line: 8,
        },
        {
          severity: 'medium',
          title: 'CORS configuration too permissive',
          description: 'CORS allows all origins in production build',
          file: 'src/middleware/cors.ts',
          line: 15,
        },
      ],
    },
    {
      name: 'Performance',
      score: 94,
      status: 'excellent',
      issues: [
        {
          severity: 'low',
          title: 'Large bundle size',
          description: 'Main bundle exceeds recommended size by 120KB',
          file: 'dist/index.js',
          line: null,
        },
      ],
    },
  ],
};

const severityConfig = {
  high: {
    color: 'text-[#ef4444]',
    bgColor: 'bg-[#ef4444]/10',
    borderColor: 'border-[#ef4444]/20',
    icon: XCircle,
  },
  medium: {
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/10',
    borderColor: 'border-[#f59e0b]/20',
    icon: AlertTriangle,
  },
  low: {
    color: 'text-[#06b6d4]',
    bgColor: 'bg-[#06b6d4]/10',
    borderColor: 'border-[#06b6d4]/20',
    icon: Info,
  },
};

const statusConfig = {
  excellent: { color: 'text-[#10b981]', label: 'Excellent' },
  good: { color: 'text-[#3b82f6]', label: 'Good' },
  warning: { color: 'text-[#f59e0b]', label: 'Needs Attention' },
  critical: { color: 'text-[#ef4444]', label: 'Critical' },
};

export function DeploymentReadiness() {
  const totalIssues = readinessReport.categories.reduce(
    (acc, cat) => acc + cat.issues.length,
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Deployment Readiness
        </h1>
        <p className="text-slate-400 mt-1">
          AI-generated analysis and deployment recommendations
        </p>
      </div>

      {/* Overall Score Card */}
      <Card className="p-8 bg-gradient-to-br from-[#13131a] to-[#1e1e2e] border-[#a855f7]/30">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{readinessReport.repository}</h2>
              <Badge className="bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]/20">
                {readinessReport.branch}
              </Badge>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              Last analyzed {readinessReport.lastAnalysis}
            </p>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-transparent">
              {readinessReport.overallScore}
            </div>
            <div className="text-sm text-slate-400 mt-2">Overall Score</div>
            <Badge className="mt-3 bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">
              Ready to Deploy
            </Badge>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#1e1e2e]">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#10b981]">
                {readinessReport.categories.filter((c) => c.status === 'excellent').length}
              </div>
              <div className="text-sm text-slate-400 mt-1">Excellent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#3b82f6]">
                {readinessReport.categories.filter((c) => c.status === 'good').length}
              </div>
              <div className="text-sm text-slate-400 mt-1">Good</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#f59e0b]">{totalIssues}</div>
              <div className="text-sm text-slate-400 mt-1">Issues Found</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {readinessReport.categories.map((category) => (
          <Card
            key={category.name}
            className="p-6 bg-[#13131a] border-[#1e1e2e] hover:border-[#a855f7]/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{category.name}</h3>
              <TrendingUp className={`w-5 h-5 ${statusConfig[category.status].color}`} />
            </div>

            <div className="text-center py-4">
              <div className={`text-4xl font-bold ${statusConfig[category.status].color}`}>
                {category.score}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {statusConfig[category.status].label}
              </p>
            </div>

            <Progress value={category.score} className="h-2 bg-[#1e1e2e]" />

            <div className="mt-4 text-xs text-slate-400">
              {category.issues.length} issue{category.issues.length !== 1 ? 's' : ''} found
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Issues */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Detailed Analysis</h2>

        {readinessReport.categories.map((category) =>
          category.issues.length > 0 ? (
            <Card key={category.name} className="p-6 bg-[#13131a] border-[#1e1e2e]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <Badge
                  variant="outline"
                  className={`${statusConfig[category.status].color} border-current`}
                >
                  Score: {category.score}
                </Badge>
              </div>

              <div className="space-y-3">
                {category.issues.map((issue, index) => {
                  const config = severityConfig[issue.severity];
                  const Icon = config.icon;

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
                    >
                      <div className="flex items-start gap-4">
                        <Icon className={`w-5 h-5 ${config.color} mt-0.5`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{issue.title}</h4>
                            <Badge
                              variant="outline"
                              className={`${config.color} ${config.borderColor} text-xs`}
                            >
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 mb-2">{issue.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <code className="bg-[#0a0a0f] px-2 py-1 rounded">
                              {issue.file}
                            </code>
                            {issue.line && <span>Line {issue.line}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : null
        )}
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-[#10b981]" />
          <h2 className="text-xl font-semibold">Deployment Recommendations</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
            <CheckCircle className="w-5 h-5 text-[#10b981] mt-0.5" />
            <div>
              <div className="font-medium text-[#10b981]">Ready for Production</div>
              <div className="text-sm text-slate-400 mt-1">
                Overall health score is excellent. Safe to deploy to production environment.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
            <AlertTriangle className="w-5 h-5 text-[#f59e0b] mt-0.5" />
            <div>
              <div className="font-medium text-[#f59e0b]">Address Security Issues</div>
              <div className="text-sm text-slate-400 mt-1">
                2 security issues detected. Recommend fixing before production deployment.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20">
            <Info className="w-5 h-5 text-[#06b6d4] mt-0.5" />
            <div>
              <div className="font-medium text-[#06b6d4]">Performance Optimization</div>
              <div className="text-sm text-slate-400 mt-1">
                Consider code splitting to reduce bundle size for improved load times.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

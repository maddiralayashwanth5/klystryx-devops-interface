import { FileSearch, Package, Settings, Container, Layers, FileCode } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const analysisData = {
  repository: 'api-gateway-v2',
  language: 'TypeScript',
  framework: 'Express.js',
  runtime: 'Node.js 20.x',
  packageManager: 'pnpm',
  buildTool: 'esbuild',
  dependencies: [
    { name: 'express', version: '4.18.2', type: 'production', status: 'up-to-date' },
    { name: 'typescript', version: '5.3.3', type: 'development', status: 'up-to-date' },
    { name: 'prisma', version: '5.7.1', type: 'production', status: 'up-to-date' },
    { name: 'zod', version: '3.22.4', type: 'production', status: 'up-to-date' },
    { name: 'dotenv', version: '16.3.1', type: 'production', status: 'outdated' },
    { name: 'jest', version: '29.7.0', type: 'development', status: 'up-to-date' },
  ],
  buildConfig: {
    entryPoint: 'src/index.ts',
    outputDir: 'dist',
    target: 'ES2022',
    moduleSystem: 'ESM',
    sourceMaps: true,
  },
  containerConfig: {
    baseImage: 'node:20-alpine',
    workDir: '/app',
    exposedPorts: [3000, 9229],
    healthCheck: '/health',
    volumes: ['/app/logs', '/app/uploads'],
  },
};

export function CodeAnalysis() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Code Analysis
        </h1>
        <p className="text-slate-400 mt-1">
          Detailed analysis of repository structure and configuration
        </p>
      </div>

      {/* Repository Info */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{analysisData.repository}</h2>
            <div className="flex items-center gap-4 mt-3">
              <Badge className="bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20">
                {analysisData.language}
              </Badge>
              <Badge className="bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]/20">
                {analysisData.framework}
              </Badge>
              <Badge className="bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20">
                {analysisData.runtime}
              </Badge>
            </div>
          </div>
          <FileSearch className="w-12 h-12 text-[#a855f7]" />
        </div>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="dependencies" className="space-y-6">
        <TabsList className="bg-[#13131a] border border-[#1e1e2e]">
          <TabsTrigger value="dependencies" className="data-[state=active]:bg-[#a855f7]/10 data-[state=active]:text-[#a855f7]">
            <Package className="w-4 h-4 mr-2" />
            Dependencies
          </TabsTrigger>
          <TabsTrigger value="build" className="data-[state=active]:bg-[#3b82f6]/10 data-[state=active]:text-[#3b82f6]">
            <Settings className="w-4 h-4 mr-2" />
            Build Config
          </TabsTrigger>
          <TabsTrigger value="container" className="data-[state=active]:bg-[#06b6d4]/10 data-[state=active]:text-[#06b6d4]">
            <Container className="w-4 h-4 mr-2" />
            Container
          </TabsTrigger>
        </TabsList>

        {/* Dependencies Tab */}
        <TabsContent value="dependencies" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Dependency Tree</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-[#10b981]/20 text-[#10b981]">
                  {analysisData.dependencies.filter((d) => d.status === 'up-to-date').length} up to date
                </Badge>
                <Badge variant="outline" className="border-[#f59e0b]/20 text-[#f59e0b]">
                  {analysisData.dependencies.filter((d) => d.status === 'outdated').length} outdated
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              {analysisData.dependencies.map((dep, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] hover:border-[#a855f7]/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Package className="w-5 h-5 text-[#a855f7]" />
                    <div>
                      <div className="font-medium">{dep.name}</div>
                      <div className="text-xs text-slate-400">{dep.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <code className="text-sm text-slate-300 bg-[#1e1e2e] px-3 py-1 rounded">
                      {dep.version}
                    </code>
                    <Badge
                      variant="outline"
                      className={`${
                        dep.status === 'up-to-date'
                          ? 'border-[#10b981]/20 text-[#10b981]'
                          : 'border-[#f59e0b]/20 text-[#f59e0b]'
                      }`}
                    >
                      {dep.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Build Config Tab */}
        <TabsContent value="build" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-[#3b82f6]" />
              <h3 className="text-lg font-semibold">Build Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Build Tool</div>
                  <div className="font-medium">{analysisData.buildTool}</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Entry Point</div>
                  <code className="text-sm font-medium text-[#a855f7]">
                    {analysisData.buildConfig.entryPoint}
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Output Directory</div>
                  <code className="text-sm font-medium text-[#3b82f6]">
                    {analysisData.buildConfig.outputDir}
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Target</div>
                  <div className="font-medium">{analysisData.buildConfig.target}</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Module System</div>
                  <div className="font-medium">{analysisData.buildConfig.moduleSystem}</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Source Maps</div>
                  <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20">
                    {analysisData.buildConfig.sourceMaps ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="w-6 h-6 text-[#06b6d4]" />
              <h3 className="text-lg font-semibold">Build Scripts</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="text-sm text-slate-400 mb-2">build</div>
                <code className="text-sm text-slate-300">esbuild src/index.ts --bundle --platform=node --outdir=dist</code>
              </div>
              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="text-sm text-slate-400 mb-2">test</div>
                <code className="text-sm text-slate-300">jest --coverage</code>
              </div>
              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="text-sm text-slate-400 mb-2">start</div>
                <code className="text-sm text-slate-300">node dist/index.js</code>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Container Tab */}
        <TabsContent value="container" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center gap-3 mb-6">
              <Container className="w-6 h-6 text-[#06b6d4]" />
              <h3 className="text-lg font-semibold">Container Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Base Image</div>
                  <code className="text-sm font-medium text-[#06b6d4]">
                    {analysisData.containerConfig.baseImage}
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Working Directory</div>
                  <code className="text-sm font-medium text-[#a855f7]">
                    {analysisData.containerConfig.workDir}
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-2">Exposed Ports</div>
                  <div className="flex gap-2">
                    {analysisData.containerConfig.exposedPorts.map((port) => (
                      <Badge key={port} className="bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20">
                        {port}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-1">Health Check Endpoint</div>
                  <code className="text-sm font-medium text-[#10b981]">
                    {analysisData.containerConfig.healthCheck}
                  </code>
                </div>
                <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                  <div className="text-sm text-slate-400 mb-2">Volumes</div>
                  <div className="space-y-2">
                    {analysisData.containerConfig.volumes.map((volume) => (
                      <div key={volume} className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#f59e0b]" />
                        <code className="text-sm text-slate-300">{volume}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h3 className="text-lg font-semibold mb-4">Dockerfile Preview</h3>
            <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] font-mono text-sm">
              <div className="space-y-1 text-slate-300">
                <div><span className="text-[#a855f7]">FROM</span> {analysisData.containerConfig.baseImage}</div>
                <div><span className="text-[#a855f7]">WORKDIR</span> {analysisData.containerConfig.workDir}</div>
                <div><span className="text-[#3b82f6]">COPY</span> package*.json ./</div>
                <div><span className="text-[#06b6d4]">RUN</span> pnpm install --frozen-lockfile</div>
                <div><span className="text-[#3b82f6]">COPY</span> . .</div>
                <div><span className="text-[#06b6d4]">RUN</span> pnpm build</div>
                {analysisData.containerConfig.exposedPorts.map((port) => (
                  <div key={port}><span className="text-[#a855f7]">EXPOSE</span> {port}</div>
                ))}
                <div><span className="text-[#10b981]">CMD</span> ["node", "dist/index.js"]</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

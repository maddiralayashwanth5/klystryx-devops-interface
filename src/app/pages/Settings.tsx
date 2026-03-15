import { Settings as SettingsIcon, User, Bell, Shield, Database, Webhook } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export function Settings() {
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(true);
  const [aiFixEngineEnabled, setAiFixEngineEnabled] = useState(false);

  const handleSaveGeneralSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleUpdateDatabase = () => {
    toast.success('Database configuration updated!');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  const handleUpdatePassword = () => {
    toast.success('Password updated successfully!');
  };

  const handleAddWebhook = () => {
    toast.success('Webhook added successfully!');
  };

  const handleCancel = () => {
    toast.info('Changes discarded');
  };

  const handleConfigure2FA = () => {
    toast.info('Opening 2FA configuration...');
  };

  const handleRevokeKey = (keyType: string) => {
    toast.warning(`${keyType} API key revoked`);
  };

  const handleGenerateKey = () => {
    toast.success('New API key generated successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your deployment platform configuration
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-[#13131a] border border-[#1e1e2e]">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#a855f7]/10 data-[state=active]:text-[#a855f7]">
            <SettingsIcon className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#3b82f6]/10 data-[state=active]:text-[#3b82f6]">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#06b6d4]/10 data-[state=active]:text-[#06b6d4]">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#f59e0b]/10 data-[state=active]:text-[#f59e0b]">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h2 className="text-xl font-semibold mb-6">Workspace Settings</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  defaultValue="Production"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>

              <div>
                <Label htmlFor="default-region">Default Region</Label>
                <Input
                  id="default-region"
                  defaultValue="us-east-1"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div>
                  <div className="font-medium">Auto-deploy on push</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Automatically deploy when changes are pushed to main branch
                  </div>
                </div>
                <Switch
                  defaultChecked={autoDeployEnabled}
                  onCheckedChange={setAutoDeployEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div>
                  <div className="font-medium">AI Fix Engine</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Automatically apply AI-suggested fixes
                  </div>
                </div>
                <Switch
                  defaultChecked={aiFixEngineEnabled}
                  onCheckedChange={setAiFixEngineEnabled}
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e1e2e] flex gap-3">
              <Button
                className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
                onClick={handleSaveGeneralSettings}
              >
                Save Changes
              </Button>
              <Button 
                onClick={handleCancel}
                variant="outline" 
                className="border-[#1e1e2e]"
              >
                Cancel
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-[#3b82f6]" />
              <h2 className="text-xl font-semibold">Database Configuration</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="db-url">Database URL</Label>
                <Input
                  id="db-url"
                  type="password"
                  defaultValue="postgresql://..."
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>

              <div>
                <Label htmlFor="pool-size">Connection Pool Size</Label>
                <Input
                  id="pool-size"
                  defaultValue="20"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e1e2e]">
              <Button
                className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
                onClick={handleUpdateDatabase}
              >
                Update Database
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    defaultValue="John"
                    className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                  />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    defaultValue="Doe"
                    className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  defaultValue="DevOps Engineer"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e1e2e] flex gap-3">
              <Button
                className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </Button>
              <Button 
                onClick={handleCancel}
                variant="outline" 
                className="border-[#1e1e2e]"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div>
                  <div className="font-medium">Deployment Success</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Get notified when deployments complete successfully
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div>
                  <div className="font-medium">Deployment Failures</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Get notified when deployments fail
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div>
                  <div className="font-medium">Security Alerts</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Get notified about security vulnerabilities
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div>
                  <div className="font-medium">Infrastructure Warnings</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Get notified about high resource usage
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div>
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Receive weekly deployment summary reports
                  </div>
                </div>
                <Switch />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e1e2e]">
              <Button
                className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
                onClick={handleSaveNotifications}
              >
                Save Preferences
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <div className="flex items-center gap-3 mb-6">
              <Webhook className="w-6 h-6 text-[#06b6d4]" />
              <h2 className="text-xl font-semibold">Webhooks</h2>
            </div>

            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-domain.com/webhook"
                className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
              />
              <p className="text-xs text-slate-400 mt-2">
                Receive deployment events via webhook
              </p>
            </div>

            <div className="mt-6">
              <Button
                className="bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-white"
                onClick={handleAddWebhook}
              >
                Add Webhook
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>

              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="mt-2 bg-[#0a0a0f] border-[#1e1e2e]"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e1e2e]">
              <Button
                className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white"
                onClick={handleUpdatePassword}
              >
                Update Password
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h2 className="text-xl font-semibold mb-6">Two-Factor Authentication</h2>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
              <div>
                <div className="font-medium">Enable 2FA</div>
                <div className="text-sm text-slate-400 mt-1">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Switch />
            </div>

            <div className="mt-6">
              <Button 
                onClick={handleConfigure2FA}
                variant="outline" 
                className="border-[#1e1e2e]"
              >
                Configure 2FA
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
            <h2 className="text-xl font-semibold mb-6">API Keys</h2>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Production API Key</div>
                    <code className="text-xs text-slate-400 mt-1">kly_prod_***************</code>
                  </div>
                  <Button
                    onClick={() => handleRevokeKey('Production')}
                    variant="outline"
                    size="sm"
                    className="border-[#ef4444]/30 text-[#ef4444]"
                  >
                    Revoke
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Development API Key</div>
                    <code className="text-xs text-slate-400 mt-1">kly_dev_***************</code>
                  </div>
                  <Button
                    onClick={() => handleRevokeKey('Development')}
                    variant="outline"
                    size="sm"
                    className="border-[#ef4444]/30 text-[#ef4444]"
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={handleGenerateKey}
                className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
              >
                Generate New Key
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
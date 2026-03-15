import { useState } from 'react';
import { Bell, Moon, Globe, Zap, Shield, Database } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export function Preferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    deploymentAlerts: true,
    securityAlerts: true,
    weeklyReports: false,
    darkMode: true,
    compactView: false,
    autoRefresh: true,
    showMetrics: true,
    language: 'en',
    timezone: 'America/Los_Angeles',
  });

  const handleToggle = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    toast.success('Preference updated');
  };

  const handleSave = () => {
    toast.success('All preferences saved successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Preferences
        </h1>
        <p className="text-slate-300 mt-1">
          Customize your Klystryx experience
        </p>
      </div>

      {/* Notifications */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-[#a855f7]" />
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Email Notifications</div>
              <div className="text-sm text-slate-400 mt-1">Receive updates via email</div>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Push Notifications</div>
              <div className="text-sm text-slate-400 mt-1">Get browser push notifications</div>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Deployment Alerts</div>
              <div className="text-sm text-slate-400 mt-1">Notify on deployment status changes</div>
            </div>
            <Switch
              checked={preferences.deploymentAlerts}
              onCheckedChange={() => handleToggle('deploymentAlerts')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Security Alerts</div>
              <div className="text-sm text-slate-400 mt-1">Critical security notifications</div>
            </div>
            <Switch
              checked={preferences.securityAlerts}
              onCheckedChange={() => handleToggle('securityAlerts')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Weekly Reports</div>
              <div className="text-sm text-slate-400 mt-1">Receive weekly summary emails</div>
            </div>
            <Switch
              checked={preferences.weeklyReports}
              onCheckedChange={() => handleToggle('weeklyReports')}
            />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-6">
          <Moon className="w-6 h-6 text-[#3b82f6]" />
          <h2 className="text-xl font-semibold text-white">Appearance</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Dark Mode</div>
              <div className="text-sm text-slate-400 mt-1">Use dark theme (recommended)</div>
            </div>
            <Switch
              checked={preferences.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Compact View</div>
              <div className="text-sm text-slate-400 mt-1">Reduce spacing for more content</div>
            </div>
            <Switch
              checked={preferences.compactView}
              onCheckedChange={() => handleToggle('compactView')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Show Metrics</div>
              <div className="text-sm text-slate-400 mt-1">Display performance metrics on dashboard</div>
            </div>
            <Switch
              checked={preferences.showMetrics}
              onCheckedChange={() => handleToggle('showMetrics')}
            />
          </div>
        </div>
      </Card>

      {/* Performance */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-[#f59e0b]" />
          <h2 className="text-xl font-semibold text-white">Performance</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Auto Refresh</div>
              <div className="text-sm text-slate-400 mt-1">Automatically refresh data every 30 seconds</div>
            </div>
            <Switch
              checked={preferences.autoRefresh}
              onCheckedChange={() => handleToggle('autoRefresh')}
            />
          </div>
        </div>
      </Card>

      {/* Regional */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-[#10b981]" />
          <h2 className="text-xl font-semibold text-white">Regional Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg text-white focus:outline-none focus:border-[#a855f7]/30"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg text-white focus:outline-none focus:border-[#a855f7]/30"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
        >
          Save All Preferences
        </Button>
        <Button
          variant="outline"
          className="border-[#1e1e2e] text-slate-300 hover:bg-[#1e1e2e]"
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}

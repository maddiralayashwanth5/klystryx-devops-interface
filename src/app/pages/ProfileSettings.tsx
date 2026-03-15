import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    name: 'Test',
    email: 'test@klystryx.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'DevOps Engineer passionate about automation and CI/CD',
    company: 'Klystryx',
    role: 'Senior DevOps Engineer',
    joinDate: '2024-01-15',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-slate-300 mt-1">
          Manage your personal information and account details
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-8 bg-[#13131a] border-[#1e1e2e]">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#a855f7] to-[#3b82f6] flex items-center justify-center text-white text-3xl font-bold">
            T
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">{formData.name}</h2>
            <p className="text-slate-400">{formData.role}</p>
            <p className="text-slate-500 text-sm mt-1">Member since {new Date(formData.joinDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-[#0a0a0f] border-[#1e1e2e] text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="bg-[#0a0a0f] border-[#1e1e2e] text-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="bg-[#0a0a0f] border-[#1e1e2e] text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <Input
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="bg-[#0a0a0f] border-[#1e1e2e] text-white"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Company
            </label>
            <Input
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="bg-[#0a0a0f] border-[#1e1e2e] text-white"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <Input
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="bg-[#0a0a0f] border-[#1e1e2e] text-white"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg text-white focus:outline-none focus:border-[#a855f7]/30"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-[#1e1e2e]">
          <Button
            onClick={handleSave}
            className="bg-[#a855f7] hover:bg-[#a855f7]/90 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="border-[#1e1e2e] text-slate-300 hover:bg-[#1e1e2e]"
          >
            Cancel
          </Button>
        </div>
      </Card>

      {/* Security Section */}
      <Card className="p-6 bg-[#13131a] border-[#1e1e2e]">
        <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Password</div>
              <div className="text-sm text-slate-400 mt-1">Last changed 30 days ago</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#a855f7]/30 text-[#a855f7] hover:bg-[#a855f7]/10"
            >
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg border border-[#1e1e2e]">
            <div>
              <div className="font-medium text-white">Two-Factor Authentication</div>
              <div className="text-sm text-slate-400 mt-1">Add an extra layer of security</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/10"
            >
              Enable 2FA
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

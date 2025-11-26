'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Settings,
  User,
  Mail,
  Calendar,
  Target,
  Bell,
  Globe,
  LogOut,
  ArrowLeft,
  Shield,
  Info,
  HelpCircle,
  Check,
  Loader2,
} from 'lucide-react';

export default function MoreClient({ user, profile: initialProfile }) {
  const router = useRouter();
  const supabase = createClient();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: initialProfile?.full_name || '',
    dailyGoal: initialProfile?.daily_goal_minutes || 15,
    notifications: initialProfile?.notification_enabled || false,
    language: initialProfile?.native_language || 'English',
  });
  
  // UI state
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setShowSuccess(false);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName.trim() || null,
          daily_goal_minutes: formData.dailyGoal,
          notification_enabled: formData.notifications,
          native_language: formData.language,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      // Show success message
      setShowSuccess(true);
      
      // Refresh server data to update all pages
      router.refresh();
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await supabase.auth.signOut();
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/lessons')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lessons</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-700 font-medium">Settings saved successfully!</p>
          </div>
        )}

        {/* Account & Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Account & Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will appear on your profile and leaderboard
              </p>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Daily Goal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4" />
                Daily Learning Goal
              </label>
              <select
                value={formData.dailyGoal}
                onChange={(e) => handleChange('dailyGoal', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value={5}>5 minutes per day</option>
                <option value={10}>10 minutes per day</option>
                <option value={15}>15 minutes per day</option>
                <option value={20}>20 minutes per day</option>
                <option value={30}>30 minutes per day</option>
                <option value={45}>45 minutes per day</option>
                <option value={60}>60 minutes per day</option>
              </select>
            </div>

            {/* Native Language */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4" />
                Native Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
                <option value="Dari">Dari</option>
                <option value="Arabic">Arabic</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Notifications */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Bell className="w-4 h-4" />
                Notifications
              </label>
              <label className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-900">Send me daily learning reminders</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mb-6 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : showSuccess ? (
            <>
              <Check className="w-5 h-5" />
              Saved!
            </>
          ) : (
            'Save Changes'
          )}
        </button>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/dashboard/profile')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">View Profile</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Help & Support</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
              <Info className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">About Puhana</span>
            </button>
          </div>
        </div>

        {/* Account Info */}
        {initialProfile?.created_at && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">
                Member since {new Date(initialProfile.created_at).toLocaleDateString('en', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        )}

        {/* Sign Out */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
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
  X,
} from 'lucide-react';

export default function MoreClient({ user, profile: initialProfile }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [fullName, setFullName] = useState(initialProfile?.full_name || '');
  const [dailyGoal, setDailyGoal] = useState(initialProfile?.daily_goal_minutes || 15);
  const [notifications, setNotifications] = useState(initialProfile?.notification_enabled || false);
  const [language, setLanguage] = useState(initialProfile?.native_language || 'English');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Debug: Show current data
  useEffect(() => {
    console.log('Initial Profile:', initialProfile);
    console.log('User ID:', user?.id);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    console.log('Saving with user ID:', user.id);
    console.log('Full name:', fullName);
    
    try {
      // First, verify the profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      console.log('Existing profile:', existingProfile);
      console.log('Fetch error:', fetchError);
      
      if (fetchError) {
        setMessage('Error: Cannot find your profile');
        console.error('Fetch error:', fetchError);
        setSaving(false);
        return;
      }
      
      // Now update
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim() || null,
          daily_goal_minutes: dailyGoal,
          notification_enabled: notifications,
          native_language: language,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select();
      
      console.log('Update data:', updateData);
      console.log('Update error:', updateError);

      if (updateError) {
        setMessage(`Error: ${updateError.message}`);
        console.error('Update error:', updateError);
      } else {
        setMessage('✅ Saved successfully!');
        
        // Wait a moment then refresh
        setTimeout(() => {
          router.refresh();
        }, 500);
      }
    } catch (error) {
      console.error('Catch error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    const confirmed = confirm('Are you sure you want to sign out?');
    if (confirmed) {
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

        {/* Debug Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-mono text-gray-700">
            <strong>Debug Info:</strong><br/>
            User ID: {user?.id}<br/>
            Current Name: {initialProfile?.full_name || 'Not set'}<br/>
            Input Value: {fullName || 'Empty'}
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`rounded-xl p-4 mb-6 ${
            message.includes('Error') 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Account & Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Account & Settings</h2>
            </div>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            </div>

            {/* Daily Goal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4" />
                Daily Goal
              </label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            {/* Native Language */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4" />
                Native Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-900">Send me daily reminders</span>
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
            >
              {saving ? (
                'Saving...'
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>

        {/* Other Options */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-3">
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

        {/* Member Since */}
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
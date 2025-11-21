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
} from 'lucide-react';

export default function MorePage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);
      setEditedProfile({
        full_name: profileData?.full_name || '',
        daily_goal_minutes: profileData?.daily_goal_minutes || 15,
        notification_enabled: profileData?.notification_enabled || false,
        native_language: profileData?.native_language || 'English',
      });

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await supabase
        .from('profiles')
        .update({
          full_name: editedProfile.full_name,
          daily_goal_minutes: editedProfile.daily_goal_minutes,
          notification_enabled: editedProfile.notification_enabled,
          native_language: editedProfile.native_language,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      setProfile({ ...profile, ...editedProfile });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error saving settings. Please try again.');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">More</h1>
            {editMode && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Account</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={editedProfile.full_name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {profile?.full_name || 'Not set'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since
              </label>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span>
                  {new Date(profile?.created_at).toLocaleDateString('en', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Settings</h2>
            </div>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
            )}
            {editMode && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditedProfile({
                    full_name: profile?.full_name || '',
                    daily_goal_minutes: profile?.daily_goal_minutes || 15,
                    notification_enabled: profile?.notification_enabled || false,
                    native_language: profile?.native_language || 'English',
                  });
                }}
                className="text-gray-600 hover:text-gray-700 text-sm font-medium"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Daily Goal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4" />
                Daily Goal
              </label>
              {editMode ? (
                <select
                  value={editedProfile.daily_goal_minutes}
                  onChange={(e) => setEditedProfile({ ...editedProfile, daily_goal_minutes: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {profile?.daily_goal_minutes} minutes per day
                </div>
              )}
            </div>

            {/* Native Language */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4" />
                Native Language
              </label>
              {editMode ? (
                <select
                  value={editedProfile.native_language}
                  onChange={(e) => setEditedProfile({ ...editedProfile, native_language: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Dari">Dari</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {profile?.native_language || 'English'}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Bell className="w-4 h-4" />
                Notifications
              </label>
              {editMode ? (
                <label className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={editedProfile.notification_enabled}
                    onChange={(e) => setEditedProfile({ ...editedProfile, notification_enabled: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">Send me daily reminders</span>
                </label>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {profile?.notification_enabled ? 'Enabled' : 'Disabled'}
                </div>
              )}
            </div>
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

            <button
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Help & Support</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <Info className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">About Puhana</span>
            </button>
          </div>
        </div>

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
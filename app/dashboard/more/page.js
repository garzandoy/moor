'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  User,
  Mail,
  Target,
  Calendar,
  Bell,
  LogOut,
  Settings,
  ArrowLeft,
  Save,
  Edit2,
} from 'lucide-react';

export default function MorePage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    full_name: '',
    daily_goal_minutes: 15,
    notification_enabled: true,
  });

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
        notification_enabled: profileData?.notification_enabled ?? true,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await supabase
        .from('profiles')
        .update({
          full_name: editedProfile.full_name,
          daily_goal_minutes: editedProfile.daily_goal_minutes,
          notification_enabled: editedProfile.notification_enabled,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      setProfile({ ...profile, ...editedProfile });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to sign out?');
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
      <div className="max-w-3xl mx-auto">
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
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={editedProfile.full_name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900 font-medium">
                    {profile?.full_name || 'Not set'}
                  </span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">{user?.email}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Member Since */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Since
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">
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

        {/* Learning Settings Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Learning Settings</h2>
          </div>

          <div className="space-y-4">
            {/* Daily Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Goal
              </label>
              {editMode ? (
                <select
                  value={editedProfile.daily_goal_minutes}
                  onChange={(e) => setEditedProfile({ ...editedProfile, daily_goal_minutes: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={5}>5 minutes per day</option>
                  <option value={10}>10 minutes per day</option>
                  <option value={15}>15 minutes per day</option>
                  <option value={20}>20 minutes per day</option>
                  <option value={30}>30 minutes per day</option>
                  <option value={45}>45 minutes per day</option>
                  <option value={60}>60 minutes per day</option>
                </select>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900 font-medium">
                    {profile?.daily_goal_minutes} minutes per day
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Set how much time you want to practice each day
              </p>
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notifications
              </label>
              {editMode ? (
                <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="text-gray-900 font-medium">Daily Reminders</span>
                      <p className="text-xs text-gray-500">Get reminded to practice</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedProfile.notification_enabled}
                      onChange={(e) => setEditedProfile({ ...editedProfile, notification_enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Daily Reminders</span>
                  </div>
                  <span className={`text-sm font-medium ${profile?.notification_enabled ? 'text-green-600' : 'text-gray-500'}`}>
                    {profile?.notification_enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          {editMode && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditedProfile({
                    full_name: profile?.full_name || '',
                    daily_goal_minutes: profile?.daily_goal_minutes || 15,
                    notification_enabled: profile?.notification_enabled ?? true,
                  });
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Sign Out Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-2">Account Actions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Sign out of your account to switch users or take a break.
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
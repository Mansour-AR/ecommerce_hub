import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySettings = ({ user, onUpdatePassword, onToggle2FA }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const recentActivity = [
    {
      id: 1,
      action: 'Login',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success'
    },
    {
      id: 2,
      action: 'Password Changed',
      device: 'Mobile App',
      location: 'New York, NY',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'success'
    },
    {
      id: 3,
      action: 'Failed Login Attempt',
      device: 'Unknown Device',
      location: 'Unknown Location',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'warning'
    }
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePasswordForm()) return;
    
    setIsLoading(true);
    try {
      await onUpdatePassword(passwordData);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } catch (error) {
      setErrors({ general: 'Failed to update password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'Login':
        return 'LogIn';
      case 'Password Changed':
        return 'Key';
      case 'Failed Login Attempt':
        return 'AlertTriangle';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Password</h2>
              <p className="text-sm text-muted-foreground">
                Last changed {new Date(user.lastPasswordChange).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              <Icon name="Key" size={16} className="mr-2" />
              Change Password
            </Button>
          </div>
        </div>

        {showPasswordForm && (
          <div className="p-6 border-b border-border">
            {errors.general && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{errors.general}</p>
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                error={errors.currentPassword}
                required
              />

              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                error={errors.newPassword}
                description="Must be at least 8 characters long"
                required
              />

              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                error={errors.confirmPassword}
                required
              />

              <div className="flex items-center space-x-3">
                <Button
                  onClick={handlePasswordSubmit}
                  loading={isLoading}
                >
                  Update Password
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                    setErrors({});
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h2>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${user.twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <Button
                variant={user.twoFactorEnabled ? 'destructive' : 'default'}
                onClick={() => onToggle2FA(!user.twoFactorEnabled)}
              >
                <Icon name={user.twoFactorEnabled ? 'ShieldOff' : 'Shield'} size={16} className="mr-2" />
                {user.twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        </div>

        {user.twoFactorEnabled && (
          <div className="p-6">
            <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-md">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <p className="text-sm font-medium text-success">Two-factor authentication is active</p>
                <p className="text-xs text-success/80">Your account is protected with 2FA</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">
            Monitor your account activity and security events
          </p>
        </div>

        <div className="divide-y divide-border">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 flex items-start space-x-4">
              <div className={`p-2 rounded-lg bg-muted ${getActivityColor(activity.status)}`}>
                <Icon name={getActivityIcon(activity.action)} size={16} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground">{activity.action}</h3>
                  <span className="text-sm text-muted-foreground">
                    {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.device}</p>
                <p className="text-sm text-muted-foreground">{activity.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
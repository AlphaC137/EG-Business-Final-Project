import React, { useState } from 'react';
import { useAuthStore } from '../../lib/store';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Shield, 
  Edit2, 
  Eye, 
  EyeOff,
  Clock,
  CreditCard,
  MessageCircle,
  CheckCircle
} from 'lucide-react';
import { ProfileEditModal } from './ProfileEditModal';
import { PrivacySettingsModal } from './PrivacySettingsModal';

interface UserProfileData {
  fullName: string;
  email: string;
  phone: string;
  dateJoined: string;
  accountType: 'user' | 'vendor';
  profilePicture: string;
  isVerified: boolean;
  location: string;
  businessName?: string;
  businessDescription?: string;
  operatingHours?: {
    start: string;
    end: string;
    days: string[];
  };
  services?: string[];
  paymentMethods?: string[];
  availability: 'online' | 'away' | 'offline';
  privacySettings: {
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
}

// Mock data - In production, this would come from your Supabase database
const mockUserData: UserProfileData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  dateJoined: "2024-01-15",
  accountType: "vendor",
  profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
  isVerified: true,
  location: "San Francisco, CA",
  businessName: "Fresh Farm Produce",
  businessDescription: "We provide fresh, organic produce directly from our local farm to your table.",
  operatingHours: {
    start: "08:00",
    end: "17:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  services: ["Organic Vegetables", "Fresh Fruits", "Dairy Products", "Farm Tours"],
  paymentMethods: ["Credit Card", "PayPal", "Bank Transfer"],
  availability: "online",
  privacySettings: {
    showEmail: true,
    showPhone: true,
    showLocation: true
  }
};

export function UserProfile() {
  const [userData, setUserData] = useState<UserProfileData>(mockUserData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const user = useAuthStore((state) => state.user);

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-500';
      case 'away':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleContact = () => {
    // TODO: Implement contact functionality
    alert('Contact functionality coming soon!');
  };

  const handlePrivacyUpdate = (settings: typeof userData.privacySettings) => {
    setUserData(prev => ({
      ...prev,
      privacySettings: settings
    }));
    setShowPrivacyModal(false);
  };

  const handleProfileUpdate = (newData: Partial<UserProfileData>) => {
    setUserData(prev => ({
      ...prev,
      ...newData
    }));
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header/Cover Image */}
          <div className="h-48 bg-primary/10"></div>

          {/* Profile Header */}
          <div className="relative px-6 sm:px-8 -mt-16">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative">
                <img
                  src={userData.profilePicture}
                  alt={userData.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {userData.availability && (
                  <div 
                    className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(userData.availability)}`}
                  ></div>
                )}
              </div>
              
              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-heading font-bold text-gray-900">
                    {userData.fullName}
                  </h1>
                  {userData.isVerified && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
                {userData.accountType === 'vendor' && userData.businessName && (
                  <p className="text-lg text-gray-600">{userData.businessName}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {userData.accountType.charAt(0).toUpperCase() + userData.accountType.slice(1)} Account
                </p>
              </div>

              <div className="mt-6 sm:mt-0 flex gap-3">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="btn-secondary flex items-center gap-2"
                >
                  {userData.privacySettings.showEmail ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  Privacy
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Joined {new Date(userData.dateJoined).toLocaleDateString()}</span>
              </div>
              {userData.privacySettings.showLocation && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData.privacySettings.showEmail && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{userData.email}</span>
                </div>
              )}
              {userData.privacySettings.showPhone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{userData.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 sm:p-8 mt-6">
            {userData.accountType === 'vendor' && (
              <>
                {/* Business Information */}
                <section className="mb-8">
                  <h2 className="text-xl font-heading font-semibold mb-4">About Our Business</h2>
                  <p className="text-gray-600">{userData.businessDescription}</p>
                </section>

                {/* Operating Hours */}
                <section className="mb-8">
                  <h2 className="text-xl font-heading font-semibold mb-4">Operating Hours</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>
                      {userData.operatingHours?.start} - {userData.operatingHours?.end}
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    {userData.operatingHours?.days.join(', ')}
                  </div>
                </section>

                {/* Services/Products */}
                <section className="mb-8">
                  <h2 className="text-xl font-heading font-semibold mb-4">Services & Products</h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.services?.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Payment Methods */}
                <section className="mb-8">
                  <h2 className="text-xl font-heading font-semibold mb-4">Payment Methods</h2>
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div className="flex flex-wrap gap-2">
                      {userData.paymentMethods?.map((method, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary text-primary rounded-full text-sm"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Contact Section */}
            <section className="border-t pt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-semibold">Get in Touch</h2>
                <button
                  onClick={handleContact}
                  className="btn-primary flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        userData={userData}
        onSave={handleProfileUpdate}
      />

      {/* Privacy Settings Modal */}
      <PrivacySettingsModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        settings={userData.privacySettings}
        onSave={handlePrivacyUpdate}
      />
    </div>
  );
}
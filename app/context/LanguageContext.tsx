"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ne" | "en";

interface Translations {
  [key: string]: { ne: string; en: string };
}

const translations: Translations = {
  // Navigation
  home: { ne: "गृहपृष्ठ", en: "Home" },
  explore: { ne: "अन्वेषण", en: "Explore" },
  upload: { ne: "अपलोड", en: "Upload" },
  profile: { ne: "प्रोफाइल", en: "Profile" },
  friends: { ne: "साथीहरू", en: "Friends" },
  live: { ne: "लाइभ", en: "Live" },
  messages: { ne: "सन्देश", en: "Messages" },
  notifications: { ne: "सूचनाहरू", en: "Notifications" },
  settings: { ne: "सेटिङ्स", en: "Settings" },

  // Auth
  login: { ne: "लगइन", en: "Login" },
  signup: { ne: "साइन अप", en: "Sign Up" },
  logout: { ne: "लग आउट", en: "Logout" },
  email: { ne: "इमेल", en: "Email" },
  password: { ne: "पासवर्ड", en: "Password" },
  confirmPassword: { ne: "पासवर्ड पुष्टि", en: "Confirm Password" },
  fullName: { ne: "पूरा नाम", en: "Full Name" },
  username: { ne: "प्रयोगकर्ता नाम", en: "Username" },
  forgotPassword: { ne: "पासवर्ड बिर्सनुभयो?", en: "Forgot Password?" },
  noAccount: { ne: "खाता छैन?", en: "Don't have an account?" },
  hasAccount: { ne: "पहिले नै खाता छ?", en: "Already have an account?" },
  orContinueWith: { ne: "वा यसबाट जारी राख्नुहोस्", en: "Or continue with" },
  welcomeBack: { ne: "स्वागत छ!", en: "Welcome back!" },
  createAccount: { ne: "नयाँ खाता बनाउनुहोस्", en: "Create your account" },

  // Profile
  editProfile: { ne: "प्रोफाइल सम्पादन", en: "Edit Profile" },
  videos: { ne: "भिडियो", en: "Videos" },
  liked: { ne: "मन पराएको", en: "Liked" },
  saved: { ne: "सेभ गरिएको", en: "Saved" },
  followers: { ne: "फलोअर्स", en: "Followers" },
  following: { ne: "फलोइङ", en: "Following" },
  likes: { ne: "लाइक्स", en: "Likes" },
  bio: { ne: "परिचय", en: "Bio" },

  // Video Actions
  follow: { ne: "फलो", en: "Follow" },
  followed: { ne: "फलो गरियो", en: "Following" },
  like: { ne: "मन पर्यो", en: "Like" },
  comment: { ne: "टिप्पणी", en: "Comment" },
  share: { ne: "शेयर", en: "Share" },
  save: { ne: "सेभ", en: "Save" },

  // Comments
  comments: { ne: "टिप्पणीहरू", en: "Comments" },
  addComment: { ne: "टिप्पणी थप्नुहोस्...", en: "Add a comment..." },
  reply: { ne: "जवाफ", en: "Reply" },
  viewReplies: { ne: "जवाफहरू हेर्नुहोस्", en: "View replies" },

  // Search
  search: { ne: "खोज्नुहोस्...", en: "Search..." },

  // Explore
  trending: { ne: "ट्रेन्डिङ", en: "Trending" },
  forYou: { ne: "तपाईंको लागि", en: "For You" },
  categories: { ne: "वर्गहरू", en: "Categories" },
  topCreators: { ne: "शीर्ष क्रिएटर्स", en: "Top Creators" },

  // Upload
  uploadVideo: { ne: "भिडियो अपलोड", en: "Upload Video" },
  dragDrop: { ne: "भिडियो यहाँ तान्नुहोस्", en: "Drag & drop video here" },
  selectFile: { ne: "फाइल छान्नुहोस्", en: "Select file" },
  title: { ne: "शीर्षक", en: "Title" },
  description: { ne: "विवरण", en: "Description" },
  tags: { ne: "ट्यागहरू", en: "Tags" },
  music: { ne: "संगीत", en: "Music" },
  location: { ne: "स्थान", en: "Location" },
  publish: { ne: "प्रकाशित गर्नुहोस्", en: "Publish" },

  // Common
  cancel: { ne: "रद्द गर्नुहोस्", en: "Cancel" },
  save2: { ne: "सेभ गर्नुहोस्", en: "Save" },
  delete: { ne: "मेट्नुहोस्", en: "Delete" },
  edit: { ne: "सम्पादन", en: "Edit" },
  loading: { ne: "लोड हुँदैछ...", en: "Loading..." },

  // Messages
  loginSuccess: { ne: "सफलतापूर्वक लगइन भयो!", en: "Successfully logged in!" },
  signupSuccess: {
    ne: "खाता सफलतापूर्वक बनियो!",
    en: "Account created successfully!",
  },
  profileUpdated: { ne: "प्रोफाइल अपडेट भयो!", en: "Profile updated!" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ne");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

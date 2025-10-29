// Lightweight localStorage wrapper and event emitter for user data

export const STORAGE_KEYS = {
  USER_PROFILE: 'userProfile',
  USER_SETTINGS: 'userSettings',
  NOTIFICATIONS: 'appNotifications',
  APPLICATIONS: 'applications',
  CAREER_GOALS: 'careerGoals',
};

type Profile = {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  bio?: string;
};

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) return { name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'Senior Developer' };
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load profile', e);
    return { name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'Senior Developer' };
  }
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  // emit event
  window.dispatchEvent(new CustomEvent('joborbit:profileUpdated', { detail: profile }));
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load settings', e);
    return null;
  }
}

export function saveSettings(settings: any) {
  localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('joborbit:settingsUpdated', { detail: settings }));
}

export function loadNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load notifications', e);
    return [];
  }
}

export function saveNotifications(list: any[]) {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('joborbit:notificationsUpdated', { detail: list }));
}

export function pushNotification(notification: any) {
  const list = loadNotifications();
  list.unshift(notification);
  saveNotifications(list);
}

export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load applications', e);
    return [];
  }
}

export function saveApplications(list: any[]) {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('joborbit:applicationsUpdated', { detail: list }));
}

export function saveApplication(application: any) {
  const list = loadApplications();
  list.unshift(application);
  saveApplications(list);
}

export function loadCareerGoals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CAREER_GOALS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load career goals', e);
    return [];
  }
}

export function saveCareerGoals(list: any[]) {
  localStorage.setItem(STORAGE_KEYS.CAREER_GOALS, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('joborbit:careerGoalsUpdated', { detail: list }));
}

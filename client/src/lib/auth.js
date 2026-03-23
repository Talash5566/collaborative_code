// Store only the non-sensitive user profile
export const getUser = () => {
    if (typeof window === 'undefined') return null;
    const u = localStorage.getItem('cs_user');
    return u ? JSON.parse(u) : null;
  };
  
  export const setUser = (user) => {
    localStorage.setItem('cs_user', JSON.stringify(user));
  };
  
  export const clearUser = () => {
    localStorage.removeItem('cs_user');
  };
  
  // Check if user is "logged in" — cookie is set by server, 
  // but we check our local profile as a quick UI signal
  export const isLoggedIn = () => !!getUser();
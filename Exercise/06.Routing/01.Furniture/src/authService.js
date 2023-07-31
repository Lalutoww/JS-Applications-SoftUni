export const getUserData = () => {
   //Get user obj data from sessionstorage
   if (!sessionStorage.getItem('accessToken')) {
      return null;
   }

   return {
      _id: sessionStorage.getItem('_id'),
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
      accessToken: sessionStorage.getItem('accessToken'),
   };
};

export const setUserData = (data) => {
   //Set user data in sessionstorage
   sessionStorage.setItem('_id', data._id);
   sessionStorage.setItem('email', data.email);
   sessionStorage.setItem('password', data.password);
   sessionStorage.setItem('accessToken', data.accessToken);
};

export const clearUserData = () => {
   //Remove all user data from sessionstorage (use it with logout)
   sessionStorage.removeItem('_id');
   sessionStorage.removeItem('email');
   sessionStorage.removeItem('password');
   sessionStorage.removeItem('accessToken');
};

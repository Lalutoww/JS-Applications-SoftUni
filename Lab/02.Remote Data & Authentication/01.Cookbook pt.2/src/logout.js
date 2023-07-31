export async function logout() {
   const response = await fetch('http://localhost:3030/users/logout', {
      method: 'get',
      headers: {
         'X-Authorization': sessionStorage.getItem('authToken'),
      },
   });
   if (response.status == 200) {
      sessionStorage.removeItem('authToken');
      home();
   } else {
      console.error(await response.json()); 
   }
}

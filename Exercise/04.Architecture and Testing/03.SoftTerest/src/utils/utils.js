const nav = document.querySelector('nav');

export function showSection(section) {
   document.getElementById('root').replaceChildren(section);
}

export function updateNavBar() {
   const user = sessionStorage.getItem('user');
   if (user) {
      nav.querySelectorAll('.guest').forEach((v) => (v.style.display = 'none'));
      nav.querySelectorAll('.user').forEach((v) => (v.style.display = 'block'));
   } else {
      nav.querySelectorAll('.guest').forEach(
         (v) => (v.style.display = 'block')
      );
      nav.querySelectorAll('.user').forEach((v) => (v.style.display = 'none'));
   }
}

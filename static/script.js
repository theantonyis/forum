const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
  document.cookie = 'token=; Max-Age=0';
  location.assign('/login');
});
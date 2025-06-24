import Cookies from 'js-cookie';

export function setToken(token: string) {
  Cookies.set('token', token, { expires: 1 });
}

export function getToken(): string | undefined {
  return Cookies.get('token');
}

export function clearToken() {
  Cookies.remove('token');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
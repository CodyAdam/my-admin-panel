import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
const USER_ID = 'userId';
const IS_LOGGED_IN = 'isLoggedIn';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  public clear(): void {
    localStorage.clear();
  }
  public save(token: string, id: number): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.removeItem(USER_ID);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID, id.toString());
    localStorage.setItem(IS_LOGGED_IN, 'true');
  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }

  public getUserId(): number {
    const id = localStorage.getItem(USER_ID);
    return id === null ? NaN : Number(id);
  }

  public isLogged(): boolean {
    return Boolean(localStorage.getItem(IS_LOGGED_IN));
  }
}

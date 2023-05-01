import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { BasicAuthUser } from '../_helpers/basic-auth-user';

// TODO: remove and replace with another solution
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<BasicAuthUser | null>;
  public user: Observable<BasicAuthUser | null>;

  private authToken: string = 'basic-auth-user';

  constructor(
  ) {
    if (localStorage.getItem(this.authToken))
      this.userSubject = new BehaviorSubject<BasicAuthUser | null>(JSON.parse(localStorage.getItem(this.authToken) as string));
    else 
    this.userSubject = new BehaviorSubject<BasicAuthUser | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): BasicAuthUser {
    return this.userSubject.value as BasicAuthUser;
  }

  login(username: string, password: string) {
    return of({username, password})
    .pipe(map((user: BasicAuthUser) => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.authToken);
    this.userSubject.next(null);
  }
}

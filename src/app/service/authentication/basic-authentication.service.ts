import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  private approle: any | null = null;
  private heartbeatInterval: any = null;

  constructor(private http: HttpClient) { }

  // Check whether user is allowed to log in or if another active session is already running
  canUserLogin(userIdentifier: string): boolean {
    return true; // Concurrent Login restriction disabled
    /*
    if (!userIdentifier) return true;

    const currentTabToken = sessionStorage.getItem('activeSessionToken');
    const activeToken = localStorage.getItem('activeSessionToken_' + userIdentifier);
    const lastPing = Number(localStorage.getItem('activeSessionPing_' + userIdentifier) || 0);

    // If an active session exists and its heartbeat ping was updated within 12 seconds:
    if (activeToken && lastPing > 0 && (Date.now() - lastPing < 12000)) {
      // If this current tab is the active session, allow (e.g. refresh/re-auth)
      if (currentTabToken && currentTabToken === activeToken) {
        return true;
      }
      // Otherwise, another tab/window is already running an active session! Block this login attempt.
      Swal.fire({
        icon: 'warning',
        title: 'Concurrent Login Restricted',
        text: `An active session is already running for account (${userIdentifier}) in another window/tab. Please log out from the active session first.`,
        confirmButtonText: 'OK',
        allowOutsideClick: false
      });
      return false;
    }
    return true;
    */
  }

  executeAuthenticationService(emailid: string, pwd: string) {
    if (!this.canUserLogin(emailid)) {
      return new Observable<any>(subscriber => {
        subscriber.error({ message: 'Concurrent Login Restricted' });
      });
    }

    return this.http.post<any>('https://dpdmis.in/CGMSCHO_API2/api/Login', { emailid, pwd }).pipe(
      map(
        data => {
          const userInfo = data.userInfo;
          const userKey = emailid || userInfo?.userid || userInfo?.firstname;

          // Concurrent login check commented out
          // if (!this.canUserLogin(userKey)) {
          //   throw new Error('Concurrent Login Restricted');
          // }

          sessionStorage.setItem('authenticatedUser', emailid);
          sessionStorage.setItem('firstname', userInfo.firstname);
          sessionStorage.setItem('facilityid', userInfo.facilityid);
          sessionStorage.setItem('roleId', userInfo.roleid);
          sessionStorage.setItem('districtid', userInfo.districtid);
          sessionStorage.setItem('userid', userInfo.userid);

          if (userInfo?.rolename) {
            this.setRole(userInfo.rolename);
          }

          this.registerActiveSession(userKey);
          return data;
        }
      )
    );
  }

  private readonly INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 Minutes Inactivity Limit (CWE-613)

  // Update last activity timestamp on user interaction or login
  updateLastActivityTime() {
    if (this.isUserLogedIn()) {
      sessionStorage.setItem('lastActivityTime', Date.now().toString());
    }
  }

  // Check if session has expired due to 15 minutes of inactivity
  isSessionExpired(): boolean {
    if (!this.isUserLogedIn()) return false;
    const lastActivityStr = sessionStorage.getItem('lastActivityTime');
    if (!lastActivityStr) {
      this.updateLastActivityTime();
      return false;
    }
    const lastActivity = Number(lastActivityStr);
    return Date.now() - lastActivity > this.INACTIVITY_LIMIT_MS;
  }

  // Check and handle session timeout. Returns true if expired and handled.
  checkAndHandleSessionTimeout(): boolean {
    if (this.isUserLogedIn() && this.isSessionExpired()) {
      this.logout();
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Your session has expired due to 15 minutes of inactivity. Please log in again.',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      }).then(() => {
        window.location.href = '/login';
      });
      return true;
    }
    return false;
  }

  // Register single active session for the account and start heartbeat
  registerActiveSession(userIdentifier: string) {
    if (!userIdentifier) return;
    const sessionToken = userIdentifier + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('activeSessionToken', sessionToken);
    sessionStorage.setItem('activeUserKey', userIdentifier);
    this.updateLastActivityTime();

    localStorage.setItem('activeSessionToken_' + userIdentifier, sessionToken);
    localStorage.setItem('activeSessionPing_' + userIdentifier, Date.now().toString());

    this.startSessionHeartbeat(userIdentifier);
  }

  // Heartbeat timer keeps active session timestamp fresh every 4 seconds
  startSessionHeartbeat(userIdentifier: string) {
    this.stopSessionHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.isUserLogedIn()) {
        localStorage.setItem('activeSessionPing_' + userIdentifier, Date.now().toString());
      } else {
        this.stopSessionHeartbeat();
      }
    }, 4000);
  }

  stopSessionHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Validate that current tab is the active session
  isSessionValid(): boolean {
    return true; // Concurrent Login restriction disabled
    /*
    const user = sessionStorage.getItem('activeUserKey') || sessionStorage.getItem('authenticatedUser') || sessionStorage.getItem('userid');
    if (!user) {
      return false;
    }

    const currentToken = sessionStorage.getItem('activeSessionToken');
    const activeToken = localStorage.getItem('activeSessionToken_' + user);

    if (currentToken && activeToken && currentToken !== activeToken) {
      return false;
    }
    return true;
    */
  }

  // Set role information
  setRole(approle: string) {
    this.approle = approle;
    localStorage.setItem('roleName', approle);
  }

  // Retrieve role information
  getRole() {
    return {
      roleName: this.approle ?? localStorage.getItem('roleName')
    };
  }

  isUserLogedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  getUserRole() {
    return sessionStorage.getItem('role');
  }

  logout() {
    const userKey = sessionStorage.getItem('activeUserKey') || sessionStorage.getItem('authenticatedUser') || sessionStorage.getItem('userid');
    this.stopSessionHeartbeat();

    if (userKey) {
      localStorage.removeItem('activeSessionToken_' + userKey);
      localStorage.removeItem('activeSessionPing_' + userKey);
    }
    sessionStorage.clear();
  }
}
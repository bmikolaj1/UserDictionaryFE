import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = "api/users";
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.myAppUrl + this.myApiUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveUsers(users): Observable<User[]> {
    return this.http
      .post<any>(
        this.myAppUrl + this.myApiUrl,
        JSON.stringify(users),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Message: ${error.message}\nError: ${error.error.text}`;
    }
    return throwError(errorMessage);
  }
}

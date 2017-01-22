import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Match } from './match';

@Injectable()
export class MatchService {
  private matchesUrl = 'app/matches';  // URL to web api

  constructor(private http: Http) { }

  getMatches(): Promise<Match[]> {
    return this.http
      .get(this.matchesUrl)
      .toPromise()
      .then(response => response.json().data as Match[])
      .catch(this.handleError);
  }

  getMatch(id: number): Promise<Match> {
    return this.getMatches()
      .then(matches => matches.find(match => match.id === id));
  }

  save(match: Match): Promise<Match> {
    if (match.id) {
      return this.put(match);
    }
    return this.post(match);
  }

  delete(match: Match): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.matchesUrl}/${match.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Match
  private post(match: Match): Promise<Match> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.matchesUrl, JSON.stringify(match), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Match
  private put(match: Match): Promise<Match> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.matchesUrl}/${match.id}`;

    return this.http
      .put(url, JSON.stringify(match), { headers: headers })
      .toPromise()
      .then(() => match)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

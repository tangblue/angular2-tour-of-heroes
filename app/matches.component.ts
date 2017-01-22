import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Match } from './match';
import { MatchService } from './match.service';

@Component({
  moduleId: module.id,
  selector: 'my-matches',
  templateUrl: 'matches.component.html',
  styleUrls: ['matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[];
  selectedMatch: Match;
  addingMatch = false;
  error: any;

  constructor(
    private router: Router,
    private matchService: MatchService) { }

  getMatches(): void {
    this.matchService
      .getMatches()
      .then(matches => this.matches = matches)
      .catch(error => this.error = error);
  }

  addMatch(): void {
    this.addingMatch = true;
    this.selectedMatch = null;
  }

  close(savedMatch: Match): void {
    this.addingMatch = false;
    if (savedMatch) { this.getMatches(); }
  }

  deleteMatch(match: Match, event: any): void {
    event.stopPropagation();
    this.matchService
      .delete(match)
      .then(res => {
        this.matches = this.matches.filter(h => h !== match);
        if (this.selectedMatch === match) { this.selectedMatch = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getMatches();
  }

  onSelect(match: Match): void {
    this.selectedMatch = match;
    this.addingMatch = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedMatch.id]);
  }
}

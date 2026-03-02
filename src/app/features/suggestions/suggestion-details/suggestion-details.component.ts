import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion: Suggestion | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
  const id = Number(this.activatedRoute.snapshot.params['id']);
  
  this.suggestionService.getSuggestionById(id).subscribe((data: any) => {
    // ✅ Le backend retourne {success: true, suggestion: {...}}
    this.suggestion = data.suggestion;
  });
}

  backToList(): void {
    this.router.navigate(['/suggestions']);
  }
}
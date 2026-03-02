import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];
  searchText: string = '';

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    // ✅ Subscribe pour récupérer la liste depuis le backend
    this.suggestionService.getSuggestionsList().subscribe(data => {
      this.suggestions = data;
    });
  }

  likesuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.includes(suggestion)) {
      this.favorites.push(suggestion);
    }
  }

  deleteSuggestion(id: number): void {
    // ✅ Supprimer via le backend puis recharger la liste
    this.suggestionService.deleteSuggestion(id).subscribe(() => {
      this.suggestions = this.suggestions.filter(s => s.id !== id);
    });
  }

  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
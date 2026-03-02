import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {

  // La liste statique des suggestions
  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 0
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: 'Organisation d\'une formation sur la sécurité.',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee',
      nbLikes: 0
    }
  ];

  // Liste des favoris (vide au départ)
  favorites: Suggestion[] = [];

  // Variable pour la barre de recherche
  searchText: string = '';

  // Méthode : incrémenter les likes
  likesuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  // Méthode : ajouter aux favoris
  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.includes(suggestion)) {
      this.favorites.push(suggestion);
    }
  }

  // Méthode : filtrer les suggestions (titre ou catégorie)
  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
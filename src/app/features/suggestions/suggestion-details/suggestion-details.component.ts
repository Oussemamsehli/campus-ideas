import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion: Suggestion | undefined;

  // Liste statique (temporaire, on la déplacera dans un service au Workshop 5)
  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: 'Suggestion pour organiser une journée de team building.', category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', nbLikes: 0 },
    { id: 2, title: 'Améliorer le système de réservation', description: 'Proposition pour améliorer la gestion des réservations.', category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', nbLikes: 0 },
    { id: 3, title: 'Créer un système de récompenses', description: 'Mise en place d\'un programme de récompenses.', category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', nbLikes: 0 },
    { id: 4, title: 'Moderniser l\'interface utilisateur', description: 'Refonte complète de l\'interface utilisateur.', category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', nbLikes: 0 },
    { id: 5, title: 'Formation à la sécurité informatique', description: 'Organisation d\'une formation sur la sécurité.', category: 'Formation', date: new Date('2025-02-05'), status: 'acceptee', nbLikes: 0 }
  ];

  constructor(
    private activatedRoute: ActivatedRoute, // pour lire l'id dans l'URL
    private router: Router                   // pour naviguer
  ) {}

  ngOnInit(): void {
    // 1. Récupérer l'id depuis l'URL
    const id = Number(this.activatedRoute.snapshot.params['id']);
    
    // 2. Chercher la suggestion avec cet id
    this.suggestion = this.suggestions.find(s => s.id === id);
  }

  // Retourner à la liste
  backToList(): void {
    this.router.navigate(['/suggestions']);
  }
}
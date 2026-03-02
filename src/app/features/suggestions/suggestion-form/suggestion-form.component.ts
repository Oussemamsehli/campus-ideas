import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  // Liste des catégories
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  // Création du formulaire
  suggestionForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[A-Z][a-zA-Z ]*$')
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30)
    ]),
    category: new FormControl('', Validators.required),
    date: new FormControl({value: new Date().toISOString().split('T')[0], disabled: true}),
    status: new FormControl({value: 'en attente', disabled: true})
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

 onSubmit(): void {
  if (this.suggestionForm.valid) {
    
    // Créer la nouvelle suggestion
    const newSuggestion: Suggestion = {
      id: Math.floor(Math.random() * 1000),  // id aléatoire
      title: this.suggestionForm.get('title')?.value || '',
      description: this.suggestionForm.get('description')?.value || '',
      category: this.suggestionForm.get('category')?.value || '',
      date: new Date(),
      status: 'en attente',
      nbLikes: 0
    };

    console.log('Nouvelle suggestion:', newSuggestion);
    
    // Redirection vers la liste
    this.router.navigate(['/suggestions']);
  }
}
}
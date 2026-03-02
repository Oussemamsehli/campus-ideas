import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  isEditMode: boolean = false;  // ✅ mode ajout ou modification ?
  suggestionId: number = 0;

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,  // ✅ pour lire l'id dans l'URL
    private suggestionService: SuggestionService
  ) {}
ngOnInit(): void {
  const idParam = this.activatedRoute.snapshot.paramMap.get('id');
  this.suggestionId = Number(idParam);
  console.log('ID récupéré:', this.suggestionId);

  if (this.suggestionId) {
    this.isEditMode = true;
    
    this.suggestionService.getSuggestionById(this.suggestionId).subscribe((data: any) => {
      console.log('Données reçues:', data);
      
      // ✅ Le backend retourne {success: true, suggestion: {...}}
      const s = data.suggestion;
      
      this.suggestionForm.patchValue({
        title: s.title,
        description: s.description,
        category: s.category,
        date: new Date(s.date).toISOString().split('T')[0],
        status: s.status
      });
    });
  }
}

  onSubmit(): void {
    if (this.suggestionForm.valid) {

      const suggestion: Suggestion = {
        id: this.suggestionId || 0,
        title: this.suggestionForm.get('title')?.value || '',
        description: this.suggestionForm.get('description')?.value || '',
        category: this.suggestionForm.get('category')?.value || '',
        date: new Date(),
        status: 'en attente',
        nbLikes: 0
      };

      if (this.isEditMode) {
        // ✅ Mode modification → PUT
        this.suggestionService.updateSuggestion(suggestion).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      } else {
        // ✅ Mode ajout → POST
        this.suggestionService.addSuggestion(suggestion).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      }
    }
  }
}
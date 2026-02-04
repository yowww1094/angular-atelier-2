import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { User } from '../user.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.inactive]="!user().isActive">
      <h3>{{ user().name }}</h3>
      <p>Rôle : {{ user().role }}</p>
      <div class="actions">
        <button (click)="onToggle.emit(user().id)">
          {{ user().isActive ? 'Désactiver' : 'Activer' }}
        </button>
        <button class="delete" (click)="onDelete.emit(user().id)">
          Supprimer
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 10px;
      }
      .inactive {
        opacity: 0.6;
        background: #f9f9f9;
      }
      .actions {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }
      .delete {
        background: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
      }
    `
  ]
})
export class UserCardComponent {
  // 2. Signal Input (NOUVEAU)
  // Remplace @Input() user!: User;
  // Correspond à ton image "Signal Inputs"
  user = input.required<User>();

  // 3. Modern Output (NOUVEAU)
  // Remplace @Output() onDelete = new EventEmitter<number>();
  // Correspond à ton image "Modern Outputs"
  onDelete = output<number>();
  onToggle = output<number>();
}

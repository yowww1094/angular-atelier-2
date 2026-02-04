import { Component, computed, effect, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCardComponent],
  template: `
    <div style="padding: 20px;">
      <h1>Tableau de Bord Admin</h1>
      <div class="stats">
        <p>
          Utilisateurs Actifs : <strong>{{ activeCount() }}</strong>
        </p>
      </div>
      <hr />
      @for (u of userService.users(); track u.id) {
        <app-user-card
          [user]="u"
          (onToggle)="userService.toggleStatus($event)"
          (onDelete)="userService.deleteUser($event)"
        />
      } @empty {
        <p>Aucun utilisateur trouvé.</p>
      }
    </div>
  `
})
export class AppComponent {
  // Injection du Service (Architecture moderne)
  userService = inject(UserService);

  // 4. Computed Signal
  // Se met à jour AUTOMATIQUEMENT si la liste users change ou si un status change
  // Correspond à ton image "Computed Signals"
  activeCount = computed(() => {
    return this.userService.users().filter(u => u.isActive).length;
  });

  constructor() {
    // 5. Effect
    // Sert uniquement aux logs ou appels API, jamais pour modifier la donnée
    // Correspond à ton image "Effects"
    effect(() => {
      console.log(`[LOG] Le nombre d'actifs a changé : ${this.activeCount()}`);
    });
  }
}

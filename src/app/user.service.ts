import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  role: 'Admin' | 'User';
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 1. Writable Signal : La source de vérité
  // Correspond à ton image "Writable Signals"
  users = signal<User[]>([
    { id: 1, name: 'Amine', role: 'Admin', isActive: true },
    { id: 2, name: 'Sarah', role: 'User', isActive: true },
    { id: 3, name: 'Kamal', role: 'User', isActive: false }
  ]);

  // Modification via .update()
  toggleStatus(id: number) {
    this.users.update(listeActuelle =>
      listeActuelle.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u)
    );
  }

  // Suppression via .update() (filtrage)
  deleteUser(id: number) {
    this.users.update(liste => liste.filter(u => u.id !== id));
  }
}

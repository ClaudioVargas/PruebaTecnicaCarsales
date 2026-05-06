import { Routes } from '@angular/router';
import { Episodios } from './components/episodios/episodios';
import { Personajes } from './components/personajes/personajes';

export const routes: Routes = [
    {
    path: '',
    component: Episodios,
    },
    {
        path: 'personajes',
        loadComponent: () => import('../app/components/personajes/personajes').then(m => m.Personajes)
    },
    { path: '**', component: Episodios } 
];

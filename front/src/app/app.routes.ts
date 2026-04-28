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
        component: Personajes,
    },    
    {
        path: 'episodios',
        component: Episodios,
    },    
    {
        path: 'detalle',
        component: Episodios,
    }
];

import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {Game} from '../../models/game';
import {GamesService} from '../../services/games.service';

@Component({
    selector: 'gamelist',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/games/list.html'
})
@NeedsAuthentication()
export class GameList implements OnInit {
    public games: Game[];

    constructor(private _gamesService: GamesService, 
                private _router: Router) {
    }

    ngOnInit() {
        this._gamesService.getAll()
            .subscribe(
                (games)=> this.games = games,
                (err) => console.error('Error while fetching game data')
            );
    }
    
    public openGameDetails(game: Game): void {
        this._router.navigate(['GameDetails', { id: game.id }]);
    }

    public openCreateGame():void{
        this._router.navigate(['CreateGame']);
    }
}
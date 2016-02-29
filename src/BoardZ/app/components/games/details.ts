import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {Game} from '../../models/game';
import {GamesService} from '../../services/games.service';

@Component({
    selector: 'gameDetail',
    templateUrl: 'app/components/games/details.html',
    inputs: ['game']
})
@NeedsAuthentication()
export class GameDetails implements OnInit {
    private _needsReset: boolean;

    public active = true;
    public model: Game = new Game();
    public originalModel: Game = new Game();

    constructor(private _gameService: GamesService,
                private _router: Router,
                private _routeParams: RouteParams) {
    }

    ngOnInit(): void {
        let id = this._routeParams.get('id');

        if (!id) {
            this.originalModel = this._gameService.deepClone(this.model = new Game());
            return;
        }
        this.loadGame(id);
    }

    private loadGame(id: string): void {
        this._gameService.getById(id)
            .subscribe(
                (game) => {
                    this.originalModel = this._gameService.deepClone(this.model = game);
                    if (this._needsReset) this.reset();
                },
                (error) => {
                    console.log('Could not find game. Error was: ' + error);
                }
            );
    }

    public abort(): void {
        this._router.navigate(['GameList']);
    }

    public reset(): void {
        this._needsReset = false;

        // Based on: https://angular.io/docs/ts/latest/guide/forms.html
        this.model = this._gameService.deepClone(this.originalModel);

        // workaround to re-initialize the actual form controls states
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    public saveChanges(): void {
        if (this.model.id === null) {
            this._gameService.addGame(this.model)
                .subscribe(
                    (newId) => {
                        this._needsReset = true;
                        this.loadGame(newId);
                    },
                    ()=> console.error('Could not save new game.')
                );
        } else {
            this._gameService.updateGame(this.model)
                .subscribe((oldId) => {
                        this._needsReset = true;
                        this.loadGame(oldId);
                    },
                    () => {
                        console.error('Could not update game data.')
                    }
                );
        }
    }

    public deleteGame(): void {
        if (window.confirm('Really delete the game "' + this.originalModel.name + '" ?')) {
            this._gameService.deleteGame(this.originalModel.id)
                .subscribe(
                    () => {
                        this.abort();
                    },
                    () => console.error('Could not delete game data.')
                );
        }
    }
}

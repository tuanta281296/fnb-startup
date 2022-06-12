// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, withLatestFrom, filter } from 'rxjs/operators';
import { Observable, defer, of, forkJoin, BehaviorSubject } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
// CRUD
import { QueryResultsModel, QueryParamsModel } from '../../_base/crud';
// Services
import { AuthService } from '../../../core/auth/_services';
// State
import { AppState } from '../../../core/reducers';

import { allBranchesLoaded } from '../_selectors/branch.selectors';

import {
    BranchActionTypes,
    BranchCreated,
    BranchUpdated,
    BranchDeleted,
    AllBranchesRequested,
    AllBranchesLoaded,
    BranchesActionToggleLoading,
    BranchesPageRequested,
    BranchesPageLoaded,
    BranchesPageToggleLoading
} from '../_actions/branch.action';
import { Branch } from '../_models/branch.model';
import applyChanges from 'devextreme/data/apply_changes';

@Injectable()
export class BranchEffects {
    showActionLoadingDistpatcher = new BranchesActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new BranchesActionToggleLoading({ isLoading: false });

    showPageLoadingDistpatcher = new BranchesPageToggleLoading({ isLoading: true });
    hidePageLoadingDistpatcher = new BranchesPageToggleLoading({ isLoading: false });

    @Effect()
    loadAllBranches$ = this.actions$
        .pipe(
            ofType<AllBranchesRequested>(BranchActionTypes.AllBranchesRequested),
            withLatestFrom(this.store.pipe(select(allBranchesLoaded))),
            filter(([action, isAllBranchesLoaded]) => !isAllBranchesLoaded),
            mergeMap(() => this.auth.getAllBranch()),
            map(branches => {
                return new AllBranchesLoaded({branches});
            })
          );

    @Effect()
    loadRolesPage$ = this.actions$
        .pipe(
            ofType<BranchesPageRequested>(BranchActionTypes.BranchesPageRequested),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.auth.findBranches(payload.page);
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
            }),
            map(response => {
                const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                this.store.dispatch(this.hidePageLoadingDistpatcher);

                return new BranchesPageLoaded({
                    roles: result.items,
                    totalCount: result.totalCount,
                    page: lastQuery
                });
            }),
        );

    @Effect()
    updateBranch$ = this.actions$
        .pipe(
            ofType<BranchUpdated>(BranchActionTypes.BranchUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.updateBranch(payload.branch).toPromise();
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    createBranch$ = this.actions$
        .pipe(
            ofType<BranchCreated>(BranchActionTypes.BranchCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.createBranch(payload.branch).toPromise();
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteBranch$ = this.actions$
        .pipe(
            ofType<BranchDeleted>(BranchActionTypes.BranchDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.auth.deleteBranch(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) { }
}
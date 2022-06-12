import { Branch } from './../_models/branch.model';

// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { BranchState } from '../_reducers/branch.reducers';
import * as fromBranch from '../_reducers/branch.reducers';
import { each } from 'lodash';

export const selectBranchState = createFeatureSelector<BranchState>('branch');

export const selectBranchById = (roleId: number) => createSelector(
    selectBranchState,
    rolesState => rolesState.entities[roleId]
);

export const selectAllBranch = createSelector(
    selectBranchState,
    fromBranch.selectAll
);

export const selectAllBranchesIds = createSelector(
    selectBranchState,
    fromBranch.selectIds
);

export const allBranchesLoaded = createSelector(
    selectBranchState,
    BranchState => BranchState.isAllBranchesLoaded
);


export const selectBranchesPageLoading = createSelector(
    selectBranchState,
    BranchState => BranchState.listLoading
);

export const selectBranchesActionLoading = createSelector(
    selectBranchState,
    BranchState => BranchState.actionsloading
);

export const selectLastCreatedBrancheId = createSelector(
    selectBranchState,
    BranchState => BranchState.lastCreatedBranchId
);

export const selectBranchesShowInitWaitingMessage = createSelector(
    selectBranchState,
    BranchState => BranchState.showInitWaitingMessage
);


export const selectBranchQueryResult = createSelector(
    selectBranchState,
    BranchState => {
        const items: Branch[] = [];
        each(BranchState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: Branch[] = httpExtension.sortArray(items, BranchState.lastQuery.sortField, BranchState.lastQuery.sortOrder);

        return new QueryResultsModel(BranchState.queryResult, BranchState.queryRowsCount);
    }
);
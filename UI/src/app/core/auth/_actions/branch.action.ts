// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { Branch } from '../_models/branch.model';

export enum BranchActionTypes {
    BranchOnServerCreated = '[Edit Branch Dialog] Branch On Server Created',
    BranchCreated = '[Edit Branchs Dialog] Branchs Created',
    BranchUpdated = '[Edit Branch Dialog] Branch Updated',
    BranchDeleted = '[Branchs List Page] Branch Deleted',
    BranchesActionToggleLoading = '[Branchs] Branchses Action Toggle Loading',
    AllBranchesRequested = '[Branches Home Page] All Branches Requested',
    AllBrancesLoaded = '[Branches API] All Branches Loaded',
    BranchesPageRequested = '[Branches List Page] Branches Branch Requested',
    BranchesPageLoaded = '[Branches API] Branches Page Loaded',
    BranchesPageToggleLoading = '[Branches page] Branches Page Toggle Loading',
}

export class AllBranchesRequested implements Action {
    readonly type = BranchActionTypes.AllBranchesRequested;
}

export class BranchCreated implements Action {
    readonly type = BranchActionTypes.BranchCreated;
    constructor(public payload: { branch: Branch }) { }
}

export class BranchUpdated implements Action {
    readonly type = BranchActionTypes.BranchUpdated;
    constructor(public payload: {
        partialbranch: Update<Branch>,
        branch: Branch
    }) { }
}

export class BranchDeleted implements Action {
    readonly type = BranchActionTypes.BranchDeleted;
    constructor(public payload: { id: number }) {}
}


export class AllBranchesLoaded implements Action {
    readonly type = BranchActionTypes.AllBrancesLoaded;
    constructor(public payload: { branches: Branch[] }) { }
}

export class BranchesPageRequested implements Action {
    readonly type = BranchActionTypes.BranchesPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class BranchesPageLoaded implements Action {
    readonly type = BranchActionTypes.BranchesPageLoaded;
    constructor(public payload: { roles: Branch[], totalCount: number, page: QueryParamsModel }) { }
}

export class BranchesPageToggleLoading implements Action {
    readonly type = BranchActionTypes.BranchesPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class BranchesActionToggleLoading implements Action {
    readonly type = BranchActionTypes.BranchesActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type BranchActions = BranchCreated
| BranchUpdated
| BranchDeleted
| AllBranchesRequested
| AllBranchesLoaded
| BranchesPageRequested
| BranchesPageLoaded
| BranchesPageToggleLoading
| BranchesActionToggleLoading
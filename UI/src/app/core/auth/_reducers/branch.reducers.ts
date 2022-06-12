// NGRX
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// Actions
import { BranchActions, BranchActionTypes } from '../_actions/branch.action';
// Models
import { Branch } from '../_models/branch.model';
import { QueryParamsModel } from '../../_base/crud';

export interface BranchState extends EntityState<Branch> {
    isAllBranchesLoaded: boolean;
    queryRowsCount: number;
    queryResult: Branch[];
    lastCreatedBranchId: number;
    listLoading: boolean;
    actionsloading: boolean;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<Branch> = createEntityAdapter<Branch>();

export const initialBranchState: BranchState = adapter.getInitialState({
    isAllBranchesLoaded: false,
    queryRowsCount: 0,
    queryResult: [],
    lastCreatedBranchId: undefined,
    listLoading: false,
    actionsloading: false,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function branchesReducer(state = initialBranchState, action: BranchActions): BranchState {
    switch  (action.type) {
        case BranchActionTypes.BranchesPageToggleLoading: return {
            ...state, listLoading: action.payload.isLoading, lastCreatedBranchId: undefined
        };
        case BranchActionTypes.BranchesActionToggleLoading: return {
            ...state, actionsloading: action.payload.isLoading
        };
        case BranchActionTypes.BranchCreated: return adapter.addOne(action.payload.branch, {
            ...state, lastCreatedBranchId: action.payload.branch.id
        });
        case BranchActionTypes.BranchUpdated: return adapter.updateOne(action.payload.partialbranch, state);
        case BranchActionTypes.BranchDeleted: return adapter.removeOne(action.payload.id, state);
        case BranchActionTypes.AllBrancesLoaded: return adapter.addAll(action.payload.branches, {
            ...state, isAllRolesLoaded: true
        });
        case BranchActionTypes.BranchesPageLoaded: return adapter.addMany(action.payload.roles, {
            ...initialBranchState,
            listLoading: false,
            queryRowsCount: action.payload.totalCount,
            queryResult: action.payload.roles,
            lastQuery: action.payload.page,
            showInitWaitingMessage: false
        });
        default: return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();

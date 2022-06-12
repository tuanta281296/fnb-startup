// RxJS
import { of } from 'rxjs';
import { catchError, finalize, tap, debounceTime, delay, distinctUntilChanged, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../../core/reducers';
// Selectirs
import { selectBranchQueryResult, selectBranchesPageLoading, selectBranchesShowInitWaitingMessage } from '../_selectors/branch.selectors';

export class BranchesDataSource extends BaseDataSource {

	constructor(private store: Store<AppState>,
		private index: number = 0) {
		super();

		this.loading$ = this.store.pipe(
			select(selectBranchesPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectBranchesShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectBranchQueryResult)
		)
		.subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});

	}
}

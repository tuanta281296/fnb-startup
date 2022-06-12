import { Component, OnInit, ViewChild } from '@angular/core';
// UI
import { SubheaderService } from '../../../../../app/core/_base/layout';
import notify from "devextreme/ui/notify";
import { AuthServiceApp, Change } from '../../service.auth';
import { District, Branch, City, BranchUpdated, BranchCreated, BranchDeleted, BranchesDataSource, BranchesPageRequested } from '../../../../core/auth';
import { BehaviorSubject, Observable, of, pipe, Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { delay, distinctUntilChanged, mergeMap, skip, take, takeUntil } from 'rxjs/operators';
import applyChanges from 'devextreme/data/apply_changes';
import { DxDataGridComponent } from 'devextreme-angular';
import DxDataGrid from 'devextreme/ui/data_grid';
import { async } from '@angular/core/testing';
import { UpdateNum } from '@ngrx/entity/src/models';
import { QueryParamsModel } from '../../../../core/_base/crud';
@Component({
  selector: 'kt-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  @ViewChild("gridContainer", { static: false }) dataGrid: DxDataGridComponent;

  dataSource: Observable<any[]>;
  branches: Branch[];
  districs: District[];
  cities: Observable<any[]>;
  getFilterCities: any;
  readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];
  readonly allowedPageSizes = [5, 10, 'all'];
  showPageSizeSelector = true;
  showNavButtons = true;
  showInfo = true;
  editRowKey?: number = null;
  loadPanelPosition = { of: '#gridContainer' };
  changes: Change<any>[] = [];
  isLoading = false;
  branchSubscription: Subscription;
  grid: any;
  constructor(
    private subheaderService: SubheaderService,
    private auth: AuthServiceApp,
    private store: Store<AppState>) { 
    }

  ngOnInit() {
    this.subheaderService.setTitle('Branches');

    this.isLoading = true;
    this.dataSource = new BranchesDataSource(this.store).entitySubject;
    this.branchSubscription = this.dataSource.pipe(
			skip(1),
			distinctUntilChanged()
		).subscribe(res => {
			this.branches = res;
		});

    of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadBranchesList();
		});


    this.cities = this.auth.getDataSelect(City, 'api/masterdata/cities')
    this.auth.getDataSelect(District, 'api/masterdata/districts').subscribe(res => {
      this.districs = res;
    });

    this.getFilterCities = this.getFilteredDistrict.bind(this);
  }

  loadBranchesList() {
		const queryParams = new QueryParamsModel(
      null
		);
		// Call request from server
		this.store.dispatch(new BranchesPageRequested({ page: queryParams }));
    of(undefined).subscribe(() => {
      this.isLoading = false;
      this.editRowKey = null;
      this.changes = [];
    });
    this.dataSource.subscribe(res => {
      this.branches = res;
    });
	}

  ngOnDestroy() {
    this.branchSubscription.unsubscribe();
  }

  getFilteredDistrict(options:any) {
    return {
      store: this.districs,
      filter: options.data ? ['cityId', '=', options.data.city] : null,
    };
  }

  onEditorPreparing(e:any) {
    if (e.parentType === 'dataRow' && e.dataField === 'CityID') {
      e.editorOptions.disabled = (typeof e.row.data.Disctrict !== 'number');
    }
  }

  setStateValue(rowData: any, value: any): void {
    rowData.disctrict = null;
    (<any> this).defaultSetCellValue(rowData, value);
  }


  onSaving(e: any) {
    const change = e.changes[0];

    if (change) {
      e.cancel = true;
      e.promise = this.processSaving(change);
    }
  }

  async processSaving(change: Change<Branch>) {
    var _branch = new Branch();
    this.isLoading = true;
    const updateBranches: UpdateNum<Branch> = {
        id: change.key,
        changes: change.data
		  };
    if(change.type == "update" || change.type == "remove") {
      _branch = this.branches.filter(p => p.id == updateBranches.id)[0];
    }
    else{
      _branch.id = 0;
    }

    _branch = Object.assign({}, _branch, updateBranches.changes);


    this.processSaveChange(change, _branch, updateBranches);

  }

  processSaveChange(change: Change<Branch>, _branch: Branch, updateBranches: UpdateNum<Branch>){
    switch(change.type) {
      case "update":
        this.updateBranch(_branch, updateBranches)
        break;
      case "insert":
        this.createBranch(_branch);
        break;
      default:
        this.deleteBranch(updateBranches.id);
    }
  }

  updateBranch(_branch: Branch, updateBranches: Update<Branch>){
    this.store.dispatch(new BranchUpdated({
      partialbranch: updateBranches,
      branch: _branch
    }));
    of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadBranchesList();
		});
  }

  createBranch(_branch: Branch){
    this.store.dispatch(new BranchCreated({
      branch: _branch
    }));
    of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadBranchesList();
		});
  }

  deleteBranch(branchId: number){
    this.store.dispatch(new BranchDeleted({ id: branchId}));
    of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadBranchesList();
		});
  }
}

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PartialsModule } from "../../partials/partials.module";
import { BranchListComponent } from "./branch-list/branch-list.component";
import { BranchComponent } from "./branch.component";
import { DxButtonModule, DxTreeMapModule, DxDataGridModule, DxListModule, DxTextBoxModule, DxLoadPanelModule } from 'devextreme-angular';

const routes: Routes = [
    {
        path: '',
        component: BranchComponent,
        children: [
            {
				path: '',
				redirectTo: 'branch',
				pathMatch: 'full'
			},
			{
				path: 'branches-list',
				component: BranchListComponent
			}
        ]
    }
]

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		PartialsModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		DxDataGridModule,
		DxButtonModule,
		DxTreeMapModule,
		DxListModule,
		DxTextBoxModule,
		DxLoadPanelModule
	],
	providers: [
	],
	entryComponents: [
	],
	declarations: [
        BranchListComponent,
        BranchComponent
	]
})

export class BranchManagementModule {}
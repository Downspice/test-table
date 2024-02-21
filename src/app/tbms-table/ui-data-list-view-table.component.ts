/* eslint-disable @angular-eslint/no-input-rename */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  input,
  signal,
} from '@angular/core';
import {
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiFormatNumberPipeModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TuiSvgModule } from '@taiga-ui/core';
import { NgIf } from '@angular/common';

import { TuiLetModule } from '@taiga-ui/cdk';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import {
  CrudActionModel,
  CrudActionType,
  PaginationQueryParamModel,
} from '../app.type';
import { arrayToObject } from '../app.util';

@Component({
  selector: 'app-tbms-data-list-view-table',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiTableModule,
    TuiFormatNumberPipeModule,
    TuiSvgModule,
    TuiTablePaginationModule,
    NgIf,
    TuiLetModule,
    TuiLoaderModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ui-data-list-view-table.component.html',
  styleUrl: './ui-data-list-view-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDataListViewTableComponent<T> {
  addActionButton = false;
  editActionButton = false;
  deleteActionButton = false;

  searchFormCtrl = new FormControl('');

  sortDir$ = new ReplaySubject<1 | -1>(1);
  sortBy$ = new ReplaySubject<keyof T>(1);

  sortData = input({ direction: 1 as -1 | 1, name: null });

  protected columns: string[] = [];
  protected keyColumns: string[] = [];

  protected data = signal<T[] | undefined>(undefined);
  protected paginatedMeta = signal<Partial<any>>({});
  protected showFooter = signal(false);
  protected hasIndex = signal(false);
  protected hasActions = signal(false);

  @Input() heading!: string;
  @Input() loading = false;

  @Input() columnHeaders: string[] = [];
  @Input() addButtonLabel = 'Add New';
  @Input() addIcon = 'tuiIconPlus';
  @Input() editIcon = 'tuiIconEdit2';
  @Input() deleteIcon = 'tuiIconTrash2';
  @Input() canSearch = false;

  @Input({ alias: 'columns', required: true }) set _columns(value: string[]) {
    this.keyColumns = value.filter((x) => {
      if (x === 'index') this.hasIndex.set(true);
      if (x === 'actions') this.hasActions.set(true);
      return x !== 'index' && x !== 'actions';
    });
    this.columns = value;
  }

  @Input() set paginationData(
    value:
      | (any & {
          pages: Record<number, number[]>;
        })
      | undefined
  ) {
    if (!value?.total) return;
    this.paginatedMeta.set(value);
    this.showFooter.set(true);
  }
  @Input() set actions(value: CrudActionType[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valObj = arrayToObject(value as any, '');
    this.addActionButton = !!valObj?.['add'];
    this.editActionButton = !!valObj?.['edit'];
    this.deleteActionButton = !!valObj?.['delete'];
  }

  @Input({ alias: 'data', required: true }) set _data(value: T[] | undefined) {
    this.data.set(value);
  }

  @Output() editDelete = new EventEmitter<CrudActionModel<T>>();
  @Output() add = new EventEmitter<CrudActionModel<T>>();
  @Output() paginationChange = new EventEmitter<PaginationQueryParamModel>();
  @Output() searchChange = this.searchFormCtrl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );
  @Output() sortChange = combineLatest([this.sortBy$, this.sortDir$]) 

  handelPaginationChange(val: PaginationQueryParamModel) {
    this.paginationChange.next(val);
  }
}

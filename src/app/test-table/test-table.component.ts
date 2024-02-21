import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiComparator, TuiReorderModule, TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    tuiControlValue,
    TuiDay,
    tuiDefaultSort,
    tuiIsFalsy,
    tuiIsPresent,
    TuiLetModule,
    tuiToInt,
} from '@taiga-ui/cdk';
import { TuiButtonModule, TuiHostedDropdownModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {TUI_ARROW, TuiInputModule} from '@taiga-ui/kit';
import {BehaviorSubject, combineLatest, Observable, timer} from 'rxjs';
import {debounceTime, filter, map, share, startWith, switchMap} from 'rxjs/operators';
 
interface User {
    readonly dob: TuiDay;
    readonly name: string;
}
 
const TODAY = TuiDay.currentLocal();
 
const FIRST = [
    'John',
    'Jane',
    'Jack',
    'Jill',
    'James',
    'Joan',
    'Jim',
    'Julia',
    'Joe',
    'Julia',
];
 
const LAST = [
    'Smith',
    'West',
    'Brown',
    'Jones',
    'Davis',
    'Miller',
    'Johnson',
    'Jackson',
    'Williams',
    'Wilson',
];
 
type Key = 'age' | 'dob' | 'name';
 
const DATA: readonly User[] = Array.from({length: 300}, () => ({
    name: `${LAST[Math.floor(Math.random() * 10)]}, ${
        FIRST[Math.floor(Math.random() * 10)]
    }`,
    dob: TODAY.append({day: -Math.floor(Math.random() * 4000) - 7500}),
}));
 
const KEYS: Record<string, Key> = {
    Name: 'name',
    Age: 'age',
    'Date of Birth': 'dob',
};
 
function sortBy(key: 'age' | 'dob' | 'name', direction: -1 | 1): TuiComparator<User> {
    return (a, b) =>
        key === 'age'
            ? direction * tuiDefaultSort(getAge(a), getAge(b))
            : direction * tuiDefaultSort(a[key], b[key]);
}
 
function getAge({dob}: User): number {
    const years = TODAY.year - dob.year;
    const months = TODAY.month - dob.month;
    const days = TODAY.day - dob.day;
    const offset = tuiToInt(months > 0 || (!months && days > 9));
 
    return years + offset;
}

@Component({
  selector: 'app-test-table',
  standalone: true,
  imports: [
    TuiTableModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    FormsModule,
    ReactiveFormsModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiReorderModule,
    TuiLoaderModule,
    TuiTablePaginationModule,
    AsyncPipe,
    NgFor,
    NgIf,
    TuiLetModule
  ],
  template: `<p
  tuiTextfieldSize="m"
  class="filters"
>
  <tui-input
      class="input"
      [tuiTextfieldCleaner]="true"
      [(ngModel)]="search"
  >
      Find on page
  </tui-input>
  <tui-input-count
      class="tui-space_horizontal-3"
      [formControl]="minAge"
  >
      Minimum age
  </tui-input-count>
  <tui-hosted-dropdown [content]="dropdown">
      <button
          size="m"
          tuiButton
          type="button"
          [iconRight]="arrow"
      >
          Columns
      </button>
      <ng-template #dropdown>
          <tui-reorder
              class="columns"
              [enabled]="enabled"
              [(items)]="initial"
              (enabledChange)="onEnabled($event)"
          ></tui-reorder>
      </ng-template>
  </tui-hosted-dropdown>
</p>
<tui-loader
  [overlay]="true"
  [showLoader]="!!(loading$ | async)"
>
  <table
      *ngIf="data$ | async as data"
      tuiTable
      class="table"
      [columns]="columns"
      [direction]="(direction$ | async) || 1"
      [tuiSortBy]="sorter$ | async"
      (directionChange)="direction$.next($event)"
      (tuiSortByChange)="sorter$.next($any($event!))"
  >
      <thead>
          <tr tuiThGroup>
              <th
                  *tuiHead="'name'"
                  tuiSortable
                  tuiTh
              >
                  Name
              </th>
              <th
                  *tuiHead="'dob'"
                  tuiSortable
                  tuiTh
              >
                  Date of Birth
              </th>
              <th
                  *tuiHead="'age'"
                  tuiSortable
                  tuiTh
              >
                  Age
              </th>
          </tr>
      </thead>
      <tbody
          *tuiLet="data | tuiTableSort as sortedData"
          tuiTbody
          [data]="sortedData"
      >
          <tr
              *ngFor="let item of sortedData"
              tuiTr
          >
              <td
                  *tuiCell="'name'"
                  tuiTd
                  [class.match]="isMatch(item.name)"
              >
                  {{ item.name }}
              </td>
              <td
                  *tuiCell="'dob'"
                  tuiTd
                  [class.match]="isMatch(item.dob)"
              >
                  {{ item.dob }}
              </td>
              <td
                  *tuiCell="'age'"
                  tuiTd
                  [class.match]="isMatch(getAge(item))"
              >
                  {{ getAge(item) }}
              </td>
          </tr>
      </tbody>
      <tfoot>
          <tr>
              <td [colSpan]="columns.length">
                  <tui-table-pagination
                      class="tui-space_top-2"
                      [total]="(total$ | async) || 0"
                      (pageChange)="onPage($event)"
                      (sizeChange)="onSize($event)"
                  ></tui-table-pagination>
              </td>
          </tr>
      </tfoot>
  </table>
</tui-loader>
`,
  styleUrls: ['./test-table.component.scss']
,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTableComponent { 

  private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);
 
    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('name');
 
    readonly minAge = new FormControl(21);
 
    readonly request$ = combineLatest([
        this.sorter$,
        this.direction$,
        this.page$,
        this.size$,
        tuiControlValue<number>(this.minAge),
    ]).pipe(
        // zero time debounce for a case when both key and direction change
        debounceTime(0),
        switchMap(query => this.getData(...query).pipe(startWith(null))),
        share(),
    );
 
    initial: readonly string[] = ['Name', 'Date of Birth', 'Age'];
 
    enabled = this.initial;
 
    columns = ['name', 'dob', 'age'];
 
    search = '';
 
    readonly arrow = TUI_ARROW;
 
    readonly loading$ = this.request$.pipe(map(tuiIsFalsy));
 
    readonly total$ = this.request$.pipe(
        filter(tuiIsPresent),
        map(({length}) => length),
        startWith(1),
    );
 
    readonly data$: Observable<readonly User[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map(users => users.filter(tuiIsPresent)),
        startWith([]),
    );
 
    readonly getAge = getAge;
 
    onEnabled(enabled: readonly string[]): void {
        this.enabled = enabled;
        this.columns = this.initial
            .filter(column => enabled.includes(column))
            .map(column => KEYS[column]);
    }
 
    onDirection(direction: -1 | 1): void {
        this.direction$.next(direction);
    }
 
    onSize(size: number): void {
        this.size$.next(size);
    }
 
    onPage(page: number): void {
        this.page$.next(page);
    }
 
    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }
 
    private getData(
        key: 'age' | 'dob' | 'name',
        direction: -1 | 1,
        page: number,
        size: number,
        minAge: number,
    ): Observable<ReadonlyArray<User | null>> {
        console.info('Making a request');
 
        const start = page * size;
        const end = start + size;
        const result = [...DATA]
            .sort(sortBy(key, direction))
            .filter(user => getAge(user) >= minAge)
            .map((user, index) => (index >= start && index < end ? user : null));
 
        // Imitating server response
        return timer(3000).pipe(map(() => result));
    }
}

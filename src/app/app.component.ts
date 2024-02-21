import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestTableComponent } from './test-table/test-table.component';
import { UiDataListViewTableComponent } from './tbms-table/ui-data-list-view-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UiDataListViewTableComponent],
  template: `
    <app-tbms-data-list-view-table
      class="pt-5"
      [data]="data"
      [columnHeaders]="['Name', 'Description', 'Enabled', '']"
      [columns]="['name', 'description', 'isEnabled', 'actions']"
      [actions]="['add', 'edit', 'delete']"
      [loading]="false"
      (sortChange)="sortChange($event)"
    />
  `,
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  title = 'test';
  data = [
    {
      id: 'a6598012-cf7b-4cdf-b838-024ea1fcaebb',
      name: 'Gel Cell Batteries',
      description:
        'Gel cell batteries are another sealed lead-acid type, but they use a gelified electrolyte.',
      isEnabled: true,
      updatedBy: '17f8c31b-a7bb-4df5-b318-b18897370f14',
      updatedAt: '2024-02-12T13:03:05.439827Z',
      createdBy: '17f8c31b-a7bb-4df5-b318-b18897370f14',
      createdAt: '2024-01-11T15:51:21.288995Z',
    },
    {
      id: '4c174bb3-56d4-4aa3-9321-b99272f8b83d',
      name: 'Dual-Purpose Batteries',
      description:
        'Dual-purpose batteries are designed to handle both starting and deep cycle applications.',
      isEnabled: false,
      updatedBy: '17f8c31b-a7bb-4df5-b318-b18897370f14',
      updatedAt: '2024-02-11T19:28:35.348366Z',
      createdBy: '17f8c31b-a7bb-4df5-b318-b18897370f14',
      createdAt: '2024-01-11T15:48:19.716462Z',
    },
    {
      id: 'c85a3cbe-320d-4a97-bec1-48c0e14c5ef7',
      name: 'Deep Cycle Batteries',
      description: ' Deep cycle batteries are designed to provide a steady',
      isEnabled: false,
      updatedBy: '17f8c31b-a7bb-4df5-b318-b18897370f14',
      updatedAt: '2024-02-20T16:18:10.44005Z',
      createdBy: 'b22fc290-2d37-47a0-ab95-4f9ab1651615',
      createdAt: '2023-10-24T10:33:24.584696Z',
    },
    {
      id: '71c4109a-f62f-4e4d-a862-1e423dd90b8b',
      name: 'Lithium-Iron Batteries',
      description:
        'Lead-acid batteries are the most common type used in trucks. ',
      isEnabled: false,
      updatedBy: '17f8c31b-a7bb-4df5-b318-b18897370f14',
      updatedAt: '2024-02-20T16:18:31.619067Z',
      createdBy: '0e489c6b-fec6-4cdc-b427-5f6fbf28a22b',
      createdAt: '2023-10-10T00:12:33.666116Z',
    },
    {
      id: '8deeec41-cfdc-48be-a948-81f8c35f1008',
      name: 'Lead-Acid Batteries',
      description:
        'They have a lead dioxide positive plate, a sponge lead negative plate, and a diluted sulfuric acid electrolyte.',
      isEnabled: false,
      updatedBy: '17f8c31b-a7bb-4df5-b318-b18897370f14',
      updatedAt: '2024-01-29T15:42:01.633751Z',
      createdBy: '0e489c6b-fec6-4cdc-b427-5f6fbf28a22b',
      createdAt: '2023-10-10T00:11:29.842255Z',
    },
  ];

  sortChange(data: any) {
    console.log({ data });
  }
}

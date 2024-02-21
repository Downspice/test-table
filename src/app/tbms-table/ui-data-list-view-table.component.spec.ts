import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDataListViewTableComponent } from './ui-data-list-view-table.component';

describe('UiDataListViewTableComponent', () => {
  let component: UiDataListViewTableComponent;
  let fixture: ComponentFixture<UiDataListViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDataListViewTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDataListViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

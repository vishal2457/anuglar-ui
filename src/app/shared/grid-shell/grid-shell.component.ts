import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { ApiService } from 'src/app/services/core/api.service';
import { SanitizationService } from 'src/app/services/core/sanitization.service';
import { DataGridService } from '../dash-data-grid/data-grid.service';
import {
  actionButtonType,
  filterEmitterType,
} from '../dash-data-grid/data-grid.type';
import { ShellConfig } from './grid-shell.types';

@Component({
  selector: 'dash-grid-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<dash-data-grid
    [headerInfo]="headers"
    [data]="source"
    [filterDropdownData]="filterDropdownData"
    (handleChange)="handleChange($event)"
    [totalCount]="totalCount"
    [loading]="loading"
    [actionButtons]="actionButtons"
    (actionButtonClick)="actionButtonClick.emit($event)"
    (onAddClick)="onAddClick.emit($event)"
    [bulkActions]="bulkActions"
    (bulkActionClick)="bulkActionClick.emit($event)"
    [checkbox]="checkbox"
    [excelURL]="excelURL"
    [extraExportKeys]="extraExportKeys"
    [handleExport]="handleExport"
    [headerTitle]="headerTitle"
    [showAdd]="showAdd"
  ></dash-data-grid>`,
})
export class GridShellComponent implements OnInit {
  constructor(
    private _api: ApiService,
    private _sanitizer: SanitizationService,
    private _cdr: ChangeDetectorRef,
    private _ds: DataGridService
  ) {}
  @Input() config: ShellConfig = null;
  @Input() filterDropdownData: any;
  @Input() actionButtons: actionButtonType[];
  @Input() bulkActions: string[];
  @Input() checkbox = true;
  @Input() excelExport: boolean | string = false;
  @Input() handleExport: any;
  @Input() headerTitle: string;
  @Input() showAdd = true
  @Input() extraExportKeys: {key: string, title: string}[]
  get excelURL() {
    if (typeof this.excelExport == 'string') {
      return this.excelExport;
    } else if (typeof this.excelExport == 'boolean' && this.excelExport) {
      return this.config.endpoint;
    }
    return '';
  }
  @Output() actionButtonClick = new EventEmitter<any>();
  @Output() bulkActionClick = new EventEmitter();
  @Output() onAddClick = new EventEmitter<any>();

  get headers() {
    return this.config.headers;
  }

  source: any[] = [];
  filterSubject = new BehaviorSubject<filterEmitterType>(null);
  filterChange$ = this.filterSubject.asObservable();
  loading = false;
  totalCount: number = null;

  private debounce:any

  ngOnInit(): void {

    this.filterChange$.subscribe((data) => {
      this._getData(data);
    });
  }

  private _getData(qp: filterEmitterType) {
    if(!qp) return;

    if(!this.config.endpoint) return

    this.loading = true;
    this._cdr.detectChanges();
    const q = {
      filters: this._sanitizer.sanitizeFilterObject(qp.filters),
      limit: qp.limit,
      sort: this._sanitizer.sanitizeFilterObject(qp.sort),
      page: qp.page,
    };

    this._api
      .get(this.config.endpoint, q)
      .pipe(
        tap(() => {
          this.loading = false;
        }),
        catchError((err) => {
          this.loading = false;
          return err;
        })
      )
      .subscribe((data) => {
        this.totalCount = data.data.count;
        this.source = data.data.rows;
        this._cdr.detectChanges();
      });
  }

  handleChange(e) {
    if (!e) return;
    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    let delay = 0;
    if (e.latestChange == 'filters') {
      delay = 500;
    }

  this.debounce =  setTimeout(() => {
      const { latestChange, ...rest } = e;
      this.filterSubject.next(rest);
    }, delay);


  }

  refresh() {
    const filters = this.filterSubject.getValue();
    if (filters) {
      this._getData(filters);
    }
    this._ds.resetSelection();
  }
}

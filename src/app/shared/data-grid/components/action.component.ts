import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DataGridService } from "../data-grid.service";
import { actionClickData } from "../data-grid.type";

@Component({
  selector: '[grid-action]',
  template: ` <ng-container *ngFor="let btn of ds.actionButtons$ | async" >
    <ng-container *ngIf="btn.show">
    <button class="{{btn.btnClass}}"
    *ngIf="btn.button"
    [attr.data-testid]="btn.btnLabel"
      (click)="actionButtonClick.emit({ action: btn.tooltip, data: data })"
    >{{btn.btnLabel?btn.btnLabel:btn.tooltip}}
    </button>
    <span *ngIf="!btn.button"

    [title]="btn.tooltip"
    class="pointer px-2"
    (click)="actionButtonClick.emit({ action: btn.tooltip, data: data })"
  >
    <i [class]="btn.class"></i>
  </span>
    </ng-container>

</ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class ActionButtonComponent {
  constructor(public ds: DataGridService) { }
  @Output() actionButtonClick = new EventEmitter<actionClickData>();
  @Input() data: unknown;
}


import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, OnChanges, OnInit, QueryList } from "@angular/core";
import { SgbBtnGroupComponent } from "./btn-group";

@Component({
  selector: 'sgb-btn-group-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
    <ng-container *ngFor="let btn of btns">
      <sgb-btn-group
      [text]="btn.text"
      [icon]="btn.icon"
      (handleClick)="btn.handleClick.emit($event)"
      />
    </ng-container>
  </span>
  `
})

export class SgbBtnGroupContainerComponent {
  @ContentChildren(SgbBtnGroupComponent) btns!: QueryList<SgbBtnGroupComponent>;
}

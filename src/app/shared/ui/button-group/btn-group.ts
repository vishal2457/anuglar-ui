import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'sgb-btn-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="inline-block border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
      (click)="handleClick.emit($event)"
      *ngIf="text && !icon"
    >
      {{ text }}
    </button>
    <button
      class="inline-block border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
      [title]="text"
      (click)="handleClick.emit($event)"
      *ngIf="icon"
    >
      <sgb-icon [icon]="icon" />
    </button>
  `,
})
export class SgbBtnGroupComponent {
  @Input() text = '';
  @Input() icon = '';

  @Output() handleClick = new EventEmitter();
}

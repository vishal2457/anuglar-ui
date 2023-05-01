import { NgModule } from '@angular/core';
import { GridShellComponent } from './grid-shell.component';
import { DashDataGridModule } from '../dash-data-grid/data-grid.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [DashDataGridModule, CommonModule],
  declarations: [GridShellComponent],
  exports: [GridShellComponent],
})
export class GridShellModule {}

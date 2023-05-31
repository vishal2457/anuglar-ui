import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DataChartsComponent } from './data-charts/data-charts.component';
import { GbCardComponent } from 'src/app/shared/card/card.component';
import { SgbButtonComponent } from 'src/app/shared/ui/button';
import { SgbInputDirective } from 'src/app/shared/ui/input/input.directive';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { SgbBadgeComponent } from 'src/app/shared/ui/badge';
import { AlertBannerComponent } from 'src/app/shared/ui/alert-banner';
import { SgbInputWrapperComponent } from 'src/app/shared/ui/input/input-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SgbBtnGroupModule } from 'src/app/shared/ui/button-group/btn-group.module';
import { TooltipModule } from 'src/app/shared/ui/tooltip/tooltip.module';
import { SgbIconComponent } from 'src/app/shared/ui/icon';


@NgModule({
  declarations: [
    DataChartsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    GbCardComponent,
    SgbButtonComponent,
    SgbInputDirective,
    CardModule,
    SgbBadgeComponent,
    AlertBannerComponent,
    SgbInputWrapperComponent,
    ReactiveFormsModule,
    SgbBtnGroupModule,
    TooltipModule,
    SgbIconComponent
  ]
})
export class AnalyticsModule { }

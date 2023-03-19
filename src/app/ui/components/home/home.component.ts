import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { BasketsComponent } from '../baskets/baskets.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BasketsComponent implements OnInit {
  constructor(spinner : NgxSpinnerService) {
    super(spinner);
    
  }
 override ngOnInit(): void {
   this.showSpinner(SpinnerType.BallScaleMultiple)
 }
}

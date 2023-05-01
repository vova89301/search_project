import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mui-dashboard',
  templateUrl: './mui-dashboard.component.html',
  styleUrls: ['./mui-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MuiDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

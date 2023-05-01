import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mui-user-profile',
  templateUrl: './mui-user-profile.component.html',
  styleUrls: ['./mui-user-profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MuiUserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

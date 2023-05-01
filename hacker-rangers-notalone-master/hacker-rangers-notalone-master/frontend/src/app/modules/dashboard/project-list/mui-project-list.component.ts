import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface User {
  readonly name: string;
  readonly email: string;
  readonly status: 'good' | 'very good';
  readonly tags: readonly string[];
}

@Component({
  selector: 'mui-project-list',
  templateUrl: './mui-project-list.component.html',
  styleUrls: ['./mui-project-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MuiProjectListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  readonly columns = ['name', 'email', 'status', 'tags', 'actions'];

  users: readonly User[] = [
    {
      name: 'Michael Palin',
      email: 'm.palin@notalone.com',
      status: 'good',
      tags: ['JS', "dotnet", "React"],
    },
    {
      name: 'Eric Idle',
      email: 'e.idle@notalone.com',
      status: 'good',
      tags: ['Angular', 'Cloud'],
    },
    {
      name: 'John Cleese',
      email: 'j.cleese@notalone.com',
      status: 'good',
      tags: ['Funny', 'Tall', 'Actor'],
    },
    {
      name: 'Terry Jones',
      email: '',
      status: 'very good',
      tags: ['Java', 'Vaadin'],
    },
    {
      name: 'Terry Gilliam',
      email: 't.gilliam@notalone.com',
      status: 'good',
      tags: ['Go', 'Kubernetes', 'Infra'],
    },
    {
      name: 'Graham Chapman',
      email: '',
      status: 'very good',
      tags: ['Java', 'Go', 'Microservices'],
    },
    {
      name: 'Michael Palin',
      email: 'm.palin@notalone.com',
      status: 'good',
      tags: ['JS', "dotnet", "React"],
    },
    {
      name: 'Eric Idle',
      email: 'e.idle@notalone.com',
      status: 'good',
      tags: ['Angular', 'Cloud'],
    },
    {
      name: 'John Cleese',
      email: 'j.cleese@notalone.com',
      status: 'good',
      tags: ['Funny', 'Tall', 'Actor'],
    },
    {
      name: 'Terry Jones',
      email: '',
      status: 'very good',
      tags: ['Java', 'Vaadin'],
    },
    {
      name: 'Terry Gilliam',
      email: 't.gilliam@notalone.com',
      status: 'good',
      tags: ['Go', 'Kubernetes', 'Infra'],
    },
    {
      name: 'Graham Chapman',
      email: '',
      status: 'very good',
      tags: ['Java', 'Go', 'Microservices'],
    },
  ];

  redirectToDetails(item: string) {

  }
}

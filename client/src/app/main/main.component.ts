import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@fuse/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  cardTitles: string[] = ['Electronics', 'Fashion', 'Beauty', 'Sport'];

  constructor(public _authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}

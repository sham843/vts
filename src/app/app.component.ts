import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VTS';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private titleService: Title) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.spinner.show()
      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
        window.scroll(0, 0);
      }
    });
  }



  ngOnInit() {
    //for title 
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      var rt = this.getChild(this.activatedRoute)
      rt.data.subscribe((data: { title: string; }) => {
        this.titleService.setTitle(data.title)
      })
    })

  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

}

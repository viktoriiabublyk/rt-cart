import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { Title } from '@angular/platform-browser';
import { LoadFlatpages } from '../flatpages.action';
import { Flatpages } from '../models/flatpage';
import { FlatpagesState } from '../flatpages.state';
import {loadContent} from "../../app.animations";
import {Settings} from "../../../conf/settings";

@Component({
  selector: 'app-flatpages',
  templateUrl: './flatpages.component.html',
  styleUrls: ['./flatpages.component.css'],
  animations: [
    loadContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlatpagesComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private titleService: Title,
    public settings: Settings,
    ) { }

  private subscriptions = new Subscription();

  @Select(FlatpagesState.getCurrentFlatpage) page$: Observable<Flatpages>;

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.subscribe(
        params => {
          this.store.dispatch(new LoadFlatpages(params.flatpage));
        }
      ));

    this.subscriptions.add(
        this.page$.subscribe(data => {
          if (data) {
            this.titleService.setTitle(this.settings.formatTitle(data.title));
          }
        })
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

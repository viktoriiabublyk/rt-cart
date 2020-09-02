import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CatalogModule } from '../../catalog.module';
import { Settings } from 'src/conf/settings';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Category } from '../../models/category.model';

export const category: Category = {
  data: {},
  id: 1,
  children: [
    {
    data: {},
    id: 2,
  }
  ]
};

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let store: any;
  // let settings: Settings;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot(),
        // CatalogModule,
      ],
      declarations: [ CategoryComponent ],
      providers: [ Settings
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    // settings = TestBed.get(Settings);
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    component.category = category;
    fixture.autoDetectChanges();
  });

  it('should create', inject([Settings], (settings: Settings)  => {
    expect(component).toBeTruthy();
  }));
});

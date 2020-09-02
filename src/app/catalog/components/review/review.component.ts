import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Review } from '../../models/reviews.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit {
  rating: number;
  @Input() item: Review;
  @Input() param: string;

  constructor() { }

  ngOnInit() {
    this.rating = this.item.score;
  }

}

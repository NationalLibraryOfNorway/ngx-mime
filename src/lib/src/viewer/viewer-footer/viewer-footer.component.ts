import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSliderChange } from '@angular/material';
import { MimeViewerIntl } from './../viewer-intl';

@Component({
  selector: 'viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss']
})
export class ViewerFooterComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  @Input() private length: number;
  @Input() public pageIndex: number;
  @Input() public rtl: boolean = false;

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef) { }

  sliderChange(event: MdSliderChange) {
    this.pageIndex = event.value;
    console.log(this.pageIndex);
  }
  leftArrow() {
    if(!this.rtl) {
      this.goLeft();
    } else {
      this.goRight();
    }
  }

  rightArrow() {
    if(!this.rtl) {
      this.goRight();
    } else {
      this.goLeft();
    }
  }

  /** Advances to the next page if it exists. */
  goRight() {
    if (!this.hasRight()) { return; }
    this.pageIndex--;
    console.log(this.pageIndex);
  }

  /** Move back to the previous page if it exists. */
  goLeft() {
    if (!this.hasLeft()) { return; }
    this.pageIndex++;
    console.log(this.pageIndex);
  }

  /** Whether there is a previous page. */
  hasLeft() {
    return this.pageIndex < this.length;
  }

  /** Whether there is a next page. */
  hasRight() {
    return this.pageIndex > 1;
  }

  ngOnInit() {
    if(!this.length) throw new Error("Attribute 'length' is required");
    if(this.pageIndex && !Number.isInteger(this.pageIndex)) throw new Error("Attribute 'pageIndex' is required to be an integer");
    if(!this.pageIndex) {
      this.pageIndex = 0;
    }

    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}

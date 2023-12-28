import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';


  private hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL Image is property requiered.');
  }

  onLoad() {

    // retardar 1 segundo ..
    //  setTimeout(() => { this.hasLoaded = true; }, 1000);

    this.hasLoaded = true;

  }

  getHasLoaded(): boolean {
      return this.hasLoaded;
  }


}

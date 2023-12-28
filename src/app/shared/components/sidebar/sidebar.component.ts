import { Component } from '@angular/core';
import { GifsService } from './../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {

  constructor(private gifService: GifsService) {}

  get getTagHistory(): string [] {
    return this.gifService.getTagHistory;

  }

  public changeTag(tag: string):void {
    this.gifService.setSearchTag(tag);
  }




}

import { Component, OnInit } from '@angular/core';

import { legoHeads } from './legoHeads';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  legoHeadsSorted: ILegoHead[] = [];

  filter: IHeadFilter;

  filterButtons: FilterButton[];

  ngOnInit() {
    this.pivotData();

    this.clearFilters();

    this.filterButtons = [
      {
        type: 'male',
        label: 'Sex',
        options: ['male', 'female', 'x'],
      },
      {
        type: 'beard',
        label: 'Beard',
        options: ['yes', 'no', 'x'],
      },
      {
        type: 'stubble',
        label: 'Stubble',
        options: ['yes', 'no', 'x'],
      },
      {
        type: 'eyewear',
        label: 'Eyewear',
        options: ['yes', 'no', 'x'],
      },
      {
        type: 'mouthOpen',
        label: 'Mouth',
        options: ['open', 'closed', 'x'],
      },
      {
        type: 'extra',
        label: 'Extra',
        options: ['yes', 'no', 'x'],
      },
    ];
  }

  private pivotData() {
    // Pivot the data which is in columns to rows
    let rowCounter = 0;
    let rows = [];
    legoHeads.forEach((head, index) => {
      if (index % 16 === 0) {
        rowCounter = 0;
      }

      if (!rows[rowCounter]) {
        rows[rowCounter] = [];
      }

      rows[rowCounter].push(head);

      rowCounter++;
    });

    rows.forEach((row) => {
      this.legoHeadsSorted.push(...row);
    });
  }

  applyFilter(filterType: string, value?) {
    let setting;

    switch (value) {
      case 0:
        setting = true;
        break;
      case 1:
        setting = false;
        break;
      case 2:
        setting = null;
        break;
    }

    // console.log('filter type', filterType, setting);

    this.filter = { ...this.filter };

    this.filter[filterType] = setting;

    console.log(this.filter);
  }

  matchingChange(e) {
    console.log('mc', e.target.checked);
    this.filter.andMatching = e.target.checked;
    console.log('andMatching', this.filter.andMatching);
  }

  clearMarkers() {
    this.legoHeadsSorted.forEach(head => head.selected = false);
  }

  clearFilters() {
    this.filter = {
      male: null,
      beard: null,
      stubble: null,
      eyewear: null,
      mouthOpen: null,
      extra: null,
      andMatching: true,
    };
  }
}

export interface ILegoHead {
  locX: number;
  locY: number;
  male: boolean;
  beard: boolean;
  stubble: boolean;
  eyewear: boolean;
  mouthOpen: boolean;
  extra: boolean;
  selected: boolean;
}

export interface IHeadFilter {
  male: boolean;
  beard: boolean;
  stubble: boolean;
  eyewear: boolean;
  mouthOpen: boolean;
  extra: boolean;
  andMatching: boolean;
}

export interface FilterButton {
  type: string;
  label: string;
  options: string[];
}

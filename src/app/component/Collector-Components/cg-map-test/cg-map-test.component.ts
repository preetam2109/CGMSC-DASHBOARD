import { Component, OnInit } from '@angular/core';
interface MapRegion {
  title: string;
  coords: string;
  shape: string;
  alt: string;
}
@Component({
  selector: 'app-cg-map-test',
  standalone: true,
  imports: [],
  templateUrl: './cg-map-test.component.html',
  styleUrl: './cg-map-test.component.css'
})
export class CgMapTestComponent implements OnInit {
  regions: MapRegion[] = [];
  selectedRegion: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.regions = [
      {
        title: 'BALOD',
        coords: '161,463,167,461,171,452,188,445,196,440,199,435,200,429,200,418,203,412,197,408,192,406,194,400,191,391,183,388,177,388,171,388,165,386,164,380,159,378,158,389,151,392,144,393,144,406,136,420,128,424,126,431,138,432,141,440,146,448,152,462',
        shape: 'poly',
        alt: 'Region of BALOD'
      },
      {
        title: 'BALODA BAJAR',
        coords: '271,352,277,347,285,348,289,340,295,337,294,331,299,323,306,320,308,311,311,304,316,300,315,295,307,295,298,294,296,286,285,281,282,286,275,285,271,282,266,289,266,297,259,303,261,311,257,319,262,323,266,326,268,330,268,338,264,344',
        shape: 'poly',
        alt: 'Region of BALODA BAJAR'
      }
      // Add more regions as needed
    ];
  }

  onHover(region: MapRegion): void {
    this.selectedRegion = region.title;
  }

  onLeave(): void {
    this.selectedRegion = null;
  }

  onClick(region: MapRegion): void {
    alert(`Region clicked: ${region.title}`);
  }
}
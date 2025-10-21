import { Component, Input, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatSidenav } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  Router,
  RouterLinkActive,
  RouterLink,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ManifestMenuItem } from './../../models/manifest-menu-item.model';
import { ManifestService } from './../manifest-service/manifest.service';

@Component({
  selector: 'demo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [
    MatRadioGroup,
    FormsModule,
    MatRadioButton,
    MatNavList,
    MatListItem,
    RouterLinkActive,
    RouterLink,
  ],
})
export class SidenavComponent implements OnDestroy {
  private manifestService = inject(ManifestService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @Input() sidenav!: MatSidenav;
  iiifVersion = '3';
  manifests: ManifestMenuItem[] = [];
  selectedManifest: string | undefined;
  private subscriptions = new Subscription();

  constructor() {
    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.iiifVersion = params.get('v') || this.iiifVersion;
        this.manifests = this.manifestService.getManifests(this.iiifVersion);
        const manifest = this.manifests.find(
          (m) => m.uri === params.getAll('manifestUri'),
        );
        if (manifest) {
          this.selectedManifest = manifest.label;
        }
      }),
    );
  }

  selectIiifVersion(version: string): void {
    this.iiifVersion = version;
    this.manifests = this.manifestService.getManifests(this.iiifVersion);
    if (this.selectedManifest) {
      const manifest = this.manifests.find(
        (m) => m.label === this.selectedManifest,
      );
      if (manifest?.uri) {
        this.router.navigate(['demo'], {
          queryParams: { manifestUri: manifest.uri, v: manifest.iiifVersion },
        });
      }
    }
  }

  close(label?: string): void {
    this.selectedManifest = label;
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

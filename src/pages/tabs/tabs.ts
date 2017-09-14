import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { SearchPage } from '../search/search';
import { UploadPicturePage } from '../upload-picture/upload-picture';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = UploadPicturePage;
  tab4Root = SettingsPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}

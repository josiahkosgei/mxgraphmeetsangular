import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mxGraph Angular Playground';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('bankbook', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/001-bankbook.svg'));
    this.matIconRegistry.addSvgIcon('atm', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/002-atm.svg'));
    this.matIconRegistry.addSvgIcon('bank', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/003-bank.svg'));
    this.matIconRegistry.addSvgIcon('receipt', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/004-receipt.svg'));
    this.matIconRegistry.addSvgIcon('credit-card', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/005-credit-card.svg'));
    this.matIconRegistry.addSvgIcon('money', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/006-money.svg'));
    this.matIconRegistry.addSvgIcon('smartphonepayment', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/007-smartphone-payment.svg'));
    this.matIconRegistry.addSvgIcon('banking', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/008-banking.svg'));
    this.matIconRegistry.addSvgIcon('smartphone', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/009-smartphone.svg'));
    this.matIconRegistry.addSvgIcon('cloudbanking', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/010-cloud-banking.svg'));
    this.matIconRegistry.addSvgIcon('borrow', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/011-borrow.svg'));
    this.matIconRegistry.addSvgIcon('smartphonepayment1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/012-smartphone-payment-1.svg'));
    this.matIconRegistry.addSvgIcon('smartphone1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/013-smartphone-1.svg'));
    this.matIconRegistry.addSvgIcon('bankaccount', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/014-bank-account.svg'));
    this.matIconRegistry.addSvgIcon('bankaccount1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/015-bank-account-1.svg'));
    this.matIconRegistry.addSvgIcon('portfolio', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/020-portfolio.svg'));
    this.matIconRegistry.addSvgIcon('onlinebanking', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/022-online-banking.svg'));
    this.matIconRegistry.addSvgIcon('zoomOut', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_ZoomOut.svg'));
    this.matIconRegistry.addSvgIcon('zoomIn', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_ZoomIn.svg'));
    this.matIconRegistry.addSvgIcon('fit', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_Fit.svg'));
    this.matIconRegistry.addSvgIcon('actual', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_Actual.svg'));
    this.matIconRegistry.addSvgIcon('startProcess', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/start-process.svg'));
    this.matIconRegistry.addSvgIcon('stopProcess', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/end-terminate.svg'));
  }

}

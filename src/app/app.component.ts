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
    this.matIconRegistry.addSvgIcon('trophy', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/001-trophy.svg'));
    this.matIconRegistry.addSvgIcon('timer1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/002-timer-1.svg'));
    this.matIconRegistry.addSvgIcon('sword', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/003-sword.svg'));
    this.matIconRegistry.addSvgIcon('chess', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/004-chess.svg'));
    this.matIconRegistry.addSvgIcon('strategy', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/005-strategy.svg'));
    this.matIconRegistry.addSvgIcon('rook', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/006-rook.svg'));
    this.matIconRegistry.addSvgIcon('queen', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/007-queen.svg'));
    this.matIconRegistry.addSvgIcon('pawn', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/008-pawn.svg'));
    this.matIconRegistry.addSvgIcon('king', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/009-king.svg'));
    this.matIconRegistry.addSvgIcon('horse', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/010-horse.svg'));
    this.matIconRegistry.addSvgIcon('crown1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/011-crown-1.svg'));
    this.matIconRegistry.addSvgIcon('crown', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/012-crown.svg'));
    this.matIconRegistry.addSvgIcon('timer', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/013-timer.svg'));
    this.matIconRegistry.addSvgIcon('chessboard1', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/014-board-1.svg'));
    this.matIconRegistry.addSvgIcon('chessboard', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/015-board.svg'));
    this.matIconRegistry.addSvgIcon('bishop', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/016-bishop.svg'));
    this.matIconRegistry.addSvgIcon('horseriding', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/017-riding.svg'));
    this.matIconRegistry.addSvgIcon('zoomOut', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_ZoomOut.svg'));
    this.matIconRegistry.addSvgIcon('zoomIn', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_ZoomIn.svg'));
    this.matIconRegistry.addSvgIcon('fit', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_Fit.svg'));
    this.matIconRegistry.addSvgIcon('actual', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/Icon_Actual.svg'));
  }

}

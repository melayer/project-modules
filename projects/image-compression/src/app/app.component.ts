import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

/**
 *  Library used https://www.npmjs.com/package/ngx-image-compress
 * 
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgxImageCompressService]
})
export class AppComponent implements OnInit {
  title = 'image-compression';

  claims = new Array<Claim>()
  constructor(
    private imageCompress: NgxImageCompressService
  ) {

  }

  ngOnInit() {
    this.claims.push({ head: 'Android', approvedAmount: 1000, claimAmount: 0, image: '' })
    this.claims.push({ head: 'Java', approvedAmount: 1001, claimAmount: 0, image: '' })
    this.claims.push({ head: 'Python', approvedAmount: 1002, claimAmount: 0, image: '' })
  }

  onClaimClick(claim: Claim) {
    console.log(claim)

    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      console.log('Byte Count Before Compression' + this.imageCompress.byteCount(image))
      this.imageCompress.compressFile(image, orientation).then(compressedImage => {
        claim.image = compressedImage
        console.log('Byte Count After Compression' + this.imageCompress.byteCount(compressedImage))
      })
    })
  }

  printData() {
    console.log(this.claims)
  }

  clearImage(claim: Claim) {
    claim.image = ''
  }
}

export interface Claim {
  head: string
  approvedAmount: number
  claimAmount: number,
  image: string
}

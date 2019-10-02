import { MultiPartFileUploaderService, MainDTO, Head } from './multi-part-file-uploader.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dto : MainDTO = {} as MainDTO
  
  title = 'multipart-file-upload';

  constructor(
    private service: MultiPartFileUploaderService
  ) {
   
  }

  onFileSelect1(event) {
    const file = event.target.files[0]
    this.dto.file1 = file
    this.dto.category = 'android'
    this.dto.heads = new Array<Head>()
    // this.dto.date = new Date()
  }

  onFileSelect2(event) {
    const file = event.target.files[0]
    this.dto.heads.push({headName : 'head2', file2 : file})
  }

  onFileSelect3(event) {
    const file = event.target.files[0]
    this.dto.heads.push({headName : 'head3', file2 : file})
  }

  save() {
    this.service.sendMultiPartRequest(this.dto);
  }
}

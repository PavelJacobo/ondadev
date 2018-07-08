import { Component, OnInit, Input } from '@angular/core';
import { UploadServicesService }  from 'src/app/services/upload-services.service';
import { FileUpload } from 'src/app/utils/fileupload';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;
 
  constructor(private uploadService: UploadServicesService) { }
 
  ngOnInit() {
  }
 
  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }

}

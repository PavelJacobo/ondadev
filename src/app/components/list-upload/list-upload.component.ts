import { Component, OnInit } from '@angular/core';
import { UploadServicesService }  from 'src/app/services/upload-services.service';
import { FileUpload } from 'src/app/utils/fileupload';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  fileUploads: any[];
 
  constructor(private uploadService: UploadServicesService) { }
 
  ngOnInit() {
    // Use snapshotChanges().map() to store the key
    this.uploadService.getFileUploads(6).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log(fileUploads);
    });
  }

}

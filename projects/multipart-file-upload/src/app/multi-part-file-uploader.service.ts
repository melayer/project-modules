import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MultiPartFileUploaderService {

  constructor(
    private http: HttpClient
  ) { }

  sendMultiPartRequest(dto: MainDTO) {
    this.http.post('http://192.168.15.179:8080/upload', this.convertModelToFormData(dto)).subscribe(res => console.log(res))
  }

  public convertModelToFormData(model: any, form: FormData = null, namespace = ''): FormData {
    let formData = form || new FormData();
    let formKey;

    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      if (model[propertyName] instanceof Date)
        formData.append(formKey, model[propertyName].toISOString());
      else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element, index) => {
          const tempFormKey = `${formKey}[${index}]`;
          this.convertModelToFormData(element, formData, tempFormKey);
        });
      }
      else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File))
        this.convertModelToFormData(model[propertyName], formData, formKey);
      else
        formData.append(formKey, model[propertyName]);
    }
    return formData;
  }
}

export interface MainDTO {
  category: string
  file1: File
  heads: Array<Head>
  // date : Date
}

export interface Head {
  headName: string
  file2: File
}



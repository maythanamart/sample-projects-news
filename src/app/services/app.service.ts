import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response';
import { News } from '../models/news';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  async getNews(id: number): Promise<News[]> {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    var params = new HttpParams();
    params.set('EmployeeId', id);
    return this.http.get<BaseResponse<News[]>>(`${environment.ed_api}/ED-GetNews`, { headers: headers, params: params })
      .toPromise()
      .then((res: any) => {
        if (res.successful) {
          if (res.data) {
            res.data.forEach((d: any) => {
              d.UpdatedDate = d.UpdatedDate ? moment(d.UpdatedDate, 'DD/MM/YYYY').toDate() : null;
            });
            return res.data.map((x: any) => new News(x));
          } else {
            return new Array<News[]>();
          }
        }
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        return new Array<News[]>();
      });
  }

  async updateStatusNews(id: string, status: number) {
    const formData = new FormData();
    formData.append('EmployeeId', '3');
    formData.append('NewsId', id);
    formData.append('Status', status.toString());
    return this.http.post<BaseResponse<any>>(`${environment.ed_api}/ED-UpdateStatusNews`, formData)
      .toPromise().then((res: any) => {
        if (!res.successful) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          return false;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'บันทึกข้อมูลสำเร็จ' });
        return true;
      });
  }

}

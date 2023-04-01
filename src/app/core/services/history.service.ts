import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { IHistory } from './dto/history.dto';

const baseUrl = `${environment.apiUrl}/history`;

@Injectable()
export class HistoryService {
  constructor(private http: HttpClient) {}

  public get(groupId: string, offset: number, limit: number) {
    return this.http.get<IHistory[]>(`${baseUrl}/${groupId}`, { params: { offset, limit } });
  }
}

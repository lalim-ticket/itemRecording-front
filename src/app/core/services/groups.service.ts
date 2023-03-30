import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpRetry } from '@core/shared/utils';
import { environment } from '@environment';
import { IGroup, IGroupCreate } from './dto/group.dto';

const baseUrl = `${environment.apiUrl}/groups`;

@Injectable()
export class GroupsService {
  constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<IGroup[]>(baseUrl).pipe(httpRetry());
  }

  public create(groupCreateDto: IGroupCreate) {
    return this.http.post<IGroup>(baseUrl, groupCreateDto).pipe(httpRetry());
  }
}

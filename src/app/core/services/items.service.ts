import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { IItem, IItemCreate } from './dto/item.dto';

const baseUrl = `${environment.apiUrl}/items`;

@Injectable()
export class ItemsService {
  constructor(private http: HttpClient) {}

  public create(itemCreateDto: IItemCreate) {
    return this.http.post<IItem>(baseUrl, itemCreateDto);
  }
}

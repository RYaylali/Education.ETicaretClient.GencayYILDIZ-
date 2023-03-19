import { NumberInput } from '@angular/cdk/coercion';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Products } from 'src/app/constracts/create_produc';
import { List_Product } from 'src/app/constracts/list_product';
import { __values } from 'tslib';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httClientService: HttpClientService) {}

  create(
    products: Create_Products,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httClientService
      .post(
        {
          controller: 'products',
        },
        products
      )
      .subscribe(
        (result) => {
          successCallBack();
          alert('başarılı');
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        }
      );
  }
  async read(
    page: number = 0,
    size: number = 5,//burada kaldım
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{totalCount:NumberInput; products: List_Product[]}> {
    const promiseData: Promise<{totalCount:NumberInput; products: List_Product[]}> = this.httClientService
      .get<{totalCount:NumberInput; products: List_Product[]}>({
        controller: 'products',
        queryString:`page=${page}&size=${size}`
      })
      .toPromise();
    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.error)
      );
    return await promiseData;
  }
}

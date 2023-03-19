import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Products } from 'src/app/constracts/create_produc';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spiner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spiner);
  }

  ngOnInit(): void {}
  @Output() createdProduct: EventEmitter<Create_Products>= new EventEmitter();
  create(
    txtName: HTMLInputElement,
    txtStock: HTMLInputElement,
    txtPrice: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.Pacman);
    const create_product: Create_Products = new Create_Products();
    create_product.name = txtName.value;
    create_product.stock = parseInt(txtStock.value);
    create_product.price = parseFloat(txtPrice.value);
   
    this.productService.create(
      create_product,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Ürün başarıyla eklendi', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopLeft,
        });
      this.createdProduct.emit(create_product);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }
}

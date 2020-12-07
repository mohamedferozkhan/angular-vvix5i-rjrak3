import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { CartService } from "../cart.service";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  items: [];
  checkoutForm;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: "",
      address: ""
    });
  }

  ngOnInit() {
    // this.items = this.cartService.getItems();
    this.items = this.storage.get("myCart");
  }

  removeItem(productNumber) {
    this.items.splice(productNumber, 1);
    this.storage.set("myCart", this.items);
    this.items = this.storage.get("myCart");
  }

  routeTo400() {
    this.router.navigateByUrl("page-not-found");
  }

  routeTo500() {
    this.router.navigateByUrl("internal-server-error");
  }

  routeToGeneralErro() {
    this.router.navigateByUrl("error");
  }

  onSubmit(cutomerData) {
    console.log(cutomerData);
    this.items = [];
    // this.checkoutForm.reset();
    //call some API
  }
}

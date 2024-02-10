import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerComponent } from '../shared/customer/customer.component';
import { PinComponent } from '../shared/pin/pin.component';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
})
export class PinsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  pin: any;

  ngOnInit(): void {
    this.getPin();
  }

  getPin() {
    const customerData = localStorage.getItem('customer');
    const customer = customerData ? JSON.parse(customerData) : null;

    const pinData = localStorage.getItem('pin');
    const pin = pinData ? JSON.parse(pinData) : null;

    this.pin = pin?.map((ele: any) => {
      const collaboratorsWithDetails = ele.collaborators.map((col: any) => {
        return customer.find((cust: any) => cust.id === col);
      });
      return { ...ele, collaborators: collaboratorsWithDetails };
    });
  }

  addCustomer() {
    const customerDialog = this.dialog.open(CustomerComponent, {
      width: '40%',
    });

    customerDialog.afterClosed().subscribe((resp) => {
      if (resp != null) {
        let customer: any = localStorage.getItem('customer');
        if (customer == null) customer = [];
        else customer = JSON.parse(customer);

        resp.id = new Date().getTime();
        customer.push(resp);

        localStorage.setItem('customer', JSON.stringify(customer));
      }
    });
  }

  addPin() {
    const pinDialog = this.dialog.open(PinComponent, {
      width: '40%',
    });

    pinDialog.afterClosed().subscribe((res) => {
      if (res != null) {
        let pin: any = localStorage.getItem('pin');
        if (pin == null) pin = [];
        else pin = JSON.parse(pin);

        res.id = new Date().getTime();
        pin.push(res);

        localStorage.setItem('pin', JSON.stringify(pin));
      }

      this.getPin();
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { TableModule } from "primeng/table";

@Component({
  selector: "table-historial",
  imports: [TableModule],
  standalone: true,
  templateUrl: "./table-historial.component.html",
})
export class TableHistorialComponent {
  products: any[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      price: 100,
      quantity: 10,
      date: new Date("2023-01-01"),
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      price: 200,
      quantity: 20,
      date: new Date("2023-02-01"),
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of Product 3",
      price: 300,
      quantity: 30,
      date: new Date("2023-03-01"),
    },
  ];
}

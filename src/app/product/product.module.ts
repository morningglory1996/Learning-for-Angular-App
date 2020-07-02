import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { from } from 'rxjs';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.guard';
 
const routes: Routes = [
  { 
    path: 'products', component: ProductComponent ,
    children: [
      { path: '', component: ProductListComponent},
      { path: ':productId', component: ProductDetailComponent, canActivate: [AuthGuard]}
    ]
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FechaFormatAMDPipe } from './pipe/fecha-format-amd.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { VentaComponent } from './modules/venta/venta.component';
import { VentaMedicamentoComponent } from './modules/venta/venta-medicamento/venta-medicamento.component';
import { NavbarComponent } from './base/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ProductoComponent } from './modules/producto/producto.component';
import { ProductoAddComponent } from './modules/producto/producto-add/producto-add.component';
import { ProductoDeleteComponent } from './modules/producto/producto-delete/producto-delete.component';
import { ProductoEditComponent } from './modules/producto/producto-edit/producto-edit.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { LogginComponent } from './modules/loggin/loggin.component';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [
    AppComponent,
    FechaFormatAMDPipe,
    VentaComponent,
    VentaMedicamentoComponent,
    NavbarComponent,
    ProductoComponent,
    ProductoAddComponent,
    ProductoDeleteComponent,
    ProductoEditComponent,
    OnlyNumbersDirective,
    LogginComponent,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ToastModule,
    CardModule,
    TooltipModule,
    CalendarModule,
    MatDatepickerModule,
    MenubarModule,
    CheckboxModule,
    DialogModule,
    DataViewModule,
    AccordionModule,
    AvatarModule,
    MenuModule
  ],
  providers: [
  provideAnimations(), // required animations providers
  provideToastr(), // Toastr providers
],
exports: [
  OnlyNumbersDirective
],
  bootstrap: [AppComponent]
})
export class AppModule { }

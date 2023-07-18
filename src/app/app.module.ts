import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MedicamentoComponent } from './modules/medicamento/medicamento.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { MedicamentoAddComponent } from './modules/medicamento/medicamento-add/medicamento-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MedicamentoDeleteComponent } from './modules/medicamento/medicamento-delete/medicamento-delete.component';
import { MedicamentoEditComponent } from './modules/medicamento/medicamento-edit/medicamento-edit.component';
import { FechaFormatAMDPipe } from './pipe/fecha-format-amd.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { VentaComponent } from './modules/venta/venta.component';
import { VentaMedicamentoComponent } from './modules/venta/venta-medicamento/venta-medicamento.component';
import { NavbarComponent } from './base/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent,
    MedicamentoComponent,
    MedicamentoAddComponent,
    MedicamentoDeleteComponent,
    MedicamentoEditComponent,
    FechaFormatAMDPipe,
    VentaComponent,
    VentaMedicamentoComponent,
    NavbarComponent,

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
    MenubarModule
  ],
  providers: [
  provideAnimations(), // required animations providers
  provideToastr(), // Toastr providers
],
  bootstrap: [AppComponent]
})
export class AppModule { }

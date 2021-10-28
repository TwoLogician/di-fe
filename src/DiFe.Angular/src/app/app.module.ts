import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { BlockUIModule } from "primeng/blockui"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { CheckboxModule } from "primeng/checkbox"
import { ContextMenuModule } from "primeng/contextmenu"
import { DialogModule } from "primeng/dialog"
import { DividerModule } from "primeng/divider"
import { InputNumberModule } from "primeng/inputnumber"
import { InputTextModule } from "primeng/inputtext"
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { RippleModule } from "primeng/ripple"
import { TableModule } from "primeng/table"
import { TabViewModule } from "primeng/tabview"
import { TagModule } from "primeng/tag"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AppService } from "./app.service"
import { AprComponent, CoinComponent, WebsiteComponent } from "./components"

@NgModule({
  declarations: [
    AppComponent,
    AprComponent,
    CoinComponent,
    WebsiteComponent,
  ],
  imports: [
    AppRoutingModule,
    BlockUIModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    ContextMenuModule,
    DialogModule,
    DividerModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    ProgressSpinnerModule,
    RippleModule,
    TableModule,
    TabViewModule,
    TagModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

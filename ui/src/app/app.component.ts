import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { String as ProtoString, Void, Page } from '../generated/grpc_template_pb';
import { GrpcTemplateClient } from '../generated/Grpc_templateServiceClientPb';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly client: GrpcTemplateClient;
  readonly newStringId = new FormControl('');
  readonly newStringValue = new FormControl('');
  readonly strings = new BehaviorSubject<Array<ProtoString>>([]);
  readonly existingStringsCount = new BehaviorSubject<number>(0);
  readonly fetchingStrings = new BehaviorSubject(true);

  constructor() {
    this.client = new GrpcTemplateClient("");
  }

  async ngOnInit() {
    const count = (await this.client.getStringsCount(new Void(), null)).getStringsCount();
    this.existingStringsCount.next(count);
    const page = new Page();
    page.setPageNumber(1);
    page.setPageSize(5);
    this.strings.next((await this.client.getStrings(page, null)).getStringList());
    this.fetchingStrings.next(false);
  }

  async saveString() {
    await this.client.saveString(
      new ProtoString()
        .setId(this.newStringId.value ?? '')
        .setString(this.newStringValue.value ?? ''), 
      null);
  }

  async updatePage(event: PageEvent) {
    const request = new Page();
    request.setPageNumber(event.pageIndex);
    request.setPageSize(event.pageSize);
    this.fetchingStrings.next(true);
    this.strings.next((await this.client.getStrings(request, null)).getStringList());
    this.fetchingStrings.next(false);
  }
}

import * as jspb from 'google-protobuf'



export class String extends jspb.Message {
  getId(): string;
  setId(value: string): String;

  getString(): string;
  setString(value: string): String;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): String.AsObject;
  static toObject(includeInstance: boolean, msg: String): String.AsObject;
  static serializeBinaryToWriter(message: String, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): String;
  static deserializeBinaryFromReader(message: String, reader: jspb.BinaryReader): String;
}

export namespace String {
  export type AsObject = {
    id: string,
    string: string,
  }
}

export class Page extends jspb.Message {
  getPageNumber(): number;
  setPageNumber(value: number): Page;

  getPageSize(): number;
  setPageSize(value: number): Page;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Page.AsObject;
  static toObject(includeInstance: boolean, msg: Page): Page.AsObject;
  static serializeBinaryToWriter(message: Page, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Page;
  static deserializeBinaryFromReader(message: Page, reader: jspb.BinaryReader): Page;
}

export namespace Page {
  export type AsObject = {
    pageNumber: number,
    pageSize: number,
  }
}

export class GetStringsResponse extends jspb.Message {
  getStringList(): Array<String>;
  setStringList(value: Array<String>): GetStringsResponse;
  clearStringList(): GetStringsResponse;
  addString(value?: String, index?: number): String;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStringsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetStringsResponse): GetStringsResponse.AsObject;
  static serializeBinaryToWriter(message: GetStringsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStringsResponse;
  static deserializeBinaryFromReader(message: GetStringsResponse, reader: jspb.BinaryReader): GetStringsResponse;
}

export namespace GetStringsResponse {
  export type AsObject = {
    stringList: Array<String.AsObject>,
  }
}

export class GetStringsCountResponse extends jspb.Message {
  getStringsCount(): number;
  setStringsCount(value: number): GetStringsCountResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStringsCountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetStringsCountResponse): GetStringsCountResponse.AsObject;
  static serializeBinaryToWriter(message: GetStringsCountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStringsCountResponse;
  static deserializeBinaryFromReader(message: GetStringsCountResponse, reader: jspb.BinaryReader): GetStringsCountResponse;
}

export namespace GetStringsCountResponse {
  export type AsObject = {
    stringsCount: number,
  }
}

export class Void extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Void.AsObject;
  static toObject(includeInstance: boolean, msg: Void): Void.AsObject;
  static serializeBinaryToWriter(message: Void, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Void;
  static deserializeBinaryFromReader(message: Void, reader: jspb.BinaryReader): Void;
}

export namespace Void {
  export type AsObject = {
  }
}


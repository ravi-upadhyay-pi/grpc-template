/**
 * @fileoverview gRPC-Web generated client stub for grpc_template
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as grpc_template_pb from './grpc_template_pb';


export class GrpcTemplateClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorSaveString = new grpcWeb.MethodDescriptor(
    '/grpc_template.GrpcTemplate/SaveString',
    grpcWeb.MethodType.UNARY,
    grpc_template_pb.String,
    grpc_template_pb.Void,
    (request: grpc_template_pb.String) => {
      return request.serializeBinary();
    },
    grpc_template_pb.Void.deserializeBinary
  );

  saveString(
    request: grpc_template_pb.String,
    metadata: grpcWeb.Metadata | null): Promise<grpc_template_pb.Void>;

  saveString(
    request: grpc_template_pb.String,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: grpc_template_pb.Void) => void): grpcWeb.ClientReadableStream<grpc_template_pb.Void>;

  saveString(
    request: grpc_template_pb.String,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: grpc_template_pb.Void) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/grpc_template.GrpcTemplate/SaveString',
        request,
        metadata || {},
        this.methodDescriptorSaveString,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/grpc_template.GrpcTemplate/SaveString',
    request,
    metadata || {},
    this.methodDescriptorSaveString);
  }

  methodDescriptorGetStringsCount = new grpcWeb.MethodDescriptor(
    '/grpc_template.GrpcTemplate/GetStringsCount',
    grpcWeb.MethodType.UNARY,
    grpc_template_pb.Void,
    grpc_template_pb.GetStringsCountResponse,
    (request: grpc_template_pb.Void) => {
      return request.serializeBinary();
    },
    grpc_template_pb.GetStringsCountResponse.deserializeBinary
  );

  getStringsCount(
    request: grpc_template_pb.Void,
    metadata: grpcWeb.Metadata | null): Promise<grpc_template_pb.GetStringsCountResponse>;

  getStringsCount(
    request: grpc_template_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: grpc_template_pb.GetStringsCountResponse) => void): grpcWeb.ClientReadableStream<grpc_template_pb.GetStringsCountResponse>;

  getStringsCount(
    request: grpc_template_pb.Void,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: grpc_template_pb.GetStringsCountResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/grpc_template.GrpcTemplate/GetStringsCount',
        request,
        metadata || {},
        this.methodDescriptorGetStringsCount,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/grpc_template.GrpcTemplate/GetStringsCount',
    request,
    metadata || {},
    this.methodDescriptorGetStringsCount);
  }

  methodDescriptorGetStrings = new grpcWeb.MethodDescriptor(
    '/grpc_template.GrpcTemplate/GetStrings',
    grpcWeb.MethodType.UNARY,
    grpc_template_pb.Page,
    grpc_template_pb.GetStringsResponse,
    (request: grpc_template_pb.Page) => {
      return request.serializeBinary();
    },
    grpc_template_pb.GetStringsResponse.deserializeBinary
  );

  getStrings(
    request: grpc_template_pb.Page,
    metadata: grpcWeb.Metadata | null): Promise<grpc_template_pb.GetStringsResponse>;

  getStrings(
    request: grpc_template_pb.Page,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: grpc_template_pb.GetStringsResponse) => void): grpcWeb.ClientReadableStream<grpc_template_pb.GetStringsResponse>;

  getStrings(
    request: grpc_template_pb.Page,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: grpc_template_pb.GetStringsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/grpc_template.GrpcTemplate/GetStrings',
        request,
        metadata || {},
        this.methodDescriptorGetStrings,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/grpc_template.GrpcTemplate/GetStrings',
    request,
    metadata || {},
    this.methodDescriptorGetStrings);
  }

}


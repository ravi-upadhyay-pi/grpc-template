import { GetStringsCountResponse, GetStringsResponse, String as ProtoString } from '../grpc_template_pb';

const getStringsCountMock = jest.fn().mockImplementation(() => {
    const response = new GetStringsCountResponse();
    response.setStringsCount(10);
    return response;
});

const getStringsMock = jest.fn().mockImplementation(() => {
    const strings: Array<ProtoString> = [];
    for (let i = 0; i < 2; i++) {
        let protoString = new ProtoString();
        protoString.setId(i.toString());
        protoString.setString('String ' + i.toString);
        strings.push(protoString);
    }
    const response = new GetStringsResponse();
    response.setStringList(strings);
    return response;
});

export const GrpcTemplateClient = jest.fn().mockImplementation(() => {
    return {
        getStringsCount: getStringsCountMock,
        getStrings: getStringsMock,
    };
});

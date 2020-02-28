import request from '@/router/axios';

export const getUploadData = (deviceId,deviceKey) => {
    return request({
        url: '/api/iotPlatform/uploaddata/listByIdAndKey',
        method: 'get',
        params: {
        deviceId: deviceId,
        deviceKey: deviceKey
        }
    })
    }
import request from '@/router/axios';


export const getMapLocation = () => {
  return request({
    url: '/api/iot/devices/locations',
    method: 'get',
    params: {
    }
  })
}

export const getNoBindList = () => {
  return request({
    url: '/api/iot/devices/noBindList',
    method: 'get',
    params: {
    }
  })
}

export const bindDeviceId = (gatewayAddress,deviceId) => {
  return request({
    url: '/api/iot/devices/bindGatewayAddress',
    method: 'post',
    params: {
      gatewayAddress,
      deviceId
    }
  })
}

export const unbindDeviceId = (gatewayAddress) => {
  return request({
    url: '/api/iot/devices/unbindGatewayAddress',
    method: 'post',
    params: {
      gatewayAddress
    }
  })
}

export const getDeviceById = (deviceId) => {
  return request({
    url: '/api/iot/devices/ids/'+deviceId,
    method: 'get',
    params: {
      deviceId
    }
  })
}

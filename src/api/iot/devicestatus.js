import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/iot/devicestatus/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/iot/devicestatus/detail',
    method: 'get',
    params: {
      deviceId: id,
    }
  })
}

export const remove = (deviceId) => {
  return request({
    url: '/api/iot/devicestatus/remove',
    method: 'post',
    params: {
      deviceId,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/iot/devicestatus/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/iot/devicestatus/submit',
    method: 'post',
    data: row
  })
}


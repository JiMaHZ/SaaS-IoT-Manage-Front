import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/iot/ashbin/list',
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
    url: '/api/iot/ashbin/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/iot/ashbin/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/iot/ashbin/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/iot/ashbin/submit',
    method: 'post',
    data: row
  })
}

export const getStatus = (deviceId) => {
  return request({
    url: '/api/iot/ashbin/status',
    method: 'get',
    params: {
      deviceId
    }
  })
}

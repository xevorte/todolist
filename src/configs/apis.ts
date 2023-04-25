import * as TYPE from './types';
import { store } from '../bootstraps';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://todo.api.devcode.gethired.id';
let EMAIL = '';

store.subscribe(() => {
  const states = store.getState();

  EMAIL = states.auth.email || states.authLocked.email;
});

const api = ({ method, url, params, data, timeout }: AxiosRequestConfig) =>
  axios({
    method,
    baseURL: BASE_URL,
    url,
    params,
    data,
    timeout,
  });

export const getActivitiesApi = async () =>
  await api({
    method: 'get',
    url: `/activity-groups?email=${EMAIL}`,
  });

export const getActivityApi = async (id: number) =>
  await api({
    method: 'get',
    url: `activity-groups/${id}`,
  });

export const createActivityApi = async (data: TYPE.activityType) =>
  await api({
    method: 'post',
    url: '/activity-groups',
    data: {
      email: EMAIL,
      ...data,
    },
  });

export const updateActivityApi = async (id: number, data: TYPE.activityType) =>
  await api({
    method: 'patch',
    url: `activity-groups/${id}`,
    data,
  });

export const deleteActivityApi = async (id: number) =>
  await api({
    method: 'delete',
    url: `activity-groups/${id}`,
  });

export const getListItemsApi = async (id: number) =>
  await api({
    method: 'get',
    url: `todo-items`,
    params: {
      activity_group_id: id
    },
  });

export const getListItemApi = async (id: number) =>
  await api({
    method: 'get',
    url: `todo-items/${id}`,
  });

export const createListItemApi = async (data: TYPE.listItemType) =>
  await api({
    method: 'post',
    url: 'todo-items',
    data,
  });

export const updateListItemApi = async (id: number, data: TYPE.listItemType) =>
  await api({
    method: 'patch',
    url: `todo-items/${id}`,
    data,
  });

export const deleteListItemApi = async (id: number) =>
  await api({
    method: 'delete',
    url: `todo-items/${id}`,
  });
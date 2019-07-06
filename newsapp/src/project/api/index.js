import config from '../../config';
const ENDPOINT_NEWS_DETAILS = `${config.api_url}news`;
const ENDPOINT_PROJECT_UPDATE = `${config.api_url}news/update/`;
const ENDPOINT_PROJECT_CREATE = `${config.api_url}news`;

export const apiProjectUpdate = (project) => {
  const endpoint = ENDPOINT_PROJECT_UPDATE + project.pid;
  return sendPostRequest(endpoint, project);
};

export const apiListNews = () => fetch(ENDPOINT_NEWS_DETAILS);

export const apiFetchProject = pid => fetch(`${ENDPOINT_NEWS_DETAILS}/${pid}`);

export const apiProjectCreate = news => sendPostRequest(ENDPOINT_PROJECT_CREATE, news);

const sendPostRequest = (endpoint, data) => {
  const formData = createFormData(data);
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formData,
  });
};

const createFormData = (data) => {
  const formData = new URLSearchParams();
  if (data !== undefined) {
    for (const key in data) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

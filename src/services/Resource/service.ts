import { api } from '../api';
import { IResourceModel } from './dto/IResourceModel';

export async function createResource({ category, description, title }: IResourceModel) {
  const params = {
    category,
    description,
    title,
  };

  const url = `/resources`;
  const { data } = await api.post(url, params);

  return data;
}

export async function listResources() {
  const url = `/resources/list`;
  const {
    data: { response: data },
  } = await api.get(url);

  return data;
}

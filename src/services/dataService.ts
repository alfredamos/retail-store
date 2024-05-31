import Axios from "../interceptor/axios.interceptor"
import { CurrentUser } from "../models/currentUser";

export class APIService<T> {
  constructor(public url: string) {}

  //----> Create a new resource.
  create = async (resource: T): Promise<T> => {
    console.log({resource, url: this.url})
    stop
    const {data} = await Axios.post<T>(this.url, resource);

    return data;
  };

  //----> This is for fetching current-user.
  currentUser = async () => {
    const { data } = await Axios.get<CurrentUser>(this.url);

    return data;
  };

  //----> Retrieve all resources from database.
  getAll = async () => {
    const { data } = await Axios.get<T[]>(this.url);
    
    return data;
  };

  getAllById = async (id: string) => {
    const URL = `${this.url}/${id}`
    const { data } = await Axios.get<T[]>(URL);
    
    return data;
  };

  //----> Get one specific resource with a given id from database.
  getOne = async (id: string) => {
    const URL = `${this.url}/${id}`;
    const { data } = await Axios.get<T>(URL);

    return data;
  };

  //----> Remove a specific resource with a given id from the database.
  remove = async (id: string) => {
    
    const URL = `${this.url}/${id}`;
    console.log({URL})
    await Axios.delete<T>(URL);

  };

  //----> Update a specific resource with a given id in the database
  update = async (id: string, resource: T) => {
    const URL = `${this.url}/${id}`;
    const { data } = await Axios.patch<T>(URL, resource);

    return data;
  };
}
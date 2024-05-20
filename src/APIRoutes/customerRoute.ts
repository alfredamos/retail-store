import { APIService } from "../services/dataService";
import { Customer } from "../validations/customerValidation";

export const customerService = new APIService<Customer>("/customers");
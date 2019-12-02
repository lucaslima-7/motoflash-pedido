import { get, post } from "app/utils/NetworkUtil";
import ApiConfig from "./ApiConfig";

export default class ApiWorkOrders extends ApiConfig {
  getQuotation(options) {
    const config = {
      data: {
        ...options
      }
    }
    const url = `/quotation`
    return post(this.baseUrl, url, config)
  }
}
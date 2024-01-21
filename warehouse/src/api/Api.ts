/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsImageSwagger {
  error?: string;
  link?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem {
  barcode?: number;
  depth?: number;
  height?: number;
  id?: number;
  image_url?: string;
  material?: string;
  name?: string;
  quantity?: number;
  status?: string;
  width?: number;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsItemInRequest {
  barcode?: number;
  depth?: number;
  height?: number;
  id?: number;
  image_url?: string;
  material?: string;
  name?: string;
  quantity?: number;
  quantityInRequest?: number;
  status?: string;
  width?: number;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequest {
  adminID?: number;
  completionDate?: string;
  creationDate?: string;
  creatorID?: number;
  formationDate?: string;
  id?: number;
  /** status in ('draft','deleted','formed','completed','rejected') */
  status?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequestID {
  id?: number;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequestInfo {
  adminID?: number;
  completionDate?: string;
  creationDate?: string;
  creatorID?: number;
  formationDate?: string;
  id?: number;
  /** status in ('draft','deleted','formed','completed','rejected') */
  status?: string;
  userEmail?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequestStatus {
  status?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetDraftRequestByIDResponse {
  request?: GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequest;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetItemByIDResponse {
  item?: GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetItemsResponse {
  items?: GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem[];
  orderID?: number;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetRequestsForAdminWithFiltersResponse {
  requests?: GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequestInfo[];
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingLoginRequest {
  login?: string;
  password?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingLoginResponse {
  email?: string;
  id?: number;
  login?: string;
  role?: string;
  token?: string;
  userName?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingRegisterRequest {
  email?: string;
  id?: number;
  image_url?: string;
  login?: string;
  password?: string;
  role?: string;
  userName?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingRegisterResponse {
  email?: string;
  id?: number;
  image_url?: string;
  login?: string;
  password?: string;
  role?: string;
  userName?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingValidateResponse {
  email?: string;
  id?: number;
  login?: string;
  requestID?: number;
  role?: string;
  userName?: string;
}

export interface GithubComDanilaNikIU5RIP2023InternalHttpmodelsUserRequest {
  items?: GithubComDanilaNikIU5RIP2023InternalHttpmodelsItemInRequest[];
  request?: GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequest;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title No title
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  items = {
    /**
     * No description
     *
     * @tags items
     * @name ItemsList
     * @summary Get list of all items
     * @request GET:/items
     */
    itemsList: (
      query?: {
        /**
         * filter by title
         * @format text
         */
        title?: string;
        /**
         * filter by material
         * @format text
         */
        material?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetItemsResponse, any>({
        path: `/items`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name ItemsDetail
     * @summary Get item by id
     * @request GET:/items/{id}
     */
    itemsDetail: (id?: string, params: RequestParams = {}) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetItemByIDResponse, any>({
        path: `/items/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name DeleteDelete
     * @summary Delete item by id
     * @request DELETE:/items/{id}/delete
     */
    deleteDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/items/${id}/delete`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name PostCreate
     * @summary Post item to current order
     * @request POST:/items/{id}/post
     */
    postCreate: (id: number, params: RequestParams = {}) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetDraftRequestByIDResponse, any>({
        path: `/items/${id}/post`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name PutItems
     * @summary Change item
     * @request PUT:/items/{id}/put
     */
    putItems: (
      id: number,
      itemPrototype: GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/items/${id}/put`,
        method: "PUT",
        body: itemPrototype,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name ImageCreate
     * @summary Upload s3 file
     * @request POST:/items/image
     */
    imageCreate: (
      data: {
        /**
         * upload file
         * @format binary
         */
        file: File;
        /** metadata */
        metadata?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsImageSwagger, any>({
        path: `/items/image`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags items
     * @name PostCreate2
     * @summary Create item
     * @request POST:/items/post
     * @originalName postCreate
     * @duplicate
     */
    postCreate2: (itemPrototype: GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem, params: RequestParams = {}) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem, any>({
        path: `/items/post`,
        method: "POST",
        body: itemPrototype,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags auth
     * @name LoginCreate
     * @summary Login
     * @request POST:/login
     */
    loginCreate: (
      userCreds: GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingLoginRequest,
      params: RequestParams = {},
    ) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingLoginResponse, any>({
        path: `/login`,
        method: "POST",
        body: userCreds,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags auth
     * @name LogoutCreate
     * @summary Logout
     * @request POST:/logout
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags orders
     * @name OrdersList
     * @summary Get list of all orders
     * @request GET:/orders
     */
    ordersList: (
      query?: {
        /**
         * min date
         * @format text
         */
        min_date?: string;
        /**
         * max date
         * @format text
         */
        max_date?: string;
        /**
         * order status
         * @format text
         */
        status?: string;
        /**
         * order creator
         * @format text
         */
        login?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetRequestsForAdminWithFiltersResponse, any>({
        path: `/orders`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersDetail
     * @summary Get order by id
     * @request GET:/orders/{id}
     */
    ordersDetail: (id: string, params: RequestParams = {}) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsUserRequest, any>({
        path: `/orders/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name ApproveUpdate
     * @summary Approve or decline order
     * @request PUT:/orders/{id}/approve
     */
    approveUpdate: (
      id: string,
      status: GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequestStatus,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orders/${id}/approve`,
        method: "PUT",
        body: status,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name DeleteDelete
     * @summary Delete order
     * @request DELETE:/orders/delete
     */
    deleteDelete: (id: GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequestID, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/delete`,
        method: "DELETE",
        body: id,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name ItemsDelete
     * @summary Delete item from current order
     * @request DELETE:/orders/items/{id}
     */
    itemsDelete: (id: string, params: RequestParams = {}) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsUserRequest, any>({
        path: `/orders/items/${id}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name MakeUpdate
     * @summary Confirm current order
     * @request PUT:/orders/make
     */
    makeUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/make`,
        method: "PUT",
        type: ContentType.Json,
        ...params,
      }),
  };
  signup = {
    /**
     * No description
     *
     * @tags auth
     * @name SignupCreate
     * @summary Sign up
     * @request POST:/signup
     */
    signupCreate: (
      userPrototype: GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingRegisterRequest,
      params: RequestParams = {},
    ) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingRegisterResponse, any>({
        path: `/signup`,
        method: "POST",
        body: userPrototype,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  validate = {
    /**
     * No description
     *
     * @tags auth
     * @name ValidateCreate
     * @summary validate auth
     * @request POST:/validate
     */
    validateCreate: (params: RequestParams = {}) =>
      this.request<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingValidateResponse, any>({
        path: `/validate`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}

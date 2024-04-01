import qs from "qs";

type ParamValue = string | number | boolean | string[] | number[] | boolean[];
type Params = {
  [key: string]: ParamValue;
};
type CacheOption = "no-store" | "force-cache" | number;

interface ApiRequestOption {
  params?: Params;
  headers?: HeadersInit;
  body?: any;
  cache?: CacheOption;
  intercept?: boolean;
}

interface ApiErrorResponse {
  key: string;
  message: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: ApiErrorResponse;
  status?: number;
  ok: boolean;
}

export function checkErrorKey(targetKey: string, error?: ApiErrorResponse): boolean {
  return (
    error !== undefined && typeof error === "object" && "key" in error && error.key === targetKey
  );
}

/**
 * fetchのラッパークラス
 */
export default class Fetch {
  baseUrl: string;
  contentType: string;

  requestInterceptor: (_config: RequestInit) => Promise<RequestInit> = async (config) => config;
  responseInterceptor: (_response: Response) => Response = (response) => response;

  /**
   * コンストラクタ
   * @param baseUrl サーバのURL（省略時はlocalhost）
   * @param contentType Content-Typeの初期値（省略時はapplication/json）
   */
  constructor(baseUrl?: string, contentType?: string) {
    this.baseUrl = baseUrl || "";
    this.contentType = contentType || "application/json";
  }

  /**
   * GETリクエスト
   * @param dirURL リクエスト先のURL
   * @param option オプション
   * @returns レスポンス
   */
  async get<T>(dirURL: string, option?: ApiRequestOption): Promise<ApiResponse<T>> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        ...(option?.headers || {}),
      },
    };
    if (typeof option?.cache === "string") {
      options.cache = option?.cache;
    } else if (typeof option?.cache === "number") {
      options.next = { ...options.next, revalidate: option.cache };
    }
    return await this.handleApiRequest({
      dirURL,
      options,
      params: option?.params,
      intercept: option?.intercept,
    });
  }

  /**
   * POSTリクエスト
   * @param dirURL リクエスト先のURL
   * @param option オプション
   * @returns レスポンス
   */
  async post<T>(dirURL: string, option?: ApiRequestOption): Promise<ApiResponse<T>> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        ...(option?.headers || {}),
      },
      body: JSON.stringify(option?.body),
    };

    if (typeof option?.cache === "string") {
      options.cache = option?.cache;
    } else if (typeof option?.cache === "number") {
      options.next = { ...options.next, revalidate: option.cache };
    }
    return await this.handleApiRequest({
      dirURL,
      options,
      params: option?.params,
      intercept: option?.intercept,
    });
  }

  /**
   * POSTリクエスト (FormData)
   * @param dirURL リクエスト先のURL
   * @param option オプション
   * @returns レスポンス
   */
  async postMultiPart<T>(dirURL: string, option?: ApiRequestOption): Promise<ApiResponse<T>> {
    const options: RequestInit = {
      method: "POST",
      headers: option?.headers,
      body: option?.body,
    };

    if (typeof option?.cache === "string") {
      options.cache = option?.cache;
    } else if (typeof option?.cache === "number") {
      options.next = { ...options.next, revalidate: option.cache };
    }
    return this.handleApiRequest({
      dirURL,
      options,
      params: option?.params,
      intercept: option?.intercept,
    });
  }

  /**
   * DELETEリクエスト
   * @param dirURL リクエスト先のURL
   * @param option オプション
   * @returns レスポンス
   */
  async del<T>(dirURL: string, option?: ApiRequestOption): Promise<ApiResponse<T>> {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": this.contentType,
        ...(option?.headers || {}),
      },
      body: JSON.stringify(option?.body),
    };
    return this.handleApiRequest({
      dirURL,
      options,
      params: option?.params,
      intercept: option?.intercept,
    });
  }

  /**
   * PUTリクエスト
   * @param dirURL リクエスト先のURL
   * @param option オプション
   * @returns レスポンス
   */
  async put<T>(dirURL: string, option?: ApiRequestOption): Promise<ApiResponse<T>> {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": this.contentType,
        ...(option?.headers || {}),
      },
      body: JSON.stringify(option?.body),
    };
    return this.handleApiRequest({
      dirURL,
      options,
      params: option?.params,
      intercept: option?.intercept,
    });
  }

  /**
   * リクエスト前に実行するインターセプターを設定する
   * @param interceptor インターセプター
   */
  setRequestInterceptor(interceptor: (_config: RequestInit) => Promise<RequestInit>): void {
    this.requestInterceptor = interceptor;
  }

  /**
   * レスポンス受信後に実行するインターセプターを設定する
   * @param interceptor インターセプター
   */
  setResponseInterceptor(interceptor: (_response: Response) => Response): void {
    this.responseInterceptor = interceptor;
  }

  /**
   * APIリクエストを実行する
   * @param dirURL リクエスト先のURL
   * @param options オプション
   * @param params クエリパラメータ
   * @param intercept インターセプターを実行するかどうか
   * @returns レスポンス
   */
  protected async handleApiRequest<T>({
    dirURL,
    options,
    params,
    intercept,
  }: {
    dirURL: string;
    options: RequestInit;
    params?: Params;
    intercept?: boolean;
  }): Promise<ApiResponse<T>> {
    try {
      const apiURL = this.buildApiURL({ dirURL, params });

      if (intercept !== false) {
        options = await this.requestInterceptor(options);
      }

      let res = await fetch(apiURL, options);

      if (intercept !== false) {
        res = await this.responseInterceptor(res);
      }

      let data = null;
      if (
        options.headers &&
        "Content-Type" in options.headers &&
        options.headers["Content-Type"] === "application/json"
      ) {
        data = await res.json();
      } else {
        data = await res.blob();
      }

      return {
        data: res.ok ? data : undefined,
        error: res.ok ? undefined : data,
        status: res.status,
        ok: res.ok,
      };
    } catch (error) {
      return {
        status: 500,
        ok: false,
      };
    }
  }

  /**
   * APIリクエストのURLを生成する
   * @param dirURL リクエスト先のURL
   * @param params クエリパラメータ
   * @returns URL
   */
  protected buildApiURL({ dirURL, params }: { dirURL: string; params?: Params }): string {
    const queryParam = params ? "?" + qs.stringify(params, { arrayFormat: "brackets" }) : "";

    return this.baseUrl + dirURL + queryParam;
  }
}

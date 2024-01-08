export const clientState: {
  data: any[],
  page: number,
  pageSize: number,
  total: number
} = {
    data: [],
    page: 1,
    pageSize: 20,
    total: 0
};
export const batchState: {
  data: any[],
  page: number,
  pageSize: number,
  total: number
} = {
    data: [],
    page: 1,
    pageSize: 20,
    total: 0
};
export const userState = {
    tokens: null,
    user: {},
    client: {}
};

const tokenData = {
    accessToken: "",
    expiry: 0,
    refreshToken: "",
    refreshExpiry: 0,
    createdAt: "",
    reCreatedAt: ""
};

export type tokenType = typeof tokenData;

import { RemoteAuthentication } from "@/data/usecases";

export const mockRemoteLogin =
  (): RemoteAuthentication.LoginSuccessResponse => ({
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOjMsImlhdCI6MTY5NzU0NzQ2MywiZXhwIjoyMDEyOTA3NDYzfQ.HsX-ZdR30eBFat8dmUbUPFyFclm20US8wh1pRyeM4qM",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6eyJpZCI6MiwibmFtZSI6IlVzZXIiLCJfX2VudGl0eSI6IlJvbGUifSwic2Vzc2lvbklkIjozLCJpYXQiOjE2OTc1NDc0NjMsImV4cCI6MTY5NzU0ODM2M30.pUVYC-fvT33fPdiIIggl5XuNB0Db_7wttBL1MWs8zvc",
    tokenExpires: 1697548363535,
    user: {
      id: 4,
      email: "test1@example.com",
      provider: "email",
      socialId: null,
      firstName: "John",
      lastName: "Doe",
      createdAt: "2023-10-17T04:27:28.916Z",
      updatedAt: "2023-10-17T04:27:28.916Z",
      deletedAt: null,
      photo: null,
      role: {
        id: 2,
        name: "User",
        __entity: "Role",
      },
      status: {
        id: 2,
        name: "Inactive",
        __entity: "Status",
      },
      __entity: "User",
    },
  });

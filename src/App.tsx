import {
  AccessControlProvider,
  AuthBindings,
  Authenticated,
  Refine,
  CanAccess,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { newEnforcer } from "casbin";
import { model, adapter } from "./accessControl";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import {
  Biotech,
  Extension,
  ShowChart,
  People,
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4
} from "@mui/icons-material";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import {
  ActinobacteriaList,
  ActinobacteriaShow,
  ActinobacteriaCreate,
  ActinobacteriaEdit
} from "./pages/actinobacteria";
import {
  AssemblyList,
  AssemblyShow,
  AssemblyCreate,
  AssemblyEdit
} from "./pages/assembly";
import {
  ProcessedDataList,
  ProcessedDataShow,
  ProcessedDataCreate,
  ProcessedDataEdit
} from "./pages/processeddata";
import {
  UsersList,
  UsersEdit
} from "./pages/users";
import {
  GeneraList,
  GeneraCreate,
  GeneraEdit
} from "./pages/genera";
import {
  CultureMediumList,
  CultureMediumCreate,
  CultureMediumEdit
} from "./pages/culturemedium";
import {
  TypeStrainList,
  TypeStrainCreate,
  TypeStrainEdit
} from "./pages/typestrain";
import {
  EnzymeList,
  EnzymeCreate,
  EnzymeEdit
} from "./pages/enzyme";
import { Login } from "./pages/login";
import { parseJwt } from "./utils/parse-jwt";
import { UserRoles } from "./enums/user.enum";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch(
          import.meta.env.VITE_SERVER_USER_CREATE_USER,
          {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  name: profileObj.name,
                  email: profileObj.email,
                  avatar: profileObj.picture,
              }),
          },
        );

        const data = await response.json();


        if (response.ok) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...profileObj,
                    avatar: profileObj.picture,
                    userid: data._id
                }),
            );
            localStorage.setItem("role", data.role);
        } else {
            return Promise.reject();
        }

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  const accessControlProvider: AccessControlProvider = {
    can: async ({ action, params, resource }) => {
        const enforcer = await newEnforcer(model, adapter);
        const role = localStorage.getItem("role") ?? UserRoles.User;
        if (
            action === "delete" ||
            action === "edit" ||
            action === "show"
        ) {
            return Promise.resolve({
                can: await enforcer.enforce(
                    role,
                    `${resource}/${params?.id}`,
                    action,
                ),
            });
        }
        if (action === "field") {
            return Promise.resolve({
                can: await enforcer.enforce(
                    role,
                    `${resource}/${params?.field}`,
                    action,
                ),
            });
        }
        return {
            can: await enforcer.enforce(
                role,
                resource,
                action,
            ),
        };
    },
  }

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(import.meta.env.VITE_SERVER, axiosInstance)}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              routerProvider={routerBindings}
              accessControlProvider={accessControlProvider}
              resources={[
                {
                  name: "dashboard",
                  options: {
                    label: "Dashboard",
                    hide: true
                  },
                  list: "/",
                },
                {
                  name: "actinobacteria",
                  options: {
                    label: "Actinobacteria"
                  },
                  list: "/actinobacteria",
                  create: "/actinobacteria/create",
                  edit: "/actinobacteria/edit/:id",
                  show: "/actinobacteria/show/:id",
                  meta: {
                    canDelete: false,
                  },
                  icon: <Biotech />,
                },
                {
                  name: "assembly",
                  options: {
                    label: "Assembly"
                  },
                  list: "/assembly",
                  create: "/assembly/create",
                  edit: "/assembly/edit/:id",
                  show: "/assembly/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <Extension />,
                },
                {
                  name: "processeddata",
                  options: {
                    label: "Processed Data"
                  },
                  list: "/processeddata",
                  create: "/processeddata/create",
                  edit: "/processeddata/edit/:id",
                  show: "/processeddata/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <ShowChart />,
                },
                {
                  name: "users",
                  options: {
                    label: "Users"
                  },
                  list: "/users",
                  edit: "/users/edit/:id",
                  meta: {
                    canDelete: false,
                  },
                  icon: <People />,
                },
                {
                  name: "genera",
                  options: {
                    label: "Genera"
                  },
                  list: "/genera",
                  create: "/genera/create",
                  edit: "/genera/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <LooksOne />,
                },
                {
                  name: "culturemedium",
                  options: {
                    label: "Culture Media"
                  },
                  list: "/culturemedium",
                  create: "/culturemedium/create",
                  edit: "/culturemedium/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <LooksTwo />,
                },
                {
                  name: "typestrain",
                  options: {
                    label: "Antimicrobial"
                  },
                  list: "/typestrain",
                  create: "/typestrain/create",
                  edit: "/typestrain/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <Looks3 />,
                },
                {
                  name: "enzyme",
                  options: {
                    label: "Enzyme"
                  },
                  list: "/enzyme",
                  create: "/enzyme/create",
                  edit: "/enzyme/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <Looks4 />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "a0Xfvr-wKaOaF-4e8Elr",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            text="MyMicrobeApp"
                            icon={<AppIcon />}
                          />
                        )}
                      >
                        <CanAccess>
                          <Outlet />
                        </CanAccess>
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                      index
                      element={<NavigateToResource resource="actinobacteria" />}
                  />
                  <Route path="/actinobacteria">
                    <Route index element={<ActinobacteriaList />} />
                    <Route path="create" element={<ActinobacteriaCreate />} />
                    <Route path="edit/:id" element={<ActinobacteriaEdit />} />
                    <Route path="show/:id" element={<ActinobacteriaShow />} />
                  </Route>
                  <Route path="/assembly">
                    <Route index element={<AssemblyList />} />
                    <Route path="create" element={<AssemblyCreate />} />
                    <Route path="edit/:id" element={<AssemblyEdit />} />
                    <Route path="show/:id" element={<AssemblyShow />} />
                  </Route>
                  <Route path="/processeddata">
                    <Route index element={<ProcessedDataList />} />
                    <Route path="create" element={<ProcessedDataCreate />} />
                    <Route path="edit/:id" element={<ProcessedDataEdit />} />
                    <Route path="show/:id" element={<ProcessedDataShow />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<UsersList />} />
                    <Route path="edit/:id" element={<UsersEdit />} />
                  </Route>
                  <Route path="/genera">
                    <Route index element={<GeneraList />} />
                    <Route path="create" element={<GeneraCreate />} />
                    <Route path="edit/:id" element={<GeneraEdit />} />
                  </Route>
                  <Route path="/culturemedium">
                    <Route index element={<CultureMediumList />} />
                    <Route path="create" element={<CultureMediumCreate />} />
                    <Route path="edit/:id" element={<CultureMediumEdit />} />
                  </Route>
                  <Route path="/typestrain">
                    <Route index element={<TypeStrainList />} />
                    <Route path="create" element={<TypeStrainCreate />} />
                    <Route path="edit/:id" element={<TypeStrainEdit />} />
                  </Route>
                  <Route path="/enzyme">
                    <Route index element={<EnzymeList />} />
                    <Route path="create" element={<EnzymeCreate />} />
                    <Route path="edit/:id" element={<EnzymeEdit />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                      <Authenticated fallback={<Outlet />}>
                          <NavigateToResource resource="actinobacteria" />
                      </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route
                  element={
                      <Authenticated>
                          <ThemedLayoutV2>
                              <Outlet />
                          </ThemedLayoutV2>
                      </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

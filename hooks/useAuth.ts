/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  loginAsync,
  logoutAsync,
  selectAuth,
  selectUser,
  setupAutoRefresh,
} from "@/lib/redux/slices/authSlice";
import { ROLE_ADMIN } from "@/lib/types/roles";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);

  const roles = user?.role ?? [];
  const isAdmin = roles.includes(ROLE_ADMIN);

  const login = async (credentials: { account: string; password: string }) => {
    try {
      const result = await dispatch(loginAsync(credentials)).unwrap();

      if (result.token) setupAutoRefresh(result.token, dispatch as any);

      toast.success("Đăng nhập thành công");

      const resultRoles = result.user?.role ?? [];
      if (resultRoles.includes(ROLE_ADMIN)) router.push("/admin/dashboard");
      else router.push("/courses");

      return result;
    } catch (error: any) {
      toast.error(error || "Đăng nhập thất bại");
      throw error;
    }
  };

  const logout = async () => {
    await dispatch(logoutAsync()).unwrap();
    toast.success("Đăng xuất thành công");
    router.push("/");
  };

  return {
    ...auth,
    user,
    isAdmin,
    login,
    logout,
  };
}

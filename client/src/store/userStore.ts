import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast"; // import toast

type AuthUser = {
    email?: string;
    name?: string;
    password: string;
    isadmin: boolean

}

type UserStore = {
    authUser: AuthUser | null;
    isLoding: boolean;
    isadmin: boolean

    signup: (data: AuthUser) => Promise<{ success: boolean }>;
    signin: (data: AuthUser) => Promise<{ success: boolean }>;
}

export const useUserStore = create<UserStore>((set) => ({
    authUser: null,
    isLoding: false,
    isadmin: false,

    signup: async (data) => {
        try {
            set({ isLoding: true });
            const response = await axios.post<AuthUser>("http://localhost:8080/signup", data, { withCredentials: true });
            console.log(response.data)
            set({ authUser: response.data });

            toast.success("Successfully Signed Up");
            return { success: true };
        } catch (error) {
            toast.error("Error in Signup");
            console.log(error);
            return { success: false };
        } finally {
            set({ isLoding: false });
        }
    },

    signin: async (data) => {
        try {
            set({ isLoding: true });

            const response = await axios.post("http://localhost:8080/signin", data, { withCredentials: true });
            set({
                authUser: response.data.user,
            });
            set({
                isadmin: response.data.user.isadmin
            })
            toast.success("Successfully SignIN")

            return { success: true };
        } catch (error) {
            toast.error("Error In Signin")
            console.log(error);
            return { success: false };
        } finally {
            set({ isLoding: false });
        }
    },
}));

import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast"; // import toast
import { axiosInstance } from "../config/axios";

type AuthUser = {
    email?: string;
    name?: string;
    password: string;
    isadmin: boolean
    role: string,
    tech_Stack: string,
    experience: string,
    description: string | null,
    createdAt: string

}

type User = {
    _id: string;
    name: string;
    role: string;
    tech_Stack: string[];
    experience: string;
}


type UserStore = {
    authUser: AuthUser | null;
    isLoding: boolean;
    isadmin: boolean;
    developers: User[]

    signup: (data: AuthUser) => Promise<{ success: boolean }>;
    signin: (data: AuthUser) => Promise<{ success: boolean }>;
    fetchDevelopers: () => Promise<void>;
    updateDeveloper: (id: string, data: any) => Promise<{ success: boolean }>;
    DeleteDeveloper: (id: AuthUser) => Promise<{ success: boolean }>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    authUser: null,
    isLoding: false,
    isadmin: false,
    developers: [],

    signup: async (data) => {
        try {
            console.log("data", data)

            set({ isLoding: true });

            const response = await axiosInstance.post("/signup", data);

            set({ authUser: response.data.dbUser });

            console.log("authUser:", response.data.dbUser)

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

            const response = await axiosInstance.post("/signin", data);
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
    fetchDevelopers: async () => {
        try {
            set({ isLoding: true });
            const response = await axiosInstance.get("/developers");
            set({ developers: response.data.response });
            console.log(response.data.response);

        } catch (error) {
            set({ isLoding: false });
            console.error(error);
        } finally {
            set({ isLoding: false });;
        }
    },

    updateDeveloper: async (id, data) => {
        try {
            console.log("id", id, "data", data)
            set({ isLoding: true });

            const response = await axiosInstance.put(`/developers/${id}`, data);

            console.log(response.data)

            const updatedDevelopers = get().developers.map(dev =>
                dev._id === id ? response.data.developer : dev
            );

            set({ developers: updatedDevelopers });

            toast.success("Developer updated successfully");
            return { success: true };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error updating developer";
            toast.error(errorMessage);
            console.error(error);
            return { success: false };
        } finally {
            set({ isLoding: false });
        }
    },

    DeleteDeveloper: async (id) => {
        try {
            set({ isLoding: true });
            toast.success("User Deleted successfully")
            console.log("Deleting id", id)
            await axiosInstance.delete(`/developers/delete/${id}`, {
                withCredentials: true
            })
            return { success: true };
        } catch (error) {
            set({ isLoding: true });
            console.log(error);
            toast.success("User Not Deleted Successfully")
            return { success: false };
        }
        finally {
            set({ isLoding: true });
        }
    }


}));

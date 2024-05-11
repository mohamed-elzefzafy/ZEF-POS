import { apiSlice } from "./apiSlices";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    registerApi : builder.mutation({
      query : (data) => ({
        url : `/api/v1/users/register`,
      method : "POST",
      body : data,
      })
    }),
    loginApi : builder.mutation({
      query : (data) => ({
        url : `/api/v1/users/login`,
      method : "POST",
      body : data,
      })
    }),
    logout : builder.mutation({
      query : () => ({
      url : `/api/v1/users/logout`,
      method : "POST",
      })
    }),
    adminGetAllUsers : builder.query({
      query : () => ({
        url : `/api/v1/users`,
      }),
      keepUnusedDataFor : 5,
      providesTags: ["Products"]
    }),
    
    adminGetOneUser : builder.query({
      query : (id) => ({
        url : `/api/v1/users/get-one-user/${id}`,
      }),
    }),
    adminToggleUpdateUserStatus : builder.mutation({
      query : (id) => ({
        url : `/api/v1/users/toggle-update-user-status/${id}`,
        method : "PUT",
      }),
    }),

    adminDeleteUser : builder.mutation({
      query : (id) => ({
        url : `/api/v1/users/delete-user/${id}`,
        method : "DELETE",
      }),
    }),

  })
})


export const {useRegisterApiMutation , useLoginApiMutation , useLogoutMutation , 
useAdminGetAllUsersQuery , useAdminGetOneUserQuery , useAdminToggleUpdateUserStatusMutation , useAdminDeleteUserMutation} = userApiSlice;






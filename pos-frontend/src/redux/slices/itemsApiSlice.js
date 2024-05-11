import { apiSlice } from "./apiSlices";

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getItems : builder.query({
      query : () => ({
        url : `/api/v1/items`
      }),
      keepUnusedDataFor : 5
    }),
    getOneItem : builder.query({
      query : (id) => ({
        url : `/api/v1/items/get-one-item/${id}`
      }),
      keepUnusedDataFor : 5
    }),
    addItem : builder.mutation({
      query : (data) => ({
        url : `/api/v1/items/create-item`,
        method : "POST",
        body : data
      }),
    }),
    
    deleteItem : builder.mutation({
      query : (id) => ({
        url : `/api/v1/items/delete-items/${id}`,
        method : "DELETE",
      }),
    }),
    
    updateItem : builder.mutation({
      query : (id) => ({
        url : `/api/v1/items/update-item/${id}`,
        method : "PUT",
      }),
    }),
  })
})


export const {useGetItemsQuery , useAddItemMutation , useDeleteItemMutation 
  , useUpdateItemMutation , useGetOneItemQuery} = itemsApiSlice;
import { apiSlice } from "./apiSlices";


export const billsApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getBills : builder.query({
      query : () => ({
        url : `/api/v1/bills`
      }),
      keepUnusedDataFor : 5
    }),
    getOneBill : builder.query({
      query : (id) => ({
        url : `api/v1/bills/get-one-bill/${id}`
      }),
      keepUnusedDataFor : 5
    }),

    addBill : builder.mutation({
      query : (data) => ({
        url : `/api/v1/bills/create-bill`,
        method : "POST",
        body : data
      }),
    }),
    
  })
})

export const {useGetBillsQuery , useAddBillMutation , useGetOneBillQuery} = billsApiSlice;
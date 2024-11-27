import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { PaymentExpireDateDto } from "../../api/payment/PaymentModel";
import moment from "moment";

export const payApi = createApi({
	reducerPath: "payApi",
	baseQuery: axiosBaseQuery(),
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getPayInfo: build.query<PaymentExpireDateDto, void>({
			query: () => ({ url: `Pay/get-payment-expire-date` }),
			transformResponse: (response: PaymentExpireDateDto) => {
				response.isPaymentDateExpired = true;
				if (!response?.paymentExpireDate) {
					return response;
				}

				const expireDate = moment(response.paymentExpireDate, "DD.MM.YYYY");
				if (expireDate.isValid()) {
					response.isPaymentDateExpired = expireDate.isBefore(moment(), "day");
				}

				return response;
			},
			keepUnusedDataFor: 2,
		}),
	}),
});

export const { useGetPayInfoQuery } = payApi;

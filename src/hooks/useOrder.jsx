import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useOrder = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: allOrder = [] } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/orderCourse/${user.email}`)
            return res.data;
        },
    })

    return [allOrder, refetch]
};

export default useOrder;
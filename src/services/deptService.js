import api from '@/apis/apiClient';
import { DeptAPI } from '@/apis/routes/orgstructure';

export const getDeptListService = async () => {
    const response = await api.get(DeptAPI.LIST);
    return response.data;
};

import api from '@/apis/apiClient'
import { IntroduceAPI } from '@/apis/routes/introduce'

export const fetchIntroduceItemsService = async (templateId) => {
  const res = await api.get(`${IntroduceAPI.GET_ALL_TEMPLATES}/${templateId}/items`)
  return res.data
}

export const createIntroduceItemService = async (dto) => {
  const res = await api.post(IntroduceAPI.CREATE_TEMPLATE_ITEM, dto)
  return res.data
}

export const deleteIntroduceItemService = async (id) => {
  await api.delete(`${IntroduceAPI.DELETE_TEMPLATE_ITEM(id)}`)
}

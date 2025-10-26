import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { ItemsWithCount, SubjectInterface } from '~/types'

export const locationService = {
  getCountries: (): Promise<
    AxiosResponse<ItemsWithCount<SubjectInterface>>
  > => {
    return axiosClient.get(URLs.locations.countries.get)
  },
  getCitiesByCountryId: (
    id: number
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    return axiosClient.get(`${URLs.locations.cities.get}/${id}`)
  }
}

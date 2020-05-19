const user = {
  state: {
    token: null,
    code: null,
    name: null,
    phone: null,
    bankName: null,
    cardNo: null,
    cardOwner: null,
    idNo: null,
    province: null,
    city: null,
    userId: null,
    openingBank: null,
    groupIdsStr: null,
    parentId: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage.setItem('token', token)
      state.token = token
    },
    SET_CODE: (state, code) => {
      localStorage.setItem('code', code)
      state.code = code
    },
    SET_USER_ID: (state, userId) => {
      localStorage.setItem('userId', userId)
      state.userId = userId
    },
    SET_NAME: (state, name) => {
      localStorage.setItem('name', name)
      state.name = name
    },
    SET_PHONE: (state, phone) => {
      localStorage.setItem('phone', phone)
      state.phone = phone
    },
    SET_BANK_NAME: (state, bankName) => {
      localStorage.setItem('bankName', bankName)
      state.bankName = bankName
    },
    SET_CARD_NO: (state, cardNo) => {
      localStorage.setItem('cardNo', cardNo)
      state.cardNo = cardNo
    },
    SET_CARD_OWNER: (state, cardOwner) => {
      localStorage.setItem('cardOwner', cardOwner)
      state.cardOwner = cardOwner
    },
    SET_OPENING_BANK: (state, openingBank) => {
      localStorage.setItem('openingBank', openingBank)
      state.openingBank = openingBank
    },
    SET_ID_NO: (state, idNo) => {
      localStorage.setItem('idNo', idNo)
      state.idNo = idNo
    },
    SET_PROVINCE: (state, province) => {
      localStorage.setItem('province', province)
      state.province = province
    },
    SET_CITY: (state, city) => {
      localStorage.setItem('city', city)
      state.city = city
    },
    SET_GROUP_IDS_STR: (state, groupIdsStr) => {
      localStorage.setItem('groupIdsStr', groupIdsStr)
      state.groupIdsStr = groupIdsStr
    },
    SET_PARENT_ID: (state, parentId) => {
      localStorage.setItem('parentId', parentId)
      state.parentId = parentId
    }
  },
  actions: {
    setToken: ({ commit }, val) => {
      commit('SET_TOKEN', val)
    },
    setCode: ({ commit }, val) => {
      commit('SET_CODE', val)
    },
    setUserId: ({ commit }, val) => {
      commit('SET_USER_ID', val)
    },
    setName: ({ commit }, val) => {
      commit('SET_NAME', val)
    },
    setPhone: ({ commit }, val) => {
      commit('SET_PHONE', val)
    },
    setBankName: ({ commit }, val) => {
      commit('SET_BANK_NAME', val)
    },
    setCardNo: ({ commit }, val) => {
      commit('SET_CARD_NO', val)
    },
    setCardOwner: ({ commit }, val) => {
      commit('SET_CARD_OWNER', val)
    },
    setOpeningBank: ({ commit }, val) => {
      commit('SET_OPENING_BANK', val)
    },
    setIdNo: ({ commit }, val) => {
      commit('SET_ID_NO', val)
    },
    setProvince: ({ commit }, val) => {
      commit('SET_PROVINCE', val)
    },
    setCity: ({ commit }, val) => {
      commit('SET_CITY', val)
    },
    setGroupIds: ({ commit }, groups = []) => {
      const groupIds = []
      groups.forEach(group => {
        groupIds.push(group.usergroupId)
      })
      commit('SET_GROUP_IDS_STR', groupIds.join(','))
    },
    setParentId: ({ commit }, val) => {
      commit('SET_PARENT_ID', val)
    }
  }
}
export default user

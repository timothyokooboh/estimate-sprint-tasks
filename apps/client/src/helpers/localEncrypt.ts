import SecureLS from 'secure-ls'

const ls = new SecureLS({ encodingType: 'aes' })

export const localEncrypt = {
  saveData(key: string, value: any) {
    ls.set(key, value)
  },
  getData(key: string) {
    return ls.get(key)
  },
  removeData(key: string) {
    ls.remove(key)
  }
}

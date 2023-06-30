export interface IAlbum {
  id: number
  title: string
  userId: number
}

export interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface CardProps {
  album: IAlbum
  setAlbums:  React.Dispatch<React.SetStateAction<IAlbum[]>>
  user: IUser
  setUsers:  React.Dispatch<React.SetStateAction<IUser[]>>
}
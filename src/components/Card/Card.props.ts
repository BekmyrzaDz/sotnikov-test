export interface IPost {
  body: string
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

interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface CardProps {
  post: IPost
  setPosts:  React.Dispatch<React.SetStateAction<IPost[]>>
  user: IUser
  setUsers:  React.Dispatch<React.SetStateAction<IUser[]>>
  comments: IComment[]
  favArr: number[]
  setFavArray:  React.Dispatch<React.SetStateAction<number[]>>
}
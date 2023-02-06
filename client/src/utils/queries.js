import { gql } from '@apollo/client'

export const GET_ME = gql`
  query GET_ME($_id: ID, $username: String) {
    me(_id: $_id, username: $username) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`
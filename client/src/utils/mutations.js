import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`

export const ADD_USER = gql`
  mutation ADD_USER($username: String!, $email:String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`

export const SAVE_BOOK = gql`
  mutation SAVE_BOOK($_id: ID!, $input: BookInput) {
    saveBook(_id: $_id, input: $input) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`

export const REMOVE_BOOK = gql`
  mutation REMOVE_BOOK($_id: ID!, $bookID: ID!) {
    removeBook(_id: $_id, bookId: $bookId) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`
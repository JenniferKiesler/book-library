const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                return userData;
            }
        }
    },
    Mutation: {
        login: async (parent, { email, password }, context, info) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('No user found!')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!')
            }

            const token = signToken(user)
            
            return { token, user }
        },

        addUser: async (parent, args, context, info) => {
            const user = await User.create(args)
            const token = signToken(user)

            return { token, user }
        },

        saveBook: async (parent, { input }, context, info) => {
            console.log(context.user)
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate( 
                    {_id: context.user._id},
                    {$addToSet: { savedBooks: input}},
                    { new: true } 
                )
                return updatedUser
            }
        },

        removeBook: async (parent, { bookId }, context, info) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $pull: {savedBooks: bookId}},
                    {new: true}
                )
                return updatedUser
            }
        }
    }
}

module.exports = resolvers
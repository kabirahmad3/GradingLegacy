import mongoose, { Schema } from "mongoose";


const schema = new Schema({
    communication: {
        rating: {
            type: Number
        },
        comment: {
            type: String
        },
        leaderRating: {
            type: Number
        },
        leaderComment: {
            type: String
        }
    },
    timeline: {
        rating: {
            type: Number
        },
        comment: {
            type: String
        },
        leaderRating: {
            type: Number
        },
        leaderComment: {
            type: String
        }
    },
    employee: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    leader: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    teamwork: {
        rating: {
            type: Number
        },
        comment: {
            type: String
        },
        leaderRating: {
            type: Number
        },
        leaderComment: {
            type: String
        }
    },
    technicalSkills: {
        rating: {
            type: Number
        },
        comment: {
            type: String
        },
        leaderRating: {
            type: Number
        },
        leaderComment: {
            type: String
        }
    },
    behavior: {
        rating: {
            type: Number
        },
        comment: {
            type: String
        },
        leaderRating: {
            type: Number
        },
        leaderComment: {
            type: String
        }
    }
})

export const Forms = mongoose.model("form", schema)


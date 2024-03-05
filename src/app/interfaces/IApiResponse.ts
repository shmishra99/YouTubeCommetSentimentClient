export interface ApiResponse {
    sentiment_counts: {
        negative_count: number
        neutral_count: number
        positive_count: number
        undetermined_count: number
    }
    top_comments: [string, number][]
    bot_comments: [string, number][]
}